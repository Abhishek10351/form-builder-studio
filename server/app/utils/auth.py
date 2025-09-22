from functools import wraps
from fastapi import Request, HTTPException, status


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
