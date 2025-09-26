from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from core.security import verify_token
from models import User


class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Skip auth for these paths
        skip_paths = ["/login", "/users/create", "/docs", "/redoc", "/openapi.json"]
        if request.url.path in skip_paths:
            return await call_next(request)
        auth_token = request.headers.get("Authorization")
        user = None

        if auth_token and auth_token.startswith("Bearer "):
            token = auth_token.split(" ")[1]
            mongodb = request.app.mongodb
            payload = verify_token(token)
            if payload:
                user = await mongodb["users"].find_one({"email": payload["sub"]})
                if user:
                    user = User(**user)
                    user.password = None

        # Attach the user to the request state
        request.state.user = user

        response = await call_next(request)
        return response
