---
author: SkillTreq Team
date: '2026-04-21'
description: A visual overhaul of the library page, manual verification of all 29
  tutorial libraries, and reliability fixes for active training sessions.
has_value_for_reader: true
locale: en
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 3 min
slug: devlog-5-library-redesign-verified-tutorials-session-reliability
tags:
  - frontend
  - ux
  - training
  - content
  - seo
title: 'Devlog #5: Library Redesign, Verified Tutorials, and Session Reliability'
type: devlog
---

## What we worked on

This cycle touched three areas: how the library looks and feels, the quality of tutorial content, and the reliability of active training sessions.

The library page got a visual redesign. Libraries are now displayed as gradient cards grouped by discipline, with a horizontal strip showing your subscribed libraries at the top. We replaced emoji icons with proper SVG icons via Iconify, added card animations, and improved skeleton loading states.

On the content side, we manually verified tutorial videos across all 29 skill libraries. This included calisthenics (beginner through expert), mobility, kickboxing, combat mobility, tumbling, tricking, flow arts (staff, swords, juggling), jump rope, and the newly added Ukemi (safe falls) libraries. We also added a rings accessories library with an auto-subscribe mechanic for users who already train on rings.

For training sessions, we fixed wake lock behavior so screens stay on during workouts, improved audio cue reliability, and added support for duration ranges in hands-free auto-advance. A confirmation dialog now prevents accidental discards of finished workouts.

We also streamlined onboarding by removing the limitations step and adding experience-based auto-skip, enabled search engine indexing with AI search support (llms.txt), and added a `/start` page for a zero-friction entry from the landing site.

## Why these changes

The old library page listed everything in a flat grid. As we added more disciplines (we're now at 29 libraries), that layout stopped scaling. Grouping by discipline with visual hierarchy helps users find what's relevant to their training.

Tutorial verification was overdue. Our automated fetch script matched about 85% of videos correctly, but the rest were duplicates, wrong movements, or dead links. For a training app, showing the wrong tutorial video is worse than showing none. We verified every single video, deduplicated across libraries, and added a validation script to catch issues before they ship.

Session reliability fixes came from real usage. Screen dimming mid-set is disruptive, especially during timed holds. The wake lock API helps, but browser behavior varies: Chrome on Android drops the lock on tab switch, so we re-acquire it when the tab becomes visible again. Audio cues had similar cross-browser inconsistencies that needed per-platform handling.

The onboarding simplification was data-driven. The limitations step had low completion rates and the data it collected wasn't being used meaningfully yet. Removing it shortened the flow without losing anything we act on.

## What we learned

Emoji rendering is inconsistent across Android devices. What looks like a clean icon on desktop can appear oversized or misaligned on certain phones. Switching to SVG via @nuxt/icon and Iconify solved this and gave us consistent sizing and color control.

The tutorial verification process taught us that manual review at scale needs tooling. Our validation script now checks for duplicate video IDs across libraries, verifies URL formats, and flags libraries with missing tutorials. This makes future content additions faster to verify.

Replacing our custom activity heatmap with vue3-calendar-heatmap cut about 200 lines of component code. The library handles edge cases (timezone offsets, empty weeks, locale-aware labels) that we were maintaining ourselves. Sometimes the right move is to stop maintaining something.

## What's next

The beta launch checklist is getting shorter. Training plan builder and calendar are the next major features in progress. Activity stats and personal records are also on deck. On the content side, blog infrastructure, including the engine that generated this post, is approaching its first automated run.
