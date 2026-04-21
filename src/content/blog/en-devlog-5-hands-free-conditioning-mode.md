---
author: SkillTreq Team
date: '2026-04-15'
description: Phase 33 adds audio cues, wake lock handling, and a hands-free runtime
  so you can train without touching your phone.
has_value_for_reader: true
locale: en
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 3 min
slug: devlog-5-hands-free-conditioning-mode
tags:
- training
- conditioning
- hands-free
- audio
- phase-33
title: 'Devlog #5: Hands-Free Conditioning Mode'
type: devlog
---

## What we worked on

Over the past two weeks, we focused on Phase 33: HIIT conditioning support and a hands-free workout mode. The goal was simple. Athletes doing conditioning circuits, timed holds, or HIIT intervals shouldn't need to pick up their phone between sets.

This meant building several connected pieces: a wake lock system to keep the screen alive, audio cues to replace visual timer checks, new target metrics for conditioning equipment, and a hands-free runtime that ties it all together. We also backfilled the copenhagen plank into the calisthenics-intermediate skill library and spent a chunk of time hardening our CI/CD pipeline.

## Why these changes

SkillTreq started as a calisthenics skill tracker, but real training programs mix skill work with conditioning. A typical session might include handstand practice followed by a circuit of airbike intervals. The app handled the skill work well. The conditioning part was awkward.

The core problem: during a timed hold or HIIT interval, you need to know when to start and stop without looking at your screen. That's why we built audio signals first (Phase 33.4) before the hands-free runtime (Phase 33.6). The signals needed to work reliably before we could build a mode that depends on them.

We also added watts and kcal as target metrics (Phase 33.2). Conditioning exercises like the airbike have different success criteria than a planche hold. Instead of tracking seconds or reps, you're targeting power output or energy expenditure. The new airbike skill and a dedicated conditioning category (Phase 33.3) gave us a real exercise to test these metrics against.

Hands-free mode itself landed in two parts. First, a toggle on plan day blocks (Phase 33.5) so you can mark specific training days as hands-free when building a plan. Then the runtime (Phase 33.6), which auto-advances through exercises using audio countdown cues instead of requiring a screen tap.

## What we learned

**Wake lock race conditions are real.** Our initial implementation had a bug where releasing and re-acquiring the wake lock in quick succession could leave the screen lock in an undefined state. This happened when switching between exercises rapidly. The fix was to serialize lock requests and handle the case where a release completes after a new acquisition starts. We added unit tests for this specific race condition.

**Synthesized audio works better than recorded files here.** We considered bundling recorded sound files for timer cues but went with Web Audio API synthesis instead. Five distinct cue types (start, stop, countdown tick, rest, complete), each generated at runtime. No audio files to load, no latency from network fetches, and the cues are distinct enough to recognize without looking at the screen.

**CI deserves the same attention as product code.** Seven of 27 commits in this period were CI fixes. Our Forgejo workflow for auto-creating PRs from dev to master kept failing silently. Adding debug output, fixing token permissions, and ensuring full git clones for the GitHub mirror push were each small fixes, but they blocked the entire deploy pipeline until resolved. The lesson: add error visibility to CI jobs from the start, not after the third silent failure.

## What's next

The training plan builder and calendar view are the next priority on the beta roadmap. With hands-free mode in place, the next step is making it easier to structure multi-day training plans that combine skill work and conditioning blocks. We're also working toward the activity heatmap and personal records tracking before the beta milestone closes.
