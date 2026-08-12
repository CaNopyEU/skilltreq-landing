---
author: SkillTreq Team
date: '2026-08-12'
description: AI-assisted plan import from spreadsheets, photo and video attachments
  on workouts, and a production deploy pipeline that builds, migrates and promotes
  in order.
has_value_for_reader: true
locale: en
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 4 min
slug: devlog-7-ai-plan-import-workout-media-deploy-pipeline
tags:
  - devlog
  - ai
  - training
  - media
  - infrastructure
  - accessibility
title: 'Devlog #7: AI Plan Import, Workout Media, and a Deploy Pipeline'
type: devlog
---

## What we worked on

Three areas took most of this cycle: plan import, workout media, and replacing manual production deploys with a pipeline.

**Plan import.** You can now bring an existing plan in from a file. Upload an `.xlsx`, `.csv`, `.txt` or `.md` (or paste text), preview how we read each sheet, then work through a short conversation where the assistant asks about anything ambiguous — "are these ring dips or bar dips?" — and proposes a structured plan you can save as new or merge into an existing one.

Parsing is deterministic: the file is read into a normalized text grid before any model sees it, and it is never stored — it lives in the request and nowhere else. Move names resolve against our library through a ranked matcher, insensitive to plurals, hyphens and diacritics. When confidence is low the assistant asks instead of guessing; with no match at all, the move keeps your original text as a custom name. Clarifications are capped per import so it can't loop.

Underneath sits a provider layer we shipped first: one completion contract, a task registry pinning provider, model and available tools per task, and tracing that records token usage and cost per request. None of it is visible in the UI — it exists so what runs on top can be swapped, measured and budgeted.

**Workout media.** Photos and videos can be attached to notebook entries and captured mid-session from an overlay strip. A gallery page collects everything with filtering, a lightbox, and a usage meter against your quota. Videos get an in-browser editor for trimming and cropping, with a fast path for simple cuts and a frame-accurate path when an edit needs one.

**Plans and timers.** Plans can now change over time: progression groups with cycle windows let a plan move to a harder variation at a chosen cycle, with a timeline view showing the switch points. Deload gained a configurable first-deload cycle, a rotation direction, and day-level overrides from the calendar. A new plan-level missed policy marks a plan required or optional — optional plans never appear in the missed list and quietly auto-skip stale sessions after a one-day grace window for retro-logging.

Active workout timers now show the plan's duration target next to the live digits, colour them below, in, or above the range, and cue boundary crossings with sound and haptics. Since colour alone isn't feedback for everyone, crossings are also announced for screen readers.

Two libraries landed: handstand-mastery (22 moves, gated behind a free handstand) and a DnB Step beginner library opening a new dance group — 34 libraries and 572 moves in total.

## Why these changes

Most people who arrive already have a plan — in a spreadsheet, or written out by a coach. Retyping it into a builder is the most tedious possible first session. We chose import over generating plans from scratch deliberately: structuring something you already trust, and asking about the parts we can't read, is more honest than inventing a program and presenting it as coaching.

The provider layer came first because the previous devlog was accurate about the blocker. A thin adapter was cheaper than a rewrite onto a generic SDK, and we wanted per-request cost visible before shipping anything that spends tokens.

Media is straightforward: skill training is visual, and progress on a handstand line is easier to see than to describe in a note. Deload and missed-policy work follows the same principle as the rest of the app — it informs, it doesn't block. A deload is a recommendation you can skip, and a plan you marked optional shouldn't ask you to account for every missed day.

The deploy pipeline exists because the ordering matters: build before migrate keeps a broken build away from the database, and promote after migrate keeps a failed migration away from users. The previous deployment serves traffic until promote succeeds.

## What we learned

Promoting a deployment through the Vercel CLI failed with a flat "User not found (404)" — the CLI resolves the deployment's owner from the URL and looks a team up as a personal account. Calling the same REST endpoint with an explicit team ID works, and treating "already the current production deployment" as success makes re-runs idempotent.

One configuration value cost us an outage. The media host has to be a bare origin; give it a trailing path and CSP path-matching silently blocks every signed URL, with no error anywhere. Startup now fails loudly rather than serving a gallery of broken images.

Schema, migration files and the running database drift apart quietly, because generating a migration only diffs files. A guard test now asserts the latest one is actually applied.

The import evals earned their keep. Eight golden fixtures run the real pipeline and score the result against expected output; one exposed a bad move-name query that looked fine in manual testing. Another exists purely to assert that instructions hidden inside an uploaded file don't end up in the plan.

## What's next

The deload system still has iterations left, including hints derived from your own training data. Two things we mentioned last time have not happened: the in-app notification center is still only planned, and the native iOS app is a later phase we haven't started. AI access also remains behind an allowlist with daily limits while we watch what it actually costs to run, so it isn't open to everyone yet. We'd rather say that plainly than imply it shipped.
