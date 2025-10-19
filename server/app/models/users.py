from pydantic import BaseModel, EmailStr, Field


class User(BaseModel):
    email: EmailStr = Field(unique=True)
    name: str
    password: str
    is_active: bool = Field(default=True)
    is_superuser: bool = Field(default=False)
