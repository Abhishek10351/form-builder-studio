from fastapi import Request
from models.users import UserPublic as User
from starlette.middleware.base import BaseHTTPMiddleware
from core.security import verify_token


class AuthMiddleware(BaseHTTPMiddleware):

    async def dispatch(self, request: Request, call_next):
        skip_paths = [
            "/login",
            "/users/create",
            "/docs",
            "/redoc",
            "/openapi.json",
        ]
        # TODO: use a regex to match paths instead of exact matches, to allow for dynamic paths

        if request.url.path in skip_paths:
            return await call_next(request)

        request.state.user = None

        for get_user in (self.get_user_from_cookie, self.get_user_from_jwt):
            user = await get_user(request)

            if user:
                request.state.user = user
                break

        return await call_next(request)

    async def get_user_from_jwt(self, request: Request) -> User | None:
        auth_token = request.headers.get("Authorization")

        if not auth_token or not auth_token.startswith("Bearer "):
            return None

        token = auth_token.removeprefix("Bearer ").strip()
        return await self.get_user_from_token(token, request)

    async def get_user_from_cookie(self, request: Request) -> User | None:
        token = request.cookies.get("access_token")

        if not token:
            return None

        return await self.get_user_from_token(token, request)

    async def get_user_from_token(self, token: str, request: Request) -> User | None:
        try:
            payload = verify_token(token)
            return await self.get_user(payload, request)
        except Exception:
            return None

    async def get_user(self, payload, request: Request) -> User | None:
        try:
            if not payload or "sub" not in payload:
                return None

            mongodb = request.app.mongodb
            user_data = await mongodb["users"].find_one({"email": payload["sub"]})

            if not user_data:
                return None

            user = User(**user_data)
            return user

        except Exception:
            return None
