# TAIJIFU Archaeology Decision Ledger — v1

Status: ACTIVE
TPT Gate: PROJECT ARCHAEOLOGY
Established: 2026-09-27
Authority companion: `docs/project/TAIJIFU-PROJECT-TELEMETRY-v1.md`
Execution ledger: GitHub Issue #14

## Purpose

This ledger records reconciled project truth without erasing genealogy. It is deliberately conservative: evidence can establish a classification, but absence of evidence cannot be promoted to CANON.

## Classification vocabularies

TPT truth status:
`CANON | ACTIVE | EXPERIMENTAL | SUPERSEDED | REJECTED | ARCHIVED | NEEDS_REVIEW`

Migration disposition for historical/imported material:
`KEEP | ADAPT | LEGACY | REJECT | DUPLICATE | OPEN`

## Authority precedence

Until explicitly superseded by a newer approved decision, archaeology follows the authority order recorded by Unified Repository Spec V1:

1. Current Creator-declared CANON in TAIJIFU-SITE/current approved discovery.
2. Current approved compatible material.
3. Platform implementation when compatible with current CANON.
4. Manual V12 historical material when compatible with current CANON.
5. Legacy/archive material.

## Reconciled decisions — Batch 0001

| ID | Division(s) | Subject | Evidence | TPT status | Migration disposition | Decision |
|---|---|---|---|---|---|---|
| ARC-001 | CODE, DEVOPS | TAIJIFU-SITE as central repository/source of truth | Unified Repository Spec V1 | ACTIVE | KEEP | Centralization intent remains authoritative for archaeology; physical target tree is not assumed fully manifested. |
| ARC-002 | CODE | Unified target tree vs current physical tree | Unified Repository Spec V1 + current main | NEEDS_REVIEW | OPEN | Do not restructure. Spec targets `canon/`, `apps/platform/`, `manual/`, `wordpress/themes/`; current main materially uses top-level `packages/`, `services/`, `platform/`, and `wordpress/plugins/`. Determine whether target layout was superseded, partially manifested, or remains pending. |
| ARC-003 | DESIGN, UI | Current semantic/visual lock | Unified Repository Spec V1 + Visual System Issue #7 | CANON | KEEP | TAIJIFU = Arte Marcial de se Adaptar; TAI = Essência/Permanência/Axis; JI = Discernimento/Adaptação/Nexus; FU = Manifestação/Fluxo/Flow; Ω1 + Dojo Gate govern current visual direction; HNK glyphs are not Japanese glyphs. |
| ARC-004 | CODE, UI | WordPress presentation/domain separation | Unified Repository Spec V1 + Visual System Issue #7 | ACTIVE | KEEP | `taijifu-core` owns domain/content behavior; `taijifu-canon` owns presentation. WordPress must remain independently deployable and content must not depend on theme survival. |
| ARC-005 | UI, DESIGN | WordPress historical visual lineage | Issues #1, #3, #7 | NEEDS_REVIEW | OPEN | Identity Reset v2.0 and Premium Visual Rebuild v2.2 are genealogy until reconciled against later Dojo Gate/Ω1 CANON. Preserve useful implementation/assets; do not treat earlier visual direction as current merely because code/releases existed. |
| ARC-006 | GAMEDESIGN, UX, CODE | Manual V12 role | Unified Repository Spec V1 | ACTIVE | OPEN | Manual V12 is historical source + curriculum/content/asset reservoir. Its HTML is not final domain model. Every item must be classified before CANON-facing promotion. |
| ARC-007 | CODE | Platform Foundation merged work | TPT v1 + PR #13 evidence | ACTIVE | KEEP | Identity/relationships/capability/BFF/event persistence foundation is integrated work and must not be discarded by archaeology or repository restructuring. |
| ARC-008 | DEVOPS | Foundation verification state | Issue #12 + TPT v1 | ACTIVE | KEEP | Foundation remains IMPLEMENTED / CI BLOCKED until runner executes checkout/install/tests/typecheck/lint/build. No green status may be inferred from implementation alone. |
| ARC-009 | SEO | SEO baseline | Archaeology Issue #14 | NEEDS_REVIEW | OPEN | No authoritative SEO completion denominator yet. Inventory semantics, metadata, structured data, redirects, indexation, discoverability and performance before progress scoring. |
| ARC-010 | ALL | Progress reporting | TPT v1 | CANON | KEEP | No percentage without inventoried denominator and evidence. Unknown scope is UNKNOWN, not estimated. |

## Reconciled decisions — Batch 0002 / Visual lineage

