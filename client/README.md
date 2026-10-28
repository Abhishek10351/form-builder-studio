# Client

The client is the Next.js frontend for building, publishing, and submitting
forms.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS · Redux Toolkit · Axios ·
Radix UI

## Scripts

Run from `client/`:

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
```

## Configuration

Copy [`client/.env.example`](./.env.example) to `.env` and set
`NEXT_PUBLIC_API_URL` if the API is not running at
`http://localhost:8000`. The client only needs this one environment variable.

For installation and troubleshooting, see [INSTALL.md](./INSTALL.md).

[Back to project overview](../README.md)
