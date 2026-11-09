---
author: SkillTreq Team
date: '2026-11-09'
description: This update improves keyboard focus, reduced-motion support, and mobile
  safe-area handling while keeping dependencies, security checks, and CI maintenance
  current.
has_value_for_reader: true
locale: en
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 3 min
slug: devlog-13-safer-focus-motion-and-release-maintenance
tags:
  - features
  - tech
  - accessibility
  - frontend
  - dependencies
  - ci
  - devlog
title: 'Devlog #13: Safer focus, motion, and release maintenance'
type: devlog
---

## What's new for you

SkillTreq now handles several common interface conditions more reliably.

Keyboard users receive clearer focus management when temporary interface elements open. Focus is contained where it needs to be, then returned to the right place when the element closes. This reduces the chance of losing your position while moving through the app without a mouse.

The interface also respects your operating system's reduced-motion preference. When reduced motion is enabled, supported transitions are limited so navigation feels less visually demanding.

On mobile devices, layout spacing now accounts for safe areas around device cutouts and system controls. Bottom navigation and notification messages are less likely to sit too close to screen edges or overlap with device UI.

These changes do not alter how you record training. They improve the conditions around that workflow, especially when you use a keyboard, a mobile device, or accessibility settings.

## Why we made these changes

Training data is only useful when the interface stays predictable.

Focus management matters because a misplaced cursor can interrupt a session or make a form difficult to complete. We tightened this behavior around overlays and notifications so the interface communicates where your next action should happen.

Motion preferences are personal and sometimes necessary. We do not assume that animation improves every interaction. Supporting reduced motion lets the app adapt to the settings you already chose on your device.

Safe-area handling is also practical. Phones have different screen shapes and system regions. Treating these areas as design inputs helps keep navigation and status messages readable across more devices.

We made these changes as shared interface improvements rather than isolated fixes. That gives future screens a consistent set of patterns to follow.

## Technical details

We updated the shared styling system to use tokens for safe-area spacing. This keeps device-specific padding out of individual components and makes the behavior easier to review.

The focus trap and reduced-motion handling were applied in the shared toast and navigation areas. We also updated the project guidance and design documentation so these rules are recorded alongside the implementation.

This period included a broad dependency maintenance pass. We updated Pinia, the date picker, Floating UI, the icon package, and other minor and patch releases. We also moved `js-yaml` to its newer named-export API.

The CI type-check job now receives a 4 GB heap allocation. This addresses out-of-memory failures rather than hiding type errors. We also held TypeScript at version 6 until the current TypeScript ESLint support is ready for the next version.

CI artifact cleanup now removes old files and warns before storage limits become a problem. Security dependency updates cleared the existing audit threshold through upgrades, not by changing the baseline to ignore findings.

## What's next

We are continuing work on the beta roadmap, with focus on the training plan builder, calendar workflows, activity summaries, and personal records. The same approach will guide that work: make progress visible, keep interactions predictable, and support the devices and settings athletes already use.
