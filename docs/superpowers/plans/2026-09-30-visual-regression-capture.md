# Visual Regression Capture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a deterministic Playwright capture/comparison runner for the five Brand Book v1 visual regression scenarios without changing identity authority or automatically approving baselines.

**Architecture:** Keep `visualRegressionMatrix` and `visualRegressionEvidence` as the scenario/evidence contracts. Add Playwright as a thin browser executor over the real Vite app; it configures browser state from those contracts and writes/compares only manifest-declared PNGs. Vitest continues to test governance; Playwright owns browser screenshots.

**Tech Stack:** TypeScript, Vite, Vitest, Playwright Test, Three.js.

**Spec:** `docs/superpowers/specs/2026-09-30-visual-regression-capture.md`

## Global Constraints

- Screenshots are `evidence-only`; they never become Canon or canonical identity masters.
- Consume the existing five scenarios: `desktop`, `tablet`, `mobile`, `reduced-motion`, `no-media`.
- Consume existing viewport, route, motion, media-state, invariant, and baseline-path values rather than duplicating them.
- Never bypass `media-runtime.ts` approval governance for capture.
- Never auto-promote evidence status to `captured` or `approved`.
- Baseline replacement requires an explicit repository/reviewer action.
- The visual runner must be independently invokable from ordinary Vitest/type/build commands.

## Review Focus

- Browser reaches `/` but the UI is still animating/loading: capture waits for a stable application state before screenshot.
- `prefers-reduced-motion` differs from the scenario: runner applies the matrix value before page load.
- Optional media is missing/unapproved: runner preserves the product fallback instead of injecting media.
- Manifest path and scenario ID drift apart: test fails rather than inventing a screenshot path.
- Existing baseline differs: comparison fails and does not rewrite the approved evidence unless update mode is explicitly requested by a human.

---

### Task 1: Playwright runner boundary

**Files:**
- Modify: `apps/interactive-web/package.json`
- Create: `apps/interactive-web/playwright.config.ts`
- Create: `apps/interactive-web/src/visual-regression-runner.test.ts`
- Create: `apps/interactive-web/src/visual-regression-runner.ts`

**Interfaces:**
- Consumes: `visualRegressionMatrix`, `visualRegressionEvidence`.
- Produces: `buildVisualCaptureCases(): readonly VisualCaptureCase[]`, where each case contains `scenario`, `baselinePath`, and `authority: 'evidence-only'`.

- [ ] **Step 1: Write the failing Vitest contract**

