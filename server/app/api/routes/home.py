from fastapi import APIRouter, Response

router = APIRouter()


@router.get("/")
async def home():
    return Response("Hello World")
