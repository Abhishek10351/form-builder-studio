from datetime import date, time

from fastapi import HTTPException

from models.forms import Form, FieldType
from models.submissions import Answer


def validate_answers(form: Form, answers: list[Answer]) -> list[Answer]:
    fields = {field.id: field for field in form.fields}
    answers_by_id = {answer.field_id: answer.value for answer in answers}
    errors: dict[str, str] = {}
    clean: list[Answer] = []

    for answer_id in answers_by_id.keys():
        if answer_id not in fields:
            errors[answer_id] = "Unknown field"

    for field in form.fields:
        value = answers_by_id.get(field.id)

        if field.required and (value is None or value in ["", []]):
            errors[field.id] = "Required"
            continue

        match field.field_type:
            case FieldType.TEXT:
                valid = isinstance(value, str)

            case FieldType.TOGGLE:
                valid = isinstance(value, bool)

            case FieldType.DATE:
                valid = isinstance(value, str)
                if valid:
                    try:
                        value = date.fromisoformat(value).isoformat()
                    except ValueError:
                        valid = False

            case FieldType.TIME:
                valid = isinstance(value, str)
                if valid:
                    try:
                        value = time.fromisoformat(value).isoformat()
                    except ValueError:
                        valid = False

            case FieldType.DROPDOWN | FieldType.RADIO:
                valid = isinstance(value, str) and value in field.options

            case FieldType.CHECKBOXES:
                valid = isinstance(value, list) and all(
                    isinstance(item, str) and item in field.options for item in value
                )

            case _:
                valid = False

        if not valid:
            errors[field.id] = "Invalid value"
            continue

        clean.append(Answer(field_id=field.id, value=value))

    if errors:
        raise HTTPException(status_code=422, detail=errors)

    return clean
