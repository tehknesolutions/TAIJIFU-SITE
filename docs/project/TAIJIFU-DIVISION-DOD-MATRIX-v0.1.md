# TAIJIFU Division Definition-of-Done Matrix — v0.1

Status: BASELINE CANDIDATE
TPT Gate: PROJECT ARCHAEOLOGY / BASELINE FORMATION
Date: 2026-09-27
Companions:
- `TAIJIFU-PROJECT-TELEMETRY-v1.md`
- `TAIJIFU-ARCHAEOLOGY-DECISION-LEDGER-v1.md`

## Purpose

Convert the seven TPT divisions into explicit, evidence-driven completion matrices. This file defines denominators before percentages. A row may be scored only when its scope is sufficiently evidenced; otherwise it remains `UNKNOWN`.

## Status vocabulary

`UNKNOWN | PLANNED | RED | IMPLEMENTED | VERIFIED | INTEGRATED | DONE | BLOCKED | SUPERSEDED`

A division percentage is permitted only when every denominator row in that division is either accepted as in-scope or explicitly excluded with provenance.

## CODE — denominator candidate C0

| ID | Capability / Gate | Evidence baseline | Current state |
|---|---|---|---|
| CODE-01 | Domain primitives and invariants | `packages/domain` | IMPLEMENTED |
| CODE-02 | Application ports/use-case boundary | `packages/application` | IMPLEMENTED |
| CODE-03 | Cross-boundary contracts | `packages/contracts` | IMPLEMENTED |
| CODE-04 | Identity/TUID service | `services/identity` | IMPLEMENTED |
| CODE-05 | Relationship authority/lifecycle | `services/relationships` | IMPLEMENTED |
| CODE-06 | Capability resolution | `services/capability-resolver` | IMPLEMENTED |
| CODE-07 | Dashboard BFF/adaptive surface | `services/dashboard-bff` | IMPLEMENTED |
| CODE-08 | Infrastructure adapters | `platform/adapters` | IMPLEMENTED |
| CODE-09 | Runtime composition | `platform/runtime` | IMPLEMENTED |
| CODE-10 | EventStore/Snapshot logical-version correctness | current Foundation gate | IMPLEMENTED / NOT VERIFIED |
| CODE-11 | Architecture dependency tests | root `architecture:test` | IMPLEMENTED / NOT VERIFIED |
| CODE-12 | Product application shell(s) | workspace reserves `apps/*`; no manifested app | PLANNED / SCOPE OPEN |

CODE denominator is **not closed** because product-domain/app-shell scope remains open and CI verification is blocked.

## DEVOPS — denominator candidate D0

| ID | Capability / Gate | Current state |
|---|---|---|
| DEVOPS-01 | deterministic package manager/runtime contract | IMPLEMENTED |
| DEVOPS-02 | lint gate | IMPLEMENTED / NOT VERIFIED |
| DEVOPS-03 | typecheck gate | IMPLEMENTED / NOT VERIFIED |
| DEVOPS-04 | test gate | IMPLEMENTED / NOT VERIFIED |
| DEVOPS-05 | build gate | IMPLEMENTED / NOT VERIFIED |
| DEVOPS-06 | architecture-test gate | IMPLEMENTED / NOT VERIFIED |
| DEVOPS-07 | CI runner executes complete pipeline | BLOCKED |
| DEVOPS-08 | deploy environments | UNKNOWN |
| DEVOPS-09 | release/version automation | UNKNOWN |
| DEVOPS-10 | observability/telemetry runtime | UNKNOWN |
| DEVOPS-11 | rollback/recovery | UNKNOWN |

## DESIGN — denominator candidate DS0

| ID | Capability / Gate | Current state |
|---|---|---|
| DESIGN-01 | semantic TAI/JI/FU system | CANON / DONE |
| DESIGN-02 | Ω1 emblem authority | CANON / DONE |
| DESIGN-03 | HNK glyph identity rules | CANON / DONE |
| DESIGN-04 | wordmark system | ACTIVE / INVENTORY |
| DESIGN-05 | color/token system | ACTIVE / PLANNED IMPLEMENTATION |
| DESIGN-06 | typography system | UNKNOWN |
| DESIGN-07 | spacing/grid/radius/elevation/motion tokens | ACTIVE / PARTIAL |
| DESIGN-08 | component visual language | UNKNOWN |
| DESIGN-09 | asset master/source governance | ACTIVE / INVENTORY |
| DESIGN-10 | visual regression references | PLANNED |

## UI — denominator candidate UI0

The current strongest denominator is the approved visual implementation sequence:

