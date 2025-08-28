from fastapi import APIRouter, Request, Response, status
from models import User
from pymongo.errors import DuplicateKeyError

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/create", response_model=User, status_code=status.HTTP_201_CREATED)
async def create_user(req: Request, user: User):
    try:
        collection = req.app.mongodb["users"]
        result = await collection.insert_one(user.model_dump())
        inserted_user = await collection.find_one({"_id": result.inserted_id})
        return User(**inserted_user)
    except DuplicateKeyError:
        return Response(status_code=400, content="Email already exists")
    except Exception as e:
        return Response(status_code=500)


@router.get("/", response_model=list[User], status_code=status.HTTP_200_OK)
async def get_all_users(req: Request):
    collection = req.app.mongodb["users"]
    users = await collection.find().to_list(100)
    return users
