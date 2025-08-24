from fastapi import APIRouter, Response
import time

router = APIRouter()
from fastapi.requests import Request


@router.get("/ping", response_class=Response)
async def ping(r: Request):
    data = {"name": "Abhishek"}
    k = r.app.db
    start_time = time.monotonic()
    collection = k["form_builder"]
    await collection["test"].insert_one(data)
    end_time = time.monotonic()
    duration = (end_time - start_time) * 1000
    return Response(f"Mongo ping: {duration:.2f} milliseconds")
