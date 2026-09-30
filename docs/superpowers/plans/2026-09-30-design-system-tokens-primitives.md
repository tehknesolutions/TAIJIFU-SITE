# TAIJIFU Design System Tokens & Editorial Primitives Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete Issue #34 by evolving the existing `packages/design-tokens` and `packages/ui` foundations into the approved semantic token and editorial primitive contract.

**Architecture:** Keep the repository's existing package boundary: `packages/design-tokens` owns semantic TS/CSS tokens and `packages/ui` owns generic HTML-string primitives consuming those tokens through CSS. Do not create another UI package, route dependency, Canon dependency, or parallel token authority.

**Tech Stack:** TypeScript, CSS custom properties, Vitest, pnpm workspace.

**Spec:** `docs/design-system/TAIJIFU-DESIGN-SYSTEM-SPEC.md`

## Global Constraints

- Dependency direction remains `design tokens → editorial primitives → TAIJIFU components → pages`.
- Tokens/primitives MUST NOT import Canon, route IA, Experience Graph, curriculum snapshots, or page content.
- CSS custom properties use the stable `--tj-` namespace.
- No new literal color sampled only from raster/reference imagery may become token authority.
- Interactive primitives require visible keyboard focus; motion honors `prefers-reduced-motion`.
- `Button` is action semantics; `TextLink` is navigation semantics; `IconButton` requires a non-empty accessible name.
- This change does not alter Ω1, Canon semantics, route IA, official marks, or migrate the whole Web app.
- Existing `packages/design-tokens` and `packages/ui` are extended; no parallel package architecture is created.

## Review Focus

- Empty/whitespace-only `IconButton` labels must not silently produce inaccessible controls; Task 3 pins rejection behavior.
- Heading levels outside 2–6 must remain impossible through the public TypeScript signature; Task 2 preserves the union contract.
- Untrusted text/href/src/alt values must remain HTML-escaped; Task 2 pins escaping across primitive categories.
- Reduced-motion users must not depend on transition/animation to perceive interaction state; Task 3 pins the CSS override.
- Design-token CSS must not gain raster-derived HEX literals; Task 1 preserves the no-HEX regression assertion.

---

### Task 1: Complete the semantic token contract

**Files:**
- Modify: `packages/design-tokens/src/index.ts`
- Modify: `packages/design-tokens/src/tokens.css`
- Modify: `packages/design-tokens/src/tokens.test.ts`

**Interfaces:**
- Consumes: existing `designTokens` public export and `--tj-*` CSS namespace.
- Produces: typed/read-only `designTokens` families for color, spacing, typography roles/metrics, motion duration/easing, and mark-space/sizing; matching CSS custom properties.

- [ ] **Step 1: Write failing token-contract tests**

Extend `tokens.test.ts` to assert: `type.heading` exists; reusable typography size/line-height/letter-spacing roles exist; motion exposes duration and easing roles; mark-space exposes both clear-space and sizing roles; CSS contains every exported custom property; CSS still contains no HEX literal.

- [ ] **Step 2: Run the design-token test and confirm RED**

Run: `pnpm --filter @taijifu/design-tokens test`
Expected: FAIL because the newly specified typography/motion/mark sizing exports do not yet exist.

- [ ] **Step 3: Implement the minimal TS token shape**

Update `designTokens` in `index.ts` while preserving existing names where already public. Add only semantic roles required by the spec; do not introduce route/page/R01 names.

- [ ] **Step 4: Implement matching CSS custom properties**

Update `tokens.css` so each TS role maps to a `--tj-*` variable. Preserve semantic color aliases through calibration variables rather than introducing raster-derived HEX literals. Add a `prefers-reduced-motion: reduce` token override for motion durations.

- [ ] **Step 5: Run token verification and confirm GREEN**

Run: `pnpm --filter @taijifu/design-tokens test && pnpm --filter @taijifu/design-tokens typecheck`
Expected: PASS.

- [ ] **Step 6: Commit**

`git commit -am "feat(tokens): complete semantic design token contract"`

### Task 2: Lock the complete editorial primitive API

**Files:**
- Modify: `packages/ui/src/index.ts`
- Modify: `packages/ui/src/primitives.test.ts`

**Interfaces:**
- Consumes: generic HTML strings/text and the CSS class contract in `primitives.css`.
- Produces: `Container`, `Stack`, `Cluster`, `Grid`, `Rule`, `Surface`, `Eyebrow`, `Display`, `Heading`, `Body`, `Meta`, `Button`, `IconButton`, `TextLink`, `FocusRing`, `MediaFrame` with no domain imports.

- [ ] **Step 1: Write failing completeness and escaping tests**

Extend `primitives.test.ts` to cover all 16 approved primitives, preserving `Heading(text, level: 2 | 3 | 4 | 5 | 6 = 2)`. Assert escaping for text plus `TextLink.href`, `MediaFrame.src`, `MediaFrame.alt`, and `IconButton` label/icon.

