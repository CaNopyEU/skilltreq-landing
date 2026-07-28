# AGENTS.md — Skilltreq Landing Site

This is the map for coding agents (Claude Code, Codex, etc.) working in this repository.
`CLAUDE.md` just points here (`@AGENTS.md`). Product and content detail lives under `docs/`
— see the **Docs** section at the bottom.

---

## Project Overview

Static marketing, legal & pricing site for **Skilltreq** — a calisthenics & acrobatics skill tree training tracker. This is the public-facing website separate from the main application.

| Concern                  | URL                 |
| ------------------------ | ------------------- |
| Landing site (this repo) | `www.skilltreq.com` |
| Application              | `www.skilltreq.app` |

---

## Stack

| Layer     | Technology                                                 |
| --------- | ---------------------------------------------------------- |
| Framework | Astro (static output) + Vue islands                        |
| Styling   | Tailwind CSS v4                                            |
| Content   | Markdown via Astro content collections (legal pages, blog) |
| Hosting   | GitHub Pages                                               |
| CI/CD     | GitHub Actions                                             |
| i18n      | Astro i18n routing (`/en/`, `/sk/`, `/cs/`)                |

---

## Commands

```bash
# Dev
npm run dev           # Start Astro dev server (localhost:4321)
npm run build         # Production build (static output)
npm run preview       # Preview production build locally

# Lint, Format & Types
npm run lint          # ESLint check
npm run lint:fix      # ESLint auto-fix
npm run format        # Prettier write
npm run format:check  # Prettier check (CI)
npm run typecheck     # astro check — known failing (24 errors), fix tracked in handoff
```

> **Package manager: npm.** `package-lock.json` is the single committed lockfile (matches
> `deploy.yml`'s `npm ci`, the proven production install path). `bun.lock` is gitignored — fine to
> use locally, but don't commit it.

> **`typecheck` (`astro check`)**: known failing (24 errors), fix tracked in handoff. All errors
> are the same pattern in `src/pages/{en,sk,cs}/{privacy,terms}.astro` — `getEntry()` result used
> without a defined-check (`entry` is possibly `undefined`). Not wired into the pre-commit hook or
> CI yet; wire it in once fixed.

---

## Pages

| Route      | Purpose                                                     | Format           | Status        |
| ---------- | ----------------------------------------------------------- | ---------------- | ------------- |
| `/`        | Landing page — hero, features, CTA, social proof            | Astro component  | Beta          |
| `/privacy` | Privacy Policy                                              | Markdown         | Beta          |
| `/terms`   | Terms of Service                                            | Markdown         | Beta          |
| `/blog`    | Devlogs / guides / announcements (content collection + RSS) | Astro + Markdown | Live          |
| `/pricing` | Free / Pro / Coach tier comparison                          | Astro component  | **Post-Beta** |

**Beta launch scope was `/`, `/privacy`, `/terms` only; `/blog` shipped later, post-Beta launch. `/pricing` sa implementuje až s Phase 16 (Monetizácia) po Beta validácii.**

All pages must exist in all three locales (`/en/`, `/sk/`, `/cs/`). Root paths (`/`, `/privacy`, `/terms`, `/blog`) are redirect stubs to the default locale (`en`).

---

## Domains

- **Landing**: `www.skilltreq.com` → GitHub Pages (CNAME in `/public/CNAME`)
- **App**: `www.skilltreq.app` → Vercel (Nuxt 3)
- CTAs link to the app — default `https://www.skilltreq.app`, overridable via the `PUBLIC_APP_BASE_URL` env var — to `/login` or to `/start?goal=<slug>` from the hero goal-picker demo, with UTM params (`utm_source=landing&utm_medium=cta&...`)
- Legal URLs referenced from app settings: `https://www.skilltreq.com/privacy`, `https://www.skilltreq.com/terms`

---

## Deployment

- GitHub Actions → GitHub Pages, defined in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
- Trigger: push to **`master`** (this repo's default branch), or manual `workflow_dispatch`
- Build job: `npm ci` + `npm run build`, uploads `dist/` as the Pages artifact
- Deploy job: `actions/deploy-pages@v4`
- Custom domain: `public/CNAME` → `www.skilltreq.com`; DNS CNAME record to `<org>.github.io`; HTTPS enforced in GitHub Pages settings

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
- **No JavaScript by default** — Astro islands only where truly needed (theme toggle, language switcher, interactive demos)
- **Keep it fast** — target Lighthouse 100/100/100/100
- **Legal pages = markdown** — non-technical editors should be able to update them

---

## Docs

Product and content detail lives under `docs/` (moved out of this file to keep it a map, not a manual):

- [`docs/product.md`](docs/product.md) — product philosophy, brand voice, anti-patterns, target audience segments
- [`docs/design-system.md`](docs/design-system.md) — design tokens (colors, typography, buttons); source of truth is the main app's `DESIGN_SYSTEM.md`
- [`docs/page-structure.md`](docs/page-structure.md) — landing page section-by-section breakdown, plus the (post-Beta) pricing tier table
- [`docs/content-guidelines.md`](docs/content-guidelines.md) — required content checklist for the Privacy Policy and Terms of Service pages
- [`docs/seo-i18n.md`](docs/seo-i18n.md) — SEO meta/structured-data checklist and i18n routing/content conventions
