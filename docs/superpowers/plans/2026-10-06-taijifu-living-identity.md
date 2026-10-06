# TAIJIFU Living Identity Implementation Plan

**Goal:** Implement the approved Arcane-inspired TAIJIFU Living Identity without changing Canon, protected mark topology, or the official Home hierarchy.

**Architecture:** Extend `@taijifu/design-tokens` first, then consume semantic intensity/material/motion roles in the interactive web. Keep TKN ARCANE as design-system inspiration only; no runtime dependency. Separate canonical identity from presentation manifestations and make Signal/Artifact/Ritual progressively expressive.

**Tech:** TypeScript, CSS custom properties, Vitest, Vite, existing pnpm/Turbo monorepo.

---

## Task 1 — Lock the Living Identity token contract (RED)

**Files:**
- Modify: `packages/design-tokens/src/tokens.test.ts`
- Modify: `packages/design-tokens/src/index.ts`
- Modify: `packages/design-tokens/src/tokens.css`

1. Add failing tests for semantic intensity roles: `signal`, `artifact`, `ritual`.
2. Add failing tests for surface/material roles: `void`, `elevated`, `deep`, `metal`.
3. Add failing tests for controlled energy/depth roles without introducing hard-coded hex calibration into the semantic token layer.
4. Add failing tests for semantic TAI/JI/FU motion roles and reduced-motion parity.
5. Run `pnpm --filter @taijifu/design-tokens test` and confirm RED.
6. Implement the smallest TypeScript/CSS token surface to satisfy the contract.
7. Re-run package test/typecheck/lint.
8. Commit: `feat(identity): add living identity semantic tokens`.

## Task 2 — Add identity invariants and manifestation rules

**Files:**
- Create: `packages/design-tokens/src/identity.ts`
- Create: `packages/design-tokens/src/identity.test.ts`
- Modify: `packages/design-tokens/src/index.ts`

1. Write RED tests expressing TAI=essence/invariant, JI=adaptation, FU=manifestation.
2. Define `ManifestationIntensity = signal | artifact | ritual`.
3. Define a small immutable identity contract describing what presentation may adapt: scale, material, depth, illumination, motion, responsive composition.
4. Encode protected dimensions that presentation must not reinterpret: semantic roles, provenance, canonical hierarchy, protected mark topology.
5. Add validation helpers that fail closed for unsupported intensity or protected-role remapping.
6. Test/typecheck/lint.
7. Commit: `feat(identity): encode manifestation invariants`.

## Task 3 — Remove accidental visual canon from Home CSS

**Files:**
- Modify: `apps/interactive-web/src/home-visual-parity.css`
- Modify tests that currently assert the Home semantic contract.

1. Add a RED assertion that the Home presentation consumes design-system semantic roles rather than defining independent hard-coded TAI/JI/FU colors.
2. Replace local TAI/JI/FU presentation literals with calibrated semantic aliases.
3. Keep atmospheric values explicitly presentation-only where no canonical color meaning is implied.
4. Ensure no presentation value is promoted to Canon merely because it appears in the official screenshot.
5. Test interactive-web semantic contract and build.
6. Commit: `refactor(home): consume living identity semantics`.

## Task 4 — Restore canonical mark discipline

**Files:**
- Inspect/modify: `apps/interactive-web/index.html`
- Inspect/modify: `apps/interactive-web/public/brand/*`
- Add/modify Home tests.

1. Write a RED test that the Home cannot silently substitute an invented mark for the protected canonical identity.
2. Classify brand assets explicitly as canonical vs presentation-only.
3. Remove/relegate the previously invented ceremonial mark from canonical use.
4. Render the protected mark using presentation layers (material/light/depth) without topology drift.
5. Preserve accessibility and reduced-motion behavior.
6. Build and visually inspect; do not call it approved yet.
7. Commit: `fix(brand): preserve canonical mark topology`.

## Task 5 — Canonical Home provenance correction

