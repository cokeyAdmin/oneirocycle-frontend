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
