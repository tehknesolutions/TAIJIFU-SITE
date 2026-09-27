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

## Explicit anti-rework locks

1. Do not relocate the current physical repository tree to match an older target diagram until ARC-002 is resolved.
2. Do not resurrect an earlier WordPress visual release over Dojo Gate/Ω1 CANON without explicit reconciliation.
3. Do not normalize or rewrite Manual V12 historical source in place.
4. Do not discard merged Platform Foundation work during archaeology.
5. Do not declare division percentages before denominators exist.
6. Preserve provenance and supersession links for every conflict resolution.

## Division archaeology status

- CODE — inventory ACTIVE; current runtime/foundation evidence exists; denominator not closed.
- DEVOPS — inventory ACTIVE; workflows and runner blocker identified; denominator not closed.
- DESIGN — inventory ACTIVE; Ω1/wordmark/spec evidence exists; visual genealogy reconciliation pending.
- UI — inventory ACTIVE; WordPress lineage exists; current theme genealogy/source reconciliation pending.
- UX — inventory ACTIVE; training-engine and navigation/accessibility specifications identified; denominator not closed.
- SEO — inventory OPEN; insufficient denominator evidence.
- GAMEDESIGN — inventory ACTIVE; Manual V12/training-system evidence identified; source genealogy and canonical classification pending.

## Next reconciliation batch

Batch 0002 must resolve or narrow:

1. ARC-002 repository target architecture vs manifested architecture.
2. ARC-005 visual lineage: v1.8.2 -> v2.0 -> v2.2 -> Dojo Gate/Ω1.
3. ARC-006 Manual V12 / XP / curriculum / certification / technique genealogy.
4. WordPress theme source genealogy and whether `taijifu-canon` exists in releases/history but is absent from current `main`.
5. First evidence-backed denominator candidates for each division.

## Exit condition

This ledger graduates from archaeology support to baseline authority when all seven division denominators are defined, known conflicts are classified, and TPT can compute progress from evidence without reconstructing decisions from chat history.
