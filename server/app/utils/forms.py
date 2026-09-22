from models.forms import Form
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
