# 0002. Supabase as the backend platform

Status: Accepted (2026-11-05)

## Context

We need Postgres, merchant authentication, image storage, realtime updates, and a place to run secret-holding integrations, at low cost and with little operational work.

## Decision

- Supabase Postgres is the source of truth. Business-critical logic (order placement, status transitions, analytics) lives in Postgres functions so it runs in a single transaction next to the data.
- Supabase Auth for merchants only; customers order as guests. Public signup is disabled; merchants are invited.
- Supabase Storage for product and branding images.
- Supabase Realtime for live catalog and order updates (see ADR 0005).
- Supabase Edge Functions only for the Telegram integration (see ADR 0006).
- Internal tables live in a `private` schema that the Data API does not expose. New tables are not auto-exposed (`auto_expose_new_tables = false`); every grant is explicit.

## Consequences

- Row Level Security is mandatory on every exposed table and is tested with pgTAP.
- The Free plan pauses inactive projects and has no backups, so production moves to Pro (about $25/month) before real customers.
- Local development needs Docker for `supabase start`.
