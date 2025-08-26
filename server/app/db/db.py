from pymongo import AsyncMongoClient, ASCENDING
from fastapi import FastAPI


async def connect(app: FastAPI) -> None:
    client = AsyncMongoClient("mongodb://127.0.0.1:27017")
    mongodb = client.get_database("form_builder")
    app.mongo_client = client
    app.mongodb = mongodb
    await mongodb["users"].create_index([("email", ASCENDING)], unique=True)
    print("Database connected")


async def disconnect(app: FastAPI) -> None:
    await app.mongo_client.disconnect()
    print("Database disconnected")
