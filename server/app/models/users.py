from pydantic import BaseModel, EmailStr, Field
from utils import generate_random_id
from typing import Annotated
from bson import ObjectId

PyObjectId = Annotated[str, Field()]


class User(BaseModel):
    email: EmailStr = Field(...)
    name: str
    password: str
    is_active: bool = Field(default=True)
    is_superuser: bool = Field(default=False)

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
    }