- [ ] **Step 2: Run UI primitive tests and confirm RED where behavior is missing**

Run: `pnpm --filter @taijifu/ui test`
Expected: FAIL only for uncovered/missing contract behavior; existing already-correct primitives remain unchanged.

- [ ] **Step 3: Implement only the missing primitive behavior**

Keep `packages/ui/src/index.ts` domain-agnostic. Do not add Canon, route, curriculum, Experience Graph, asset-selection, or page composition imports.

- [ ] **Step 4: Run UI tests/typecheck and confirm GREEN**

Run: `pnpm --filter @taijifu/ui test && pnpm --filter @taijifu/ui typecheck`
Expected: PASS.

- [ ] **Step 5: Commit**

`git commit -am "feat(ui): lock editorial primitive API"`

### Task 3: Enforce accessibility and token consumption in primitive CSS

**Files:**
- Modify: `packages/ui/src/primitives.css`
- Modify: `packages/ui/src/primitives.test.ts`
- Modify if required by package export wiring: `packages/ui/package.json`

**Interfaces:**
- Consumes: `--tj-*` token contract from Task 1 and primitive classes from Task 2.
- Produces: token-driven layout/typography/interaction styling with focus-visible and reduced-motion contracts.

- [ ] **Step 1: Write failing CSS contract tests**

Read `primitives.css` in `primitives.test.ts` and assert it uses `var(--tj-...)` for reusable semantic values, contains `:focus-visible`, contains `@media (prefers-reduced-motion: reduce)`, and contains no imports/references to Canon/route/curriculum/Experience Graph modules. Add an `IconButton` test requiring a non-empty/trimmed accessible label; choose one explicit public behavior: throw `TypeError` for an empty label.

- [ ] **Step 2: Run UI tests and confirm RED**

Run: `pnpm --filter @taijifu/ui test`
Expected: FAIL on any missing focus/reduced-motion/token-consumption/accessible-label contract.

- [ ] **Step 3: Implement CSS accessibility contracts**

Update `primitives.css` to consume the semantic token variables for reusable values, preserve visible focus, and disable non-essential motion under reduced-motion preference.

- [ ] **Step 4: Implement `IconButton` accessible-name guard**

In `index.ts`, make `IconButton(label, icon)` throw `TypeError` when `label.trim()` is empty; preserve escaping for valid values.

- [ ] **Step 5: Verify package CSS export wiring**

If `package.json` does not already expose the primitive stylesheet/token dependency in the established package convention, add the minimal export/dependency wiring. Do not create a bundler or new runtime layer.

- [ ] **Step 6: Run UI verification and confirm GREEN**

Run: `pnpm --filter @taijifu/ui test && pnpm --filter @taijifu/ui typecheck`
Expected: PASS.

- [ ] **Step 7: Commit**

`git commit -am "feat(ui): enforce primitive accessibility contracts"`

### Task 4: Verify package boundaries and Issue #34 acceptance

**Files:**
- Modify: `packages/design-tokens/src/tokens.test.ts` only if a boundary regression test belongs there.
- Modify: `packages/ui/src/primitives.test.ts` only if a boundary regression test belongs there.
- Modify: `docs/design-system/TAIJIFU-DESIGN-SYSTEM-SPEC.md` status line only after acceptance evidence exists.

**Interfaces:**
- Consumes: completed Tasks 1–3.
- Produces: repository evidence that #34 is structurally complete without claiming visual calibration.

- [ ] **Step 1: Add boundary regression assertions**

Assert source files in `packages/design-tokens/src` and primitive implementation files in `packages/ui/src` do not reference `canon`, `site-ia`, `experience`, `curriculum`, or application route modules. Scope the assertion to hand-authored token/primitive files so generated brand metadata is not misclassified.

- [ ] **Step 2: Run focused package verification**

Run: `pnpm --filter @taijifu/design-tokens test && pnpm --filter @taijifu/design-tokens typecheck && pnpm --filter @taijifu/ui test && pnpm --filter @taijifu/ui typecheck`
Expected: PASS.

- [ ] **Step 3: Run repository verification used by CI**

Run the repository's existing lint/test/typecheck commands from root as defined in root `package.json`/workflows.
Expected: all code-quality checks relevant to these packages PASS. Treat provider deployment quota as external and separate from code verification.

- [ ] **Step 4: Update spec status**

Change `Status: proposed` to `Status: implemented` only after Steps 2–3 provide passing evidence. Do not claim visual calibration; the spec explicitly keeps that as a separate gate.

- [ ] **Step 5: Commit acceptance evidence**

`git commit -am "docs(design-system): mark token foundation implemented"`

- [ ] **Step 6: Open implementation PR linked to #34**

PR description must summarize token/API changes, accessibility evidence, boundary evidence, and verification commands. It must state explicitly that no Canon/Ω1/route semantics or raster-derived color authority changed.
