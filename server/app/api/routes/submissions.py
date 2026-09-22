from fastapi import (
    APIRouter,
    Request,
    Response,
    status,
)
from typing import Annotated
from models import (
    Form,
    FormField,
    User,
    SubmissionIn,
    Submission,
    SubmissionOut,
    SubmissionList,
)
import json
import datetime
import nanoid
from utils import login_required, generate_random_id, validate_answers
from fastapi import HTTPException

router = APIRouter(prefix="/submit", tags=["submissions"])


@router.post("/{form_id}/", status_code=201)
async def submit_form(req: Request, form_id: str, submission_data: SubmissionIn):

    mongo = req.app.mongodb
    forms = mongo["forms"]
    submissions = mongo["submissions"]
    form = Form.model_validate(
        await forms.find_one({"_id": form_id, "published": True})
    )

    if not form:
        return Response(
            content=json.dumps({"message": "Form not found or not published"}),
            status_code=404,
            media_type="application/json",
        )

    try:
        clean = validate_answers(form, submission_data.answers)
        submission = Submission(form_id=form_id, answers=submission_data.answers)
        submission_dict = submission.model_dump(by_alias=True)

        result = await submissions.insert_one(submission_dict)
        return Response(
            content=Submission.model_validate(submission_dict).model_dump_json(),
            status_code=200,
            media_type="application/json",
        )
    except HTTPException as h:
        print(h)
        return Response(content=json.dumps(h.detail), status_code=400)
    except Exception as e:
        print(e)
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
        answers = submissions.find({"form_id": form_id}, {"answers": 1})
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
