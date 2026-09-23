# TAIJIFU Official Brand System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the production TAIJIFU brand system around the canonical Ω1 emblem: proprietary wordmark, lockups, semantic colors, icons, physical-safe variants, tokens and application proofs.

**Architecture:** Keep Ω1 immutable and build all new assets as deterministic SVG descendants around it. Separate master geometry, variants, lockups, icons, tokens and tests so each asset can be independently verified. Use raster renders only as test/proof outputs; SVG remains source of truth.

**Tech Stack:** SVG 1.1/SVG2-compatible vectors, CSS custom properties, Python/CairoSVG or equivalent raster verification, image-dimension/pixel tests, Git/GitHub.

**Spec:** `docs/superpowers/specs/2026-09-23-taijifu-official-brand-system-design.md`

## Global Constraints

- Ω1 master geometry is immutable.
- Standard Ω1 is used at >= 32 px; MICRO at < 32 px.
- Wordmark is uppercase `TAIJIFU` and proprietary.
- Wordmark character is 50% geometric precision / 50% controlled martial gesture.
- Internal rhythm is `TAI | JI | FU` without literal spaces.
- Horizontal Ω1 optical height is approximately 1.35× wordmark optical height.
- Identity must pass in monochrome before semantic color.
- Semantic roles: TAI red, JI blue, FU gold/yellow, Integration green.
- HNK genealogy uses only canonical source glyphs; no invented glyphs.
- No permanent neon, glow, gradient, fake kanji, generic ninja/samurai typography or rainbow dependency.

## Review Focus

- Very small lockups must switch to symbol-only/micro behavior rather than shrinking text into illegibility.
- Reverse mode must preserve geometry and sufficient contrast without changing Ω1 paths.
- Long/short embedding containers must not clip Ω1 terminals or wordmark cuts.
- Semantic color must remain optional: removing color must not remove hierarchy or readability.
- Physical reproduction must survive single-color embroidery/engraving without hairline gaps or detached micro-shapes.

---

### Task 1: Wordmark Construction Master

**Files:**
- Create: `brand/wordmark/construction/taijifu-wordmark-v1.svg`
- Create: `brand/wordmark/tests/wordmark-v1-audit.md`
- Create: `brand/wordmark/tests/render-wordmark.py`

**Interfaces:**
- Consumes: approved letter anatomy and 1000-unit cap-height field from the spec.
- Produces: deterministic `TAIJIFU` SVG candidate with named groups `TAI`, `JI`, `FU` and no external font dependency.

- [ ] **Step 1: Write the failing structural test**

Create `render-wordmark.py` to parse the SVG XML and assert: viewBox exists; no `<text>` nodes; groups with IDs `TAI`, `JI`, `FU` exist; no filter/gradient elements exist; every visible mark is vector geometry.

- [ ] **Step 2: Run the test and verify RED**

Run: `python brand/wordmark/tests/render-wordmark.py`
Expected: FAIL because `taijifu-wordmark-v1.svg` does not exist.

- [ ] **Step 3: Construct V1**

Draw T/A/I/J/I/F/U as explicit SVG paths/shapes using the approved axis/cut/terminal family. Preserve immediate Latin readability and the `TAI | JI | FU` optical rhythm.

- [ ] **Step 4: Run structural test and raster proof**

Run: `python brand/wordmark/tests/render-wordmark.py`
Expected: PASS structural assertions and generation of 1024/256/128/64 px monochrome proofs.

- [ ] **Step 5: Record optical audit**

Document letter collisions, counters, rhythm and minimum useful wordmark size in `wordmark-v1-audit.md`. If any required criterion fails, revise V1 and rerun before proceeding.

- [ ] **Step 6: Commit**

```bash
git add brand/wordmark
git commit -m "brand: construct TAIJIFU proprietary wordmark"
```

### Task 2: Promote Wordmark Master

**Files:**
- Create: `brand/wordmark/master/taijifu-wordmark-master.svg`
- Create: `brand/wordmark/master/taijifu-wordmark-reverse.svg`

**Interfaces:**
- Consumes: Task 1 passing candidate.
- Produces: immutable wordmark geometry used by all lockups.

- [ ] **Step 1: Add master-equivalence assertions**

Extend the test to canonicalize path data and assert normal/reverse variants contain identical geometry.

- [ ] **Step 2: Verify RED before masters exist**

Run the test and confirm missing-master failure.

- [ ] **Step 3: Freeze approved geometry into master files**

Normal uses `currentColor`; reverse changes presentation context only, never path coordinates.

- [ ] **Step 4: Verify GREEN**

Run structural/equivalence tests and render both polarities at 256/128/64 px.

- [ ] **Step 5: Commit**

