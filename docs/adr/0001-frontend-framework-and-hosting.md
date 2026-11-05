# 0001. Frontend framework and hosting

Status: Accepted (2026-11-05)

## Context

Public bakery catalogs must load fast on mid-range Android phones over 4G and be indexable by search engines. The merchant dashboard is interactive and authenticated. We want one codebase, low cost, and minimal operations.

## Decision

- Next.js 16 App Router with Cache Components and Partial Prefetching, React 19, TypeScript.
- Tailwind CSS 4 with shadcn/ui on Radix primitives (RTL enabled).
- Host on Vercel: Hobby during development, Pro (about $20/month) before commercial use, because Hobby does not permit commercial projects.

Public catalog pages are server-rendered and cached with tags, so merchant edits can invalidate them (`revalidateTag`). The dashboard is client-heavy within the same app.

## Consequences

- SEO and fast first paint for catalogs without a separate site.
- Cache Components requires the Node.js runtime; no `runtime = 'edge'` route segments.
- `next/root-params` is used for the locale; it is unavailable in Route Handlers and Server Actions, which must pass the locale explicitly.
- A Vite SPA was rejected for weaker SEO; Next.js on Cloudflare was deferred as an option if Vercel costs grow.
