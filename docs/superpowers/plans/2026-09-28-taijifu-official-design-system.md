# TAIJIFU Official Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the approved TAIJIFU identity hierarchy and visual references into a tested token/component system and North Star Web experience.

**Architecture:** Canon and Ω1 remain authority; a token package exposes semantic design values; reusable UI components consume tokens; the Interactive Web composes them into accessible semantic pages plus optional Three.js spatial navigation. Raster references supply presentation direction only.

**Tech Stack:** TypeScript, CSS custom properties, Vite, Vitest, Three.js, existing monorepo/pnpm/Turbo.

**Spec:** `docs/design-system/TAIJIFU-OFFICIAL-DESIGN-SYSTEM-V1.md`

## Global Constraints
- Authority: CANON + Ω1 → R01 North Star → R02–R08 synthesis → Design System → implementation.
- Ω1 production geometry is deterministic SVG, never generated raster art.
- TAI red, JI blue, FU gold/yellow, Integração green; exact calibrated values require explicit color gate.
- Semantic HTML remains navigable without Three.js.
- Respect reduced motion and WCAG AA text/control contrast.
- No invented HNK glyphs, neon, glassmorphism, HUD language, alternate logos or raster UI copy.

## Review Focus
- Missing media must degrade to semantic content, not blank the hero.
- Small screens must preserve identity and navigation without horizontal overflow.
- Semantic colors must remain distinguishable without relying on color alone.
- Reduced-motion must remove camera travel/reveal motion.
- Canon data growth must not flatten 174 curriculum entities into one orbit.

---

### Task 1: Authority and traceability tests
**Files:** create `tests/architecture/design-system-authority.test.ts`; consume docs and brand assets.
**Produces:** automated invariants for required authority docs and canonical Ω1 asset names.
- [ ] Write failing architecture tests for spec/reference/prompt docs and required Ω1 master family contracts.
- [ ] Run architecture test and confirm missing implementation contracts fail.
- [ ] Add only the minimum repository metadata/paths needed by the test.
- [ ] Run architecture tests; expect PASS.
- [ ] Commit `test(design): enforce official identity authority`.

### Task 2: Design token contract
**Files:** create `packages/design-tokens/` with `src/tokens.css`, `src/index.ts`, tests and package config.
**Produces:** semantic token API for ink, paper, metal, TAI/JI/FU/Integração, spacing, type roles, motion and mark space.
- [ ] Write tests asserting token names/roles, not provisional raster HEX values.
- [ ] Verify RED.
- [ ] Implement token package and CSS export.
- [ ] Verify package tests/typecheck/build.
- [ ] Commit `feat(design): add Taijifu semantic token contract`.

### Task 3: Brand component family
**Files:** create focused brand components under the existing/new UI package; tests per component.
**Consumes:** Task 2 tokens; canonical `brand/omega1` assets.
**Produces:** `Omega1Mark`, reverse/micro/accent wrappers, lockups and HNK signature with accessible labeling contracts.
- [ ] Write tests proving deterministic asset references and rejecting exploratory logo paths.
- [ ] Verify RED.
- [ ] Implement wrappers without redrawing Ω1.
- [ ] Test 16/24/32/48px states and accessible names where meaningful.
- [ ] Commit `feat(brand): componentize canonical Omega1 family`.

### Task 4: Layout and typography primitives
**Files:** UI primitives + tests + component CSS.
**Produces:** `Container`, `Stack`, `Cluster`, `Rule`, `Surface`, text roles, buttons, links, media frame.
- [ ] Write semantic/a11y tests for buttons, links, focus and text roles.
- [ ] Verify RED.
- [ ] Implement using Task 2 tokens only.
- [ ] Verify unit/type/lint tests.
- [ ] Commit `feat(ui): add Taijifu editorial primitives`.

### Task 5: North Star SiteHeader and DojoGateHero
**Files:** Interactive Web components/styles/tests; R01/R02 visual-regression metadata.
**Produces:** accessible header and hero composition independent of background media.
- [ ] Write tests for nav semantics, Ω1, title/subtitle/maxims, TAI/JI/FU, Dojo CTA and no-media fallback.
- [ ] Verify RED.
- [ ] Implement responsive composition from R01 using deterministic layers.
- [ ] Test keyboard, compact viewport and missing hero media.
- [ ] Commit `feat(web): implement official Dojo Gate north star`.

### Task 6: Principle and Canon components
**Files:** `PrincipleTriad`, `FourBases`, `CanonHierarchy`, `GraduationTrack` + tests.
**Consumes:** canonical snapshot, never duplicated curriculum constants.
**Produces:** progressive Base → Faixa → Caminho → Núcleo semantic disclosure.
- [ ] Write tests for 4 Bases, 10 Faixas, 32 Caminhos, 128 Núcleos and 4 Núcleos per Caminho.
- [ ] Verify RED.
- [ ] Implement adapter/components from snapshot.
- [ ] Test keyboard disclosure and non-color labels.
- [ ] Commit `feat(canon): project curriculum through design system`.

### Task 7: Spatial design-system adapter
**Files:** Three.js projection/focus modules and tests.
**Produces:** contextual hierarchy with Ω1 origin; HTML `NodeLegend` mirrors every spatial destination.
- [ ] Write tests proving contextual expansion rather than flat 174-node orbit.
- [ ] Verify RED.
- [ ] Implement hierarchy projection and legend synchronization.
- [ ] Test reduced motion and keyboard parity.
- [ ] Commit `feat(experience): align spatial navigation with official system`.

### Task 8: Media pipeline and provenance
**Files:** media manifest schema, tests, documentation.
**Consumes:** `docs/prompts/TAIJIFU-VISUAL-PROMPT-LIBRARY.md`.
**Produces:** media records with prompt ID, Rxx provenance, model, aspect, approval and deterministic-brand-composite state.
- [ ] Write schema tests rejecting generated-logo/text assets as canonical brand masters.
- [ ] Verify RED.
- [ ] Implement manifest/schema and initial approved placeholders.
- [ ] Verify tests.
- [ ] Commit `feat(media): add visual provenance pipeline`.

### Task 9: Visual regression and responsive gates
**Files:** visual test configuration/fixtures and docs.
**Produces:** reference states for desktop, tablet, mobile, reduced-motion and no-media fallback.
- [ ] Add failing regression contracts for R01 Home hierarchy and key brand components.
- [ ] Capture deterministic references only after semantic/unit tests pass.
- [ ] Verify no overflow and focus visibility at target widths.
- [ ] Commit `test(visual): lock official Taijifu presentation states`.

### Task 10: Brand Book and legacy-doc status
**Files:** create `docs/brand/TAIJIFU-BRAND-BOOK-V1.md`; update legacy identity docs with historical/superseded status banners without deleting evidence.
**Produces:** one navigable authority index linking Canon, Ω1 engineering, R01–R08 map, tokens, components, prompts and implementation.
- [ ] Write architecture test for authority links/status banners.
- [ ] Verify RED.
- [ ] Publish Brand Book and mark older exploration docs as historical evidence.
- [ ] Run full architecture/typecheck/lint/test/build.
- [ ] Commit `docs(brand): publish Taijifu official brand book v1`.