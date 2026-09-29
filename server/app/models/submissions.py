from pydantic import BaseModel, Field, model_validator
from utils import generate_random_id

AnswerValue = str | list[str] | bool | None


class Answer(BaseModel):
    field_id: str
    value: AnswerValue


class SubmissionIn(BaseModel):
    """What the client sends."""

    answers: list[Answer]

    @model_validator(mode="after")
    def no_duplicates(self):
        ids = [a.field_id for a in self.answers]
        if len(ids) != len(set(ids)):
            raise ValueError("duplicate field_id in answers")
        return self


class Submission(BaseModel):
    """What's stored in Mongo. answers stays a list."""

    id: str = Field(default_factory=generate_random_id, alias="_id")
    form_id: str
    answers: list[Answer]

    model_config = {"populate_by_name": True}


class SubmissionOut(BaseModel):
    """What's returned to the client."""

    id: str = Field(alias="_id")
    answers: list[Answer]

    @classmethod
    def from_doc(cls, s: Submission) -> "SubmissionOut":
        return cls(id=s.id, answers=s.answers)


class SubmissionList(BaseModel):
    form_id: str
    items: list[SubmissionOut]