Assert that `buildVisualCaptureCases()` returns exactly five cases in matrix order, every case maps to the matching evidence record, and a missing/duplicate evidence mapping throws rather than generating a path.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm --prefix apps/interactive-web test -- src/visual-regression-runner.test.ts`
Expected: FAIL because `visual-regression-runner.ts`/`buildVisualCaptureCases` does not exist.

- [ ] **Step 3: Implement the minimal runner-domain mapping**

Create `buildVisualCaptureCases(): readonly VisualCaptureCase[]` in `src/visual-regression-runner.ts`. Match scenario IDs to manifest records and throw on missing or duplicate mappings. Do not add browser code here.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `npm --prefix apps/interactive-web test -- src/visual-regression-runner.test.ts`
Expected: PASS.

- [ ] **Step 5: Add Playwright dependency/configuration and independent scripts**

Add `@playwright/test` as a dev dependency. Add scripts `test:visual` and `test:visual:update`; update mode must be explicit. Configure the Vite web server and screenshot output without altering ordinary `test`, `typecheck`, or `build` semantics.

- [ ] **Step 6: Commit**

```bash
git add apps/interactive-web/package.json apps/interactive-web/playwright.config.ts apps/interactive-web/src/visual-regression-runner.test.ts apps/interactive-web/src/visual-regression-runner.ts
git commit -m "feat(visual): add Playwright regression runner boundary"
```

### Task 2: Browser-state application and capture

**Files:**
- Create: `apps/interactive-web/visual-regression/brand-book.spec.ts`
- Test: `apps/interactive-web/src/visual-regression-runner.test.ts`

**Interfaces:**
- Consumes: `buildVisualCaptureCases()` from Task 1.
- Produces: Playwright screenshot comparison for each declared `baselinePath`.

- [ ] **Step 1: Extend the failing runner test for review-focus cases**

Pin that `reduced-motion` resolves to `reducedMotion: true`; `no-media` resolves to `mediaState: 'fallback'`; all cases use `/`; and each output path is the exact manifest path.

- [ ] **Step 2: Run the focused Vitest test and verify RED where mapping behavior is missing**

Run: `npm --prefix apps/interactive-web test -- src/visual-regression-runner.test.ts`
Expected: FAIL only for newly unimplemented mapping behavior.

- [ ] **Step 3: Implement the Playwright spec**

For each `buildVisualCaptureCases()` case: set viewport, emulate reduced motion before navigation, navigate to `/`, wait for document/application stability, assert the Dojo media state matches governed fallback where required, then compare the page screenshot against the case's manifest-declared PNG. Do not inject Ω1, text, media, or alternate HTML.

- [ ] **Step 4: Verify governance tests remain GREEN**

Run: `npm --prefix apps/interactive-web test -- src/visual-regression-contract.test.ts src/visual-regression-evidence.test.ts src/visual-regression-runner.test.ts`
Expected: all PASS.

- [ ] **Step 5: Run the visual runner without baseline update**

Run: `npm --prefix apps/interactive-web run test:visual`
Expected: either PASS against existing reviewed baselines, or FAIL explicitly because baselines are still `pending-capture`; it must not silently create/approve replacement evidence.

- [ ] **Step 6: Commit**

```bash
git add apps/interactive-web/visual-regression/brand-book.spec.ts apps/interactive-web/src/visual-regression-runner.test.ts apps/interactive-web/src/visual-regression-runner.ts
git commit -m "test(visual): capture Brand Book regression scenarios"
```

### Task 3: Evidence generation workflow and documentation

**Files:**
- Modify: `docs/brand/BRAND-BOOK-V1.md`
- Modify: `apps/interactive-web/src/visual-regression-evidence.ts` only after real captures are reviewed.
- Create/Update: `apps/interactive-web/visual-regression/baselines/*.png` only through explicit update mode.

**Interfaces:**
- Consumes: Playwright update script from Task 1 and evidence paths from the manifest.
- Produces: reviewed PNG evidence and an explicit status transition recorded in source control.

- [ ] **Step 1: Document the explicit capture/review workflow**

Add commands for normal comparison and explicit baseline update. State that update output must be visually reviewed before changing manifest status.

- [ ] **Step 2: Generate baselines only with explicit update mode**

Run: `npm --prefix apps/interactive-web run test:visual:update`
Expected: five PNGs at the exact manifest-declared paths. If browser/runtime infrastructure prevents capture, stop and report the infrastructure failure; do not fabricate files.

- [ ] **Step 3: Review each generated evidence image against its Brand Book invariant**

Check desktop, tablet, mobile, reduced-motion, and no-media individually. Reject and fix product/layout defects rather than approving a bad baseline.

- [ ] **Step 4: Record reviewed evidence status**

Only after visual review, change each reviewed manifest record from `pending-capture` to `captured` or `approved` as appropriate. Do not bulk-approve unreviewed captures.

- [ ] **Step 5: Run complete verification**

Run: `npm --prefix apps/interactive-web run typecheck && npm --prefix apps/interactive-web test && npm --prefix apps/interactive-web run build && npm --prefix apps/interactive-web run test:visual`
Expected: all locally executable checks PASS; if the known GitHub Actions runner-allocation problem persists, report it separately from application results.

- [ ] **Step 6: Commit**

```bash
git add docs/brand/BRAND-BOOK-V1.md apps/interactive-web/src/visual-regression-evidence.ts apps/interactive-web/visual-regression/baselines
git commit -m "test(visual): record reviewed Brand Book baselines"
```
