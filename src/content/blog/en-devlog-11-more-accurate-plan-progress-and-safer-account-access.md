---
author: SkillTreq Team
date: '2026-10-19'
description: Training plans now reflect completed work more accurately, while account
  access, localization, and deployment reliability have received targeted fixes.
has_value_for_reader: true
locale: en
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 4 min
slug: devlog-11-more-accurate-plan-progress-and-safer-account-access
tags:
  - features
  - tech
  - devlog
  - training-plans
  - authentication
  - reliability
title: 'Devlog #11: More accurate plan progress and safer account access'
type: devlog
---

## What's new for you

Training plan progress now reflects your recorded sessions more accurately.

If sessions were completed but the plan had not caught up, SkillTreq now reconciles that activity before calculating adherence. This means the adherence figure on a plan is based on the work recorded in your training history, rather than only on the plan's previous state.

You can also finish a plan manually. This is useful when you have completed the intended work but the plan does not have another automatic state change to apply. A finished plan remains available for reference.

Completed and paused plans now show adherence on their cards. You can review how closely you followed a plan without opening each plan individually.

We also fixed several smaller issues:

- A recent locale choice now takes priority while it is being saved. The interface should no longer briefly return to the older database value.
- GitHub sign-in callbacks now validate against the configured GitHub issuer.
- Plan changes now clear related session and statistics caches, so updated plans are less likely to display old information.
- If rate limiting has to fall back to in-memory storage, the deployment configuration now states that behavior clearly.

## Why we made these changes

A training plan is useful only when its status matches what you actually did. Previously, a plan could show outdated adherence after sessions had been recorded or after the plan structure changed. That creates uncertainty when you use the calendar to review your training.

We chose to reconcile sessions before calculating adherence instead of treating the stored plan status as the source of truth. Recorded activity is closer to the athlete's actual behavior. The plan can then describe that behavior without requiring manual corrections in common cases.

Manual completion addresses a different situation. Not every plan ends through the same automatic path. You may finish the intended work, stop using the plan, or reach a valid endpoint that the schedule cannot infer. Providing a direct finish action keeps the plan's lifecycle under your control.

Showing adherence on completed and paused cards supports review after a plan ends. Training history is not only useful during an active plan. It also helps you compare your intended schedule with what happened over time.

The locale fix follows the same principle. Your current choice should be visible immediately, even while the saved preference is still being written. We also made the account and deployment fixes because inconsistent sign-in validation or unclear rate-limit behavior can make otherwise correct training features harder to use.

## Technical details

The plan update adds a reconciliation path for sessions and adjusts the data model and migration used by plan statistics. Replacing a plan now also evicts its session and statistics caches. This avoids serving results calculated from the previous plan structure.

Adherence calculations are shared by active, completed, and paused plan views. The plan list cards receive the computed values from the server, which keeps the summary consistent with the detail view.

For authentication, the GitHub OAuth configuration now includes the issuer required for callback validation under the relevant standard. The change is covered by a guard test for the provider issuer.

Rate limiting now reports when its durable storage configuration is unavailable and the application falls back to in-memory behavior. In-memory limiting is useful as a fallback, but it is local to a running process. Making that limitation visible helps deployment checks identify configurations that need attention.

We also removed the unused `personal_records.context` database column. Removing dead schema reduces the number of fields that future code and migrations need to account for.

Several maintenance changes support the same release. The application and test dependencies were updated, the content-security policy now hashes the import map required for production startup, and the continuous integration checks received stronger coverage for audit and type-safety rules. We also added new movement data covering explosive power work and beginner first-person-view drone control, navigation, and acrobatics.

## What's next

We are continuing work on the beta roadmap, with focus on the training plan builder, calendar workflow, activity summaries, and personal records. The next changes will continue to connect recorded sessions with clearer long-term training history.
