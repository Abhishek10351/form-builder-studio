from pymongo import AsyncMongoClient, ASCENDING
from fastapi import FastAPI
from core.config import settings


async def connect(app: FastAPI) -> None:
    client = AsyncMongoClient(str(settings.MONGODB_URI))
    mongodb = client.get_database(settings.MONGODB_DB_NAME)
    app.mongo_client = client
    app.mongodb = mongodb
    await mongodb["users"].create_index([("email", ASCENDING)], unique=True)
    print(f"Database connected to {settings.MONGODB_DB_NAME}")


async def disconnect(app: FastAPI) -> None:
    await app.mongo_client.close()
    print("Database disconnected")
