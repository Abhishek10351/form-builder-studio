from fastapi import FastAPI
from contextlib import asynccontextmanager
from db import db
from api.main import api_router
import middleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    await db.connect(app=app)
    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(middleware.AuthMiddleware)

app.include_router(api_router)
