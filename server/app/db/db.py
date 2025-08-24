from pymongo import AsyncMongoClient
from fastapi import FastAPI


async def connect(app: FastAPI) -> None:
    client = AsyncMongoClient("mongodb://127.0.0.1:27017")
    app.mongo_client = client
    app.mongodb = client.get_database("form_builder")
    print("Database connected")


async def disconnect(app: FastAPI) -> None:
    await app.mongo_client.disconnect()
    print("Database disconnected")
