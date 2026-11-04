import datetime
import json
from typing import Annotated

import nanoid
from fastapi import APIRouter, HTTPException, Request, Response, status
from models import (
    Form,
    FormField,
    Submission,
    SubmissionIn,
    SubmissionList,
    SubmissionOut,
    User,
)
from utils import generate_random_id, login_required, validate_answers

router = APIRouter(prefix="/submit", tags=["submissions"])


@router.post("/{form_id}/", status_code=201)
async def submit_form(req: Request, form_id: str, submission_data: SubmissionIn):

    mongo = req.app.mongodb
    user: User | None = req.state.user
    forms = mongo["forms"]
    submissions = mongo["submissions"]
    if user:
        form = await forms.find_one(
            {"_id": form_id, "$or": [{"published": True}, {"owner_id": user.email}]}
        )
    else:
        form = await forms.find_one({"_id": form_id, "published": True})

    if not form:
        return Response(
            content=json.dumps({"message": "Form not found or not published"}),
            status_code=404,
            media_type="application/json",
        )

    try:
        clean = validate_answers(Form.model_validate(form), submission_data.answers)

        submission = Submission(form_id=form_id, answers=clean)
        submission_dict = submission.model_dump(by_alias=True)

        result = await submissions.insert_one(submission_dict)
        return Response(
            content=submission.model_dump_json(),
            status_code=200,
            media_type="application/json",
        )
    except HTTPException as h:
        raise h
    except Exception as e:
        return Response(
            content=json.dumps(e),
            status_code=500,
        )


@router.get("/{form_id}/", status_code=200)
@login_required
async def show_submissions(req: Request, form_id: str):
    try:
        mongo = req.app.mongodb
        user: User | None = req.state.user
        forms = mongo["forms"]
        submissions = mongo["submissions"]

        form = await forms.find_one({"_id": form_id, "owner_id": user.email})
        answers = submissions.find({"form_id": form_id}, {"form_id": 1, "answers": 1})
        final_answers = [SubmissionOut.model_validate(i) async for i in answers]
        submission_list = SubmissionList(form_id=form_id, items=final_answers)

        if not form:
            return Response(
                content=json.dumps({"message": "Form not found"}),
                status_code=200,
                media_type="application/json",
            )
        return Response(
            content=submission_list.model_dump_json(),
            status_code=200,
            media_type="application/json",
        )
    except Exception as e:
        return Response(
            content=json.dumps({"message": "Server error"}),
            status_code=400,
            media_type="application/json",
        )


@router.delete("/{form_id}/", status_code=status.HTTP_204_NO_CONTENT)
@login_required
async def delete_submissions(req: Request, form_id: str):
    try:
        mongo = req.app.mongodb
        user: User | None = req.state.user
        forms = mongo["forms"]
        submissions = mongo["submissions"]

        form = await forms.find_one({"_id": form_id, "owner_id": user.email})
        if not form:
            return Response(
                content=json.dumps({"message": "Form not found"}),
                status_code=status.HTTP_404_NOT_FOUND,
                media_type="application/json",
            )
        await submissions.delete_many({"form_id": form_id})
        return Response(
            content=json.dumps({"message": "Submissions deleted successfully"}),
            status_code=status.HTTP_204_NO_CONTENT,
            media_type="application/json",
        )
    except Exception as e:
        return Response(
            content=json.dumps({"message": "Server error"}),
            status_code=400,
            media_type="application/json",
        )


# delete a single submission


@router.delete("/{form_id}/{submission_id}/", status_code=200)
@login_required
async def delete_submission(req: Request, form_id: str, submission_id: str):
    try:
        mongo = req.app.mongodb
        user: User | None = req.state.user
        forms = mongo["forms"]
        submissions = mongo["submissions"]

        form = await forms.find_one({"_id": form_id, "owner_id": user.email})
        if not form:
            return Response(
                content=json.dumps({"message": "Form not found"}),
                status_code=200,
                media_type="application/json",
            )
        result = await submissions.delete_one(
            {"_id": submission_id, "form_id": form_id}
        )
        if result.deleted_count == 0:
            return Response(
                content=json.dumps({"message": "Submission not found"}),
                status_code=200,
                media_type="application/json",
            )
        return Response(
            content=json.dumps({"message": "Submission deleted successfully"}),
            status_code=200,
            media_type="application/json",
        )
    except Exception as e:
        return Response(
            content=json.dumps({"message": "Server error"}),
            status_code=400,
            media_type="application/json",
        )
