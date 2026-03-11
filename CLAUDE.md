# CLAUDE.md — Skilltreq Landing Site

This file provides guidance to Claude Code when working with this repository.

---

## Project Overview

Static marketing, legal & pricing site for **Skilltreq** — a calisthenics & acrobatics skill tree training tracker. This is the public-facing website separate from the main application.

| Concern                  | URL                 |
| ------------------------ | ------------------- |
| Landing site (this repo) | `www.skilltreq.com` |
| Application              | `www.skilltreq.app` |

---

## Stack

| Layer     | Technology                                  |
| --------- | ------------------------------------------- |
| Framework | Astro                                       |
| Styling   | Tailwind CSS v4                             |
| Content   | Markdown (legal pages)                      |
| Hosting   | GitHub Pages                                |
| CI/CD     | GitHub Actions                              |
| i18n      | Astro i18n routing (`/en/`, `/sk/`, `/cs/`) |

---

## Commands

```bash
# Dev
npm run dev           # Start Astro dev server (localhost:4321)
npm run build         # Production build (static output)
npm run preview       # Preview production build locally

# Lint & Format
npm run lint          # ESLint check
npm run lint:fix      # ESLint auto-fix
npm run format        # Prettier write
npm run format:check  # Prettier check (CI)
```

---

## Pages

| Route      | Purpose                                          | Format          | Status        |
| ---------- | ------------------------------------------------ | --------------- | ------------- |
| `/`        | Landing page — hero, features, CTA, social proof | Astro component | Beta          |
| `/privacy` | Privacy Policy                                   | Markdown        | Beta          |
| `/terms`   | Terms of Service                                 | Markdown        | Beta          |
| `/pricing` | Free / Pro / Coach tier comparison               | Astro component | **Post-Beta** |

**Beta launch scope: `/`, `/privacy`, `/terms` only. `/pricing` sa implementuje až s Phase 16 (Monetizácia) po Beta validácii.**

All pages must exist in all three locales (`/en/`, `/sk/`, `/cs/`). Default locale (`en`) may serve from root `/` with redirects.

---

## Domains

- **Landing**: `www.skilltreq.com` → GitHub Pages (CNAME in `/public/CNAME`)
- **App**: `www.skilltreq.app` → Vercel (Nuxt 3)
- All CTAs ("Začni zadarmo", "Try free", etc.) link to `https://www.skilltreq.app/login`
- Legal URLs referenced from app settings: `https://www.skilltreq.com/privacy`, `https://www.skilltreq.com/terms`

---

## Product Philosophy

Skilltreq is built as **"an app that acts like a good coach"** — it shows real progress when the user wants to see it, but never manipulates, guilt-trips, or creates artificial urgency.

### Brand voice

| YES                             | NO                                  |
| ------------------------------- | ----------------------------------- |
| Honest, data-driven, calm       | Hype, fake urgency, "limited time!" |
| "Track real progress"           | "Unlock your potential!"            |
| "Quality data when you need it" | "Don't break your streak!"          |
| Informational, coach-like tone  | Motivational/salesy copy            |
| Show what the app does, plainly | Overpromise or exaggerate           |

### Anti-patterns (never use)

- XP, levels, gamification language
- Streak anxiety ("You'll lose your streak!")
- Confetti, celebration animations
- Countdown timers, scarcity tactics
- "Join 10,000+ athletes!" (unless verified)
- Stock photos of generic athletes

### Good examples

- "See your skills as a dependency tree. Know exactly what to train next."
- "Log workouts, track personal records, follow structured plans."
- "Free during Beta. No credit card, no trial — just start."

---

## Target Audience

| Segment                           | Priority  | What they care about                              |
| --------------------------------- | --------- | ------------------------------------------------- |
| Regulators (disciplined athletes) | Primary   | Structure, data, real progress tracking, no BS    |
| Casual beginners                  | Secondary | Simple start, guided onboarding, not overwhelming |
| Coaches / Instructors             | Tertiary  | Client management, plan assignment, activity feed |

---

## Design System

> **Source of truth: [`../skilltreq/DESIGN_SYSTEM.md`](../skilltreq/DESIGN_SYSTEM.md)**
> Pred implementáciou akéhokoľvek komponentu si prečítaj celý DESIGN_SYSTEM.md z hlavnej appky.

