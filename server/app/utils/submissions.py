from datetime import date

from fastapi import HTTPException

from models.forms import Form, FieldType
from models.submissions import Answer


def validate_answers(form: Form, answers: list[Answer]) -> list[Answer]:
    fields = {f.id: f for f in form.fields}
    by_id = {a.field_id: a.value for a in answers}
    errors: dict[str, str] = {}

    for a in answers:
        if a.field_id not in fields:
            errors[a.field_id] = "unknown field"

    clean: list[Answer] = []
    for f in form.fields:
        v = by_id.get(f.id)

        # required / empty check — False is a valid boolean answer, not "empty"
        is_empty = v is None or v == "" or v == []
        if is_empty:
            if f.required:
                errors[f.id] = "required"
            continue

        if f.field_type == FieldType.BOOLEAN:
            ok = isinstance(v, bool)

        elif f.field_type == FieldType.CHECKBOX:
            ok = isinstance(v, list) and all(
                isinstance(x, str) and x in f.options for x in v
            )

        elif f.field_type == FieldType.TEXT:
            ok = isinstance(v, str) and len(v) <= 5000

        elif f.field_type == FieldType.DATE:
            try:
                v = date.fromisoformat(v).isoformat()
                ok = True
            except (TypeError, ValueError):
                ok = False

        else:  # dropdown, radio
            ok = isinstance(v, str) and v in f.options

        if not ok:
            errors[f.id] = "invalid value"
            continue

        clean.append(Answer(field_id=f.id, value=v))

    if errors:
        raise HTTPException(422, detail=errors)
    return clean