```bash
git add brand/wordmark/master brand/wordmark/tests
git commit -m "brand: promote TAIJIFU wordmark master"
```

### Task 3: Brand Color Tokens

**Files:**
- Create: `brand/tokens/taijifu-brand.css`
- Create: `brand/tokens/taijifu-brand.json`
- Create: `brand/tokens/test-brand-tokens.py`

**Interfaces:**
- Produces exact semantic tokens for ink, paper, TAI, JI, FU, Integration and material neutrals.

- [ ] **Step 1: Write failing token-schema and contrast tests**

Assert CSS and JSON expose the same token names/values; calculate WCAG contrast for text-bearing combinations; reject gradients and alpha-only core colors.

- [ ] **Step 2: Verify RED**

Run: `python brand/tokens/test-brand-tokens.py`
Expected: FAIL because token files do not exist.

- [ ] **Step 3: Calibrate candidate palette**

Choose production HEX values for red/blue/gold/green plus ink/paper/metal neutrals. Keep semantic colors accents, not mandatory text colors.

- [ ] **Step 4: Verify GREEN**

Run token tests. Any text-bearing combination below the required contrast must be reassigned to decorative/accent-only usage or recalibrated.

- [ ] **Step 5: Commit**

```bash
git add brand/tokens
git commit -m "brand: define TAIJIFU semantic color tokens"
```

### Task 4: Horizontal and Vertical Lockups

**Files:**
- Create: `brand/omega1/lockups/taijifu-lockup-horizontal.svg`
- Create: `brand/omega1/lockups/taijifu-lockup-vertical.svg`
- Create: `brand/omega1/lockups/test-lockups.py`

**Interfaces:**
- Consumes: Ω1 master + wordmark master.
- Produces: primary horizontal and ceremonial vertical brand signatures.

- [ ] **Step 1: Write failing composition tests**

Assert lockups embed/reference only canonical geometry, contain no text/font dependency, preserve Ω1 aspect ratio, and horizontal optical ratio falls within an explicit tolerance around 1.35.

- [ ] **Step 2: Verify RED**

Run: `python brand/omega1/lockups/test-lockups.py`
Expected: FAIL because lockups do not exist.

- [ ] **Step 3: Build horizontal lockup**

Compose Ω1 and wordmark using optical spacing; do not edit either master geometry.

- [ ] **Step 4: Build vertical lockup**

Place Ω1 above the wordmark with ceremonial whitespace and no geometry mutation.

- [ ] **Step 5: Verify and render**

Render horizontal at wide header sizes and vertical at poster/mobile sizes; test clipping at tight containers.

- [ ] **Step 6: Commit**

```bash
git add brand/omega1/lockups
git commit -m "brand: add official TAIJIFU lockups"
```

### Task 5: HNK Expanded Origin Signature

**Files:**
- Create: `brand/omega1/lockups/taijifu-hnk-origin-signature.svg`
- Create: `brand/omega1/lockups/HNK-ORIGIN-SIGNATURE.md`

**Interfaces:**
- Consumes canonical source SVGs G22/G01/G03/G36/G25/G05 and official lockup.
- Produces editorial/ceremonial signature showing the ordered seven-position genealogy.

- [ ] **Step 1: Add source-ID test**

Assert sequence is exactly `G22,G01,G03,G36,G03,G25,G05` and all source assets resolve to canonical files.

- [ ] **Step 2: Verify test fails before signature exists**

Expected: missing signature failure.

- [ ] **Step 3: Build expanded signature**

Show source sequence as a subordinate construction layer; never substitute it for the everyday logo.

- [ ] **Step 4: Verify and document usage**

Pass source-ID test and record allowed contexts in the markdown guide.

- [ ] **Step 5: Commit**

```bash
git add brand/omega1/lockups
git commit -m "brand: add TAIJIFU HNK origin signature"
```

### Task 6: Favicon and App Icon System

**Files:**
- Create: `brand/omega1/icons/favicon.svg`
- Create: `brand/omega1/icons/app-icon.svg`
- Create: `brand/omega1/icons/test-icons.py`
- Generate proof PNGs for 16, 24, 32, 48, 180, 192, 512 px.

**Interfaces:**
- Consumes: Ω1 MICRO for tiny sizes, Ω1 standard for large app icon.
- Produces platform-ready icon sources and verification renders.

- [ ] **Step 1: Write failing geometry/source-selection tests**

Assert favicon uses MICRO geometry and large app icon uses standard Ω1 geometry; reject embedded fonts/filters/gradients.

- [ ] **Step 2: Verify RED**

Run icon test; expect missing assets.

- [ ] **Step 3: Build icon sources**