Landing stránka zdieľa vizuálnu identitu appky. Tokeny sú skopírované z `assets/css/main.css` a **musia zostať v sync**.

### Pravidlá (rovnaké ako v appke)

- **Nikdy hardcoded hex/rgb** — vždy CSS vars (`var(--bg-surface)`) alebo Tailwind tokeny (`bg-surface`)
- **Odvodené farby cez `color-mix()`** — nie `rgba()` s hardcoded hodnotami
- **Všetky veľkosti v `rem`** — výnimka: `1px` borders
- **Dark mode povinný** — každý komponent musí fungovať v oboch témach
- **Dark mode via `.dark` class na `<html>`** — rovnaký mechanizmus ako appka

### Farby — aktuálne tokeny (Geist-inspired, čisté neutrály)

#### Backgrounds

| CSS var        | Light     | Dark      | Usage              |
| -------------- | --------- | --------- | ------------------ |
| `--bg-page`    | `#ffffff` | `#000000` | Page background    |
| `--bg-surface` | `#fafafa` | `#111111` | Cards, sections    |
| `--bg-muted`   | `#f5f5f5` | `#1a1a1a` | Subtle backgrounds |
| `--bg-hover`   | `#ebebeb` | `#232323` | Hover states       |

#### Text

| CSS var            | Light     | Dark      | Usage           |
| ------------------ | --------- | --------- | --------------- |
| `--text-primary`   | `#0a0a0a` | `#ededed` | Headings        |
| `--text-secondary` | `#404040` | `#b4b4b4` | Subheadings     |
| `--text-body`      | `#666666` | `#8f8f8f` | Body text       |
| `--text-muted`     | `#8f8f8f` | `#6e6e6e` | Captions, hints |
| `--text-faint`     | `#b4b4b4` | `#525252` | Subtle labels   |

#### Borders

| CSS var          | Light     | Dark      | Usage           |
| ---------------- | --------- | --------- | --------------- |
| `--border`       | `#e5e5e5` | `#2e2e2e` | Primary borders |
| `--border-muted` | `#d4d4d4` | `#3a3a3a` | Subtle lines    |

#### Accent & Danger

| CSS var          | Light                      | Dark                       | Usage              |
| ---------------- | -------------------------- | -------------------------- | ------------------ |
| `--accent`       | `#7553ff`                  | `#8b6fff`                  | CTA buttons, links |
| `--accent-hover` | `#6344e6`                  | `#7c5ef0`                  | CTA hover          |
| `--accent-glow`  | `rgba(117, 83, 255, 0.35)` | `rgba(139, 111, 255, 0.4)` | Hover glow         |

#### Status colors (pre feature showcases)

| Status      | CSS var                | Light     | Dark      |
| ----------- | ---------------------- | --------- | --------- |
| Locked      | `--status-locked`      | `#4a506a` | `#2f3342` |
| In Progress | `--status-in-progress` | `#3b82f6` | `#5b9cf6` |
| Completed   | `--status-completed`   | `#22c55e` | `#4ade80` |
| Mastered    | `--status-mastered`    | `#f59e0b` | `#fbbf24` |

### Typografia

- **Font**: `'Geist Variable', system-ui, sans-serif` — self-hosted cez `@fontsource-variable/geist`
- **Scale**: Tailwind default (`text-sm` → `text-5xl`)
- **Weights**: `font-normal` (400) / `font-medium` (500) / `font-semibold` (600) / `font-bold` (700)

### Logo

- SVG icon: modrý zaoblený štvorec (`#3b82f6`) s bielym "ST" textom
- Skopírovať z appky: `/public/icon.svg`
- Použiť ako favicon a v headeri

### Buttons

Rovnaké triedy ako v appke (`.btn-primary`, `.btn-secondary`) — skopírovať definície z `assets/css/main.css`:

```css
/* Primary CTA — purple raised, glow on hover */
.btn-primary { background: var(--accent); color: #ffffff; ... }
.btn-primary:hover { background: var(--accent-hover); box-shadow: 0 4px 16px var(--accent-glow); }

/* Secondary — flat outlined */
.btn-secondary { background: var(--bg-surface); border: 1px solid var(--border); ... }
```

---

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

---

## i18n

