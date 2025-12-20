from pydantic import BaseModel, EmailStr, Field, BeforeValidator
from utils import generate_random_id
from typing import Annotated, Optional
from bson import ObjectId

PyObjectId = Annotated[str, BeforeValidator(str)]


class User(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    email: EmailStr = Field(..., pattern=r"^[\w\.-]+@[\w\.-]+\.\w{2,4}$")
    name: str
    password: str
    is_active: bool = Field(default=True)
    is_superuser: bool = Field(default=False)

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
    }
