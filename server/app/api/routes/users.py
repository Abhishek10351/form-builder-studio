import json

from core.security import get_password_hash
from fastapi import APIRouter, Request, Response, status
from models import User, UserCreate, UserPublic
from pymongo.errors import DuplicateKeyError
from utils import login_required

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/create", response_model=UserPublic, status_code=status.HTTP_201_CREATED)
async def create_user(req: Request, user: UserCreate):
    try:
        collection = req.app.mongodb["users"]
        user.password = get_password_hash(user.password)
        user_dict = user.model_dump(by_alias=True)
        result = await collection.insert_one(user_dict)
        user = UserPublic(**user_dict, id=str(result.inserted_id))
        return Response(
            status_code=201,
            content=user.model_dump_json(),
            media_type="application/json",
        )
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
    return Response(
        status_code=200,
        content=user.model_dump_json(),
        media_type="application/json",
    )
