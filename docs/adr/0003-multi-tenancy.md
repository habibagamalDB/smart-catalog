# 0003. Multi-tenancy model

Status: Accepted (2026-11-05)

## Context

The MVP serves one demo bakery, but the business model is to sell the platform to many bakeries, each with its own catalog, branding, orders, dashboard users, and Telegram destination.

## Decision

- Shared database, shared schema. Every tenant-owned row carries `store_id`.
- Child tables reference parents through composite foreign keys `(store_id, parent_id)`, so a row can never point at another store's data.
- Access is enforced by Row Level Security using `SECURITY DEFINER` helpers (`is_store_member`, `has_store_role`, `is_platform_admin`).
- Store users are linked through `store_members` with roles `owner` and `staff`. A `platform_admins` table supports the paid maintenance service.
- Catalog URLs are path-based (`/{locale}/{storeSlug}`) for the MVP; subdomains and custom domains come later.
- Billing stays outside the system for now; `stores.plan` and `stores.status` allow manual feature gating and suspension.

## Consequences

- Infrastructure costs are shared across all bakeries.
- Every query and index starts with `store_id`.
- A tenant cannot be isolated physically (for example a separate database) without migration work; acceptable at this scale.
