# 0004. Order placement path

Status: Accepted (2026-11-05)

## Context

Guests submit orders without accounts. Orders must be validated, priced on the server, saved atomically, protected against double submission and spam, and never depend on notification delivery.

## Decision

- The browser posts to a Next.js Route Handler `POST /api/orders`. It validates the payload with Zod, verifies a Cloudflare Turnstile token, applies rate limits (per IP hash and per phone), and then calls the Postgres function `place_order` with the server-only secret key.
- `EXECUTE` on `place_order` is revoked from `anon` and `authenticated`, so clients cannot bypass the route's checks by calling the RPC directly.
- `place_order` runs in one transaction. It re-prices every line from the database, validates availability, options, lead time, business hours, and fulfillment type, then inserts the order, items, item options, the first status event, and the notification outbox row.
- Idempotency: the client sends a UUID generated when checkout opens. Same key and same request hash returns the existing order; same key with a different hash is a conflict.
- If the server total differs from the client's expected total, the order is not created; the response returns a fresh quote for the customer to confirm.
- The confirmation URL uses a random 32-byte token (only its hash is stored), not the human-readable reference.

## Consequences

- Prices cannot be tampered with from the client.
- Retries and double clicks never create duplicate orders.
- The secret key is used in exactly one narrow server path.
