from fastapi import APIRouter, Request, Response
from models import User

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/create", response_model=User)
async def create_user(req: Request, user: User):
    try:
        collection = req.app.mongodb["users"]
        print("Creating user:", user)
        result = await collection.insert_one(user.model_dump())
        inserted_user = await collection.find_one({"_id": result.inserted_id})
        print("Created user:", inserted_user)
        return User(**inserted_user)
    except Exception as e:
        print("Error creating user:", e)
        return Response(status_code=500)


@router.get("/{user_id}", response_model=User)
async def get_user(req: Request, user_id: str):
    collection = req.app.mongodb["users"]
    user = await collection.find_one({"_id": user_id})
    if user:
        return User(**user)
    return Response(status_code=404)


@router.get("/", response_model=list[User])
async def get_all_users(req: Request):
    collection = req.app.mongodb["users"]
    users = await collection.find().to_list(100)
    return users
