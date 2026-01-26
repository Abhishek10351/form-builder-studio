from models.forms import Submission, SubmissionField, Form
from typing import List


def check_submission_data(form: Form, data: List[SubmissionField]) -> bool:

    if len(form.fields) != len(data):
        return False
    for i, j in zip(form.fields, data):

        if i.id != j.field_id:
            return False
        if i.required:
            if j.value is None:
                return False
            if isinstance(j.value, str) and j.value.strip() == "":
                return False
            if isinstance(j.value, list) and len(j.value) == 0:
                return False

    return True
