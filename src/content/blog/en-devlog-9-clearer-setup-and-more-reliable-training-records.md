---
author: SkillTreq Team
date: '2026-09-07'
description: You can now set up libraries with less friction, choose from all activity
  groups, and trust that saved training data reflects what happened.
has_value_for_reader: true
locale: en
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 3 min
slug: devlog-9-clearer-setup-and-more-reliable-training-records
tags:
  - features
  - tech
  - training
  - libraries
  - data-quality
  - devlog
title: 'Devlog #9: Clearer setup and more reliable training records'
type: devlog
---

## What's new for you

This period focused on making setup and training records more predictable.

When you add a skill library, the app now initializes it automatically and gives you a setup window to review what was added. This replaces the previous initialization wizard. The goal is to reduce setup steps while keeping the result visible before you start training.

The activity-type picker can now reach every library group. You can select the training area you need without relying on a limited list of activity categories.

Plan target fields now handle comma decimals correctly. For example, you can enter `1,5` where your locale uses a comma as the decimal separator. This behavior is consistent across bodyweight, metric, range, and quick-log inputs.

Quick tests now pause their stopwatch when you save. The recorded time no longer continues running after the test has been submitted.

Offline workouts provide a clearer result after they are replayed. When a saved workout is sent after reconnecting, the finish flow reports what the replay produced. This makes it easier to confirm whether the session was recorded as expected.

We also corrected English mastery text in one library and adjusted difficulty gaps across several libraries. These content changes make the progression between nearby skills easier to interpret.

## Why we made these changes

Training data is only useful when you can trust how it was entered and saved.

The setup changes address two common sources of uncertainty: not knowing whether a library was ready, and not being able to select the activity group that matched your work. Automatic initialization removes an unnecessary decision. The setup window keeps the process inspectable.

Input handling needed the same level of consistency. A target such as `1,5 kg` or `1,5 reps` should not depend on which part of the plan you are editing. We updated the shared input paths so the same decimal behavior applies across the relevant fields.

Timing and offline saving are also part of the record, not just interface details. A stopwatch that keeps running after save can produce an incorrect test result. A replayed offline workout needs a visible outcome so you can identify whether the data was accepted, changed, or still requires attention.

Finally, we reviewed library content where the data itself created confusion. Difficulty gaps and leaked text can make a well-structured plan feel inconsistent. Correcting those entries supports clearer decisions during training.

## Technical details

We removed the stored `initialized` state from user library subscriptions. Initialization is now represented by the current library data and setup flow instead of a separate flag that could become stale.

The library store now treats an awaited `fetchAll()` as a reliable signal that its data is available. This makes dependent actions easier to reason about and reduces timing ambiguity in tests and user flows.

We added coverage for quick-test timer behavior, offline finish results, activity-type selection, and library-independent workout creation. These tests focus on observable outcomes rather than internal implementation details.

The rules validation tooling now fails when a configured file pattern matches nothing. This catches configuration drift earlier. We also tightened checks around authentication helper enforcement and corrected a seed case where a hidden library could regain an unintended relationship.

## What's next

The next focus remains the beta roadmap: training plan and calendar work, activity statistics, personal records, and the supporting blog content system. We will continue prioritizing reliable records and clear workflows as these areas become more complete.
