# Client setup

## Requirements

- Node.js 20.9+
- npm
- A running API server

## Install

```bash
cd client
npm install
cp .env.example .env
```

Edit `.env` if needed:

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | API base URL |

Do not commit `.env`. Authentication cookies use a fixed internal key and do
not require another environment variable.

## Run

```bash
npm run dev
```

Open <http://localhost:3000>.

For a production build:

```bash
npm run build
npm run start
```

## Troubleshooting

- Confirm the API is running and `NEXT_PUBLIC_API_URL` is correct.
- Restart the dev server after changing `.env`.
- Use `npm run build` and `npm run lint` to check client issues.
- If port 3000 is busy, run `npm run dev -- --port 3001`.

[Client overview](./README.md) · [Project overview](../README.md)
