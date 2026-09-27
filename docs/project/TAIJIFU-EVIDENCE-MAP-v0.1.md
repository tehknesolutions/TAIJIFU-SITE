# TAIJIFU Evidence Map — v0.1

Status: ACTIVE
TPT Gate: EVIDENCE MAPPING
Date: 2026-09-27
Source matrix: `TAIJIFU-DIVISION-DOD-MATRIX-v0.1.md`

## Purpose
Bind TPT Definition-of-Done rows to concrete repository evidence. This is the bridge between project claims and auditable state.

Evidence classes: `CODE | TEST | CI | SPEC | ISSUE | HISTORY`
Confidence: `DIRECT | CORROBORATED | PENDING`

## CODE evidence map — pass 001
| DoD ID | Claim | Evidence | Class | Confidence | Telemetry state |
|---|---|---|---|---|---|
| CODE-01 | Domain primitives/invariants exist | `packages/domain/` | CODE | DIRECT | IMPLEMENTED |
| CODE-02 | Application ports exist | `packages/application/` | CODE | DIRECT | IMPLEMENTED |
| CODE-03 | Cross-boundary contracts exist | `packages/contracts/` | CODE | DIRECT | IMPLEMENTED |
| CODE-04 | Identity/TUID service exists | `services/identity/` | CODE | DIRECT | IMPLEMENTED |
| CODE-05 | Relationship authority service exists | `services/relationships/` | CODE | DIRECT | IMPLEMENTED |
| CODE-06 | Capability resolver exists | `services/capability-resolver/` | CODE | DIRECT | IMPLEMENTED |
| CODE-07 | Dashboard BFF exists | `services/dashboard-bff/` | CODE | DIRECT | IMPLEMENTED |
| CODE-08 | Adapter layer exists | `platform/adapters/` | CODE | DIRECT | IMPLEMENTED |
| CODE-09 | Runtime composition exists | `platform/runtime/` | CODE | DIRECT | IMPLEMENTED |
| CODE-10 | Logical stream version + snapshot work exists | EventStore/SnapshotStore implementation/tests + Foundation history | CODE/TEST | CORROBORATED | IMPLEMENTED / VERIFICATION BLOCKED |
| CODE-11 | Architecture test command exists | root `architecture:test` -> `vitest run tests/architecture` | TEST | DIRECT | IMPLEMENTED / VERIFICATION BLOCKED |
| CODE-12 | Product application shell exists | `apps/*` reserved; no manifested app on main | SPEC/CODE | DIRECT | PLANNED / SCOPE OPEN |

## DEVOPS evidence map — pass 001
| DoD ID | Claim | Evidence | Class | Confidence | Telemetry state |
|---|---|---|---|---|---|
| DEVOPS-01 | Runtime/package contract | root `package.json`: `pnpm@10.17.1`, Node `>=22`; `.nvmrc` used by CI | CODE/CI | CORROBORATED | IMPLEMENTED |
| DEVOPS-02 | Lint gate configured | root `lint`; Foundation workflow | CODE/CI | CORROBORATED | IMPLEMENTED / EXECUTION BLOCKED |
| DEVOPS-03 | Typecheck gate configured | root `typecheck`; Foundation workflow | CODE/CI | CORROBORATED | IMPLEMENTED / EXECUTION BLOCKED |
| DEVOPS-04 | Test gate configured | root `test`; Foundation workflow | CODE/CI | CORROBORATED | IMPLEMENTED / EXECUTION BLOCKED |
| DEVOPS-05 | Build gate configured | root `build`; Foundation workflow | CODE/CI | CORROBORATED | IMPLEMENTED / EXECUTION BLOCKED |
| DEVOPS-06 | Architecture gate configured | `architecture:test`; Foundation workflow | TEST/CI | CORROBORATED | IMPLEMENTED / EXECUTION BLOCKED |
| DEVOPS-07 | CI pipeline definition exists | `.github/workflows/platform-foundation.yml` | CI | DIRECT | IMPLEMENTED / RUN FAILED PRE-STEPS |
| DEVOPS-08 | Deploy environments | not mapped | — | PENDING | UNKNOWN |
| DEVOPS-09 | Release/version automation | not mapped | — | PENDING | UNKNOWN |
| DEVOPS-10 | Runtime observability | not mapped | — | PENDING | UNKNOWN |
| DEVOPS-11 | Rollback/recovery | not mapped | — | PENDING | UNKNOWN |

## Evidence Mapping Pass 002 — GitHub Actions execution

### Foundation merge run

