# OneiroCycle — Canonical homepage design

## Authority

CAR-5 and the user's original Stitch design are authoritative. The user rejected the first implementation on 2026-11-14 for unauthorized additions and visual differences. Agent-written design contracts do not grant permission to depart from the source.

- Project: `8072174646258336334`.
- Desktop screen: `11739032930266818070`; HTML: `11065783241239000542`.
- Mobile screen: `be1747efb4544717b4a1ac2b403cd297`; HTML: `9878290599392228766`.
- Desktop corrupted exported screenshot is not visual truth; render original HTML instead.

## Fidelity contract

Use the exact source logo, available image assets, text, type sizes, color tokens, spacing, radii, icon paths/material symbols, card proportions and source hierarchy. Preserve original CSS gradients where they are actually in the source. No image generation, SVG illustrations, replacement logo, added English eyebrows, sample labels, new filters, section titles, footer or engineering explanation in the default page.

Desktop creator starts as the source collapsed pill and expands on interaction. The cinema card and two-row animated feature stream retain source proportions. Mobile uses its separate compact header, featured artwork, opposing animated exploration rows, two-column masonry, small floating prompt pill and pill-shaped bottom nav. Mobile expanded prompt uses only source tools and icon CTA, not additional modes/models/text buttons.

Localize source image/font files under public; do not rely on Tailwind CDN, third-party image hotlinks, or raw inline export scripts at runtime. React source renders native elements with controlled UI state; no HTML injection. Source SVG icons are retained, not redrawn. Desktop and mobile source utility geometry is separately scoped.

Disconnected actions may show feedback only after activation. No additional persistent status text, fake backend success, jobs, auth or account mutation. Original account/credit placeholders are source demonstration content, not real account data.

## Ownership

- Tokens and source geometry: `src/components/homepage/stitch-desktop.css`, `stitch-mobile.css`.
- Source font faces: `stitch-fonts.css`, local files in `public/fonts/stitch`.
- Desktop/mobile compositions: respective homepage components.
- Local behavior, authored menus, focus/viewport lifecycle and feedback: `use-stitch-homepage.ts` and `homepage-primitives.tsx`.
- `globals.css` may only add composition switching, accessibility and measured narrow-screen fixes; not a new visual language.

## Acceptance

Compare original HTML rendering and implementation at identical width, height, theme and interaction state; freeze source animations at the same timestamp. Include same-input side-by-side full frames and focused crops. Build/layout tests alone do not establish visual fidelity. Real mobile keyboard/safe-area UAT remains separate. Only the user can accept the final visual result.
