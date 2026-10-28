# Form Builder Studio

Form Builder Studio is a full-stack form creation platform. Users can build
forms, publish them, share them with respondents, and review submitted answers.

## Features

- **Visual form builder** — create and edit forms without writing code.
- **Flexible fields** — text, date, time, dropdown, radio, checkbox, and
  toggle fields with required-field support.
- **Templates** — start from a ready-made form and customize it.
- **Preview and publish** — review a form before publishing or unpublishing it.
- **Public submissions** — respondents can complete published forms without
  accessing the form owner's account.
- **Submission review** — authenticated owners can retrieve responses for their
  forms.
- **Authentication** — JWT-based login and protected owner operations.
- **Responsive UI** — a Next.js interface styled with Tailwind CSS and Radix
  UI components.

## How it works

1. Sign in and create a form or choose a template.
2. Add fields and configure labels, options, and required status.
3. Preview the form and publish it.
4. Share the form URL with respondents.
5. Review the submitted answers from the application.

## Stack

| Area | Technology |
| --- | --- |
| Frontend | Next.js 16, React 19, TypeScript |
| UI | Tailwind CSS, Radix UI |
| State and requests | Redux Toolkit, Axios |
| Backend | FastAPI, Python 3.12+ |
| Data | MongoDB |
| Authentication | JWT |

## Run locally

### Requirements

- Node.js 20.9+
- Python 3.12+
- MongoDB 4.4+ or MongoDB Atlas
- [`uv`](https://docs.astral.sh/uv/)

Clone the repository:

```bash
git clone https://github.com/Abhishek10351/form-builder-studio.git
cd form-builder-studio
```

Start the API in one terminal:

```bash
cd server
cp .env.example .env
uv sync
uv run fastapi dev app/main.py
```

Start the web app in another terminal:

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Open the application at <http://localhost:3000>. API documentation is
available at <http://localhost:8000/docs>.

## Documentation

- [Client](./client/README.md) · [Client setup](./client/INSTALL.md)
- [Server](./server/README.md) · [Server setup](./server/INSTALL.md)

## License

[MIT](./LICENSE)
