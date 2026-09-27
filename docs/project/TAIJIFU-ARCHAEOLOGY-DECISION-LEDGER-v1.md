# TAIJIFU Archaeology Decision Ledger — v1

Status: ACTIVE
TPT Gate: PROJECT ARCHAEOLOGY
Established: 2026-09-27
Authority companion: `docs/project/TAIJIFU-PROJECT-TELEMETRY-v1.md`
Execution ledger: GitHub Issue #14

## Purpose
This ledger records reconciled project truth without erasing genealogy. Evidence can establish a classification; absence of evidence cannot be promoted to CANON.

## Classification vocabularies
TPT truth: `CANON | ACTIVE | EXPERIMENTAL | SUPERSEDED | REJECTED | ARCHIVED | NEEDS_REVIEW`
Migration: `KEEP | ADAPT | LEGACY | REJECT | DUPLICATE | OPEN`

## Authority precedence
1. Current Creator-declared CANON in TAIJIFU-SITE/current approved discovery.
2. Current approved compatible material.
3. Platform implementation when compatible with current CANON.
4. Manual V12 historical material when compatible with current CANON.
5. Legacy/archive material.

## Reconciled decisions — Batch 0001
| ID | Division(s) | Subject | TPT status | Migration | Decision |
|---|---|---|---|---|---|
| ARC-001 | CODE, DEVOPS | TAIJIFU-SITE central source of truth | ACTIVE | KEEP | Centralization intent remains authoritative. |
| ARC-002 | CODE, DEVOPS | Target tree vs manifested tree | ACTIVE | ADAPT | Current monorepo topology is authoritative for ongoing Foundation work: workspace contract declares `apps/*`, `services/*`, `packages/*`, `platform/*`; manifested code currently occupies `services`, `packages`, `platform`. Historical `canon/`, `manual/`, and WordPress theme targets remain migration/content concerns, not a mandate to relocate working Foundation code. `apps/*` is reserved by workspace but not yet manifested. |
| ARC-003 | DESIGN, UI | Current semantic/visual lock | CANON | KEEP | TAIJIFU semantics + Ω1 + Dojo Gate govern current visual direction. |
| ARC-004 | CODE, UI | WordPress presentation/domain separation | ACTIVE | KEEP | `taijifu-core` owns domain/content behavior; `taijifu-canon` owns presentation. |
| ARC-005 | UI, DESIGN | WordPress historical visual lineage | NEEDS_REVIEW | OPEN | Preserve genealogy; current authority is resolved separately below. |
| ARC-006 | GAMEDESIGN, UX, CODE | Manual V12 role | ACTIVE | OPEN | Historical source + curriculum/content/asset reservoir; not automatically final domain model. |
| ARC-007 | CODE | Platform Foundation merged work | ACTIVE | KEEP | Identity/relationships/capability/BFF/event persistence Foundation is integrated and protected from archaeology-driven restructuring. |
| ARC-008 | DEVOPS | Foundation verification state | ACTIVE | KEEP | IMPLEMENTED / CI BLOCKED until runner verifies checkout/install/tests/typecheck/lint/build. |
| ARC-009 | SEO | SEO baseline | NEEDS_REVIEW | OPEN | Inventory required before scoring. |
| ARC-010 | ALL | Progress reporting | CANON | KEEP | No percentage without inventoried denominator and evidence. |

## Reconciled decisions — Batch 0002 / Visual lineage
| ID | Division(s) | Subject | TPT status | Migration | Decision |
|---|---|---|---|---|---|
| ARC-011 | DESIGN, UI, UX | Identity Reset v2.0.0 | SUPERSEDED | LEGACY | Corrective stage after v1.8.2; lessons preserved, visual authority superseded. |
| ARC-012 | DESIGN, UI | Dojo Gate / Ω1 Visual System V1 | CANON | KEEP | Current official visual composition/direction. |
| ARC-013 | UI, UX, CODE | Theme/plugin boundary | CANON | KEEP | Theme owns presentation; plugin owns content/domain structures/APIs. |
| ARC-014 | UI, UX | Visual implementation gate P0-P10 | ACTIVE | KEEP | P0-P10 is the first evidence-backed UI denominator candidate; not yet completion telemetry. |
| ARC-015 | DESIGN, UI | Premium Visual Rebuild v2.2 | NEEDS_REVIEW | OPEN | Named genealogy stage; direct evidence still pending. |
| ARC-016 | UI, DESIGN | v1.8.2 -> v2.0 | SUPERSEDED | LEGACY | v1.8.2 is predecessor genealogy, not current authority. |

