# 0008. Payments and totals in the MVP

Status: Accepted (2026-11-05)

## Context

Small Egyptian bakeries mostly take cash on pickup or delivery, and integrating online payments adds cost, compliance work, and reconciliation. Delivery pricing varies by area, but zone pricing is extra complexity before demand is proven.

## Decision

- No online payments in the MVP. Customers pay cash on pickup or delivery.
- Each store sets an optional flat delivery fee. Order total = server-computed subtotal (including active sale prices and option deltas) + delivery fee.
- The customer sees the total as an estimate until the bakery confirms the order.
- Order items snapshot names, unit price, and regular price at purchase time.

## Consequences

- Analytics report "estimated order value" and "completed order value", not revenue; reports must state this limitation.
- Delivery zones, price adjustments after confirmation, and online payments (Paymob, Fawry) are later phases.
