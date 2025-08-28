from fastapi import APIRouter
from api.routes import home, utils, users, authentication


api_router = APIRouter()

api_router.include_router(home.router)
api_router.include_router(utils.router)
api_router.include_router(users.router)
api_router.include_router(authentication.router)
