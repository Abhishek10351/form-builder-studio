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
        try:
            user = await self.get_user_from_jwt(request)
            # Attach the user to the request state
            request.state.user = user
        except Exception as e:
            request.state.user = None

        response = await call_next(request)
        return response
    
    async def get_user_from_jwt(self, request: Request) -> User | None:
        auth_token = request.headers.get("Authorization")
        if not auth_token or not auth_token.startswith("Bearer "):
            return None
        token = auth_token.split(" ")[1].strip()
        payload = verify_token(token)
        return await self.get_user(payload, request)
    
    async def get_user(self, payload ,request: Request) -> User | None:
        mongodb = request.app.mongodb
        user_data = await mongodb["users"].find_one({"email": payload["sub"]})
        if user_data:
            user = User(**user_data)
            user.password = None
            return user
        return None