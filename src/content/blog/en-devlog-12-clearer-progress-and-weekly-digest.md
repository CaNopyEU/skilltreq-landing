---
author: SkillTreq Team
date: '2026-11-02'
description: Progress views now focus on unfinished libraries, while the weekly digest
  reports the training week that just ended.
has_value_for_reader: true
locale: en
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 2 min
slug: devlog-12-clearer-progress-and-weekly-digest
tags:
  - features
  - tech
  - progress
  - library
  - weekly-digest
  - reliability
  - devlog
title: 'Devlog #12: Clearer Progress and a More Useful Weekly Digest'
type: devlog
---

## What's new for you

Progress tracking now puts unfinished work first. Libraries are sorted by completion, and finished libraries are removed from the progress view. This makes it easier to identify what still needs attention without scanning past completed sections.

Library order is now stable regardless of your subscription state. The same library structure remains visible as your access changes, so progress does not appear to move because of account status.

Accessory moves no longer prevent a library from being counted as complete. Completion is now based on the core moves that define that library. Supporting movements can still be tracked, but they do not block the library from being marked finished.

The weekly digest is now sent on Monday and covers the week that just ended. This gives you a consistent review point after the training week is complete.

## Why we made these changes

A progress view should help you decide what to train next. Showing completed libraries alongside unfinished ones added noise, especially as your training history grew. Sorting by completion and hiding finished work keeps the view focused on current training priorities.

We also separated core library requirements from accessory movements. Accessory work is useful for preparation and development, but it should not change whether the main library is complete. This distinction makes the data better reflect how the skill tree is structured.

The digest timing needed the same clarity. A Monday summary can describe a complete Monday-to-Sunday period. It gives you a stable weekly record instead of reporting on a period that is still in progress.

## Technical details

We updated the library derivation and completion calculations so they do not depend on subscription-specific ordering or accessory move status. Unit tests cover both cases.

The digest job now calculates the previous calendar week before building its content. We also updated localized email strings and the related documentation.

This period included several maintenance changes. We moved source-map upload configuration to the correct module location, refreshed dependency versions, and replaced Prettier with oxfmt. End-to-end setup now warms the client bundle as well as server rendering. CI artifact handling was also adjusted so a full artifact store does not cause an otherwise successful test run to fail.

Security audit baselines and monitoring packages were refreshed as part of the same maintenance pass.

## What's next

We are continuing work on the beta roadmap, with training plan and calendar workflows, activity summaries, and personal records remaining the next major areas. The goal is to connect daily training data with a clearer view of longer-term progress.
