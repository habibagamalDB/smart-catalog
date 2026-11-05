# Development Guide

## Prerequisites

- Node.js 24 (see `.nvmrc`; minimum 22.12)
- Git
- Docker Desktop, required for the local Supabase stack (`npm run db:start`)

The Supabase CLI is installed as a dev dependency; no global install is needed.

## Windows note: the project path

The project folder name contains `&`, which breaks npm's generated `.cmd` shims on Windows (`npx eslint`, `npx supabase`, and similar fail with "Cannot find module D:\bk\...").

All npm scripts therefore call each tool's JavaScript entry point through `node` (for example `node node_modules/next/dist/bin/next dev`). Use `npm run <script>` rather than `npx <tool>`. For ad-hoc Supabase commands use `npm run supabase -- <args>`, for example `npm run supabase -- status`.

Renaming the folder to something without `&` (for example `smart-catalog`) removes the issue entirely.

## First-time setup

1. `npm install`
2. Copy `.env.example` to `.env.local`.
3. Start local Supabase: `npm run db:start`. It prints the API URL, the publishable key (`sb_publishable_...`), and the secret key (`sb_secret_...`). Put them in `.env.local`.
4. `npm run dev` and open http://localhost:3000. You are redirected to `/ar` or `/en` based on your browser language.

## Environments

- **Local**: Supabase via Docker (`supabase/config.toml`), Next.js dev server.
- **Staging**: a separate Supabase cloud project plus a Vercel preview deployment.
- **Production**: its own Supabase project (Pro plan before real customer traffic) plus Vercel production.

Database changes are made only through migrations in `supabase/migrations`, applied with the CLI (`npm run supabase -- db push` against a linked project). Never edit staging or production schemas by hand in the dashboard.

### Creating the staging project (one-time, manual)

1. Create a Supabase project in the closest region to Egypt (for example Frankfurt `eu-central-1`).
2. In Auth settings, disable public signups, set the minimum password length to 10, and enable TOTP MFA.
3. Link it locally: `npm run supabase -- link --project-ref <ref>`.
4. Create a Vercel project from the Git repository and set `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, and `SUPABASE_SECRET_KEY` for the Preview environment.

## Secrets

- Only variables prefixed with `NEXT_PUBLIC_` reach the browser. Never give a secret that prefix.
- `SUPABASE_SECRET_KEY` bypasses Row Level Security. It is read only in `src/lib/server-env.ts` and used only by `src/lib/supabase/admin.ts`, both guarded by `server-only`.
- The Telegram bot token (Phase 5) lives only in Supabase Edge Function secrets.

## Project layout

```
messages/                 Arabic and English UI strings
src/app/[locale]/         Localized routes (root layout lives here)
src/app/global-not-found  Bilingual 404 for unmatched URLs
src/components/ui/        shadcn primitives
src/features/             Feature modules (added from Phase 2)
src/i18n/                 Routing, request config, navigation helpers
src/lib/supabase/         Browser, server (RLS), and admin clients
src/proxy.ts              Locale negotiation (session refresh added in Phase 4)
supabase/                 CLI config, migrations, tests, seed, Edge Functions
docs/adr/                 Architecture decision records
```

## Conventions

- Use Tailwind logical utilities (`ms-*`, `pe-*`, `start-*`, `text-start`) instead of `ml-*`, `pr-*`, `left-*`, `text-left`, so layouts mirror correctly in RTL.
- Every user-facing string goes in both `messages/ar.json` and `messages/en.json`; a unit test enforces matching keys.
- Touch targets are at least 44px tall on mobile.
- Money is stored as `numeric(12,2)` and handled as integer piasters in TypeScript.