| Locale  | Code | Status           |
| ------- | ---- | ---------------- |
| English | `en` | Source of truth  |
| Slovak  | `sk` | Full translation |
| Czech   | `cs` | Full translation |

- Use Astro's built-in i18n routing (`/en/pricing`, `/sk/pricing`, `/cs/pricing`)
- Default locale (`en`) should also be accessible from root paths (`/pricing` → `/en/pricing`)
- Legal pages: separate markdown files per locale (`content/en/privacy.md`, `content/sk/privacy.md`, etc.)
- UI strings: JSON or TS files per locale, same flat structure as app

---

## SEO

- **Every page** must have `<title>`, `<meta name="description">`, `og:title`, `og:description`, `og:image`
- **OG image**: create a branded card (1200×630px) — Skilltreq logo + tagline on dark background
- **Sitemap**: auto-generated by Astro (`@astrojs/sitemap`)
- **robots.txt**: allow all public pages
- **Canonical URLs**: `https://www.skilltreq.com/...`
- **Structured data**: JSON-LD `SoftwareApplication` schema on landing page
- **hreflang**: auto from Astro i18n for all locale variants

---

## Deployment

### GitHub Actions → GitHub Pages

```yaml
# .github/workflows/deploy.yml
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
  deploy:
    needs: build
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
    runs-on: ubuntu-latest
    steps:
      - uses: actions/deploy-pages@v4
```

### Custom domain

- `public/CNAME` file with content: `www.skilltreq.com`
- DNS: CNAME record `www.skilltreq.com` → `<username>.github.io`
- Enable HTTPS in GitHub Pages settings

---

## Workflow Rules

- **Read before edit** — never edit a file blind
- **All strings via i18n** — no hardcoded UI text in components
- **All colors via design tokens** — no hardcoded hex in components
- **All spacing in `rem`** — no `px` except 1px borders
- **Dark mode mandatory** — every component must work in both themes
- **Mobile-first** — design for 375px, scale up
- **Semantic HTML** — `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`
- **Accessible** — visible focus styles, proper alt text, sufficient contrast
- **No JavaScript by default** — Astro islands only where truly needed (theme toggle, language switcher)
- **Keep it fast** — target Lighthouse 100/100/100/100
- **Legal pages = markdown** — non-technical editors should be able to update them

---

## Content Guidelines for Legal Pages

### Privacy Policy must cover:

- What data is collected (email, OAuth profile, workout data, progress)
- How it's stored (Neon PostgreSQL, Vercel infrastructure, EU region if applicable)
- Third-party services (GitHub OAuth, Google OAuth, Brevo email, Sentry error tracking)
- Cookie usage (localStorage for preferences, session cookie for auth — no tracking cookies)
- Data retention period
- Right to erasure (delete account in app settings)
- Right to export (JSON export in app settings)
- Contact information

### Terms of Service must cover:

- Acceptable use
- Account responsibility
- Data ownership (user owns their data)
- Service availability (no SLA guarantee for free tier)
- Termination
- Limitation of liability

---

## File Structure (suggested)

```
skilltreq-landing/
├── public/
│   ├── CNAME
│   ├── icon.svg              # Copied from app
│   ├── og-image.png           # 1200x630 branded card
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── Features.astro
│   │   ├── PricingTable.astro
│   │   └── ThemeToggle.astro  # Client island
│   ├── layouts/
│   │   ├── BaseLayout.astro   # HTML shell, meta, theme
│   │   └── LegalLayout.astro  # Markdown wrapper for legal pages
│   ├── pages/
│   │   ├── en/
│   │   │   ├── index.astro
│   │   │   ├── pricing.astro
│   │   │   ├── privacy.astro
│   │   │   └── terms.astro
│   │   ├── sk/
│   │   │   └── ...
│   │   └── cs/
│   │       └── ...
│   ├── content/
│   │   ├── en/
│   │   │   ├── privacy.md
│   │   │   └── terms.md
│   │   ├── sk/
│   │   │   └── ...
│   │   └── cs/
│   │       └── ...
│   ├── i18n/
│   │   ├── en.json
│   │   ├── sk.json
│   │   └── cs.json
│   └── styles/
│       └── global.css         # Design tokens + Tailwind
├── astro.config.mjs
├── tailwind.config.ts
├── package.json
├── CLAUDE.md                  # This file
└── .github/
    └── workflows/
        └── deploy.yml
```
