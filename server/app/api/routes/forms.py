from fastapi import APIRouter, Request, Response, status
from fastapi import (
    Depends,
    WebSocket,
    WebSocketException,
    WebSocketDisconnect,
    Query,
)
from typing import Annotated
from models import Form, FormField, User, Submission, SubmissionField
import json
import datetime
from pydantic import BaseModel, Field, BeforeValidator
from typing import Optional
import nanoid
from utils.manager import ConnectionManager
from utils import websocket_login_required, has_update_permission, login_required, generate_random_id

PyObjectId = Annotated[str, BeforeValidator(str)]

manager = ConnectionManager()

router = APIRouter(prefix="/forms", tags=["forms"])


@router.websocket("/ws/{form_id}")
@websocket_login_required
@has_update_permission
async def form_websocket_endpoint(websocket: WebSocket, form_id: str):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_json()
            action = data.get("action")
            mongo = websocket.app.mongodb
            try:
                match action:
                    case "ping":
                        await manager.send_personal_message(
                            {"action": "pong"}, websocket
                        )
                    case "publish_form":
                        publish_status = data.get("published")
                        await mongo["forms"].update_one(
                            {"_id": form_id}, {"$set": {"published": publish_status}}
                        )
                        await manager.broadcast(
                            {"action": "publish_form", "published": publish_status}
                        )
                    case "update_form":
                        form_data = data.get("data", {})
                        update_data = {}
                        if "title" in form_data:
                            update_data["title"] = form_data["title"]
                        if "description" in form_data:
                            update_data["description"] = form_data["description"]

                        if update_data:
                            await mongo["forms"].update_one(
                                {"_id": form_id}, {"$set": update_data}
                            )
                            await manager.broadcast(
                                {"action": "update_form", "data": update_data}
                            )
                    case "add_field":
                        field = FormField()
                        data = await mongo["forms"].update_one(
                            {"_id": form_id},
                            {"$push": {"fields": field.model_dump(by_alias=True)}},
                        )
                        await manager.broadcast(
                            {
                                "action": "add_field",
                                "field": field.model_dump(),
                            }
                        )
                    case "update_field":
                        field = data.get("field")
                        if not field:
                            raise ValueError("field data is required for update_field")
                        field_id = field.get("id")
                        new_data = await mongo["forms"].update_one(
                            {"_id": form_id, "fields.id": field_id},
                            {"$set": {f"fields.$": field}},
                        )
                        await manager.broadcast(
                            {
                                "action": "update_field",
                                "field": field,
                            }
                        )
                    case "remove_field":
                        field_id = data.get("field_id")
                        if not field_id:
                            raise ValueError("field_id is required for remove_field")
                        data = await mongo["forms"].update_one(
                            {"_id": form_id},
                            {"$pull": {"fields": {"id": field_id}}},
                        )
                        await manager.broadcast(
                            {
                                "action": "remove_field",
                                "field_id": field_id,
                            }
                        )
                    case "duplicate_field":
                        field_id = data.get("field_id")
                        if not field_id:
                            raise ValueError("field_id is required for duplicate_field")
                        # get the field to duplicate
                        form = await mongo["forms"].find_one({"_id": form_id})
                        field_to_duplicate = next(
                            (f for f in form["fields"] if f["id"] == field_id), None
                        )
                        index = form["fields"].index(field_to_duplicate)
                        if not field_to_duplicate:
                            raise ValueError("Field not found to duplicate")
                        del field_to_duplicate["id"]
                        new_field = FormField(**field_to_duplicate)
                        data = await mongo["forms"].update_one(
                            {"_id": form_id},
                            {
                                "$push": {
                                    "fields": {
                                        "$each": [new_field.model_dump(by_alias=True)],
                                        "$position": index + 1,
                                    }
                                }
                            },
                        )
                        print("Duplicate field data:", data)
                        await manager.broadcast(
                            {
                                "action": "duplicate_field",
                                "field": new_field.model_dump(),
                                "index": index + 1,
                            }
                        )

            except Exception as e:
                print("Error processing action:", e)
                await manager.send_personal_message(
                    {"action": action, "message": str(e), "error": True}, websocket
                )
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        print(f"WebSocket disconnected for form_id: {form_id}")


