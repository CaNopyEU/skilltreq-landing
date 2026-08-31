---
author: SkillTreq Team
date: '2026-08-31'
description: This update gives you more reliable metric input, clearer workout timing,
  and finer control over plans, deloads, and session changes.
has_value_for_reader: true
locale: en
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 4 min
slug: devlog-8-more-precise-training-logs-and-plan-control
tags:
  - features
  - tech
  - training
  - planning
  - accessibility
  - reliability
  - devlog
title: 'Devlog #8: More precise training logs and plan control'
type: devlog
---

## What's new for you

You can now record training metrics with less friction and more control.

Metric fields accept comma decimals as well as periods. This supports inputs such as `7,5` for users whose locale uses a comma as the decimal separator. Typed values remain authoritative when you use the repetitions ruler, so a decimal value is not silently replaced by a whole number. The active workout also supports half-rep entries where they are appropriate.

Workout timers now show a duration target zone. During an active session, you can see whether the current duration is below, within, or beyond the target. Timer zone changes are also announced to screen readers. This makes hands-free training easier to follow without relying only on visual changes.

Several plan and session controls have been expanded:

- Completed sets remain recorded when you skip the rest of a block or exercise.
- You can change a progression direction during a workout.
- Deloads can reduce sets or reps, and you can override the strategy for a specific day.
- Logged performance can adjust the target weight for later plan work.
- Plan sessions can be marked as required or optional when deciding how missed sessions should be handled.
- Plan cards show when their content was last modified.
- Library previews are available for nodes that are not currently subscribed.
- A continuation library can be suggested as you approach the end of a library.

Onboarding now resolves your library starting point from the stored database value. This keeps the selected training entry point consistent with the data attached to your account.

## Why we made these changes

Training records are only useful when they reflect what you actually did. Input behavior should not force you to change your notation or estimate a value again. Supporting comma decimals and half reps reduces that gap between the session and the record.

The repetitions ruler needed a clear rule for mixed input. A ruler is useful for selecting common whole-rep values quickly. It should not override a value that you typed deliberately. We kept those two behaviors separate: the ruler helps with selection, while typed input remains the source of truth.

Timing also needs context. A running clock tells you how long an exercise has lasted, but it does not tell you whether that duration matches the intended target. The target zone gives you a simple reference during the session. Screen reader announcements provide the same state change through audio, which is important when your attention is on the movement rather than the screen.

Plan controls are designed around real training conditions. You may complete part of a session, skip an exercise, adjust a progression, or need a different deload approach for one day. Preserving completed sets prevents lost records. Per-day overrides avoid forcing one plan-wide decision onto every session.

We also added more information around plan maintenance. A modified date helps you tell whether a plan reflects recent changes. Required and optional session settings make missed-session handling explicit instead of assuming every session has the same importance.

The library changes follow the same principle. You can inspect available content before deciding whether it fits your training. A continuation suggestion provides a clear next area to review when a library is nearly complete, without changing your current training automatically.

## Technical details

This period included work across the training interface, data model, and delivery process.

Metric parsing and formatting were updated across quick logging, bodyweight inputs, set rows, skill tests, and active workout inputs. Unit tests cover ruler locking, decimal authority, and metric formatting. The timer now tracks target-zone state in the workout components and hands-free countdown flow. Accessibility announcements are localized in the supported interface languages.

Session helpers were changed so completed sets are retained when a block or exercise is skipped. Plan metadata now supports missed-session policy and content modification dates. Deload configuration supports both plan-level strategy and day-level overrides. Weight adjustment uses logged performance from the session finish flow and exposes the change before it is applied.

We also added server-side protections to authenticated endpoints. Rate limits now cover the endpoints identified during rules review. A per-user server event log provides a more consistent record of relevant account activity while keeping events associated with the correct user.

The development workflow received reliability work as well. End-to-end tests now run in continuous integration instead of as a required pre-push task. The suite was adjusted to avoid stale writes, environment parsing differences, and other sources of non-deterministic results. Failed end-to-end runs can be routed through an automated triage step in the pull request workflow.

Repository checks were also tightened. Locale parity and required-file checks now run through the rules lint tooling. Analytics call scanning replaced the older event-table approach, and repository scanning no longer walks nested worktrees. Deployment classification now distinguishes skipped, migration-only, and full deployments before promotion.

## What's next

We are continuing beta work on the training plan and calendar experience. The next focus is improving activity history, statistics, and personal records so your logged sessions are easier to review over time.

We will also continue refining the content engine and library data while keeping training records and plan behavior explicit. Post-beta work remains focused on data export, personal record trends, and a training journey timeline.
