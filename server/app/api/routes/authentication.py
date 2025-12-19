from fastapi import APIRouter, Request, Response
from pydantic import EmailStr, BaseModel, Field
from datetime import timedelta
from core.security import create_access_token, verify_password
from core.config import settings
import json

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

    if not email or not password:
        return Response(
            content=json.dumps({"message": "Email and password are required"}),
            status_code=400,
            media_type="application/json",
        )

    if not main_user:
        return Response(
            content=json.dumps({"message": "User not found"}),
            status_code=401,
            media_type="application/json",
        )

    if not verify_password(password, main_user["password"]):
        return Response(
            content=json.dumps({"message": "Invalid password"}),
            status_code=401,
            media_type="application/json",
        )

    access_token = create_access_token(
        subject=email,
        expires_delta=timedelta(days=settings.ACCESS_TOKEN_EXPIRE_DAYS),
    )


    response_data = {
        "access": access_token,
        "token_type": "bearer",
        "expires_in_days": settings.ACCESS_TOKEN_EXPIRE_DAYS,
        "message": f"Login successful. Token expires in {settings.ACCESS_TOKEN_EXPIRE_DAYS} days.",
    }

    return Response(
        content=json.dumps(response_data),
        media_type="application/json",
    )
