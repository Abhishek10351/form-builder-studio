from functools import wraps
from fastapi import Request, HTTPException, status, WebSocket
from core.security import verify_token


def login_required(func):
    """
    Decorator to ensure a user is authenticated before
    executing the endpoint logic.
    """

    @wraps(func)
    async def wrapper(req: Request, *args, **kwargs):
        user = req.state.user
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authentication is required to access this resource.",
            )
        return await func(req, *args, **kwargs)

    return wrapper


def superuser_required(func):
    """
    Decorator to ensure a user is a superuser before
    executing the endpoint logic.
    """

    @wraps(func)
    async def wrapper(req: Request, *args, **kwargs):
        user = req.state.user
        if not user or not user.is_superuser:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Superuser access is required to access this resource.",
            )
        return await func(req, *args, **kwargs)

    return wrapper


def active_user_required(func):
    """
    Decorator to ensure a user is active before
    executing the endpoint logic.
    """

    @wraps(func)
    async def wrapper(req: Request, *args, **kwargs):
        user = req.state.user
        if not user or not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Active user access is required to access this resource.",
            )
        return await func(req, *args, **kwargs)

    return wrapper


def websocket_login_required(func):
    """
    Checks if the user is authenticated for WebSocket connections.
    """

    @wraps(func)
    async def wrapper(websocket: WebSocket, *args, **kwargs):
        user: User | None = websocket.scope.get("user")
        if not user:
            await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
            return
        return await func(websocket, *args, **kwargs)

    return wrapper


def has_update_permission(func):

    @wraps(func)
    async def wrapper(websocket: WebSocket, form_id: str, *args, **kwargs):
        user: User | None = websocket.scope.get("user")
        mongo = websocket.app.mongodb
        form = await mongo["forms"].find_one({"_id": form_id})
        if not form:
            await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
            return
        if not user or form.get("owner_id") != user.email:
            await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
            return

        return await func(websocket, form_id, *args, **kwargs)

    return wrapper
