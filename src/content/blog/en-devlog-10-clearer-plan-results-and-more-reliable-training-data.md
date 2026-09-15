---
author: SkillTreq Team
date: '2026-09-14'
description: Plan summaries, progress history, reminders, and data checks now make
  training results easier to review and trust.
has_value_for_reader: true
locale: en
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 4 min
slug: devlog-10-clearer-plan-results-and-more-reliable-training-data
tags:
  - features
  - tech
  - devlog
  - progress
  - training-plans
  - iOS
  - data-quality
title: 'Devlog #10: Clearer plan results and more reliable training data'
type: devlog
---

## What's new for you

This update makes it easier to understand what changed during a training plan.

When a plan finishes, SkillTreq now shows a completion summary with the relevant bodyweight information and progress context. You can review the result from the plan list, completion banner, and plan summary. A plan can also be marked complete when it reaches its end date, not only when it is manually finished.

The journey timeline now records step advances. This gives you a clearer view of how your training history developed over time, instead of showing only the current state.

You can also receive missed-workout reminders on iOS through Apple Push Notification service. These reminders are optional and can be managed in notification settings.

Onboarding is shorter. The separate language selection step has been removed. The app now follows your browser locale during setup, with the supported language settings still available where appropriate.

The iOS app also has its own branded icon and splash screen. This makes the native app easier to identify when you open it from your device.

Several data corrections improve the reliability of skill libraries. Mastery criteria now connect to measurable metrics that the related movement actually tracks. We also fixed a parsing case where a leading number could make an incorrect criterion appear valid.

## Why we made these changes

A finished plan should answer a practical question: *what changed while I followed it?* Previously, that answer was spread across different parts of the app. We added a focused summary so you can review the outcome without reconstructing it from individual sessions.

The timeline follows the same principle. Training progress is not only a final measurement. The order and timing of changes matter when you are trying to understand whether a plan was well matched to your current capacity. Recording step advances gives you more useful context for that review.

We also changed completion handling to match how people use date-based plans. Some plans end because their scheduled period is over. Treating those plans as incomplete created an inaccurate record, so completion now reflects both manual actions and the plan end date.

Reminders serve a different purpose. Missed sessions can be easy to overlook when training is part of a busy week. The iOS reminder option provides a simple prompt without changing your schedule or assuming why a session was missed. You control whether it is enabled.

During onboarding, asking for a language before we know the device context added a step without improving the result for most users. Following the browser locale removes that decision from the initial setup and keeps attention on training goals.

Finally, skill data needs to be interpretable. A mastery requirement is useful only when it can be compared with a metric recorded by the movement. We reviewed the affected library entries and corrected the parsing rules so displayed criteria better match the underlying training data.

## Technical details

The plan completion changes required updates to the plan data model and database migration. Completion can now be derived when a plan reaches its configured end date. The training plan store was also corrected so an awaited `fetchPlans()` call reliably means the store contains the fetched data. This avoids a timing mismatch for views that render plan results immediately after loading.

The journey timeline now receives step advance events through the stats API and renders them with translated labels. We added checks for English, Czech, and Slovak locale coverage while making these changes.

For iOS reminders, the app uses APNs configuration through the native shell. Settings expose the notification control, while the server handles the reminder event. The native settings view also hides the support section that does not apply inside the app shell.

We expanded the rules lint tooling in three areas:

- It checks that translation keys used with `$t()` exist in `en.json`.
- It checks locale key nesting depth.
- It validates analytics event shapes and reactive translation arrays.
- It rejects configuration options that are declared but never applied by a rule.
- It checks comments that explain why code exists, rather than only describing what it does.

These checks are intentionally narrow. They catch repeated classes of mistakes during development without trying to replace tests or code review.

We also corrected the move search total so it represents the full result count before pagination is applied. This keeps search metadata consistent with the actual result set.

## What's next

Our next focus remains the beta roadmap: completing the training plan builder and calendar, then expanding the activity heatmap, statistics, and personal record views. The new plan summaries and timeline events provide the foundation for those features by giving progress views more complete data to work with.
