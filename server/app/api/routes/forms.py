from fastapi import APIRouter, Request, Response, status
from models import Form, User
import json
import datetime
from pydantic import BaseModel, Field
from typing import Optional
from utils import login_required

router = APIRouter(prefix="/forms", tags=["forms"])


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
            FormsListResponse.model_validate(form).model_dump(by_alias=True))
    return form_list


@router.post("/", status_code=status.HTTP_201_CREATED)
@login_required
async def create_form(req: Request, form: Form):
    user: User | None = req.state.user
    forms = req.app.mongodb["forms"] 
    form_dict = form.model_dump(by_alias=True)
    form_dict["owner_id"] = str(user.email)
    result = await forms.insert_one(form_dict)
    return Response(
        content=json.dumps(form_dict),
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
