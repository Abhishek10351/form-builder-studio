from pydantic import BaseModel, EmailStr


class User(BaseModel):
    _id: str
    email: EmailStr
    name: str
    password: str
    is_active: bool
    is_superuser: bool
