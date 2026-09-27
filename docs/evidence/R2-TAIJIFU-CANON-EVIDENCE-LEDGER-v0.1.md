# R2 TAIJIFU Canon — Evidence Ledger v0.1

Date: 2026-09-27
Authority surface: `wordpress/themes/taijifu-canon/`
Integration target: `main`

## Status vocabulary

- `IMPLEMENTED`: source artifact is present in repository history/current tree.
- `PRESENT`: source-level contract/test exists, but no executable PASS is claimed.
- `VERIFIED`: requires fresh executable evidence with successful result.
- `BLOCKED`: required verification cannot currently be obtained because of an evidenced external/runtime blocker.
- `OPEN`: evidence still needs to be collected.

## Genealogy reconciliation

R2 branch head: `8fb9bfc5ee448bb714f55af8630efe705a445cf3`.

PR #17 was merged into `main` by merge commit `ee825d25b34a99926b6b89ec3b29778bb0b31015`. That merge has the R2 branch head as a parent. The branch therefore became ancestral to `main`; a later `main...feat/r2-taijifu-canon` comparison correctly reports the branch behind rather than ahead.

The PR merge diff contains only the final Task 6 delta because Tasks 1–5 were already present on the other merge parent/current main ancestry. This is not evidence of lost R2 source work.

## R2 task ledger

| Task | Scope | Repository evidence | State |
|---|---|---|---|
| T1 | Theme scaffold / presentation authority | `wordpress/themes/taijifu-canon/`, theme bootstrap/contracts | IMPLEMENTED |
| T2 | CANON tokens + Ω1 provenance | `assets/css/tokens.css`, `assets/brand/omega1-master.svg`, `assets/brand/omega1-micro-master.svg`, brand contract | IMPLEMENTED / contract PRESENT |
| T3 | Semantic shell + accessible navigation | `header.php`, `footer.php`, `assets/js/navigation.js`, `assets/css/components.css`, accessibility contract | IMPLEMENTED / contract PRESENT |
| T4 | Current-CANON Dojo Gate | `front-page.php`, Dojo Gate styles, front-page contract | IMPLEMENTED / contract PRESENT |
| T5 | Theme ↔ Core boundary | `inc/theme-contract.php`, graceful Core-unavailable state, core-boundary contract | IMPLEMENTED / contract PRESENT |
| T6 | Responsive + reduced-motion hardening | `assets/css/responsive.css`, enqueue chain, hardened accessibility contract | IMPLEMENTED / contract PRESENT |
| T7 | Evidence / packaging | this ledger | IN PROGRESS |

## Verification gates

### Source / genealogy

- R2 branch ancestry into `main`: EVIDENCED by merge commit `ee825d25b34a99926b6b89ec3b29778bb0b31015`.
- Task 6 merge delta: EVIDENCED by PR #17 merge diff.
- Source contracts: PRESENT.

### Executable contracts

State: `BLOCKED / NOT VERIFIED`.

No test PASS is claimed by this ledger. Fresh executable output is required for each PHP contract before promotion to `VERIFIED`.

Required commands include:

```sh
php wordpress/themes/taijifu-canon/tests/test-theme-contract.php
php wordpress/themes/taijifu-canon/tests/test-canon-tokens.php
php wordpress/themes/taijifu-canon/tests/test-brand-assets.php
php wordpress/themes/taijifu-canon/tests/test-accessibility-contract.php
php wordpress/themes/taijifu-canon/tests/test-front-page-contract.php
php wordpress/themes/taijifu-canon/tests/test-core-boundary.php
```

### GitHub Actions

State: `BLOCKED` by issue #15: `DEVOPS R1 — GitHub Actions jobs fail before runner assignment`.

The issue records repeated jobs with `steps=[]` and `runner_id=0` across independent workflows. The anti-rework lock remains active: do not alter product/theme code to guess at a pre-step runner/execution-layer failure.

For merge commit `ee825d25b34a99926b6b89ec3b29778bb0b31015`, current connector queries returned no associated PR-triggered workflow runs and no combined commit statuses. This is absence of verification evidence, not a PASS.

### WordPress runtime / UX

State: `OPEN`.

Required evidence before R2 can be called runtime-verified:

1. Theme activates in a real WordPress runtime without fatal error.
2. Dojo Gate renders with the intended Ω1 asset and CANON hierarchy.
3. Desktop and mobile navigation are keyboard-operable and state synchronization is observed.
4. Focus visibility is observed on interactive elements.
5. Reduced-motion behavior is observed with the OS/browser preference enabled.
6. Core-present and Core-absent presentation states are exercised.
7. Representative desktop/mobile viewport captures are retained as visual evidence.
8. No domain registration (`register_post_type` / `register_taxonomy`) is introduced by the theme.

## Anti-rework locks

- Do not resurrect v2.2 composition as current authority.
- Do not redraw Ω1 when approved masters exist.
- Do not promote Wordmark V2 construction artifacts to master authority.
- Do not move canonical content/domain registration into the theme.
- Do not convert source presence or contract presence into a test PASS claim.
- Do not modify product code to guess at GitHub Actions issue #15.

## Current gate

R2 source implementation is recorded in `main`. R2 remains **not runtime-verified**. Promotion from `IMPLEMENTED/PRESENT` to `VERIFIED` requires fresh executable and WordPress/runtime evidence listed above.
