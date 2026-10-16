from typing import Annotated, Any, Literal
from pathlib import Path
from pydantic import (
    AnyUrl,
    BeforeValidator,
    HttpUrl,
    computed_field,
    model_validator,
    MongoDsn,
)
from pydantic_settings import BaseSettings, SettingsConfigDict


def parse_cors(v: Any) -> list[str] | str:
    if isinstance(v, str) and not v.startswith("["):
        return [i.strip() for i in v.split(",")]
    elif isinstance(v, list | str):
        return v
    raise ValueError(v)

ENV_FILE = Path(__file__).parent.parent / ".env"

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        # Use .env file from server directory
        env_file=ENV_FILE,
        env_ignore_empty=True,
        extra="ignore",
    )
    # API_V1_STR: str = "/api/v1"  # Kept for future use, not applied to routes yet
    SECRET_KEY: str = ""
    MONGODB_URI: MongoDsn = "mongodb://localhost:27017"
    MONGODB_DB_NAME: str = "form_builder_studio"
    ACCESS_TOKEN_EXPIRE_DAYS: int = 8
    FRONTEND_HOST: str = "http://127.0.0.1:3000"
    ENVIRONMENT: Literal["local", "production"] = "production"

    BACKEND_CORS_ORIGINS: Annotated[list[AnyUrl] | str, BeforeValidator(parse_cors)] = (
       []
    )

    @computed_field  # type: ignore[prop-decorator]
    @property
    def all_cors_origins(self) -> list[str]:
        return [str(origin).rstrip("/") for origin in self.BACKEND_CORS_ORIGINS] + [
            self.FRONTEND_HOST.rstrip("/")]

    PROJECT_NAME: str = "Form Builder Studio"


settings = Settings()  # type: ignore
