from enum import Enum
from pydantic import BaseModel, Field, model_validator
from utils import generate_random_id


class FieldType(str, Enum):
    TEXT = "text"
    DATE = "date"
    TIME = "time"
    DROPDOWN = "dropdown"
    RADIO = "radio"
    CHECKBOXES = "checkboxes"
    TOGGLE = "toggle"


NEEDS_OPTIONS = {FieldType.CHECKBOXES, FieldType.RADIO, FieldType.DROPDOWN}
STRING_TYPES = {FieldType.TEXT, FieldType.DATE, FieldType.TIME}


class FormField(BaseModel):
    id: str = Field(default_factory=generate_random_id)
    label: str = Field(default="Untitled Question", min_length=1, max_length=300)
    field_type: FieldType = FieldType.TEXT
    required: bool = False
    options: list[str] = Field(default_factory=list)


class FormIn(BaseModel):
    """What the client sends to create/update a form."""

    title: str = Field(default="Untitled Form", max_length=200)
    description: str | None = ""
    fields: list[FormField] = Field(default_factory=list)
    published: bool = False

    @model_validator(mode="after")
    def unique_field_ids(self):
        ids = [f.id for f in self.fields]
        if len(ids) != len(set(ids)):
            raise ValueError("duplicate field ids")
        return self


class Form(FormIn):
    """What's stored in Mongo."""

    id: str = Field(default_factory=generate_random_id, alias="_id")
    owner_id: str

    model_config = {"populate_by_name": True}


class FormPublic(BaseModel):
    """GET /forms/{id} — what a respondent sees. No owner_id, no submissions."""

    id: str = Field(alias="_id")
    title: str
    description: str | None
    fields: list[FormField]

    model_config = {"populate_by_name": True}


class FormListItem(BaseModel):
    """Shared list view — title and description only."""

    id: str = Field(alias="_id")
    title: str
    description: str | None

    model_config = {"populate_by_name": True}