- Workflow: `TAIJIFU Platform Foundation`
- Run ID: `36331039103`
- Run number: `71`
- Trigger: push to `main`
- Head SHA: `436cec1c3f1bb5b4f99667a0e25cab223913d2e6`
- Commit: merge PR #13 (`feat/platform-foundation-v1`)
- Started: `2026-09-27T15:50:41Z`
- Completed: `2026-09-27T15:50:45Z`
- Conclusion: `failure`
- Job: `foundation`, job ID `108652873591`, conclusion `failure`
- Job step API returned an empty step set.
- Job log retrieval returned no retained blob (`BlobNotFound`).

### Interpretation lock

The run proves the Foundation workflow was triggered on the exact merge commit and failed. It does **not** prove that `architecture:test`, `typecheck`, `lint`, `test`, or `build` executed. Because no steps are reported and no job log is retained, those gates remain **UNVERIFIED/BLOCKED**, not FAILED individually.

The approximately four-second run duration, empty step set, and unavailable log are consistent with a failure before executable workflow steps, but the root cause is **UNKNOWN** from retained evidence and must not be invented.

### Telemetry consequences

- Foundation merge status: `MERGED / CI RUN FAILED`.
- CODE-10: `IMPLEMENTED / VERIFICATION BLOCKED`.
- CODE-11: `IMPLEMENTED / VERIFICATION BLOCKED`.
- DEVOPS-02..06: `CONFIGURED / EXECUTION BLOCKED`.
- DEVOPS-07: `IMPLEMENTED / RUN FAILED PRE-STEPS / ROOT CAUSE UNKNOWN`.
- No quality gate may be promoted to VERIFIED from run 36331039103.

## DESIGN / UI evidence map — pass 001
| DoD area | Evidence | Class | Confidence | State |
|---|---|---|---|---|
| DESIGN semantic authority | Dojo Gate / Ω1 decisions in archaeology ledger and source issue lineage | SPEC/ISSUE | CORROBORATED | CANON |
| DESIGN production assets | current asset inventory not fully mapped | CODE/SPEC | PENDING | INVENTORY |
| UI P0-P10 sequence | approved visual-system issue lineage recorded by archaeology ledger | SPEC/ISSUE | CORROBORATED | ACTIVE DENOMINATOR CANDIDATE |
| UI theme shell | `wordpress/themes/taijifu-canon` absent from current main | CODE | DIRECT | NOT MANIFESTED |
| UI core plugin | `wordpress/plugins/taijifu-core` present on current main | CODE | DIRECT | PARTIAL / NEEDS REVIEW |

## UX evidence map — pass 001
Current project archaeology identifies approved/specified personalized-training flows and Foundation support for adaptive dashboard context. Direct source-to-row mapping remains incomplete for the full UX denominator, especially navigation, onboarding, failure states and usability validation.

## SEO evidence map — pass 001
No implementation evidence has yet been mapped for the SEO denominator rows. This is intentionally `UNKNOWN`, not 0%.

## GAMEDESIGN evidence map — pass 001
Historical Project evidence identifies curriculum/technique/progression/certification and fighter/loadout concepts, but the named Manual V12 source set is not manifested in current main and has not yet been ingested losslessly into the repository.

## Evidence rules
1. A configured CI command proves configuration, not successful execution.
2. A failed workflow does not prove an individual quality gate failed unless execution evidence shows that gate ran.
3. A historical artifact proves genealogy, not current implementation.
4. A directory proves manifestation of a unit, not completeness of that unit.
5. A CANON spec proves an approved decision, not shipped product behavior.
6. Verification requires executable evidence: passing test/run, accepted QA, or another explicit gate appropriate to the row.
7. Missing logs/steps are evidence limitations and must remain explicit.
8. Every future percentage must be reproducible from this evidence map + accepted DoD denominator.

## Next evidence passes
- Pass 003: DESIGN/UI asset and WordPress source mapping.
- Pass 004: Project-history mapping for UX and GAMEDESIGN.
- Pass 005: SEO discovery.
- CI remediation is tracked as a DEVOPS blocker; do not rewrite product code to guess at an unknown runner failure.

## Baseline readiness
- CODE: NOT READY — denominator scope open; verification blocked.
- DEVOPS: NOT READY — CI execution blocker + operational denominator incomplete.
- DESIGN: NOT READY — production-system denominator incomplete.
- UI: NOT READY — P0-P10 implementation mapping incomplete.
- UX: NOT READY — denominator/evidence mapping incomplete.
- SEO: NOT READY — discovery incomplete.
- GAMEDESIGN: NOT READY — historical ingestion/reconciliation incomplete.
