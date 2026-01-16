from fastapi import APIRouter, Request, Response, status
from fastapi import (
    Depends,
    WebSocket,
    WebSocketException,
    WebSocketDisconnect,
    Query,
)
from typing import Annotated
from models import Form, FormField, User
import json
import datetime
from pydantic import BaseModel, Field
from typing import Optional
from utils import login_required
import nanoid
from utils.manager import ConnectionManager
from utils import websocket_login_required, has_update_permission

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
                    case "remove_field":
                        field_id = data.get("field_id")
                        if not field_id:
                            raise ValueError("field_id is required for remove_field")
                        t = await mongo["forms"].find_one({"_id": form_id})
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
@login_required
async def get_form(req: Request, form_id: str):
    user: User | None = req.state.user
    forms = req.app.mongodb["forms"]
    form = await forms.find_one({"_id": form_id})
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
    # form_list = await forms.find().to_list(length=100)
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
# @login_required
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
