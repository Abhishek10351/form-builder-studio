from fastapi import APIRouter, Response
import time
import uuid

router = APIRouter()
from fastapi.requests import Request


@router.get("/ping", response_class=Response)
async def ping(req: Request):
    data = {"name": "Abhishek", "_id": str(uuid.uuid4())}
    start_time = time.time()
    collection = req.app.mongodb
    await collection["test"].insert_one(data)
    end_time = time.time()
    duration = (end_time - start_time) * 1000
    return Response(f"Mongo ping: {duration:.2f} milliseconds")