@router.get(
    "/{form_id}",
    response_model=Form,
    status_code=200,
)
async def get_form(req: Request, form_id: str):
    user: User | None = req.state.user
    forms = req.app.mongodb["forms"]
    # if user and user.is_superuser:
    #     form = await forms.find_one({"_id": form_id})
    # else:
    #     form = await forms.find_one(
    #         {"_id": form_id, "$or": [{"published": True}, {"owner_id": user.email}]}
    #     )
    if not user :
        form = await forms.find_one(
            {"_id": form_id, "published": True}
        )
    else:
        if user.is_superuser:
            form = await forms.find_one({"_id": form_id})
        else:
            form = await forms.find_one(
                {"_id": form_id, "$or": [{"published": True}, {"owner_id": user.email}]}
            )

    if not form:
        return Response(
            content=json.dumps({"message": "Form not found"}),
            status_code=404,
            media_type="application/json",
        )
    return Form.model_validate(form).model_dump(by_alias=True)


class FormsListResponse(BaseModel):
    id: str = Field(alias="_id")
    title: str
    description: str


@router.get("/", response_model=list[FormsListResponse], status_code=200)
@login_required
async def get_forms(req: Request):
    user: User | None = req.state.user
    forms = req.app.mongodb["forms"]
    if user and user.is_superuser:
        cursor = forms.find()
    else:
        cursor = forms.find({"owner_id": user.email})
    form_list = []
    async for form in cursor:
        form_list.append(
            FormsListResponse.model_validate(form).model_dump(by_alias=True)
        )
    return form_list


@router.post("/", status_code=status.HTTP_201_CREATED)
@login_required
async def create_form(req: Request, form: Form):
    user: User | None = req.state.user
    forms = req.app.mongodb["forms"]
    form_dict = form.model_dump(by_alias=True)
    form_dict["owner_id"] = str(user.email)
    print("Creating form:", form_dict)
    result = await forms.insert_one(form_dict)
    return Response(
        content=Form.model_validate(form_dict).model_dump_json(),
        status_code=201,
        media_type="application/json",
    )


@router.delete("/{form_id}", status_code=status.HTTP_204_NO_CONTENT)
@login_required
async def delete_form(req: Request, form_id: str):
    user: User | None = req.state.user
    forms = req.app.mongodb["forms"]
    form = await forms.find_one({"_id": form_id})
    if not form:
        return Response(
            content=json.dumps({"message": "Form not found"}),
            status_code=404,
            media_type="application/json",
        )
    if form["owner_id"] != user.email and not user.is_superuser:
        return Response(
            content=json.dumps({"message": "Unauthorized"}),
            status_code=403,
            media_type="application/json",
        )
    await forms.delete_one({"_id": form_id})
    return Response(status_code=status.HTTP_204_NO_CONTENT)


class SubmissionData(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=generate_random_id, alias="_id")
    data: list[SubmissionField] = Field(default_factory=list)


@router.post("/{form_id}/submit", response_model=Form, status_code=200)
async def submit_form(req: Request, form_id: str, submission_data: SubmissionData):

    mongo = req.app.mongodb
    forms = mongo["forms"]
    submissions = mongo["submissions"]
    form = forms.find_one({"_id": form_id, "published": True})
    if not form:
        return Response(
            content=json.dumps({"message": "Form not found or not published"}),
            status_code=404,
            media_type="application/json",
        )
    submission_dict = submission_data.model_dump(by_alias=True)
    submission = Submission(**submission_dict, form_id=form_id)
    submission_dict = submission.model_dump(by_alias=True)

    result = await submissions.insert_one(submission_dict)
    return Response(
        content=Submission.model_validate(submission_dict).model_dump_json(),
        status_code=200,
        media_type="application/json",
    )
