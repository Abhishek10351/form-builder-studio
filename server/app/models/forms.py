from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Annotated
from bson import ObjectId
from datetime import datetime, date

# Custom type for MongoDB ObjectId
PyObjectId = Annotated[str, Field()]


class FormField(BaseModel):
    label: str
    field_type: str = Field(
        default="text", pattern=r"^(text|checkbox|radio|dropdown|date)$"
    )
    required: bool = Field(default=False)
    options: list[str] | None = None
    login_required: bool = Field(default=False)


class Form(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    title: str
    description: str | None = None
    fields: list[FormField] = Field(default_factory=list)
    owner_id: EmailStr
    created_at: str

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class SubmissionField(BaseModel):
    field_id: str
    value: str | list[str] | date | bool | None


class Submission(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    form_id: PyObjectId
    data: list[SubmissionField] = Field(default_factory=list)
    submitted_by: EmailStr | None = None
    submitted_at: str

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
