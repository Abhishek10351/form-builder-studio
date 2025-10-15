from fastapi import APIRouter, Request, Response, status
from models import User
from pymongo.errors import DuplicateKeyError
from core.security import get_password_hash
from utils.auth import login_required
import json

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/create", response_model=User, status_code=status.HTTP_201_CREATED)
async def create_user(req: Request, user: User):
    try:
        collection = req.app.mongodb["users"]
        user.password = get_password_hash(user.password)
        user.is_superuser = False
        result = await collection.insert_one(user.model_dump())
        inserted_user = await collection.find_one({"_id": result.inserted_id})
        return User(**inserted_user)
    except DuplicateKeyError:
        return Response(
            status_code=400,
            content=json.dumps({"message": "User with this email already exists"}),
            media_type="application/json",
        )
    except Exception:
        return Response(
            status_code=500,
            content=json.dumps({"message": "Internal server error"}),
            media_type="application/json",
        )


@router.get("/me", status_code=status.HTTP_200_OK)
@login_required
async def get_me(req: Request):
    user = req.state.user
    # Convert to dict and remove password if it exists
    user_dict = user.model_dump() if hasattr(user, "model_dump") else user
    user_dict = user.model_dump()
    if isinstance(user_dict, dict) and "password" in user_dict:
        user_dict.pop("password")
    return user_dict
