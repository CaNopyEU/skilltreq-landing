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

| Route      | Purpose                                          | Format          |
| ---------- | ------------------------------------------------ | --------------- |
| `/`        | Landing page — hero, features, CTA, social proof | Astro component |
| `/privacy` | Privacy Policy                                   | Markdown        |
| `/terms`   | Terms of Service                                 | Markdown        |
| `/pricing` | Free / Pro / Coach tier comparison               | Astro component |

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
- "Free forever. Pro when you need more."

---

## Target Audience

| Segment                           | Priority  | What they care about                              |
| --------------------------------- | --------- | ------------------------------------------------- |
| Regulators (disciplined athletes) | Primary   | Structure, data, real progress tracking, no BS    |
| Casual beginners                  | Secondary | Simple start, guided onboarding, not overwhelming |
| Coaches / Instructors             | Tertiary  | Client management, plan assignment, activity feed |

---

## Design System

The landing site shares the app's visual identity. All values sourced from the app's `assets/css/main.css`.

### Colors

**The site must support light and dark mode** (respect `prefers-color-scheme`, with manual toggle).

#### Light mode

| Token              | Value     | Usage              |
| ------------------ | --------- | ------------------ |
| `--bg-page`        | `#ffffff` | Page background    |
| `--bg-surface`     | `#f8f7fc` | Cards, sections    |
| `--bg-muted`       | `#f0eef8` | Subtle backgrounds |
| `--bg-hover`       | `#e8e5f4` | Hover states       |
| `--text-primary`   | `#0a0a18` | Headings           |
| `--text-secondary` | `#3a3a58` | Subheadings        |
| `--text-body`      | `#585880` | Body text          |
| `--text-muted`     | `#8080a8` | Captions, hints    |
| `--border`         | `#e0ddef` | Borders            |
| `--accent`         | `#7553ff` | CTA buttons, links |
| `--accent-hover`   | `#6344e6` | CTA hover          |

#### Dark mode

| Token              | Value     | Usage              |
| ------------------ | --------- | ------------------ |
| `--bg-page`        | `#08080e` | Page background    |
| `--bg-surface`     | `#0e0e1c` | Cards, sections    |
| `--bg-muted`       | `#15152a` | Subtle backgrounds |
| `--bg-hover`       | `#1c1c38` | Hover states       |
| `--text-primary`   | `#e4e4f0` | Headings           |
| `--text-secondary` | `#b0b0d0` | Subheadings        |
| `--text-body`      | `#9090c0` | Body text          |
| `--text-muted`     | `#7878b0` | Captions, hints    |
| `--border`         | `#1e1e3a` | Borders            |
| `--accent`         | `#8b6fff` | CTA buttons, links |
| `--accent-hover`   | `#7c5ef0` | CTA hover          |

#### Status colors (for feature showcases)

| Status      | Light     | Dark      |
| ----------- | --------- | --------- |
| Locked      | `#4a506a` | `#2f3342` |
| In Progress | `#3b82f6` | `#5b9cf6` |
| Completed   | `#22c55e` | `#4ade80` |
| Mastered    | `#f59e0b` | `#fbbf24` |

### Typography

- **Font**: System-ui, sans-serif (matches app — no custom font loading)
- **Scale**: Use Tailwind's default scale (`text-sm` through `text-5xl`)
- **All sizing in `rem`** — never hardcoded `px` (except 1px borders)

### Logo

- SVG icon: blue rounded square (`#3b82f6`) with white "ST" text
- Copy from app's `/public/icon.svg`
- Use as favicon and in header

### Buttons

```css
/* Primary CTA */
.btn-primary {
  background: var(--accent);
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: background 0.15s;
}
.btn-primary:hover {
  background: var(--accent-hover);
}

/* Secondary */
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
}
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

- Links: Privacy, Terms, Pricing
- Language switcher (EN / SK / CS)
- "Built for athletes who track, not grind."

---

## Pricing Page Structure

Three tiers based on decided monetization model:

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
