---
author: SkillTreq Team
date: '2026-04-01'
description: 'A month of shipping: migrating the skill graph to canvas, wrapping the
  app in Capacitor for iOS, building a full equipment system, and launching the AI
  plan assistant.'
has_value_for_reader: true
locale: en
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 5 min
slug: devlog-1-canvas-rendering-native-shell-equipment-system
tags:
- cytoscape
- capacitor
- equipment
- ai
- body-map
- devlog
title: 'Devlog #1: Canvas Rendering, Native Shell, and the Equipment System'
type: devlog
---

## What we worked on

March was dense. We shipped 114 commits across the SkillTreq app, touching the skill graph renderer, native iOS shell, equipment filtering, body map visualization, AI-assisted plan building, and six new content libraries.

The biggest single change: migrating the interactive skill tree from VueFlow (DOM-based) to Cytoscape.js (canvas-based). This was a performance decision. With 400+ skill nodes on screen, DOM rendering struggled on mobile devices. Canvas rendering handles the same graph at a fraction of the memory cost.

We also wrapped the web app in Capacitor for iOS, built a complete equipment system (Phase 33), expanded the body map with training coverage data (Phase 32), and shipped an AI plan assistant prototype (Phase 34).

## Why these changes

**Canvas rendering for the skill graph.** The skill tree is the core navigation surface of the app. On older phones, panning through 400 nodes caused frame drops and delayed tap responses. VueFlow rendered each node as a Vue component in the DOM. That approach gave us easy styling and reactivity, but at scale the browser's layout engine became the bottleneck. Cytoscape.js draws everything on a single `<canvas>` element, which lets the GPU handle rendering directly. The migration required rebuilding animations (progress fill bars, particle effects, focus overlays) and adding level-of-detail logic to simplify nodes at low zoom levels. Post-migration, we spent two weeks fixing edge cases: memory leaks from orphaned event listeners, animations pausing during pan/zoom, and console warnings from invalid Cytoscape style properties.

**Equipment profiles.** Athletes train in different environments. Someone at a park has a pull-up bar and parallel bars. Someone at home might only have rings and a mat. The equipment system (Phase 33) lets users declare what they own, then filters the plan builder and swap drawer accordingly. Each move in the library now carries equipment metadata. The plan builder shows warnings when a scheduled exercise requires gear the user hasn't listed. We tagged all 415 moves across every library.

**Capacitor native shell.** The web app works well in a browser, but mobile users expect native behaviors: safe area insets, haptic feedback, biometric lock, proper keyboard handling, and local notifications. Capacitor wraps the existing Nuxt app in a native iOS shell without rewriting the frontend. Most of the work was adjusting layouts for safe area insets across all bottom sheets, dropdowns, and action menus. We also added a biometric lock overlay and splash screen.

**Body map and training coverage.** Phase 32 added a visual body map to the progress page. It highlights which muscle groups are being trained and which are being neglected. The initial version was a simple front-view SVG. We iterated to add a back view, per-category zones (shoulder, hip, spine, ankle, wrist), zone tap for detail sheets, and training coverage calculations. The coverage model factors in activity sessions (yoga, climbing, swimming) alongside structured workouts, with different recovery timelines per zone.

**AI plan assistant.** Building a multi-week training plan by hand is time-consuming. The AI assistant (Phase 34) uses Claude via an MCP server to generate plan proposals based on the user's subscribed libraries and goals. The UI is a chat panel with plan preview and one-click import. We went through several transport iterations: Claude Agent SDK (caused EBADF errors in Node), CLI subprocess, and finally the Anthropic SDK with OAuth tokens through an RPi proxy. The two-phase generation approach, draft then validate, catches structural issues before the user sees the plan.

**New content libraries.** We added jump rope (beginner and intermediate), kickbox (beginner through advanced), tricking (beginner through advanced), and combat mobility. Each library includes full SK and CS translations. We also embedded YouTube tutorial links across 200+ moves and built a tutorial report button so users can flag broken video links.

## What we learned

**Canvas migration is a one-way door.** Once you move from DOM to canvas, you lose CSS-based styling, browser DevTools element inspection, and Vue reactivity on individual nodes. Every visual feature needs to be reimplemented in the canvas API. The performance gain was worth it, but the follow-up bug surface was larger than expected. We spent more time on post-migration fixes than on the migration itself.

**Equipment tagging is a data problem, not a code problem.** The system code (DB schema, API, UI) took about two days. Tagging 415 moves with correct equipment metadata took longer. Some moves have ambiguous requirements. Is a wall a piece of equipment? (Yes, for wall handstands.) Getting the taxonomy right mattered more than the code.

**Safe area insets affect everything.** Adding Capacitor iOS support touched 14 components. Every bottom sheet, dropdown, and fixed-position element needed inset adjustments. We underestimated how many layout-false pages had hardcoded padding.

**AI transport is fragile.** We went through four different approaches to calling Claude from the Nuxt server before settling on the Anthropic SDK with OAuth. Each previous approach failed for a different reason: the Agent SDK caused file descriptor leaks on dev startup, the CLI subprocess had encoding issues, and direct API calls needed token refresh logic. The working solution uses an RPi proxy that handles OAuth token management separately.

## What's next

April focuses on the beta launch checklist. The training plan builder and calendar need polish before we can invite external testers. The activity heatmap and personal records pages are next in the pipeline. On the content side, we are building out this blog infrastructure so devlogs like this one publish automatically.
