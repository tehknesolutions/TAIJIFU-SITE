# Ω1 Canonical Brand Family Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete issue #35 by promoting the deterministic TAIJIFU wordmark and shipping the canonical Ω1 production family plus accessible `@taijifu/ui` brand components.

**Architecture:** Canonical geometry remains in committed SVG assets under `brand/`; a deterministic Node generator composes variants/lockups/signature and emits a generated TypeScript asset module without inventing geometry. UI components render those generated SVG strings with semantic token colors, fixed optical-size states, clear-space classes, and explicit accessibility behavior.

**Tech Stack:** Node 22, TypeScript 5.9, Vitest 3, pnpm/Turborepo, deterministic SVG/XML text transforms.

**Spec:** `docs/lab-ui-ux/TAIJIFU-OMEGA1-ENGINEERING-SPEC.md` and `docs/design-system/TAIJIFU-OFFICIAL-DESIGN-SYSTEM-V1.md`

## Global Constraints

- Ω1 canonical geometry comes only from approved deterministic vector masters; no runtime redraw and no raster dependency.
- ORIGIN/NEXUS/FLOW remain genealogy/documentation states, never alternate production logos.
- Responsive rule: standard Ω1 at `>= 32 px`; dedicated MICRO master below `32 px`.
- Clear space: normal `2N`, compact `N`, where master nucleus diameter `N = 56/1000` of mark size.
- Semantic accents are TAI/JI/FU/Integration only and consume `--tj-color-*` tokens; no calibrated HEX values are invented.
- No gradients, filters, glow, font dependency, generic yin-yang/enso substitution, mirroring, rotation, stretching, or closing the portal.
- HNK signature order is exactly `G22 · G01 · G03 · G36 · G03 · G25 · G05`.

## Review Focus

- Generated assets drift from approved master paths: architecture tests compare geometry-bearing source fragments.
- 16/24 px accidentally use standard master: component tests pin MICRO selection below 32 px.
- Accent colors escape canonical loci or hard-code screen colors: tests require semantic CSS variables and reject HEX/RGB.
- Decorative vs meaningful marks expose duplicate/empty accessible names incorrectly: component tests cover both modes.
- Lockups accidentally use an unapproved wordmark candidate: generation consumes only promoted `brand/wordmark/master/taijifu-wordmark.svg`.

---

### Task 1: Gate and promote the proprietary wordmark

**Files:**
- Modify: `brand/wordmark/tests/render-wordmark.py`
- Create: `brand/wordmark/tests/wordmark-v2-audit.md`
- Create: `brand/wordmark/master/taijifu-wordmark.svg`
- Test: `tests/architecture/brand-family.test.ts`

**Interfaces:**
- Consumes: `brand/wordmark/construction/taijifu-wordmark-v2.svg`.
- Produces: promoted deterministic wordmark master used by lockup generation.

- [ ] **Step 1: Write failing architecture tests** asserting the promoted master exists, has `TAI`, `JI`, `FU` vector groups, no `<text>`, gradients, filters, or raster images, and is byte-equivalent in geometry to V2.
- [ ] **Step 2: Run** `pnpm vitest run --config vitest.architecture.config.ts tests/architecture/brand-family.test.ts`. **Expected:** FAIL because the promoted wordmark does not exist.
- [ ] **Step 3: Update the structural audit to target V2, document how V2 resolves V1's four recorded optical defects, and promote V2 unchanged to `brand/wordmark/master/taijifu-wordmark.svg`.
- [ ] **Step 4: Run the focused architecture test and `python brand/wordmark/tests/render-wordmark.py`. **Expected:** PASS and `WORDMARK_STRUCTURE_PASS`.
- [ ] **Step 5: Commit** `feat(brand): promote Taijifu wordmark master`.

### Task 2: Generate the deterministic Ω1 production family

**Files:**
- Create: `scripts/build-omega1-brand-family.mjs`
- Create: `brand/omega1/variants/omega1-accent.svg`, `omega1-reverse.svg`, `omega1-micro.svg`
- Create: `brand/omega1/lockups/taijifu-lockup-horizontal.svg`, `taijifu-lockup-vertical.svg`
- Create: `brand/omega1/lockups/taijifu-hnk-signature.svg`
- Modify: `brand/omega1/asset-contract.json`
- Test: `tests/architecture/brand-family.test.ts`