| ID | Division(s) | Subject | Evidence | TPT status | Migration disposition | Decision |
|---|---|---|---|---|---|---|
| ARC-011 | DESIGN, UI, UX | Identity Reset v2.0.0 | Issue #1 | SUPERSEDED | LEGACY | v2.0 is a documented corrective stage responding to v1.8.2 problems: edge spacing, disproportionate hero, HUD/dashboard cards, faux materials, empty internal-page space and conflicting CSS layers. Its useful lessons remain genealogy; its visual identity is not current authority. |
| ARC-012 | DESIGN, UI | Dojo Gate / Ω1 Visual System V1 | Issue #7 + Unified Repository Spec V1 | CANON | KEEP | Dojo Gate is the current official visual composition/direction. Ω1 is the dominant emblem; TAI red, JI blue, FU gold are semantic; HNK glyph identity is protected; generic Japanese symbols cannot substitute HNK glyphs. |
| ARC-013 | UI, UX, CODE | Theme/plugin boundary under current visual CANON | Issue #7 | CANON | KEEP | `taijifu-canon` theme owns tokens/layout/header/footer/Dojo Gate/templates/components/responsive/motion/visual accessibility. `taijifu-core` owns TAIJIFU content/domain structures/blocks/APIs. Theme replacement must not erase or make TAIJIFU knowledge inaccessible. |
| ARC-014 | UI, UX | Current visual implementation gate | Issue #7 | ACTIVE | KEEP | Current implementation sequence is P0 CANON/assets -> P1 tokens/grid/breakpoints -> P2 Ω1/wordmark/HNK assets -> P3 theme shell -> P4 Dojo Gate -> P5 core -> P6 integration -> P7 responsive -> P8 motion/performance/accessibility -> P9 visual regression -> P10 ZIP/staging/QA. This is a denominator candidate, not yet completion telemetry. |
| ARC-015 | DESIGN, UI | Premium Visual Rebuild v2.2 | Issue #14 reference; direct source evidence not yet recovered | NEEDS_REVIEW | OPEN | Preserve v2.2 as a named genealogy stage, but do not assign detailed semantics or reuse status until its direct issue/release/source evidence is recovered. |
| ARC-016 | UI, DESIGN | v1.8.2 -> v2.0 relationship | Issue #1 | SUPERSEDED | LEGACY | v1.8.2 is explicitly the predecessor whose visual defects motivated v2.0. Its release remains useful as implementation genealogy, not current visual authority. |

## Visual genealogy resolved so far

`v1.8.2 [legacy implementation] -> v2.0 Identity Reset [superseded corrective stage] -> v2.2 [genealogy, evidence pending] -> Dojo Gate / Ω1 Visual System V1 [CANON]`

This ordering is a genealogy statement, not permission to delete older assets or releases. Reusable implementation from superseded stages may be ADAPTed only after compatibility review against Dojo Gate/Ω1.

## Explicit anti-rework locks

1. Do not relocate the current physical repository tree to match an older target diagram until ARC-002 is resolved.
2. Do not resurrect an earlier WordPress visual release over Dojo Gate/Ω1 CANON.
3. Do not delete v1.8.2/v2.0/v2.2 genealogy merely because Dojo Gate/Ω1 supersedes their visual authority.
4. Do not normalize or rewrite Manual V12 historical source in place.
5. Do not discard merged Platform Foundation work during archaeology.
6. Do not declare division percentages before denominators exist.
7. Preserve provenance and supersession links for every conflict resolution.
8. Do not claim detailed v2.2 semantics until direct evidence is recovered.

## Division archaeology status

- CODE — inventory ACTIVE; current runtime/foundation evidence exists; denominator not closed.
- DEVOPS — inventory ACTIVE; workflows and runner blocker identified; denominator not closed.
- DESIGN — inventory ACTIVE; current visual authority resolved to Dojo Gate/Ω1; asset/implementation denominator still open.
- UI — inventory ACTIVE; current visual implementation phases P0-P10 provide a denominator candidate; theme source genealogy remains pending.
- UX — inventory ACTIVE; responsive/accessibility gates now linked to current visual CANON; broader experience denominator not closed.
- SEO — inventory OPEN; insufficient denominator evidence.
- GAMEDESIGN — inventory ACTIVE; Manual V12/training-system evidence identified; source genealogy and canonical classification pending.

## Next reconciliation batch

Batch 0003 must resolve or narrow:

1. ARC-002 repository target architecture vs manifested architecture.
2. ARC-015 direct evidence for Premium Visual Rebuild v2.2.
3. ARC-006 Manual V12 / XP / curriculum / certification / technique genealogy.
4. WordPress theme source genealogy and whether `taijifu-canon` exists in releases/history but is absent from current `main`.
5. First evidence-backed denominator candidates for CODE, DEVOPS, DESIGN, UX, SEO and GAMEDESIGN; validate UI P0-P10 denominator candidate.

## Exit condition

This ledger graduates from archaeology support to baseline authority when all seven division denominators are defined, known conflicts are classified, and TPT can compute progress from evidence without reconstructing decisions from chat history.