| ID | Gate | Current state |
|---|---|---|
| UI-P0 | CANON + asset inventory | ACTIVE |
| UI-P1 | tokens/grid/breakpoints | PLANNED/PARTIAL |
| UI-P2 | Ω1/wordmark/HNK production assets | ACTIVE/PARTIAL |
| UI-P3 | `taijifu-canon` theme shell | NOT MANIFESTED ON MAIN |
| UI-P4 | Dojo Gate | PLANNED |
| UI-P5 | `taijifu-core` presentation integration | PARTIAL/NEEDS REVIEW |
| UI-P6 | theme/core integration | PLANNED |
| UI-P7 | responsive pass | PLANNED |
| UI-P8 | motion/performance/visual accessibility | PLANNED |
| UI-P9 | visual regression | PLANNED |
| UI-P10 | ZIP/staging/QA | PLANNED |

## UX — denominator candidate UX0

| ID | Capability / Gate | Current state |
|---|---|---|
| UX-01 | information architecture/navigation | INVENTORY |
| UX-02 | onboarding/entry journey | INVENTORY |
| UX-03 | adaptive dashboard journey | IMPLEMENTED FOUNDATION / EXPERIENCE OPEN |
| UX-04 | personalized training interview | SPEC EVIDENCED |
| UX-05 | training composition/regeneration | SPEC EVIDENCED |
| UX-06 | feedback/progression loop | SPEC EVIDENCED |
| UX-07 | responsive experience | PLANNED |
| UX-08 | accessibility | PLANNED |
| UX-09 | error/empty/loading/recovery states | UNKNOWN |
| UX-10 | usability validation | UNKNOWN |

## SEO — denominator candidate SEO0

| ID | Capability / Gate | Current state |
|---|---|---|
| SEO-01 | crawl/indexation policy | UNKNOWN |
| SEO-02 | semantic HTML/content hierarchy | UNKNOWN |
| SEO-03 | metadata/title/description policy | UNKNOWN |
| SEO-04 | canonical/redirect strategy | UNKNOWN |
| SEO-05 | structured data/schema | UNKNOWN |
| SEO-06 | sitemap/robots | UNKNOWN |
| SEO-07 | performance/Core Web Vitals | UNKNOWN |
| SEO-08 | social metadata | UNKNOWN |
| SEO-09 | content discoverability/internal linking | UNKNOWN |
| SEO-10 | measurement/Search Console analytics | UNKNOWN |

SEO remains intentionally unscored.

## GAMEDESIGN — denominator candidate GD0

| ID | Capability / Gate | Current state |
|---|---|---|
| GD-01 | curriculum ontology | HISTORICAL EVIDENCE / INGESTION PENDING |
| GD-02 | technique ontology | HISTORICAL EVIDENCE / INGESTION PENDING |
| GD-03 | progression/XP | HISTORICAL EVIDENCE / INGESTION PENDING |
| GD-04 | ranks/certification | HISTORICAL EVIDENCE / INGESTION PENDING |
| GD-05 | challenges/training loops | INVENTORY |
| GD-06 | personalized training rules | SPEC EVIDENCED |
| GD-07 | fighter system | HISTORICAL/PROJECT EVIDENCE |
| GD-08 | combat loadout | HISTORICAL/PROJECT EVIDENCE |
| GD-09 | visual loadout | HISTORICAL/PROJECT EVIDENCE |
| GD-10 | rewards/economy | UNKNOWN |
| GD-11 | balancing/telemetry | UNKNOWN |
| GD-12 | anti-exploit/integrity rules | UNKNOWN |

## Scoring rules v0.1

1. `UNKNOWN` is never treated as zero-complete; it means denominator discovery is incomplete.
2. `IMPLEMENTED` is not `VERIFIED`.
3. `VERIFIED` is not `DONE` until integration/release criteria for that row are satisfied.
4. Historical evidence does not equal current implementation.
5. CANON documentation may complete a decision/design row, but never an implementation row.
6. Blocked verification remains visible and does not silently inherit success.
7. No global Product Progress is emitted until all seven division denominators are accepted.
8. Interim division telemetry may be emitted only for a division whose denominator has been explicitly closed.

## Current baseline formation state

- CODE: denominator candidate strong; closure blocked by app/product scope + CI verification.
- DEVOPS: denominator candidate incomplete; environment/release/observability scope unresolved.
- DESIGN: denominator candidate incomplete; typography/component/source governance inventory needed.
- UI: P0-P10 candidate strong; implementation evidence must be mapped gate-by-gate.
- UX: candidate formed; journey/error/usability scope incomplete.
- SEO: discovery denominator only; all implementation states unknown.
- GAMEDESIGN: candidate formed; historical source ingestion is required before closure.

## Next gate

`DOD MATRIX v0.1 -> EVIDENCE MAPPING -> DENOMINATOR CLOSURE -> BASELINE v0.1 -> ROADMAP GAP GENERATION`

No implementation feature should be reconstructed merely to satisfy an UNKNOWN row. First recover evidence or approve scope, then issue work.
