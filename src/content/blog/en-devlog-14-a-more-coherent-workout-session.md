---
author: SkillTreq Team
date: '2026-11-16'
description: Workout sessions now provide clearer navigation, safer set recording,
  better preparation cues, and more consistent controls across the app.
has_value_for_reader: true
locale: en
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 4 min
slug: devlog-14-a-more-coherent-workout-session
tags:
  - features
  - tech
  - workout-sessions
  - accessibility
  - reliability
  - devlog
title: 'Devlog #14: A More Coherent Workout Session'
type: devlog
---

## What's new for you

Workout sessions now have a clearer structure from setup through completion. The changes are designed to reduce avoidable errors while you train and record your work.

You can now:

- Move between exercise information, active training, and completion without losing your place.
- Pause a set instead of using a destructive undo action.
- See the next exercise's setup information during the rest countdown.
- See preparation cues whenever the next movement changes.
- Record typed metrics without losing precision when the input control uses a different step size.
- Keep metric values through a complete training set.
- Recognize warm-up and deload sections through subtle screen color changes.
- Open session actions and bottom sheets using more consistent controls.
- Use touch targets sized for reliable interaction during training.
- Find the new Olympic weightlifting beginner tree and its accessory content.
- Save activity and notebook entries safely when a request is repeated.

The workout flow now has one consistent visual language. Buttons, action areas, sheets, timers, and metric controls behave more consistently across the session.

## Why we made these changes

A training session is different from a normal app screen. You may be moving between exercises, checking setup details, entering values with one hand, or working through a timed rest period. Small interface inconsistencies can interrupt that process.

We focused on the points where the session previously asked you to remember too much.

The new session structure keeps related actions together. Exercise information is available when you need it, while the main training view stays focused on the current set. During rest, the app can show what is changing next, including preparation details for the upcoming movement.

We also changed how pause and undo work. Undo can remove a completed action, which is risky when you are recording real training data. Pausing gives you a way to stop and inspect the session without treating that pause as a correction.

Metric entry received similar attention. A ruler or time wheel may use a convenient visual step, but that should not change the precision of the value you record. We separated those concerns so typed metrics retain their intended precision. We also fixed values being lost during a complete set.

The warm-up and deload tint is intentionally subtle. It provides context without competing with the exercise, timer, or recorded metrics. The goal is to make the current part of the session easier to recognize at a glance.

These decisions support the beta roadmap item for an active workout session with a timer. The session needs to be dependable before we add more planning and progress features around it.

## Technical details

We consolidated bottom sheets around one `BaseSheet` shell. This gives sheets a shared layout, dismissal behavior, and touch interaction model. Skill details and workout actions can now use the same underlying structure without each screen maintaining separate behavior.

The workout session was also reorganized around a shared session spine. The exercise, rest, setup, and finish views now use common visual primitives for actions, callouts, chips, and overlays. This reduced duplicated styling and made the transition rules easier to reason about.

Touch controls now follow a shared 44 pixel minimum hit target. This applies to session controls and other high-use areas, not just one button component. The workout flow also migrated to a shared `BaseButton`, which keeps states and spacing consistent.

On the data side, activity and notebook POST requests are now idempotent. If a request is retried, the server can recognize the existing operation instead of creating a duplicate record. Plan generation was also corrected to count the sessions it actually creates, including early completion cases.

We enabled stricter handling for unchecked indexed access across the client, server, utilities, and tests. This required fixing assumptions about values that may not exist, especially in session, calendar, media, and progress code. The work exposed several places where runtime checks were useful even when existing data usually looked complete.

The deployment pipeline was adjusted after a production build exceeded its memory limit, and missing icons were restored. Dependency audits now record why an advisory remains tolerated, while package changes stay within the versions supported by the current application.

## What's next

Our next focus remains the beta roadmap for training plans, calendar scheduling, activity summaries, and personal records. The session work gives those features a more stable place to connect with completed training data.
