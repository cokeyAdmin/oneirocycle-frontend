> 2026-11-14 用户视觉验收否决：本文件中由代理自行加入、与 canonical Stitch 原稿不一致的规则（本地自绘 SVG 替代、四档字号统一、新增文案/布局等）全部撤销。用户原始设计优先；返工以 DESIGN.md 与 REWORK.md 为当前合同。以下保留为首轮历史，不代表用户批准。

# Phase 02: Implement Stitch homepage (desktop and mobile) — Context

**Gathered:** 2026-11-14
**Status:** Ready for planning
**Source:** PRD Express Path (.planning/phases/02-implement-stitch-homepage-desktop-and-mobile/SPEC.md)

<domain>
## Phase Boundary

Deliver the existing frontend's OneiroCycle homepage from Linear CAR-5, matching its explicitly linked desktop and mobile Stitch designs. This phase covers responsive layout, sample inspiration content, and in-page interactions only. It does not add backend endpoints, authentication, real generation, additional product routes, or push/merge/deploy.

</domain>

<decisions>
## Implementation Decisions

### Source of truth and composition

- Follow desktop Stitch screen `11739032930266818070` and HTML `11065783241239000542` for desktop.
- Follow mobile Stitch screen `be1747efb4544717b4a1ac2b403cd297` and HTML `9878290599392228766` for mobile.
- The mobile screen is intentionally distinct; do not shrink the desktop layout into a phone viewport.
- The exported desktop raster is corrupted; compare with the source screen, HTML, and actual page rendering instead of reproducing its artifacts.

### Responsive layout and visual contract

- Keep the desktop liquid-glass navigation/creator/feed composition from Stitch.
- Keep the mobile compact account header, feature exploration, inspiration feed, floating prompt dock, and bottom navigation from its dedicated Stitch design.
- Verify 375, 390, 768, 1280, and 1440px widths with safe-area and fixed-layer clearance.

### Interaction and service boundaries

- Implement the page-visible navigation, mode/model/type switching, search, scrolling, modal, and prompt-dock interactions.
- Provide visible focus and accessible names/labels; touch and keyboard both operate key controls.
- Unconnected actions give a clear unavailable/placeholder response; no real API, generation job, remote account mutation, or false success is introduced.
- Use the existing Next.js/React/TypeScript/Tailwind stack. No shadcn initialization or new UI dependency is needed to reproduce the supplied design.
- Preserve other worktree changes; do not touch the backend repository or perform remote Git operations.

### Agent discretion

- Choose component/file boundaries and responsive breakpoints consistent with the supplied source and existing project conventions.
- Use a small local sample dataset matching the visible Stitch cards; keep it explicitly illustrative.
- Reuse/design local tokens in CSS; avoid adding a component framework for this one page.

</decisions>

<canonical_refs>

## Canonical References

### Product scope and acceptance

- `.planning/phases/02-implement-stitch-homepage-desktop-and-mobile/SPEC.md` — CAR-5 scope, constraints, acceptance criteria, and exact Stitch resource IDs.
- `.planning/REQUIREMENTS.md` — HOME-01 through HOME-06.
- `.planning/ROADMAP.md` — Phase 2 goal and completion criteria.

### Existing frontend conventions

- `AGENTS.md` — stack, no-fake-success, code boundaries, and local verification commands.
- `src/app/layout.tsx` — current root shell and metadata.
- `src/app/globals.css` — global CSS entry.
- `src/app/page.tsx` — current placeholder route.

### Visual and interaction references

- Stitch project `8072174646258336334`, desktop screen and HTML IDs above.
- Stitch project `8072174646258336334`, mobile screen and HTML IDs above.

</canonical_refs>

<specifics>
## Specific Ideas

- Desktop source contains a collapsible primary sidebar, category/mode tabs, creative prompt/model controls, feature marquee, promotional panel, inspiration cards, and settings surface.
- Mobile source contains an account/credits header, promo panel, horizontal feature rows, masonry inspiration cards, expandable prompt dock/backdrop, and bottom navigation.
- Document real browser screenshots and any deliberate differences from Stitch in `docs/verification-homepage.md`.
</specifics>

<deferred>
## Deferred Ideas

- Real authentication, server persistence, project/asset APIs, AIGC provider calls, and task progress.
- Full editor, canvas, 3D director, Agent execution, and all non-homepage routes.
- Push, merge, and production deployment.

</deferred>

---

_Phase: 02-implement-stitch-homepage-desktop-and-mobile_
_Context gathered: 2026-11-14 via PRD Express Path_
