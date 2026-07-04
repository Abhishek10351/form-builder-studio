from models.forms import Submission, SubmissionField, Form
from typing import List
from json import loads
from pathlib import Path

template_path = Path(__file__).parent.parent / "data" / "form_templates.json"

with open(template_path, "r") as f:
    form_template = loads(f.read())

slugs = [
    "customer-feedback",
    "event-registration",
    "customer-survey",
    "contact-form",
    "job-application",
    "order-form",
]


def get_template_form(slug: str) -> Form:
    if slug not in slugs:
        raise ValueError(f"Form '{slug}' not found in template")

    return form_template[slug]


def check_submission_data(form: Form, data: List[SubmissionField]) -> bool:

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
