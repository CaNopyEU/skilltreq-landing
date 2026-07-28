# Design System — Skilltreq Landing

> Moved from `CLAUDE.md`. Linked from `AGENTS.md`.

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