Use safe-area padding and solid background/foreground variants suitable for browser and app contexts.

- [ ] **Step 4: Render all target sizes and verify GREEN**

Check 16/24 px silhouette manually and automatically verify non-empty bounds/no clipping.

- [ ] **Step 5: Commit**

```bash
git add brand/omega1/icons
git commit -m "brand: add TAIJIFU favicon and app icon system"
```

### Task 7: Physical-Safe Seal / Embroidery Variant

**Files:**
- Create: `brand/omega1/variants/omega1-seal.svg`
- Create: `brand/omega1/variants/test-physical.py`

**Interfaces:**
- Consumes Ω1 identity; produces one-color physical reproduction asset.

- [ ] **Step 1: Write minimum-feature test**

Check single-color-only geometry, minimum normalized gap/stroke thresholds and absence of detached decorative micro-elements.

- [ ] **Step 2: Verify RED**

Run test; expect missing seal.

- [ ] **Step 3: Construct physical-safe optical variant**

Preserve AXIS/PORTAL/FLOW silhouette while simplifying only what is required for thread/engraving survival.

- [ ] **Step 4: Verify GREEN and raster simulation**

Render coarse 1-bit and low-resolution proofs to emulate thread/engraving constraints.

- [ ] **Step 5: Commit**

```bash
git add brand/omega1/variants
git commit -m "brand: add physical-safe Omega1 seal"
```

### Task 8: Semantic Accent Variant

**Files:**
- Create: `brand/omega1/variants/taijifu-lockup-semantic.svg`
- Modify: `brand/omega1/lockups/test-lockups.py`

**Interfaces:**
- Consumes brand tokens and official lockup.
- Produces optional TAI-red / JI-blue / FU-gold / Integration-green semantic presentation.

- [ ] **Step 1: Add failing token-binding test**

Assert the SVG references semantic CSS variables/tokens rather than hard-coded unrelated colors and still has a monochrome fallback.

- [ ] **Step 2: Verify RED**

Expected: semantic variant missing.

- [ ] **Step 3: Build semantic variant**

Apply color by semantic grouping without changing geometry.

- [ ] **Step 4: Verify GREEN**

Run lockup/token tests and render on paper/ink contexts.

- [ ] **Step 5: Commit**

```bash
git add brand/omega1/variants brand/omega1/lockups/test-lockups.py
git commit -m "brand: add semantic TAI JI FU color variant"
```

### Task 9: Application Proofs and Brand QA

**Files:**
- Create: `docs/brand/TAIJIFU-BRAND-QA.md`
- Create: `brand/omega1/tests/run-brand-qa.py`
- Generate proof sheets under `brand/omega1/tests/output/` (or CI artifact output if binary repo policy excludes them).

**Interfaces:**
- Consumes all prior masters/variants.
- Produces final technical QA evidence for website header, mobile/app, uniform and ceremonial/dojo applications.

- [ ] **Step 1: Write aggregate QA runner**

Runner executes wordmark, token, lockup, icon and physical tests and exits non-zero on any failure.

- [ ] **Step 2: Deliberately verify aggregate failure before all expected artifacts are complete**

Run: `python brand/omega1/tests/run-brand-qa.py`
Expected: FAIL until every required asset exists and passes.

- [ ] **Step 3: Generate four application proofs**

Create deterministic previews for: desktop web header, mobile/app surface, uniform chest/back application and dojo/ceremonial entrance/signage.

- [ ] **Step 4: Run complete QA**

Run: `python brand/omega1/tests/run-brand-qa.py`
Expected: PASS with zero failed checks.

- [ ] **Step 5: Record exact results**

Write tested sizes, hashes, commands and any limitations to `TAIJIFU-BRAND-QA.md`.

- [ ] **Step 6: Commit**

```bash
git add brand docs/brand/TAIJIFU-BRAND-QA.md
git commit -m "brand: complete TAIJIFU official brand system QA"
```

## Self-review

- Spec coverage: wordmark, color, horizontal/vertical lockups, HNK signature, icons, physical reproduction, semantic accents, responsive behavior and application proofs are each owned by a task.
- Placeholder scan: implementation gates use explicit criteria; no design decision is deferred without a validation rule.
- Interface consistency: all compositions consume immutable Ω1 and promoted wordmark masters; tokens are defined before semantic variant.
- Review Focus coverage: tiny contexts → Task 6; reverse → Task 2/4; clipping → Task 4; optional semantic color → Tasks 3/8; physical reproduction → Task 7.

## Execution handoff

Implementation must begin only after review of this plan. Recommended execution for the current workflow: **Native**, task-by-task in the existing `brand/omega1-engineering` branch, with fresh verification before every promotion or completion claim.
