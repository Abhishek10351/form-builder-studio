from fastapi import Request
from fastapi.routing import APIRouter
from models import User
router = APIRouter(tags=["private"])


# create a superuser
@router.post("/create-superuser", response_model=User)
async def create_superuser(req: Request):
    mongo = req.app.mongodb
    user_data = await req.json()
    user = User(**user_data)
    user.is_superuser = True
    await mongo.users.insert_one(user.model_dump())
    return user
