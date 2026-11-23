---
author: SkillTreq Team
date: '2026-11-23'
description: This update makes mobile layouts more consistent and gives you clearer
  feedback when actions are saved, reversed, or interrupted.
has_value_for_reader: true
locale: en
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 3 min
slug: devlog-15-clearer-feedback-across-mobile-training
tags:
  - features
  - tech
  - mobile
  - reliability
  - sessions
  - design-system
  - devlog
title: 'Devlog #15: Clearer feedback across mobile training'
type: devlog
---

## What's new for you

This update improves how SkillTreq responds during training, especially on smaller screens.

Mobile and desktop layouts now use one consistent breakpoint boundary. This reduces cases where the interface changes behavior at slightly different widths. Menus, buttons, navigation, and training controls should remain more predictable as you resize or rotate your device.

Progress changes also report their final server result more accurately. If the server rejects or rolls back a change, the app no longer reports it as completed. This keeps the skill tree closer to the state stored on the server.

Reversible actions can now show an undo control directly in the notification. When an action supports reversal, you can respond from the toast instead of navigating back to the skill detail view.

Session media capture now confirms when a capture made during an active session has been received. The message is intended to answer a simple question: did the upload reach the session?

Error notifications also have a clearer appearance in dark mode. The text and background colors now maintain sufficient contrast without changing the meaning of the message.

## Why we made these changes

Training records need clear state changes. A local interface can respond immediately, but the server remains the source of truth. When those two states differed, the previous message could make a failed change look complete. We changed the reporting so that confirmation reflects the saved result, not only the initial interaction.

Undo follows the same principle. Some actions are easy to reverse, but the reversal is most useful immediately after the action. Placing it in the notification keeps the recovery path close to the original decision.

We also focused on interruptions during active sessions. Media capture can take place while you are moving between exercises or recording a set. A confirmation gives you a useful checkpoint without requiring you to inspect the session manually.

The mobile changes address a different kind of uncertainty. Several parts of the app were using related, but separate, viewport checks. That can create inconsistent behavior when a device crosses a breakpoint. A shared CSS-based boundary gives the page and its skill graph the same definition of mobile layout.

## Technical details

We replaced JavaScript width checks in the skills page and graph with the same CSS media-query predicate used by the design system. This keeps layout decisions aligned with the browser’s active styles.

The mobile scroll lock now releases when the viewport leaves the mobile range. This handles rotation and resized windows without leaving the page locked after the layout has changed.

We added tests for breakpoint transitions, scroll-lock ownership, progress sync outcomes, undo behavior, error handling, and dark-mode color token parity. These tests cover state changes rather than only static rendering.

On the session side, the media upload and overlay flow now carry a confirmation state through to the session detail view. The message appears when the capture has been accepted by the upload flow.

We also clarified the status sets used by plan session endpoints. The names make the differences between active, completed, and deactivated states easier to follow when reading or changing the backend code.

## What's next

Our next focus remains the beta roadmap: training plan and calendar work, activity summaries, and personal records. We will continue using the same approach by making saved state visible, keeping recovery paths close to actions, and testing behavior across mobile and desktop layouts.
