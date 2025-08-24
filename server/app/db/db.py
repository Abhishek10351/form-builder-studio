from pymongo import AsyncMongoClient
from fastapi import FastAPI

client = AsyncMongoClient()


async def connect(app: FastAPI) -> None:
    client = AsyncMongoClient("mongodb://127.0.0.1:27017")
    app.db = client
    print("Database connected")

async def disconnect(app:FastAPI) -> None:
    await app.db.disconnect()