from fastapi import APIRouter, Request, Response
import time
import uuid

router = APIRouter(tags=["utils"])


@router.get("/ping", response_class=Response)
async def ping(req: Request):
    data = {"test_field": "test_data", "_id": str(uuid.uuid4())}
    start_time = time.time()
    collection = req.app.mongodb
    new_document = await collection["test"].insert_one(data)
    end_time = time.time()
    duration = (end_time - start_time) * 1000
    await collection["test"].delete_one({"_id": new_document.inserted_id})
    return Response(f"Mongo ping: {duration:.2f} milliseconds")
