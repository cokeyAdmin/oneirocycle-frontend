---
phase: "02"
slug: "implement-stitch-homepage-desktop-and-mobile"
status: draft
nyquist_compliant: false
wave_0_complete: false
created: "2026-11-14"
---

# Phase 02 — Validation Strategy

> Per-phase validation contract for CAR-5 implementation, browser evidence, and the physical-device UAT boundary.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 5.1.0 plus Next.js production build/HTTP smoke and cached Chromium browser automation |
| **Config file** | No standalone Vitest config; `package.json` owns scripts. Browser executable: `/opt/data/home/.cache/ms-playwright/chromium-1247/chrome-linux64/chrome` |
| **Quick run command** | `npm test` |
| **Full suite command** | `npm run check && npm run build` |
| **Estimated runtime** | Under 60 seconds on the current project/container; browser artifact capture runs separately |

---

## Sampling Rate

- **After every implementation task commit:** Run `npm test`
- **After every plan wave:** Run `npm run check && npm run build`
- **Before `$gsd-verify-work`:** Full suite, Chromium matrix, and artifact checks must be green
- **Max feedback latency:** 60 seconds for code checks; browser capture may take one additional bounded pass

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | HOME-01, HOME-02, HOME-03, HOME-05 | T-02-01, T-02-02 | Route serves both compositions; unavailable actions stay local | typecheck + unit + build + HTTP smoke | `npm run typecheck && npm test && npm run build` plus production HTTP content assertions | ✅ existing scripts | ⬜ pending |
| 02-01-02 | 01 | 1 | HOME-01, HOME-02, HOME-03, HOME-05 | T-02-01, T-02-02 | Responsive shell and dock focus lifecycle stay local and accessible | full suite + build | `npm run check && npm run build` plus scoped whitespace gate | ✅ existing scripts | ⬜ pending |
| 02-02-01 | 02 | 2 | HOME-01, HOME-03, HOME-05 | T-02-03 | Desktop expansion uses typed local media/data and no remote success path | full suite + build | `npm run check && npm run build` plus scoped whitespace gate | ✅ existing scripts | ⬜ pending |
| 02-02-02 | 02 | 2 | HOME-02, HOME-03, HOME-04, HOME-05 | T-02-04 | VisualViewport resize/scroll listeners clean up; focused input/CTA remain reachable | full suite + build + source assertions | `npm run check && npm run build` plus VisualViewport resize/scroll and whitespace assertions | ✅ existing scripts | ⬜ pending |
| 02-03-01 | 03 | 3 | HOME-04, HOME-05, HOME-06 | T-02-05, T-02-06 | Evidence distinguishes Chromium proxy from physical device and captures no secrets | browser matrix + artifact gate | `npm run check && npm run build` plus width/screenshot/proxy-status assertions | ❌ produced by task | ⬜ pending |
| 02-03-02 | 03 | 3 | HOME-04, HOME-05, HOME-06 | T-02-05 | Exact new README guidance is present; physical OS-keyboard UAT stays pending until device evidence exists | full suite + document/event gate | `npm run check && npm run build` plus exact README sentence/event/UAT-status assertions | ❌ produced by task | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- Existing Vitest, TypeScript, lint, format, and Next.js build scripts cover all automated code gates; no test dependency or scaffold is needed.
- `02-VALIDATION.md` exists before execution and binds every plan task to an automated command/failure direction.
- Browser evidence paths are created by Plan 02-03 Task 1 using cached Chromium; no `MISSING — Wave 0` command is present.
- Physical mobile OS-keyboard behavior has no container substitute and is explicitly routed to the Manual-Only Verification below.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Physical OS keyboard, VisualViewport, and safe-area behavior | HOME-02, HOME-04, HOME-05 | The container has cached desktop Chromium but no physical iOS/Android device or OS soft keyboard; viewport reduction is not equivalent evidence | On physical iOS Safari or Android Chrome at a 390px-class width, open the dock, focus/type/scroll with the OS keyboard visible, confirm textarea and CTA remain reachable without bottom-nav overlap, rotate and repeat, close the dock, and report device/OS/browser plus PASS/FAIL observations. Leave UAT pending if unavailable. |
| Final Stitch visual fidelity judgment | HOME-01, HOME-02, HOME-06 | Composition and styling comparison contains subjective visual judgment even with browser screenshots | Compare `homepage-mobile-390.png` and `homepage-desktop-1440.png` to the named canonical Stitch screens/HTML, ignore the corrupted desktop raster, and record any mismatch in `docs/verification-homepage.md`. |

---

## Validation Sign-Off

- [x] All planned tasks have `<automated>` verification and stated failure directions
- [x] Sampling continuity: no three consecutive tasks lack automated verification
- [x] No unresolved `MISSING — Wave 0` test reference exists
- [x] No watch-mode flag appears in a verification command
- [x] Planned code-check feedback latency is bounded to 60 seconds
- [ ] Browser evidence artifacts created and green
- [ ] Physical mobile OS-keyboard UAT supplied with device/OS/browser, or explicitly retained as pending
- [ ] `nyquist_compliant: true` set by post-execution validation

**Approval:** pending execution and human/device UAT
