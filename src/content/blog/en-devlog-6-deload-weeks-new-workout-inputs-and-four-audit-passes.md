---
author: SkillTreq Team
date: '2026-07-19'
description: Why we enforce deload weeks instead of hinting at them, why set logging
  moved to scroll pickers, and what four audit passes found before beta.
has_value_for_reader: true
locale: en
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 4 min
slug: devlog-6-deload-weeks-new-workout-inputs-and-four-audit-passes
tags:
- devlog
- deload
- training-plans
- workout-ui
- audit
title: 'Devlog #6: Deload Weeks, New Workout Inputs, and Four Audit Passes'
type: devlog
---

## What we worked on

The last three months, from late April to mid July, covered 56 commits. Three threads took most of the time:

- **The deload system.** Training plans can now schedule reduced-load weeks. The app enforces them during a session, shows deloaded values in previews, and keeps the flags correct when you edit a plan mid-cycle.
- **New workout inputs.** A bounded wheel time picker for durations, and a scroll ruler for weight and rep entry in the active set form. Warmup sets reuse the same ruler as a read-only display, and exact plan targets draw a marker on it with a zone colour.
- **Four audit passes.** We walked the codebase end to end and fixed what we found: a session creation race, timezone handling, content security policy gaps, rate-limit buckets, translation plurals, accessibility issues, and thin end-to-end test coverage.

Alongside those: multi-library plans (a primary move library plus ranked supplements), lossless plan export and import, per-type activity subtypes with a progress breakdown, user-configurable resistance band colours, and a structural refactor of the active session code.

## Why these changes

Deloads first. A structured plan is not just about adding load. Planned recovery weeks are part of the progression, so we treat them as part of the plan, not a suggestion. During a deload week the app reduces the round count and prefills the reduced weight. A hint you can scroll past is not a deload. At the same time, we kept a "Train normally" option that restores the original rounds, because the athlete on the floor knows things the plan does not. Enforce by default, allow an explicit override.

The input work came from watching how set logging actually happens: mid-session, on a phone, often with tired or chalked hands. Typing numbers into a small text field is slow and error-prone in that state. A wheel and a ruler are coarser but faster, and they carry context a text field cannot. Your plan target sits on the ruler as a marker, and the zone colour tells you where you are relative to it.

The audit passes were preparation for beta. Rather than wait for users to find problems, we swept the code in four rounds, from quick wins (a session race, timezone-sensitive date math) to deeper work (a separate rate-limit bucket so passive session reads cannot starve real sign-in attempts, and a review of Slovak and Czech translation quality).

Multi-library plans exist because most athletes do not train inside one discipline. A plan can now pull from a primary library and rank supplemental ones, so a handstand block can sit next to beginner strength work without duplicating moves.

## What we learned

Building a native-feeling wheel picker on the web is hard. Scroll settle detection, sync guards that swallowed quick direction changes, picked values that never left the wheel: each fix now has a regression test around the scroll geometry. UI code this fiddly needs tests, or the bugs come back.

Large composables rot. Our active session composable had grown until it did everything, so we split it under a file-size guard, consolidated five session overlays behind a single host, and replaced several ad-hoc timers with one ticker primitive. The size guard in CI is blunt, but it forced a split we had been postponing for months.

Deleting "unused" data is only safe if you check references first. Unsubscribing from a move library used to break plans that referenced its moves, and the database seeder could remove stale moves that user history still pointed at. Both paths now refuse to delete anything that is referenced.

Runtime mismatches surface in strange places. Bun resolved a dependency's default export differently than Node, which broke sign-in, and our test runner behaved differently under Bun too. We now pin Node for tests. Boring, but predictable.

## What's next

With plan tooling in a stable place, the focus shifts to what surrounds it. An AI plan assistant — a coach-like chat that drafts and adjusts training plans against your actual progress — is code-complete and in internal testing while we finish the infrastructure it runs on. After that: an in-app notification center, and continued work on the native iOS app on its way to the App Store.
