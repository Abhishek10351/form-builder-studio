from pydantic import BaseModel, EmailStr, Field, BeforeValidator, field_validator
from typing import Optional, Annotated
from bson import ObjectId
from datetime import datetime, date
from utils import generate_random_id

# Custom type for MongoDB ObjectId
PyObjectId = Annotated[str, BeforeValidator(str)]


class FormField(BaseModel):
    id: str = Field(default_factory=generate_random_id)
    label: str = "Untitled Question"
    field_type: str = Field(
        default="text", pattern=r"^(text|checkbox|radio|dropdown|date)$"
    )
    required: bool = Field(default=False)
    options: list[str] | None = None
    multi_select: bool = Field(default=False)

    @field_validator("options", mode="before")
    @classmethod
    def validate_options(cls, v, values):
        if values.get("field_type") in ("checkbox", "radio", "dropdown"):
            if not v or not isinstance(v, list) or len(v) == 0:
                raise ValueError(
                    f"Options must be provided for field type '{values.get('field_type')}'"
                )
        return v
    
    @field_validator("multi_select", mode="before")
    @classmethod
    def validate_multi_select(cls, v, values):
        if values.get("field_type") != "checkbox" and len(values.get("options"))==0 and v:
            raise ValueError(
                f"Multi-select can only be true for 'checkox'"
            )
        return v

    @field_validator("field_type", mode="before")
    @classmethod
    def validate_field_type(cls, v):
        allowed_types = {"text", "checkbox", "radio", "dropdown", "date"}
        if v not in allowed_types:
            raise ValueError(f"field_type must be one of {allowed_types}")
        return v


class Form(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    title: str = "Untitled Form"
    description: str | None = ""
    fields: list[FormField] = Field(default_factory=list)
    owner_id: EmailStr = Field(default = None)
    created_at: str = Field(default_factory=lambda: datetime.now().isoformat())

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
    }


class SubmissionField(BaseModel):
    field_id: str
    value: str | list[str] | date | bool | None


class Submission(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=generate_random_id, alias="_id")
    form_id: PyObjectId
    data: list[SubmissionField] = Field(default_factory=list)
    submitted_by: EmailStr | None = None
    submitted_at: str

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
