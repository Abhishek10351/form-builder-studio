# Server setup

## Requirements

- Python 3.12+
- MongoDB 4.4+ or MongoDB Atlas
- [`uv`](https://docs.astral.sh/uv/)

## Install and configure

```bash
cd server
uv sync
cp .env.example .env
```

Set the values in `.env`:

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string |
| `MONGODB_DB_NAME` | Database name |
| `SECRET_KEY` | Long, random JWT secret |
| `ACCESS_TOKEN_EXPIRE_DAYS` | Access-token lifetime in days |
| `PROJECT_NAME` | API title shown in generated documentation |
| `ENVIRONMENT` | Runtime environment |
| `FRONTEND_HOST` | Frontend URL |
| `BACKEND_CORS_ORIGINS` | Comma-separated allowed frontend origins |

Replace the example `SECRET_KEY` before using the server outside local
development. Do not commit `.env`.

## Run

Development:

```bash
uv run fastapi dev app/main.py
```

Production-style local run:

```bash
uv run fastapi run app/main.py
```

The API runs at <http://localhost:8000>.

## Check the project

```bash
uv run pytest
uv run ruff check
uv run ruff format
```

If the API cannot connect, check that MongoDB is running and that
`MONGODB_URI` is correct.

[Server overview](./README.md) · [Project overview](../README.md)
