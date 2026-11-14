> 2026-11-14 用户视觉验收否决：本文件中由代理自行加入、与 canonical Stitch 原稿不一致的规则（本地自绘 SVG 替代、四档字号统一、新增文案/布局等）全部撤销。用户原始设计优先；返工以 DESIGN.md 与 REWORK.md 为当前合同。以下保留为首轮历史，不代表用户批准。

# CAR-5 — Stitch 首页实现规格

**Source of truth:** Linear CAR-5 and the two named screens plus source HTML in Stitch project `8072174646258336334`.

- Desktop screen: `projects/8072174646258336334/screens/11739032930266818070`
- Desktop HTML: `projects/8072174646258336334/files/11065783241239000542`
- Mobile screen: `projects/8072174646258336334/screens/be1747efb4544717b4a1ac2b403cd297`
- Mobile HTML: `projects/8072174646258336334/files/9878290599392228766`
- Issue: https://linear.app/cardof/issue/CAR-5/前端按-stitch-设计实现首页桌面端-移动端响应式

The imported desktop raster export is visibly corrupted. Use the current Stitch screen and its original HTML as the visual/interaction source, and compare with the implementation's actual browser rendering. Do not reproduce artifacts from that raster export.

## Goal

Implement the OneiroCycle homepage in the existing Next.js frontend. Desktop and mobile follow their respective Stitch designs; mobile is a dedicated layout, not a scaled desktop page.

## Scope

- Desktop: liquid-glass shell and sidebar, header/category navigation, creator controls, feature marquee, featured banner, inspiration masonry/feed, and relevant settings/overlay states.
- Mobile: compact account/credits header, featured banner, horizontally browsable feature exploration, two-column inspiration feed, collapsible floating prompt dock, safe-area-aware bottom navigation, and expanded prompt state.
- Implement visible in-page navigation, toggles, search, menu, modal, scrolling, and dock interactions with keyboard/touch affordances.
- Where a service or destination is not implemented, keep a clear placeholder/informational response. Do not submit a real generation job, persist account changes remotely, or imply success.
- Reuse the existing stack and route; no new backend, auth, generation provider, full canvas/3D editor, or unrelated routes.

## Acceptance criteria (from CAR-5)

1. Desktop and mobile screens are separately compared with the named Stitch designs for primary composition, hierarchy, and component styling.
2. At 375, 390, 768, 1280, and 1440 CSS pixels, content remains usable without unintended horizontal overflow, clipping, or fixed-layer overlap.
3. Mobile prompt dock expands and collapses by touch and keyboard; focus/input remain usable when a soft keyboard is shown, with safe-area spacing.
4. Navigation, switching, buttons, and scrolling work as designed; disconnected features report their unconfigured state.
5. Form controls have labels, controls have accessible names, and keyboard focus is visible.
6. The app has a runnable homepage entry, updated startup guidance, desktop/mobile browser screenshots, and a verification record describing any design deviations.

## Design and implementation boundaries

- Use current Stitch HTML for copy, structures, interaction intent, and visual tokens. Extract reusable React components and local CSS; do not ship the Stitch page as raw HTML or inline event handlers.
- Use the project's existing TypeScript/React/Tailwind stack. Keep browser-only state/behavior inside client components.
- Use representative curated demo content only where Stitch shows sample inspiration cards; label unavailable actions honestly.
- No remote API calls or generated-content claims are introduced by this phase.
- Preserve existing foundation and unrelated working-tree changes. No push, merge, or deployment.
