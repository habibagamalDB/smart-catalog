# 0006. Telegram notifications via a transactional outbox

Status: Accepted (2026-11-05)

## Context

Merchants want an instant Telegram alert for each new order. Saving an order must never fail or slow down because Telegram is unavailable, retries must not spam the merchant, and the bot token must never reach the browser.

## Decision

- `place_order` inserts a row into `private.notification_outbox` in the same transaction as the order.
- An insert trigger calls the `telegram-dispatch` Edge Function through `pg_net`; `pg_cron` re-invokes it every minute for retries.
- The function claims rows with `FOR UPDATE SKIP LOCKED` and a lease (`locked_until`), sends the message, marks it sent with the Telegram message id, and logs every attempt in `private.notification_logs`.
- Backoff: 30s, 2m, 10m, 30m, 2h; at most 6 attempts, then `dead`. HTTP 429 honors `retry_after`; HTTP 403 revokes the destination.
- Destinations are linked only through a one-time deep-link code handled by the `telegram-webhook` Edge Function, which verifies Telegram's secret-token header. Chat ids are never typed in by hand.
- Messages include the order reference, the customer's first name, items, total, requested date, and a dashboard link, but no phone number or address.

## Consequences

- Delivery is at least once. Duplicates are possible only if the function crashes between Telegram accepting a message and the row being marked sent.
- The dashboard remains the primary channel; failures are visible there with a manual retry.
