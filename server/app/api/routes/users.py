from fastapi import APIRouter, Request, Response, status
from models import UserCreate, User
from pymongo.errors import DuplicateKeyError
from core.security import get_password_hash
from utils import login_required
import json

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/create", response_model=User, status_code=status.HTTP_201_CREATED)
async def create_user(req: Request, user: UserCreate):
    try:
        collection = req.app.mongodb["users"]
        user.password = get_password_hash(user.password)
        user_dict = user.model_dump(by_alias=True, exclude={"id"})
        result = await collection.insert_one(user_dict)
        user = User(**user_dict, id=str(result.inserted_id))
        return user
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
    user_dict = user.model_dump()
    user_dict.pop("password")
    return Response(
        status_code=200,
        content=json.dumps(user_dict),
        media_type="application/json",
    )
