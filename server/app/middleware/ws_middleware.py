from fastapi import status, WebSocket
from core.security import verify_token
from functools import wraps
from models import User
from starlette.types import Scope, Receive, Send, ASGIApp


class WebSocketAuthMiddleware:
    def __init__(self, app: ASGIApp):
        self.app = app

    async def __call__(self, scope: Scope, receive: Receive, send: Send):
        if scope["type"] == "websocket":
            websocket = WebSocket(scope, receive=receive, send=send)
            try:
                user = await self.get_user_from_jwt(websocket)
                scope["user"] = user
            except Exception as e:
                scope["user"] = None

        await self.app(scope, receive, send)

    async def get_user_from_jwt(self, websocket: WebSocket) -> User | None:
        token = websocket.cookies.get("authToken")
        if not token:
            return None
        payload = verify_token(token)
        return await self.get_user(payload, websocket)

    async def get_user(self, payload, websocket: WebSocket) -> User | None:
        mongodb = websocket.app.mongodb
        user_data = await mongodb["users"].find_one({"email": payload["sub"]})
        if user_data:
            user = User(**user_data)
            user.password = None
            return user
        return None
