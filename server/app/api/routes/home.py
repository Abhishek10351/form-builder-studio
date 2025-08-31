from fastapi import APIRouter,Request, Response

router = APIRouter()


@router.get("/")
async def home(req: Request):
    user = req.state.user
    if user:
        return Response(f"Hello {user['name']}")
    return Response("Hello World")