## Reconciled decisions — Batch 0003 / Manifested architecture
| ID | Division(s) | Subject | TPT status | Migration | Decision |
|---|---|---|---|---|---|
| ARC-017 | CODE | Monorepo workspace topology | CANON | KEEP | `pnpm-workspace.yaml` is the executable topology contract: `apps/*`, `services/*`, `packages/*`, `platform/*`. New platform/application code follows this topology unless a future approved architecture decision supersedes it. |
| ARC-018 | CODE | Current Foundation service inventory | ACTIVE | KEEP | Manifested services: `identity`, `relationships`, `capability-resolver`, `dashboard-bff`. These are baseline evidence units for CODE telemetry. |
| ARC-019 | CODE | Current shared package inventory | ACTIVE | KEEP | Manifested packages: `domain`, `application`, `contracts`. These are baseline evidence units for CODE telemetry. |
| ARC-020 | CODE | Current platform inventory | ACTIVE | KEEP | Manifested platform units: `adapters`, `runtime`. These are baseline evidence units for CODE telemetry. |
| ARC-021 | CODE, UI | Application shell status | ACTIVE | OPEN | Workspace reserves `apps/*`, but no `apps/` directory is currently manifested on `main`. This is a planned slot, not missing code to recreate without an approved app-shell issue. |
| ARC-022 | UI, DESIGN | WordPress theme physical status | NEEDS_REVIEW | OPEN | `wordpress/` currently manifests only `plugins/`; `wordpress/themes/taijifu-canon` is not present on `main`. Preserve the theme specification as planned/current CANON boundary, but do not report implementation complete. |
| ARC-023 | GAMEDESIGN, UX, CODE | Manual V12 physical status | NEEDS_REVIEW | OPEN | Manual V12 nominal content was not found in current indexed main during Batch 0003. Treat ingestion/migration as pending evidence work, not as a request to recreate the manual from memory. |
| ARC-024 | UI, DESIGN, DEVOPS | Historical release status | ACTIVE | LEGACY | Current GitHub Releases collection is empty. Historical v1.8.2/v2.x labels are genealogy/documented stages, not presently published GitHub Releases in this repository. |

## Architecture lock after Batch 0003
The architecture question is narrowed enough to prevent rework:

- **KEEP** current executable monorepo topology: `apps/*`, `services/*`, `packages/*`, `platform/*`.
- **KEEP** manifested Foundation code where it is.
- **DO NOT** relocate Foundation into historical `apps/platform` or `canon` paths merely to match an older target diagram.
- Treat `canon/`, `manual/`, WordPress theme, historical assets and source packages as archaeology/migration concerns until individually reconciled.
- `apps/*` remains a valid reserved workspace surface, but an application shell must be created only from an approved product/architecture issue.

## Visual genealogy
`v1.8.2 [legacy] -> v2.0 Identity Reset [superseded] -> v2.2 [evidence pending] -> Dojo Gate / Ω1 Visual System V1 [CANON]`

## First denominator candidates
These are candidates only; a denominator becomes scoreable when its scope and completion criteria are explicitly accepted.

- CODE: 4 manifested services + 3 shared packages + 2 platform units + architecture tests/runtime integration gates. Candidate inventory units now evidence-backed; product-domain denominator remains open.
- DEVOPS: CI workflow gates + architecture verification + build/test/typecheck/lint + deployment/release/observability surfaces. Only CI/verification subset currently evidenced; denominator remains open.
- DESIGN: semantic lock + Ω1/wordmark/HNK asset system + tokens + visual regression references. Scope partially evidenced; denominator remains open.
- UI: P0-P10 visual implementation sequence is current strongest denominator candidate; physical theme is not manifested on main.
- UX: training experience + responsive + accessibility + navigation/onboarding/dashboard journeys. Multiple specs exist; unified denominator remains open.
- SEO: metadata + semantic HTML + structured data + redirects + indexation + performance/discoverability. Inventory still open; no score.
- GAMEDESIGN: curriculum + techniques + progression/XP + challenges/training + certification + fighter/loadout systems where approved. Historical/manual evidence must be ingested before denominator closure.

## Explicit anti-rework locks
1. Do not restructure working Foundation code to match historical target diagrams.
2. Do not resurrect earlier WordPress visual authority over Dojo Gate/Ω1.
3. Do not recreate absent historical sources from memory; ingest evidence first.
4. Do not discard merged Foundation work during archaeology.
5. Do not declare division percentages before denominators are accepted.
6. Preserve provenance and supersession links.
7. Do not claim detailed v2.2 semantics until direct evidence is recovered.
8. Do not create `apps/` merely because the workspace reserves it; require an approved app-shell scope.

## Division archaeology status
- CODE — architecture topology RESOLVED; inventory ACTIVE; denominator candidate emerging.
- DEVOPS — inventory ACTIVE; runner blocker identified; denominator open.
- DESIGN — current visual authority RESOLVED; denominator open.
- UI — P0-P10 denominator candidate; theme implementation status OPEN.
- UX — inventory ACTIVE; denominator open.
- SEO — inventory OPEN.
- GAMEDESIGN — inventory ACTIVE; historical ingestion pending.

## Next reconciliation batch
Batch 0004:
1. Recover direct v2.2 evidence if available.
2. Continue Manual V12 / XP / curriculum / certification / technique archaeology from Project evidence.
3. Reconcile `taijifu-canon` source genealogy.
4. Turn denominator candidates into explicit Definition-of-Done matrices per division.
5. Establish first baseline only for divisions whose denominator can be evidenced without invention.

## Exit condition
The ledger graduates to baseline authority when all seven division denominators are defined, known conflicts are classified, and TPT can compute progress from evidence without reconstructing decisions from chat history.
