from fastapi import APIRouter, Request
from pydantic import EmailStr, BaseModel, Field
from datetime import timedelta
from core.security import create_access_token, verify_password

router = APIRouter(tags=["authentication"])


class UserAuth(BaseModel):
    email: EmailStr = Field(..., examples=["test@example.com"])
    password: str = Field(
        ...,
    )


@router.post("/login")
async def login(req: Request, user: UserAuth):
    email = user.email
    password = user.password
    users = req.app.mongodb["users"]
    main_user = await users.find_one({"email": email})

    if not main_user or not verify_password(password, main_user["password"]):
        return {"message": "Invalid email or password"}, 401

    access_token = create_access_token(
        subject=email, expires_delta=timedelta(minutes=15)
    )

    return {"access_token": access_token, "token_type": "bearer"}
