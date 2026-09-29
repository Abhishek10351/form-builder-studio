from enum import Enum
from pydantic import BaseModel, Field, model_validator
from utils import generate_random_id


class FieldType(str, Enum):
    TEXT = "text"
    DATE = "date"
    DROPDOWN = "dropdown"
    RADIO = "radio"
    CHECKBOX = "checkbox"
    BOOLEAN = "boolean"


NEEDS_OPTIONS = {FieldType.CHECKBOX, FieldType.RADIO, FieldType.DROPDOWN}


class FormField(BaseModel):
    id: str = Field(default_factory=generate_random_id)
    label: str = Field(default="Untitled Question", min_length=1, max_length=300)
    field_type: FieldType = FieldType.TEXT
    required: bool = False
    options: list[str] = Field(default_factory=list)

    @model_validator(mode="after")
    def check_consistency(self):
        if self.field_type in NEEDS_OPTIONS:
            if not self.options:
                raise ValueError(f"'{self.field_type.value}' needs at least one option")
            if len(set(self.options)) != len(self.options):
                raise ValueError("options must be unique")
        else:
            self.options = []  # text / date / boolean never have options
        return self


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
