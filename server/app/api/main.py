from fastapi import APIRouter
from api.routes import home, utils, users, authentication, private
from core.config import settings

api_router = APIRouter()

api_router.include_router(home.router)
api_router.include_router(utils.router)
api_router.include_router(users.router)
api_router.include_router(authentication.router)

if settings.ENVIRONMENT == "local":
    api_router.include_router(private.router)