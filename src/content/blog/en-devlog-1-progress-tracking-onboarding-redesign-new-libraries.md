---
author: SkillTreq Team
date: '2026-03-18'
description: 'Seven weeks of development: a full progress page, goal-based onboarding,
  expanded training session UX, and new libraries for tumbling, juggling, and weapon
  spinning.'
has_value_for_reader: true
locale: en
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 5 min
slug: devlog-1-progress-tracking-onboarding-redesign-new-libraries
tags:
  - progress
  - onboarding
  - training
  - libraries
  - security
title: 'Devlog #2: Progress Tracking, Onboarding Redesign, and Six New Skill Libraries'
type: devlog
---

## What we worked on

This devlog covers about seven weeks of development, 166 commits since March 5. The main areas: building out the progress page, redesigning onboarding, improving the training session, adding six new skill libraries, and hardening the backend.

## Why these changes

### Progress page: making training data visible

We had the data. Users log activities, complete sessions, track personal records. But there was no centralized place to see any of it. The progress page fills that gap.

It now includes an activity heatmap with year navigation, a category mastery grid, a milestone showcase with progress indicators, a PR trend chart, workout statistics, and a journey timeline with server-side filtering.

The category mastery component went through several iterations. We started with "Category Strength" using a dual-bar visualization, then renamed it to "Category Mastery" and reworked the formula to better reflect actual skill progression rather than just activity volume. The layout needed fixes for locale-aware sorting, proper ordering, and compact notation.

The heatmap needed careful handling too. We renamed "sessions" to "activities" because the data includes more than just workout sessions. Year navigation, edge cases around empty data, and UTC consistency took more work than expected.

### Onboarding: starting from goals, not features

The previous onboarding was feature-oriented: pick a language, set limitations, done. Phase 28 replaced it with a goal-based flow. New users now select what they want to learn (handstand, muscle-up, aerial cartwheel), pick their experience level, and choose which skill libraries to subscribe to.

After onboarding, beginners get auto-initialized with a starter plan and a guided tour of the skills page. The tour system stores completion state per page in the database, so users can replay it later if they want a refresher.

We also added an account recovery flow for returning users, so they skip the full onboarding when reactivating.

### Training session: less friction, more control

The training session got a significant UX pass:

- **More actions sheet** replaces old inline buttons, reducing visual clutter
- **Workout overview** gives a quick summary before and during the session
- **Live notes** per exercise, taken during a session
- **Undo support** for accidental set completions
- **Exercise swap flow** redesigned as a multi-step drawer, with a post-workout prompt to update your plan
- **Assessment mode** for evaluating where you stand on a skill without it counting as training volume
- **Coach notes** visible on plan exercises during the session

The exercise swap flow was the most involved piece. When you swap a move mid-session, the app now suggests updating your plan after the workout finishes. This keeps plans in sync with what you actually train.

### Content: six new skill libraries

We added libraries for disciplines beyond calisthenics:

- Tumbling (beginner, intermediate, advanced)
- Juggling balls (beginner, intermediate)
- Staff spinning, dual swords, sword spinning (all beginner)

Each includes full Slovak and Czech translations. We also added movement phases (technical cue decomposition) to all existing moves, nearly 300 total, with a phase-by-phase breakdown for each exercise.

Within existing calisthenics libraries, we added beginner-accessible progression steps for push-ups and squats, 24 new skills across expert and intermediate tiers, and new metric types: `height_cm` for plyometric exercises, `distance_m` for pike compression, and `duration_seconds` for mobility holds.

### Security and performance

Two backend changes deserve specific mention.

First, rate limiting via Upstash Redis and Zod validation on all mutation endpoints. That touched 96+ files in a single commit. Every POST, PUT, PATCH, and DELETE endpoint now validates input server-side.

Second, security headers, a self-invite guard for coach invitations, and conversion of side-effect-free endpoints to pure GETs.

On the performance side, we ran an audit that converted images to WebP, added lazy CSS loading, set proper cache headers, and introduced pagination where it was missing.

## What we learned

**Naming matters early.** Renaming "Category Strength" to "Category Mastery" mid-development touched more files than expected: component names, i18n keys, API endpoints, tests. Getting the name right before building saves real churn.

**Timezone bugs compound.** Several components had subtle issues with UTC vs. local time. The heatmap, adherence chart, and bodyweight widget all needed fixes. We eventually standardized on server-side timezone handling, which resolved most of the drift.

**Movement phases are high-value content.** Adding phase-by-phase breakdowns was a content task, not a code task. But early feedback suggests it is one of the more useful additions for learning new skills. Plain text cues for each phase of a movement turned out to be more helpful than video alone.

**Validate inputs from day one.** Adding Zod validation to 96 files in a single pass works, but it would have been cleaner to enforce validation from the start with a shared middleware pattern. Retrofitting is always harder.

## What's next

The beta launch target is Q1 2026, and the remaining items are training plan calendar integration, stats refinements, and getting the blog infrastructure (this content engine) running reliably. Post-beta, the focus shifts to coach dashboards, data export, and PR trend charts. Monetization planning (free/pro/coach tiers) is on the roadmap for Q3.