**Interfaces:**
- Consumes: Ω1 master/micro masters, promoted wordmark, and source glyphs G22/G01/G03/G36/G25/G05.
- Produces: the seven required production-family files and a contract that lists their canonical paths.

- [ ] **Step 1: Extend failing tests** to require all family assets, forbid raster/font/effect dependencies, preserve master geometry in reverse, preserve micro geometry, require semantic token variables in accent, and require the exact seven-glyph signature sequence.
- [ ] **Step 2: Run the focused architecture test. Expected:** FAIL on missing family assets.
- [ ] **Step 3: Implement the generator.** Accent mapping is structural and documented: TAI = AXIS family, JI = PORTAL, FU = FLOW, Integration = NEXUS; geometry is copied unchanged from Ω1 master. Reverse is geometry-identical and light via `currentColor`; component CSS supplies paper token. Lockups copy promoted master geometry with transforms only; signature copies source glyph geometry in canonical order.
- [ ] **Step 4: Run generator twice and verify `git diff` is stable; run focused tests. Expected:** PASS with deterministic outputs.
- [ ] **Step 5: Commit** `feat(brand): generate canonical Omega1 family`.

### Task 3: Componentize the family in `@taijifu/ui`

**Files:**
- Create: `packages/ui/src/brand-assets.generated.ts`
- Create: `packages/ui/src/brand.ts`
- Create: `packages/ui/src/brand.css`
- Create: `packages/ui/src/brand.test.ts`
- Modify: `packages/ui/src/index.ts`
- Modify: `packages/ui/package.json`
- Modify: `scripts/build-omega1-brand-family.mjs`

**Interfaces:**
- Consumes: generated canonical SVG family.
- Produces: `Omega1Mark`, `Omega1AccentMark`, `Omega1ReverseMark`, `Omega1MicroMark`, `TaijifuLockupHorizontal`, `TaijifuLockupVertical`, `HnkSignature`.

- [ ] **Step 1: Write failing component tests** for named exports, 16/24→MICRO and 32/48→MASTER selection, semantic accent variables, reverse paper token, exact HNK order, meaningful `role="img"`/`aria-label`, decorative `aria-hidden="true"`, and clear-space classes.
- [ ] **Step 2: Run** `pnpm --filter @taijifu/ui test`. **Expected:** FAIL because brand exports do not exist.
- [ ] **Step 3: Extend generator to emit canonical SVG strings into `brand-assets.generated.ts`; implement `brand.ts` wrappers and `brand.css`. Use finite `16|24|32|48` size classes and `normal|compact|none` clear-space classes; never synthesize path data at runtime.
- [ ] **Step 4: Run UI tests, typecheck and lint. Expected:** PASS.
- [ ] **Step 5: Commit** `feat(ui): add canonical Taijifu brand components`.

### Task 4: Freeze documentation and acceptance gates

**Files:**
- Create: `brand/omega1/BRAND-FAMILY-USAGE.md`
- Modify: `tests/architecture/brand-family.test.ts`
- Modify: `docs/design-system/TAIJIFU-OFFICIAL-DESIGN-SYSTEM-V1.md` only to link the implemented asset/component contract without changing authority.

**Interfaces:**
- Consumes: completed asset family and UI API.
- Produces: clear-space/accessibility/size guidance and repository acceptance coverage for issue #35.

- [ ] **Step 1: Add failing assertions** that usage docs state `N = 56/1000`, normal `2N`, compact `N`, 16/24 MICRO, 32/48 standard, decorative/meaningful accessibility rules, and ORIGIN/NEXUS/FLOW non-logo status.
- [ ] **Step 2: Run architecture test. Expected:** FAIL because usage documentation is missing.
- [ ] **Step 3: Write usage documentation and link it from the official design-system implementation section.
- [ ] **Step 4: Run** `pnpm architecture:test`, `pnpm test`, `pnpm typecheck`, `pnpm lint`, and `pnpm build`. **Expected:** all PASS.
- [ ] **Step 5: Commit** `docs(brand): freeze Omega1 family usage contract`.

### Completion

Run the generator once more, verify clean deterministic output, inspect `git diff --check`, and compare the final diff to issue #35 acceptance criteria. Do not push, merge, close the issue, or publish without explicit user approval.