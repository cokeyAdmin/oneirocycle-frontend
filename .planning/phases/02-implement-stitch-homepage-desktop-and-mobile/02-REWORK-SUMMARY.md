---
phase: 02-implement-stitch-homepage-desktop-and-mobile
status: reworked-awaiting-user-review
code_commit: 45bf9f1
---

# CAR-5 — Rejected visual acceptance corrected

User rejected the first submission for unauthorized UI additions and source mismatch. The former SVG/typography/layout exceptions were agent-authored, not approved. They are superseded; history is retained, not rewritten as a user-approved deviation.

Restored canonical source text, logo/media/fonts, source geometry, collapsed desktop creator and original authored controls, cinema/automatic feature stream, mobile compact opposing rails/masonry/small dock/pill navigation and source-only expanded tools. Removed replacement art, invented persistent copy, added filters/section/footer, extra mobile modes/model/CTA and obsolete first-pass data/tests. All source assets are local; runtime uses React state/explicit actions, not export scripts/CDN/HTML injection.

Visual rework used same-viewport/state source and app captures together, with focused crops. Fixed v3/v4 margin and registered-gradient collisions, type-selector scoping corrupting `font-body-*`, Material Symbols specificity, and lost html line-height. Confirmed real responsive measurements after transitions settle and focus after the scheduled return frame.

Verified on final application: npm run check PASS (7 files / 17 tests), production build PASS; 375/390/768/1280/1440 browser matrix PASS; source menus, prompts, sidebar/theme/settings/search, mobile touch/keyboard/focus/breakpoint, reduced-motion and 600/440/360 viewport proxy PASS. No page errors, external media/font requests or business fetch/XHR. Static UI audit: 0 findings. Four full paired captures and focused comparisons reviewed; final author QA in design-qa.md is separate from user acceptance.

Evidence: docs/verification-homepage-rework.md, docs/assets/rework/, design-qa.md. Final user visual acceptance and physical mobile OS keyboard/safe-area UAT remain PENDING. No push/merge/deployment/backend work. This was an inline acceptance-fix loop, not a fabricated independent or multi-agent review.
