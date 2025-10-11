from fastapi import Request, Response, status, APIRouter
from models import User
from core.security import get_password_hash
import json


router = APIRouter(tags=["private"])


# create a superuser
@router.post(
    "/create-superuser", response_model=User, status_code=status.HTTP_201_CREATED
)
async def create_superuser(req: Request, user: User):
    try:
        collection = req.app.mongodb["users"]
        user.password = get_password_hash(user.password)
        user.is_superuser = True
        result = await collection.insert_one(user.model_dump())
        inserted_user = await collection.find_one({"_id": result.inserted_id})
        return User(**inserted_user)
    except:
        return Response(
            status_code=500,
            content=json.dumps({"message": "Internal server error"}),
            media_type="application/json",
        )


# list all users
@router.get("/users", response_model=list[User], status_code=status.HTTP_200_OK)
async def get_all_users(req: Request):
    collection = req.app.mongodb["users"]
    users = await collection.find().to_list(100)
    return users
