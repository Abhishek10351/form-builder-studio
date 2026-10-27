import json
from datetime import timedelta

from core.config import settings
from core.security import create_access_token, verify_password
from fastapi import APIRouter, Request, Response
from pydantic import BaseModel, EmailStr, Field

router = APIRouter(tags=["authentication"])


class UserAuth(BaseModel):
    email: EmailStr = Field(..., examples=["test@example.com"])
    password: str = Field(...)


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
        "message": "Login successful",
        "token_type": "bearer",
        "expires_in_days": settings.ACCESS_TOKEN_EXPIRE_DAYS,
    }

    response = Response(
        content=json.dumps(response_data),
        media_type="application/json",
    )
    # TODO: make it work with any frontend url not just localhost:3000
    response.set_cookie(
        key="access_token",
        value=access_token,
        max_age=settings.ACCESS_TOKEN_EXPIRE_DAYS * 24 * 60 * 60,
        httponly=True,
        secure=False,  # True when using HTTPS in production
        samesite="lax",
        path="/",
    )

    return response
