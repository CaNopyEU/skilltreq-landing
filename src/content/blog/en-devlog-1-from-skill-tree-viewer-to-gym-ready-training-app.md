---
author: SkillTreq Team
date: '2026-03-04'
description: A 201-commit sprint transformed SkillTreq from a skill tree prototype
  into a functional training app with active sessions, plan building, and a coach
  system.
has_value_for_reader: true
locale: en
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 5 min
slug: devlog-1-from-skill-tree-viewer-to-gym-ready-training-app
tags:
- devlog
- training
- performance
- mobile
- design-system
- backend
title: 'Devlog #1: From Skill Tree Viewer to Gym-Ready Training App'
type: devlog
---

## What we worked on

This devlog covers 201 commits across frontend, backend, and infrastructure. The focus areas: active workout sessions, training plan builder, calendar integration, a coach system, and a full design system overhaul. Most of these changes target the same goal. Making SkillTreq usable during an actual training session, not just for browsing a skill tree.

## Why these changes

### Gym-ready workout sessions

The original workout logging was built for desktop. Buttons were small, text was hard to read between sets, and the timer lacked precision. We redesigned the active session UI with larger touch targets, a set review drawer, and gym-friendly sizing throughout. The hold timer became a standalone stopwatch with decisecond precision, because calisthenics holds need accurate timing. We also added an exercise info sheet so you can check movement details mid-session without leaving the flow.

These changes came from testing the app during real workouts. Small screens, sweaty hands, and limited attention between sets exposed every shortcut we had taken.

### Training plan builder and calendar

The plan builder grew significantly. It now supports multi-plan activation (train calisthenics and mobility on different schedules), group-based plan creation, custom exercise blocks, and draft persistence so you don't lose work if you navigate away. We added form validation and saving overlays to prevent data loss.

The calendar view merged with the daily session list. You can now see scheduled sessions, completed workouts, and skipped days in one place. Session actions (start, skip with reason, view details, add notes) live inline. We also added read-only workout previews for upcoming scheduled sessions, so you can check what's planned without editing anything.

### Performance: fewer database round-trips

We found N+1 query patterns in several endpoints. The plan save endpoint was making roughly 50 database calls per request. We batched those down to 6. The progress page was firing three redundant API calls for personal records on load. We also parallelized independent API queries with `Promise.all` and added missing rate limits.

The Neon serverless Postgres pooler introduced its own issues. Connection pooling caused race conditions on new signups, where foreign key references failed because the user row hadn't propagated yet. We added user row recovery and fixed the account deletion flow to properly remove OAuth links.

### Coach and instructor system

Phase 9 introduced roles, client invitations, plan assignment, and a coach dashboard. This was a large addition (64+ files changed) that required new database tables, API endpoints, and UI components. A coach can invite clients by email, view their progress, assign training plans, and track adherence. The system uses separate credential providers per role, which required restructuring the auth configuration.

### Design system consolidation

We migrated all spacing values from `px` to `rem` across 99+ files. Then did the same for font sizes across 96+ files. This makes the app respect user font-size preferences and improves accessibility. We introduced the Geist font family, a neutral gray palette, and a group-based color system that assigns consistent colors to library groups (calisthenics, mobility, acrobatics).

Button styles moved to global `.btn-*` classes, replacing dozens of one-off button implementations. The result is a more predictable UI and fewer places to update when the design changes.

### Authentication and email

We added email OTP login alongside existing OAuth (GitHub and Google). The initial implementation used Resend, but we migrated to Brevo for its 300 emails/day free tier. Security hardening included rate limiting on auth endpoints and a P0+P1 audit of the OTP flow.

Transactional email infrastructure enabled weekly digests and monthly summaries via cron jobs. We consolidated multiple cron endpoints into a single `/api/cron/digest` to stay within Vercel's free plan limits.

### Mobile navigation and accessibility

The bottom nav was rebuilt with four tabs, a center floating action button, and an avatar-based profile menu. We added safe-area insets and dynamic viewport height (`dvh`) to handle iOS browser chrome properly.

A dedicated accessibility pass addressed focus management in modals, ARIA labels on interactive elements, keyboard navigation for dropdowns (using `@floating-ui/vue` for viewport-aware positioning), and semantic HTML improvements across 17+ components.

## What we learned

**Test during actual use.** The workout session UI looked fine in a browser. It fell apart when used between sets at the gym. Screen glare, sweat, fatigue, and time pressure revealed problems that no amount of desktop testing would catch.

**Batch database operations early.** The 50-roundtrip plan save worked fine in development with a local database. On Neon's serverless pooler with network latency per query, it was noticeably slow. We should have batched from the start.

**Connection poolers add failure modes.** Neon's pooler doesn't guarantee read-your-own-writes consistency across connections. We hit this with new user signups where a foreign key reference failed because the INSERT hadn't propagated. The fix (a user row recovery check) is simple, but the bug was hard to diagnose.

**Rem migration is mechanical but worth it.** Converting `px` to `rem` across 100+ files was tedious. But it solved accessibility issues for users who set larger default font sizes and made the design system more predictable. Starting with `rem` from day one would have saved time.

## What's next

The beta launch target is Q1 2026. Remaining items include training plan calendar polish, activity heatmap refinements, and the blog infrastructure this post is published on. After beta, the focus shifts to client management improvements for coaches, JSON data export, and personal record trend charts.
