from fastapi import FastAPI
from contextlib import asynccontextmanager
from db import db
from api.main import api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    await db.connect(app=app)
    yield


app = FastAPI(lifespan=lifespan)


app.include_router(api_router)