**Files:**
- Modify: `apps/interactive-web/index.html`
- Modify localization/content source if the provenance string is generated elsewhere.
- Add/modify tests.

1. Add RED assertions for:
   - `TAIJIFU — desde 2006`
   - creators: `Thales Wallison Santos Ferreira` and `Miguel Da Vinci Santos Ferreira`
   - no TAIJIFU-origin use of 1992.
2. Replace stale `Desde 2026` and abbreviated creator names.
3. Verify structural localization does not silently translate or mutate canonical names/dates.
4. Test/build.
5. Commit: `fix(canon): correct taijifu provenance`.

## Task 6 — Rebuild Home as a Ritual manifestation

**Files:**
- Modify: `apps/interactive-web/index.html`
- Modify: `apps/interactive-web/src/home-visual-parity.css`
- Modify/add Home semantic tests.

1. Lock the official hierarchy in tests: header → environment → protected central mark → title/subtitle → two lateral doctrine banners → centered TAI/JI/FU triad → Dojo CTA → provenance/HNK secondary layer.
2. Assert exactly two lateral doctrine banners; TAI/JI/FU must not become banners.
3. Apply Ritual depth/energy/material semantics only to the threshold experience.
4. Preserve official maxims:
   - `Firme na essência. Livre na forma.`
   - `Mudar sem deixar de ser.`
5. Keep TAI/JI/FU together in the central doctrine system.
6. Make responsive layouts preserve hierarchy rather than crop semantic content.
7. Test/build.
8. Commit: `feat(home): implement ritual identity hierarchy`.

## Task 7 — Artifact grammar for Faixas, Caminhos and Núcleos

**Files:**
- Modify appropriate Dojo renderer/styles after exact file inspection.
- Add renderer/semantic tests.

1. Write RED tests proving canonical structure remains 10 Faixas → 32 Caminhos → 128 Núcleos.
2. Define Artifact presentation primitives for canonical knowledge objects.
3. Map Faixa to large-scale region/level, Caminho to trajectory/relation, Núcleo to spatial Artifact without changing canonical IDs.
4. Prohibit XP/completion/rank/certification/personal-progress semantics.
5. Preserve Nucleus→Nucleus, Path transitions, N128→Dojo Map, and Practice Mode.
6. Test/build.
7. Commit: `feat(dojo): apply artifact identity grammar`.

## Task 8 — Semantic motion and performance tiers

**Files:**
- Extend design-token motion tests/tokens.
- Modify interactive-web motion styles/runtime where applicable.

1. Add RED tests for semantic categories: reveal/perception, relation, adaptation, manifestation, transition.
2. Implement duration/easing aliases without copying ARCANE phase names as TAIJIFU Canon.
3. Ensure `prefers-reduced-motion` collapses decorative movement while preserving state and hierarchy.
4. Verify keyboard interaction and focus behavior remain intact.
5. Test/build.
6. Commit: `feat(motion): add semantic taijifu motion grammar`.

## Task 9 — Visual acceptance gate

1. Build `@taijifu/interactive-web` from a clean dependency state when executable CI/local runner evidence is available.
2. Capture desktop Home at the official reference aspect ratio.
3. Compare side-by-side against the supplied official Home reference.
4. Review: hierarchy, banner placement, central mark topology, TAI/JI/FU grouping, atmosphere, typography, CTA, provenance, HNK secondary role.
5. Repeat at mobile width for hierarchy preservation.
6. Do **not** label visual fidelity complete without explicit project-owner approval.
7. Record accepted/rejected deltas in docs before any final calibration commit.

## Task 10 — Repository verification

1. Run package lint/typecheck/test/build.
2. Run root architecture tests.
3. Run interactive-web build.
4. Treat GitHub Actions as verification evidence only when an actual run is observable; do not infer green CI.
5. Commit any final documentation-only acceptance record separately.

## Execution rule

Implementation proceeds sequentially from the token contract outward. No image-generation pass may redefine Canon. Generated or presentation assets are drafts until explicitly accepted. The repository remains self-contained and GitHub-first.
