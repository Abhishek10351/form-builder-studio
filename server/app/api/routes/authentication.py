from fastapi import APIRouter, Request, Response
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

    if not email or not password:
        return Response(
            content='{"message": "Email and password are required"}',
            status_code=400,
            media_type="application/json",
        )

    if not main_user:
        return Response(
            content='{"message": "Email does not exist"}',
            status_code=401,
            media_type="application/json",
        )

    if not verify_password(password, main_user["password"]):
        return Response(
            content='{"message": "Invalid password"}',
            status_code=401,
            media_type="application/json",
        )

    access_token = create_access_token(subject=email, expires_delta=timedelta(days=10))

    return Response(
        content=f'{{"access": "{access_token}", "token_type": "bearer", "expires": 10}}',
        media_type="application/json",
    )
