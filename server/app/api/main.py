from fastapi import APIRouter
from api.routes import home, utils


api_router = APIRouter()

api_router.include_router(home.router)
api_router.include_router(utils.router)
