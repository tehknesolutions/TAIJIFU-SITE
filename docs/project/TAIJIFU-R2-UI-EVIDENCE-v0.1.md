# TAIJIFU R2 Current UI Evidence — v0.1

Status: SOURCE EVIDENCE RECORDED / RUNTIME VERIFICATION OPEN
Date: 2026-09-28
Track: Baseline v0.1 → R2 Current UI Manifestation
Plan: `docs/superpowers/plans/2026-09-27-r2-current-ui-manifestation.md`
Spec: `docs/superpowers/specs/2026-09-27-r2-current-ui-manifestation-design.md`

## Purpose

Record the evidence state for R2 without converting source presence into runtime verification. This ledger closes the documentation portion of Task 7 and identifies exactly what remains before R2 can be promoted to a runtime-verified UI gate.

## Repository checkpoint

Evidence inspected on `main` after merge PR #25 (`06ee4c8fdba6d8999cfe46618830d1e3139fd182`). The R2 theme implementation is present under `wordpress/themes/taijifu-canon/`; PR #17 records the R2 Tasks 1–6 integration boundary and explicitly left Task 7 runtime evidence open.

Latest inspected theme-path history includes commit `4012ed56fcb8e924d56ca7efbe5182dda1ba7a25` (`feat(theme): style canonical content templates`).

## Source/static acceptance

| Contract | Evidence | State |
|---|---|---|
| Single current theme path | `wordpress/themes/taijifu-canon/` exists with no parallel approved theme target in the R2 plan | IMPLEMENTED |
| Theme shell | `style.css`, `functions.php`, `header.php`, `footer.php`, `index.php`, `front-page.php`, page/archive/single/404 templates and `inc/` are manifested | IMPLEMENTED |
| Theme/Core ownership boundary | `inc/theme-contract.php` only detects Core availability and returns presentation state; no CPT/taxonomy/domain registration is introduced there | IMPLEMENTED |
| Graceful Core-unavailable state | `taijifu_canon_core_state()` returns a non-fatal unavailable state; `front-page.php` renders it as presentation status | IMPLEMENTED |
| Current Dojo Gate semantics | `front-page.php` renders TAIJIFU, approved maxims, TAI/JI/FU/Integration, primary CTA and authorship | IMPLEMENTED |
| CANON material tokens | `assets/css/tokens.css` defines paper, charcoal, TAI, JI, FU, Integration and `--space-page-gutter: 24px` | IMPLEMENTED |
| Responsive/reduced-motion source rules | `assets/css/responsive.css` preserves the 24px mobile gutter contract and defines `prefers-reduced-motion: reduce` behavior | IMPLEMENTED |
| Ω1 provenance | Theme `omega1-master.svg` blob `4dd9083d...` exactly matches `brand/omega1/master/omega1-master.svg`; micro master blob `bb6d2520...` also matches exactly | VERIFIED — BLOB IDENTITY |
| Wordmark candidate not promoted | Theme README explicitly states Wordmark V2 construction is not a master and the theme does not promote it | IMPLEMENTED GOVERNANCE |
| Source contract tests | Theme test suite contains contract coverage for theme scaffold, CANON tokens, brand assets, accessibility, front page, Core boundary and templates | IMPLEMENTED / NOT EXECUTED IN THIS PASS |

## Executable verification attempted

### Local/authorized workstation

A fresh environment check was executed on the connected workstation `TW-DA-VINCI-HNK-TEHKNE` on 2026-09-28. `php -v` failed because PHP is not installed/available on PATH. Therefore the theme PHP contract scripts could not be executed in that environment.

State: `EXECUTION BLOCKED — PHP RUNTIME UNAVAILABLE ON INSPECTED WORKSTATION`.

No PASS is inferred from the presence of test files.

### GitHub Actions

Repository issue #15 documents the GitHub Actions runner-assignment blocker. Fresh main runs after PR #25 still fail before workflow steps execute; the Interactive Web main run `36454885939` produced a failed `verify` job with no retained steps. This corroborates that repository CI execution remains blocked at the runner/execution layer rather than proving any theme test result.

State: `CI EXECUTION BLOCKED — PRE-STEP/RUNNER LAYER`.

## Runtime-required acceptance

| Runtime gate | Required evidence | State |
|---|---|---|
| WordPress install + theme activation | Fresh WordPress runtime activation without fatal errors | OPEN |
| Core active integration | Theme with `taijifu-core` active, presentation/domain boundary intact | OPEN |
| Core inactive degradation | Runtime rendering with Core inactive, explicit non-fatal state | OPEN |
| Keyboard navigation | Keyboard-only nav/CTA pass with visible focus | OPEN |
| Responsive viewport pass | Desktop/tablet/mobile screenshots or accepted QA; no major overflow; mobile gutter preserved | OPEN |
| Reduced motion | Browser/runtime confirmation under `prefers-reduced-motion: reduce` | OPEN |
| Visual regression | Accepted reference captures against current CANON/Ω1, not historical v2.2 | OPEN |
| Independent theme ZIP | Reproducible ZIP/package artifact and install test | OPEN |
| Staging QA | Staging URL/build with acceptance record | OPEN |

## UI1 state transition justified by this pass

The previous evidence map stated that the current theme was not manifested. That statement is superseded by repository evidence.

- UI-P0 — `ACTIVE / EVIDENCED`: current CANON/assets authority is identified.
- UI-P1 — `IMPLEMENTED / NOT RUNTIME VERIFIED`: token and responsive source contracts are manifested.
- UI-P2 — `IMPLEMENTED / Ω1 BLOB VERIFIED`: approved Ω1 masters are lossless production copies; wordmark master remains open.
- UI-P3 — `IMPLEMENTED / NOT RUNTIME VERIFIED`: `taijifu-canon` theme shell is manifested.
- UI-P4 — `IMPLEMENTED / NOT RUNTIME VERIFIED`: Dojo Gate source is manifested.
- UI-P5 — `IMPLEMENTED / NOT RUNTIME VERIFIED`: presentation-safe Core availability boundary is manifested.
- UI-P6 — `IMPLEMENTED / INTEGRATION QA OPEN`: source integration exists; runtime Core-on/Core-off acceptance remains open.
- UI-P7 — `IMPLEMENTED SOURCE / VIEWPORT QA OPEN`: responsive rules exist; viewport evidence remains open.
- UI-P8 — `IMPLEMENTED SOURCE / RUNTIME QA OPEN`: focus/reduced-motion/accessibility contracts exist; browser/runtime acceptance remains open.
- UI-P9 — `OPEN`: no whole-product visual regression evidence is recorded by this pass.
- UI-P10 — `OPEN`: ZIP/install/staging/QA evidence is not recorded by this pass.

## R2 gate conclusion

R2 has moved materially beyond the Baseline v0.1 statement that the current theme was absent. The source manifestation portion is implemented and auditable. R2 is **not runtime-verified or release-complete** because PHP execution, WordPress activation, keyboard/viewport/reduced-motion runtime QA, visual regression, ZIP install evidence and staging QA remain open, while repository CI remains blocked by issue #15.

## Next actions

1. Resolve issue #15 or provide another retained PHP execution environment, then execute every theme contract script.
2. Run WordPress activation with Core both active and inactive.
3. Capture keyboard, responsive, reduced-motion and visual-regression evidence.
4. Produce/install the independent theme ZIP and record staging QA.
5. Promote UI-P3..P10 only from those fresh results.
