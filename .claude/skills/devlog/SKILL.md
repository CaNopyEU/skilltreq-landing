---
name: devlog
description: Write the next SkillTreq devlog blog post (EN/SK/CS) from the app repo's git history since the last published devlog. Use when asked to add a new devlog, release blog, or "blog about new releases".
---

# Devlog — new release blog post

Produce the next `Devlog #N` post for the landing site from what actually shipped in the
app repo since the previous devlog. Three locales, honest tone, no invention.

## 1. Establish state

- App repo (source of truth for what happened): `~/Home/grimoire/projects/skilltreq`
- Last devlog = highest `Devlog #N` in `title:` across `src/content/blog/en-*.md`.
  **The title number is the source of truth, not the slug** — older slugs drifted
  (e.g. `devlog-5-*` files carry titles #4 and #5). New posts must have slug = `devlog-N-<topic>`.
- `git fetch origin && git branch -r | grep blog/` — check for an **unmerged devlog branch**
  (convention: each devlog lives on `blog/devlog-N-<slug>` until merged to `master`).
  If one exists, surface it to the user before writing a new one; the new post's window
  starts after the _latest existing_ devlog (merged or not), and N continues from it.
- Coverage window: from the last devlog's `date:` (its content covers commits up to that date)
  until today.

## 2. Gather material

```bash
cd ~/Home/grimoire/projects/skilltreq
git log --since=<last-devlog-date> --reverse --format='%ad %h %s' --date=short
```

- Group commits into 2–4 themes. Read the app repo's `docs/` (phase/roadmap docs) and
  `git show <hash> --stat` for the "why" behind the big ones.
- **Skip check:** if the window has fewer than ~15 substantive commits or no user-visible
  theme, tell the user there isn't enough material yet instead of padding a post.
- **Exclusions:** never feature internal agent/Claude tooling commits, employer references,
  or home-lab/tailnet specifics. Everything in the post must be traceable to the repo —
  no invented facts or numbers.

## 3. Draft EN

Delegate drafting to a sub-agent (Opus-class) with the commit list, theme grouping, and:

- Brand voice: `docs/product.md` (no hype, no gamification, no fake urgency, athlete-first).
- Structure and tone reference: the most recent `en-devlog-*.md`.
- Sections: `## What we worked on`, `## Why these changes`, `## What we learned`,
  `## What's next`. ~700–900 words, `readingTime: 4 min` (3 min if shorter).
- Continuity: open threads from the previous devlog's "What's next" must be picked up —
  say honestly what shipped and what slipped. "What's next" must reflect the app repo's
  actual roadmap docs, not wishes.

Frontmatter must match `src/content.config.ts` (blog collection). All five boolean flags
(`no_hype_language`, `no_gamification`, `no_fake_urgency`, `has_value_for_reader`,
`matches_brand_voice`) are set `true` — and the content must actually honor them.
`date:` = publication date (today), quoted `'YYYY-MM-DD'`. `type: devlog`,
`author: SkillTreq Team`, first tag `devlog`.

## 4. Translate SK + CS

Two sub-agents (Sonnet-class), one per locale, translating the final EN file:

- Files: `src/content/blog/sk-devlog-N-<slug>.md`, `cs-devlog-N-<slug>.md`.
  Same frontmatter; translate only `title`, `description`, `tags` where natural;
  `locale: sk`/`cs`; **slug stays identical to EN**.
- Tone reference: existing `sk-devlog-*` / `cs-devlog-*` files. Natural translation,
  not word-for-word; keep technical terms that the existing posts keep in English.

## 5. Validate

```bash
npm run lint && npm run format:check && npm run build
```

Build must pass (content collection schema validates frontmatter). Run `npm run format`
first if Prettier complains — frontmatter YAML is Prettier-formatted (2-space list indent).

## 6. Ship (only with explicit user go-ahead)

- Branch `blog/devlog-N-<slug>` off `origin/master`; commit: `blog: add devlog-N-<slug>`
  (all three files in one commit); push and open a PR against `master` (`gh pr create`).
- Publish = merge the PR (push to `master` triggers the GitHub Pages deploy). Merging is
  the user's call — never merge without an explicit go-ahead.
