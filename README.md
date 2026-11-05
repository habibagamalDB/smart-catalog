# Smart Digital Catalog & Order Management System

A bilingual (Arabic/English) digital catalog and order management platform for bakeries in Egypt. Customers browse a mobile-first catalog and place orders directly; merchants confirm and track orders from a live dashboard and get Telegram alerts.

The MVP serves one demo bakery on a multi-tenant architecture, so additional bakeries can be onboarded later without a rewrite.

## Stack

- Next.js 16 (App Router, Cache Components) + React 19 + TypeScript
- Tailwind CSS 4 + shadcn/ui (Radix, RTL enabled)
- next-intl (Arabic default, `/ar` and `/en` routes)
- Supabase: Postgres, Auth, Storage, Realtime, Edge Functions
- Vercel hosting, Telegram Bot API for notifications

## Getting started

See [docs/development.md](docs/development.md) for full setup, including Windows notes.

```bash
npm install
cp .env.example .env.local   # fill in Supabase keys
npm run dev                  # http://localhost:3000
```

## Scripts

- `npm run dev` / `build` / `start`: Next.js
- `npm run lint`, `npm run typecheck`, `npm test`, `npm run format`
- `npm run db:start` / `db:stop` / `db:reset` / `db:lint` / `db:test` / `db:types`: Supabase CLI (requires Docker)

## Documentation

- [Development guide](docs/development.md)
- [Architecture decision records](docs/adr/)
- [Demo bakery content checklist](docs/demo-bakery-content-checklist.md)
