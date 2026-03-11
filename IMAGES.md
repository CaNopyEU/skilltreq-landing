# SkillTreq Landing — Required Images

All images should be captured in **dark mode** from the app (`www.skilltreq.app`).
Place files into the paths listed below — components already reference them.

---

## OG Image (social sharing)

- [ ] `public/og-image.png` — **1200×630px**
  - SkillTreq logo (icon.svg) + tagline on dark background (#000000)
  - Text: "Your skills as a dependency tree." or similar
  - Used by og:image and twitter:image meta tags

---

## Hero Screenshot

- [ ] `public/screenshots/hero-skill-tree.png` — **1600×900px** (2x retina for 800px display)
  - Full skill tree / dependency graph view from the app
  - Show a tree with mixed statuses (completed, in-progress, locked) so colors are visible
  - Ideally a real library like "Planche" or "Handstand" with several nodes

---

## Feature Screenshots (one per feature card)

- [ ] `public/screenshots/feature-skill-tree.png` — **800×450px**
  - Zoomed-in view of a skill tree branch
  - Show node colors: green (completed), blue (in-progress), grey (locked)

- [ ] `public/screenshots/feature-training-plans.png` — **800×450px**
  - Active training plan with visible progression
  - Show plan name, exercises, progress indicators

- [ ] `public/screenshots/feature-workout-logging.png` — **800×450px**
  - Workout log form or recent workout entry
  - Show sets/reps/holds input or a completed workout summary

- [ ] `public/screenshots/feature-progress-tracking.png` — **800×450px**
  - Radar chart or heatmap view
  - Show real-looking data with visible progress over time

- [ ] `public/screenshots/feature-coach-system.png` — **800×450px**
  - Coach dashboard or client list
  - If not ready yet, skip this one (component will show broken image)

---

## Notes

- **Format**: PNG, optimized (run through `pngquant` or similar)
- **Dark mode**: all screenshots in dark theme
- **Real data**: use filled-in demo data, not empty states
- **No personal info**: blur or use test accounts for any visible names/emails
- **Retina**: hero image is 2x, feature images are 1x (800px cards)
