# 0005. Realtime with private Broadcast channels

Status: Accepted (2026-11-05)

## Context

Merchants must see new orders without refreshing. Customers should see price and availability changes while browsing. Realtime must not leak customer data, must survive reconnects, and must not let clients send spoofed events.

## Decision

- Use Supabase Realtime private Broadcast channels, fed by database triggers (`realtime.send`).
- Topics: `store:{storeId}:orders` for merchants and `catalog:{storeId}` for customers.
- Authorization through RLS on `realtime.messages`: store members may receive order events; anyone may receive catalog events for published stores. There is no insert policy, so clients cannot send.
- Payloads carry identifiers and versions only, never customer personal data. Clients fetch details through RLS-protected queries.
- Dashboard sync: subscribe first and buffer events, load the snapshot, merge by `id` keeping the highest `version`, refetch changes since a cursor after reconnects or when the tab becomes visible, and poll every 60 seconds while disconnected.
- The catalog connects only while the tab is visible, to save connection quota. Carts are reconciled against fresh prices, and the server re-prices at checkout regardless.

## Consequences

- Missed or duplicate events cannot corrupt dashboard state.
- Realtime connection limits (200 on Free, 500 on Pro) are the main scaling cost to watch.
