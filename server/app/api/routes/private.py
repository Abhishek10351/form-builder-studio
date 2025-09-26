from fastapi import Request, status
from fastapi.routing import APIRouter
from models import User

router = APIRouter(tags=["private"])


# create a superuser
@router.post("/create-superuser", response_model=User, status_code=status.HTTP_201_CREATED)
async def create_superuser(req: Request):
    mongo = req.app.mongodb
    user_data = await req.json()
    user = User(**user_data)
    user.is_superuser = True
    await mongo.users.insert_one(user.model_dump())
    return user

# list all users
@router.get("/", response_model=list[User], status_code=status.HTTP_200_OK)
async def get_all_users(req: Request):
    collection = req.app.mongodb["users"]
    users = await collection.find().to_list(100)
    return users
