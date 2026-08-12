# Page Structure — Skilltreq Landing

> Moved from `CLAUDE.md`. Linked from `AGENTS.md`.

## Landing Page Structure

### Hero section

- Headline: what Skilltreq is (one sentence)
- Subtitle: who it's for + key value prop
- Primary CTA: "Try free" → `https://www.skilltreq.app/login`
- Visual: screenshot or animated demo of the skill graph (dark mode preferred)

### Features section

- 3–5 key features with icon + title + short description
- Suggested: Skill Tree, Training Plans, Workout Logging, Progress Tracking, Coach System
- Each feature can have a screenshot/mockup

### Social proof (when available)

- Real user quotes only — no fabricated testimonials
- GitHub stars count (if open-source) or user count (only if verified)

### Footer

- Links: Privacy, Terms, Ko-fi (support link) — **bez Pricing pri Beta**
- Language switcher (EN / SK / CS)
- "Built for athletes who track, not grind."
- Jedna veta: "Skilltreq is free during Beta. Paid plans coming later."

---

## Pricing Page Structure

> ⚠️ **Post-Beta only** — `/pricing` sa neimplementuje pri Beta launchi. Pridáva sa s Phase 16 (Monetizácia) až po validácii že používatelia chcú platiť.

Three tiers based on decided monetization model (pre Phase 16 implementation reference):

|                   | Free     | Pro (~4–5 €/mo) | Coach (~12–15 €/mo) |
| ----------------- | -------- | --------------- | ------------------- |
| Libraries         | All      | All             | All                 |
| Training plans    | 1 active | Unlimited       | Unlimited           |
| Templates         | 3 saved  | Unlimited       | Unlimited           |
| Radar chart       | ✓        | ✓               | ✓                   |
| Heatmap           | ✓        | ✓               | ✓                   |
| PR trends         | —        | ✓               | ✓                   |
| Journey timeline  | —        | ✓               | ✓                   |
| Data export       | —        | ✓               | ✓                   |
| Client management | —        | —               | Unlimited           |
| Coach dashboard   | —        | —               | ✓                   |

- CTA per tier → app login/signup
- "Free forever" messaging for free tier — no trial, no credit card
- Final prices TBD — use placeholders until confirmed
- `PricingTable.astro` komponent sa nevytvára pred Phase 16
