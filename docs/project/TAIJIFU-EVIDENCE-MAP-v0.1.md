# TAIJIFU Evidence Map — v0.1

Status: ACTIVE
TPT Gate: EVIDENCE MAPPING
Date: 2026-09-27
Source matrix: `TAIJIFU-DIVISION-DOD-MATRIX-v0.1.md`

## Purpose

Bind TPT Definition-of-Done rows to concrete repository evidence. This is the bridge between project claims and auditable state.

Evidence classes:
- `CODE` — executable/source artifact.
- `TEST` — automated test or architecture assertion.
- `CI` — workflow/gate configuration or run evidence.
- `SPEC` — approved specification/decision artifact.
- `ISSUE` — execution/decision ledger.
- `HISTORY` — genealogy only; cannot prove current implementation.

Confidence:
- `DIRECT` — artifact directly demonstrates the claim.
- `CORROBORATED` — multiple artifacts support the claim.
- `PENDING` — named evidence exists conceptually but has not been recovered/mapped.

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
| CODE-10 | Logical stream version + snapshot work exists | EventStore/SnapshotStore implementation/tests + Foundation history | CODE/TEST | CORROBORATED | IMPLEMENTED / VERIFICATION PENDING |
| CODE-11 | Architecture test command exists | root `architecture:test` -> `vitest run tests/architecture` | TEST | DIRECT | IMPLEMENTED / VERIFICATION PENDING |
| CODE-12 | Product application shell exists | `apps/*` reserved in workspace; no manifested app on main | SPEC/CODE | DIRECT | PLANNED / SCOPE OPEN |

### CODE finding

Implementation evidence is strong for the Foundation units, but the division denominator remains open because CODE-12 and later product-domain scope are not yet approved as a closed product boundary. No CODE percentage is emitted yet.

## DEVOPS evidence map — pass 001

| DoD ID | Claim | Evidence | Class | Confidence | Telemetry state |
|---|---|---|---|---|---|
| DEVOPS-01 | Runtime/package contract | root `package.json`: `pnpm@10.17.1`, Node `>=22`; `.nvmrc` used by CI | CODE/CI | CORROBORATED | IMPLEMENTED |
| DEVOPS-02 | Lint gate configured | root `lint: turbo run lint`; Foundation workflow executes `pnpm lint` | CODE/CI | CORROBORATED | IMPLEMENTED / RUN VERIFICATION PENDING |
| DEVOPS-03 | Typecheck gate configured | root `typecheck`; workflow executes it | CODE/CI | CORROBORATED | IMPLEMENTED / RUN VERIFICATION PENDING |
| DEVOPS-04 | Test gate configured | root `test`; workflow executes it | CODE/CI | CORROBORATED | IMPLEMENTED / RUN VERIFICATION PENDING |
| DEVOPS-05 | Build gate configured | root `build`; workflow executes it | CODE/CI | CORROBORATED | IMPLEMENTED / RUN VERIFICATION PENDING |
| DEVOPS-06 | Architecture gate configured | `architecture:test`; workflow executes before other quality gates | TEST/CI | CORROBORATED | IMPLEMENTED / RUN VERIFICATION PENDING |
| DEVOPS-07 | CI pipeline definition exists | `.github/workflows/platform-foundation.yml` | CI | DIRECT | IMPLEMENTED / EXECUTION STATUS SEPARATE |
| DEVOPS-08 | Deploy environments | not mapped | — | PENDING | UNKNOWN |
| DEVOPS-09 | Release/version automation | not mapped | — | PENDING | UNKNOWN |
| DEVOPS-10 | Runtime observability | not mapped | — | PENDING | UNKNOWN |
| DEVOPS-11 | Rollback/recovery | not mapped | — | PENDING | UNKNOWN |

### DEVOPS finding

The quality pipeline is concretely configured: checkout -> pnpm setup -> Node setup -> frozen install -> architecture:test -> typecheck -> lint -> test -> build. Configuration evidence must not be confused with successful run evidence. Deploy/release/observability/recovery remain unknown.

## DESIGN / UI evidence map — pass 001

| DoD area | Evidence | Class | Confidence | State |
|---|---|---|---|---|
| DESIGN semantic authority | Dojo Gate / Ω1 decisions in archaeology ledger and source issue lineage | SPEC/ISSUE | CORROBORATED | CANON |
| DESIGN production assets | current asset inventory not fully mapped | CODE/SPEC | PENDING | INVENTORY |
| UI P0-P10 sequence | approved visual-system issue lineage recorded by archaeology ledger | SPEC/ISSUE | CORROBORATED | ACTIVE DENOMINATOR CANDIDATE |
| UI theme shell | `wordpress/themes/taijifu-canon` absent from current main | CODE | DIRECT | NOT MANIFESTED |
| UI core plugin | `wordpress/plugins/taijifu-core` present on current main | CODE | DIRECT | PARTIAL / NEEDS REVIEW |

No UI or DESIGN percentage is emitted until production assets and gate-by-gate implementation evidence are mapped.

## UX evidence map — pass 001

Current project archaeology identifies approved/specified personalized-training flows and Foundation support for adaptive dashboard context. Direct source-to-row mapping remains incomplete for the full UX denominator, especially navigation, onboarding, failure states and usability validation.

State: `EVIDENCE MAPPING ACTIVE / DENOMINATOR OPEN`.

## SEO evidence map — pass 001

No implementation evidence has yet been mapped for the SEO denominator rows. This is intentionally `UNKNOWN`, not 0%.

State: `DISCOVERY REQUIRED`.

## GAMEDESIGN evidence map — pass 001

Historical Project evidence identifies curriculum/technique/progression/certification and fighter/loadout concepts, but the named Manual V12 source set is not manifested in current main and has not yet been ingested losslessly into the repository.

State: `HISTORICAL EVIDENCE EXISTS / CURRENT CANON MAPPING PENDING`.

## Evidence rules

1. A configured CI command proves configuration, not successful execution.
2. A historical artifact proves genealogy, not current implementation.
3. A directory proves manifestation of a unit, not completeness of that unit.
4. A CANON spec proves an approved decision, not shipped product behavior.
5. Verification requires executable evidence: passing test/run, accepted QA, or another explicit gate appropriate to the row.
6. Every future percentage must be reproducible from this evidence map + accepted DoD denominator.

## Next evidence passes

- Pass 002: GitHub Actions run evidence for current `main` and Foundation merge commits.
- Pass 003: DESIGN/UI asset and WordPress source mapping.
- Pass 004: Project-history mapping for UX and GAMEDESIGN.
- Pass 005: SEO discovery.

## Baseline readiness

- CODE: NOT READY — denominator scope open; verification evidence incomplete.
- DEVOPS: NOT READY — operational denominator incomplete.
- DESIGN: NOT READY — production-system denominator incomplete.
- UI: NOT READY — P0-P10 implementation mapping incomplete.
- UX: NOT READY — denominator/evidence mapping incomplete.
- SEO: NOT READY — discovery incomplete.
- GAMEDESIGN: NOT READY — historical ingestion/reconciliation incomplete.

This is expected. TPT now knows *why* a baseline cannot yet be honestly emitted, instead of hiding unknowns behind arbitrary percentages.
