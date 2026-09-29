from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from core.security import verify_token
from models import User


class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Skip auth for these paths
        skip_paths = ["/login", "/users/create", "/docs", "/redoc", "/openapi.json"]
        # TODO: use a regex to match paths instead of exact matches, to allow for dynamic paths
        if request.url.path in skip_paths:
            return await call_next(request)
        request.state.user = None
        try:
            for i in [self.get_user_from_cookie, self.get_user_from_jwt]:
                user =  await i(request)
                if user:
                    request.state.user = user
                    break
            # Attach the user to the request state
        except Exception:
            request.state.user = None

        return await call_next(request)
    
    async def get_user_from_jwt(self, request: Request) -> User | None:
        try:
            auth_token = request.headers.get("Authorization")
            if not auth_token or not auth_token.startswith("Bearer "):
                return None
            token = auth_token.split(" ")[1].strip()
            payload = verify_token(token)
            return await self.get_user(payload, request)
        except Exception:
            return None
    
    async def get_user_from_cookie(self, request: Request) -> User | None:
        try:
            auth_token = request.cookies.get("access_token")
            payload = verify_token(auth_token)
            return await self.get_user(payload, request)
        except Exception as e:
            print(e)
            return None

    
    async def get_user(self, payload, request: Request) -> User | None:
        try:
            mongodb = request.app.mongodb
            if not payload or "sub" not in payload:
                return None
            user_data = await mongodb["users"].find_one({"email": payload["sub"]})
            if user_data:
                user = User(**user_data)
                user.password = None
                return user
            return None
        except Exception:
            return None