from pydantic import BaseModel, EmailStr, Field


class User(BaseModel):
    email: EmailStr = Field(unique=True)
    name: str
    password: str
    is_active: bool = Field(default=True)
    is_superuser: bool = Field(default=False)


class FormField(BaseModel):
    label: str
    field_type: str = Field(
        default="text", pattern=r"^(text|email|checkbox|radio|dropdown|date)$"
    )
    required: bool = Field(default=False)
    options: list[str] | None = None
    login_required: bool = Field(default=False)


class Form(BaseModel):
    title: str
    description: str | None = None
    fields: list[FormField] = Field(default_factory=list)
    owner_id: EmailStr
    created_at: str


class Submission(BaseModel):
    form_id: str
    data: dict
    submitted_by: EmailStr | None = None
    submitted_at: str


class Settings(BaseModel):
    site_name: str = "Form Builder Studio"
    admin_email: EmailStr
    items_per_page: int = 10
    enable_registration: bool = True
    maintenance_mode: bool = False


class Analytics(BaseModel):
    form_id: str
    views: int = 0
    submissions: int = 0
    unique_visitors: int = 0
