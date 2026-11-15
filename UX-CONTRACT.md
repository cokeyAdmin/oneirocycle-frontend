# Homepage behavior contract

User-supplied Stitch visuals are authoritative; this file does not authorize any additional product UI.

| Capability     | Canonical owner                                        | Variant                                                                                                                          | Verification                              |
| -------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Select/Listbox | use-stitch-homepage.ts and the original markup         | Authored menus for creator type/model; native select for the original settings engine field, whose OS popup is allowed by source | Browser open/select/close checks          |
| Form           | Original prompt textarea, React controlled local state | Source collapsed/expanded geometry, no new visible labels or options                                                             | Touch/keyboard/focus checks               |
| Scrollbar      | Scoped Stitch source CSS                               | Original WebKit geometry; standards fallback only on non-WebKit engines                                                          | CSS audit + browser geometry              |
| Toast          | SourceNotice                                           | Appears only after an unavailable action; no default status copy                                                                 | Browser action, no API calls              |
| Modal          | Source desktop dialog and source mobile panel          | Preserve original appearance; Escape/backdrop, keyboard focus and viewport cleanup                                               | Browser open/close/focus/reduced viewport |

All backend-dependent actions remain unavailable. Static source account/model/credit copy is demonstrative design content, not actual backend state. No persistence, upload, jobs, billing, login, merge or deployment is implied. Navigation to unimplemented destinations shows the same unavailable feedback rather than a fabricated new route.

## CAR-7 desktop variants (approved 2026-11-15)

- Scroll owner: `#desktop-workspace-scroll-container` holds only the right body; header and sidebar live outside it. Home/tools/floating prompt use this owner. The mobile shell retains its existing scrolling.
- Mode switch: controlled `LiquidNavbar` uses the existing category state, exposes four named buttons and arrow/Home/End keyboard switching. No audio.
- Prompt: `DesktopPromptInput` extends the existing desktop prompt variant, shares the existing prompt/type/model state, and uses capsule expansion, autogrow and spring transitions. Escape restores trigger focus; empty blur collapses; IME Enter does not submit. Unconfigured actions use the existing SourceNotice. Demo attachment/voice/effort features are not new product capabilities.
- Logo and name: optical effects keep the original asset/name, with static fallbacks and reduced-motion support. Logo replay is a visual interaction only.
