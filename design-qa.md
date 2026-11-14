# CAR-5 — Source fidelity rework QA

## Target and evidence

- User rejected the previous UI for unauthorized additions and visual mismatch. The original Stitch desktop/mobile HTML is the source of truth; no agent-written exception is treated as approval.
- Source visual truth: [desktop source](docs/assets/rework/desktop-source-closed.png), [mobile source](docs/assets/rework/mobile-source-closed.png), plus corresponding `*-source-open.png` files.
- Rendered implementation: [desktop](docs/assets/rework/desktop-app-closed.png), [mobile](docs/assets/rework/mobile-app-closed.png), plus `*-app-open.png` files.
- CSS viewports: desktop **1440 × 1060**, mobile **390 × 1519**, density **1**. Full-page desktop source/app each measures **1440 × 1102** due the source document's original height; mobile each measures **390 × 1519**. No image rescaling or mismatched viewport comparison. The corrupt exported desktop raster is not used.
- States: default collapsed creator, then expanded creator with empty focused textarea. Same fonts, theme, browser; animations paused at time 0 on both sides.
- Browser plugin not available; used installed Playwright/Chromium. Local production app is `http://127.0.0.1:3102/`; source HTML was separately rendered from the local reference fixture.

## Full-frame and focused comparisons

All comparisons contain the source and implementation in the **same image**, left/right respectively:

- [Desktop collapsed](docs/assets/rework/desktop-closed-comparison.png), [desktop expanded](docs/assets/rework/desktop-open-comparison.png).
- [Mobile collapsed](docs/assets/rework/mobile-closed-comparison.png), [mobile expanded](docs/assets/rework/mobile-open-comparison.png).
- [Desktop creator crop](docs/assets/rework/desktop-creator-comparison.png), [mobile content crop](docs/assets/rework/mobile-detail-comparison.png), [mobile dock crop](docs/assets/rework/mobile-dock-detail-comparison.png).

## Findings and resolution history

1. **P1, rejected first submission:** substituted logo/images, invented labels/sections/filters/footer, expanded desktop creator by default, changed feature motion and mobile controls. Fixed by restoring source assets, text, hierarchy, exact source-sized controls and source default/open states. No newly generated imagery remains.
2. **P2, first rework comparison:** mixed v3/v4 utilities changed gradients and added a second spacing margin; scoped root utility selectors missed the root itself. Fixed by isolating precompiled source geometry, namespacing legacy variables and covering root utilities. Re-captured both states.
3. **P2, mobile rework comparison:** naive type-selector replacement also changed `font-body-*` class names; scoped utility specificity overrode source Material Symbols sizing. Fixed actual selector handling and font-rule order/specificity. Re-captured full frames and details.
4. **P2, detail comparison:** mapping html/body to one component root discarded the html base line-height. Restored source unitless `1.5` inheritance, then rebuilt and re-captured all four state pairs. Mobile has no pixel differences above the diagnostic threshold of 8/channel in the tested captures; this is diagnostic evidence, not a claim of user acceptance or universal pixel equality.
5. **Interaction checks:** preserved source collapsed sidebar reopening, explicit menu actions and source feedback; browser assertions wait for responsive width transitions and scheduled focus return rather than misclassifying a transient frame as a defect.

## Required fidelity surfaces

| Surface                | Source-grounded review                                                                                                                                                                                                                  |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fonts / typography     | Original system desktop stack and local copies of Outfit / Space Grotesk / JetBrains Mono / Material Symbols. Source sizes, weights, leading and truncation restored; no imposed four-size scale. Focused text/control crops inspected. |
| Spacing / layout       | Original creator pill/default and expanded shape, cinema + feature proportions, two opposing mobile rows, image columns, original floating pill and bottom nav. Full-frame region alignment inspected at matched state/density.         |
| Colors / tokens        | Source dark palettes, existing gradients, glass and effects restored; no replacement accent palette. Legacy custom properties isolated to avoid registered-property collisions.                                                         |
| Images / asset quality | Exact downloadable source logo and media files stored locally; source gradients kept only where the original actually uses them. No handwritten SVG illustration or replacement brand.                                                  |
| Copy / content         | Restored original text; removed added English eyebrow, labels, new category filters, headings/footer, default engineering notices and extra mobile modes/models/CTA. Unavailable notice appears only after an action.                   |

No remaining actionable P0/P1/P2 visual finding identified in these matched-state comparisons. **P3:** desktop glass/background compositing and cursor/focus rasterization retain small pixel-level differences; not represented as exact pixel equality. Any user-reported substantive mismatch reopens QA, rather than being retrospectively approved through this document.

## Runtime evidence and limits

- `npm run check`: format/lint/strict TS and **17 tests** PASS. Production build PASS.
- [Browser JSON](docs/assets/rework/browser-results.json): all five widths pass; source menus, collapse/expand, local search, mobile touch/keyboard/focus lifecycle and reduced-height proxy pass; no runtime page errors, external media/font requests or business fetch/XHR.
- [Static UI audit](docs/assets/rework/premium-audit.json) is additional evidence, not a substitute for rendered comparison.
- Physical mobile OS keyboard / safe area: **PENDING**. Final **user visual re-acceptance: PENDING**. This QA result means the scoped author comparison is complete, not that the user has accepted it.

final result: passed
