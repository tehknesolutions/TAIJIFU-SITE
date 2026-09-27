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
- Workflow: `TAIJIFU Platform Foundation`
- Run ID: `36331039103`; run number `71`; push to `main`
- Head SHA: `436cec1c3f1bb5b4f99667a0e25cab223913d2e6`; merge PR #13
- Started `2026-09-27T15:50:41Z`; completed `15:50:45Z`; conclusion `failure`
- Job `foundation`, ID `108652873591`, conclusion `failure`
- Step API returned empty set; retained job log unavailable (`BlobNotFound`).

Interpretation: the workflow was triggered and failed, but retained evidence does not prove any individual quality command executed. CODE-10/11 remain `IMPLEMENTED / VERIFICATION BLOCKED`; DEVOPS-02..06 remain `CONFIGURED / EXECUTION BLOCKED`; DEVOPS-07 is `RUN FAILED PRE-STEPS / ROOT CAUSE UNKNOWN`.

## Evidence Mapping Pass 003 — DESIGN / UI / WordPress

### DESIGN asset inventory
| DoD ID | Evidence | Confidence | Telemetry state |
|---|---|---|---|
| DESIGN-01 semantic TAI/JI/FU | Issue #7 | DIRECT | CANON / DONE decision |
| DESIGN-02 Ω1 emblem authority | Issue #7 + `docs/lab-ui-ux/TAIJIFU-OFFICIAL-LOGO-OMEGA1.md` + master assets | CORROBORATED | CANON / MASTER MANIFESTED |
| DESIGN-03 HNK glyph identity | Issue #7 + `brand/omega1/hnk/G01,G03,G05,G22,G25,G36.svg` + construction proof | CORROBORATED | CANON / SOURCE ASSETS MANIFESTED |
| DESIGN-04 wordmark system | `brand/wordmark/construction/taijifu-wordmark-v1.svg`, `v2.svg`, V1 optical audit | DIRECT | ACTIVE / V2 CANDIDATE / MASTER NOT MANIFESTED |
| DESIGN-05 color/token system | semantic colors specified by Issue #7; implementation tokens not yet mapped | SPEC | CORROBORATED | CANON SEMANTICS / IMPLEMENTATION OPEN |
| DESIGN-06 typography system | Issue #7 direction only; production font/type system not mapped | SPEC | PENDING | OPEN |
| DESIGN-07 spacing/grid/radius/elevation/motion | P1/P8 scope in Issue #7; implementation not mapped | SPEC | PENDING | PLANNED |
| DESIGN-08 component visual language | Dojo Gate direction/acceptance exists; component implementation not mapped | SPEC | PENDING | PLANNED |
| DESIGN-09 asset master/source governance | Ω1 construction/master/tests are separated and auditable; wordmark still construction-only | CODE/TEST | CORROBORATED | PARTIAL / STRONG Ω1 GOVERNANCE |
| DESIGN-10 visual regression references | Ω1 visual/optical/final technical audits exist; whole-site CANON regression remains P9 | TEST/SPEC | CORROBORATED | PARTIAL |

### Ω1 technical verification
`brand/omega1/tests/omega1-v3-final-gate.md` records a technical gate PASS for V3 + MICRO V1, including standard/reverse renders at 128/48/32 and micro at 32/24/16, deterministic SHA-256 sources, and a responsive master rule. `brand/omega1/master/` contains `omega1-master.svg` and `omega1-micro-master.svg`. This promotes Ω1 from merely specified to manifested master with recorded technical verification. It does not prove full-site visual integration.

### Wordmark status
The wordmark is materially present but not closed. V1 audit explicitly says `STRUCTURAL BASE ACCEPTED, MASTER REJECTED`; V2 exists as an optically refined construction SVG. No `brand/wordmark/master/` is manifested and no V2 final audit is currently present in the tests directory. Therefore DESIGN-04 cannot be marked DONE.

### v2.2 genealogy recovered
Issue #3 is direct evidence for Premium Visual Rebuild v2.2.0. It records implemented visual work while leaving all live QA gates unchecked. Its cited local source commit `8097238` is not resolvable in the current repository. Therefore v2.2 is `DIRECTLY DOCUMENTED HISTORICAL IMPLEMENTATION / LIVE QA UNVERIFIED / SOURCE COMMIT NOT PRESENTLY RESOLVABLE`.

### UI P0-P10 evidence map
| Gate | Evidence-backed state |
|---|---|
| P0 CANON + asset inventory | PARTIAL — CANON frozen by Issue #7; Ω1/HNK/wordmark inventory mapped; complete site asset inventory open |
| P1 tokens/type/grid/breakpoints | PLANNED / implementation not mapped |
| P2 Ω1 + wordmark + HNK production assets | PARTIAL — Ω1 master verified; HNK SVG sources manifested; wordmark master open |
| P3 theme shell/header/footer | NOT MANIFESTED on current `main` |
| P4 Dojo Gate | CANON SPEC ONLY / current implementation not manifested |
| P5 `taijifu-core` | MANIFESTED PARTIAL — plugin root, includes, tests; content types/taxonomies + identity/platform modules present |
| P6 content/component integration | OPEN / not verified |
| P7 responsive | OPEN; historical v2.2 live QA remains unchecked |
| P8 motion/performance/accessibility | OPEN |
| P9 visual regression | PARTIAL at Ω1 asset level only; whole-site regression open |
| P10 ZIP/staging/QA | OPEN |

### UI authority lock
Issue #7 remains the current CANON direction and explicitly assigns presentation to `taijifu-canon` and domain/content behavior to `taijifu-core`. v2.2 is a recovered predecessor implementation stage, not authority over Dojo Gate/Ω1.

## Evidence Mapping Pass 004 — UX / GAMEDESIGN source reconciliation

### Search scope
A repository-level search was performed on current `main` for the expected historical/product vocabulary, including `personalized training`, `training`, `curriculum`, `technique`, `progress`, `progression`, `certification`, `fighter`, `loadout`, `XP`, and related combined terms. Matching issue search was also performed. No direct current-main hits were returned for the expected Personalized Training / curriculum / fighter-loadout source set.

The Project-attached source corpus available to this evidence pass was searched for `Personalized Training`, `Manual V12`, `fighter loadout`, and Portuguese equivalents/related terms. No matching chunks were returned.

### UX evidence map — pass 004
| Area | Evidence state | Telemetry |
|---|---|---|
| Personalized Training source specification | Historical archaeology claim exists in prior evidence map, but named source is not retrievable in current repo or attached source corpus in this pass | HISTORICAL CLAIM / SOURCE GAP |
| Adaptive dashboard context | Foundation architecture previously maps `services/dashboard-bff/`, capability resolver, identity and relationship authority; this proves supporting platform surfaces, not a user flow | SUPPORTING CODE / UX FLOW UNVERIFIED |
| Navigation / IA | No direct UX artifact mapped | UNKNOWN |
| Onboarding | No direct UX artifact mapped | UNKNOWN |
| Training-session flow | No direct retrievable source mapped | UNKNOWN / HISTORICAL SOURCE GAP |
| Progress feedback | No direct retrievable source mapped | UNKNOWN / HISTORICAL SOURCE GAP |
| Failure/empty/loading states | No direct UX artifact mapped | UNKNOWN |
| Accessibility/usability validation | No direct UX research/test evidence mapped | UNKNOWN |

Interpretation lock: platform capability must not be promoted into UX completion. A dashboard BFF or capability resolver can enable personalization, but does not prove that the Personalized Training experience, interaction model, content sequence, or usability gate exists.

### GAMEDESIGN evidence map — pass 004
| Area | Evidence state | Telemetry |
|---|---|---|
| Manual V12 authority | Referenced historically by project archaeology; source not manifested/retrievable in current evidence surfaces | SOURCE GAP |
| Curriculum | Expected historical domain; no direct current-main or attached-source evidence recovered in this pass | UNKNOWN / SOURCE GAP |
| Techniques | Expected historical domain; no direct current-main or attached-source evidence recovered | UNKNOWN / SOURCE GAP |
| Progression / XP | Expected historical domain; no direct current-main or attached-source evidence recovered | UNKNOWN / SOURCE GAP |
| Graduation / rank | Visual graduation lineage exists historically, but game/progression rules are not evidenced by that visual artifact | PARTIAL GENEALOGY / RULESET UNKNOWN |
| Certification | Expected historical domain; no direct retrievable evidence recovered | UNKNOWN / SOURCE GAP |
| Fighter model | Expected historical concept; no direct retrievable evidence recovered | UNKNOWN / SOURCE GAP |
| Loadouts | Expected historical concept; no direct retrievable evidence recovered | UNKNOWN / SOURCE GAP |
| Balance/progression tests | No direct evidence mapped | UNKNOWN |

### Pass 004 conclusion
Pass 004 does **not** establish that the historical UX/Game Design work did not exist. It establishes a narrower and auditable fact: the source material needed to promote those historical claims into the current evidence graph is not presently retrievable from current `main` or the attached source corpus searched in this pass.

Therefore no percentages are assigned and no historical design claim is silently converted into current implementation. The blocker is now explicit: **SOURCE INGESTION / SOURCE RECOVERY**.

Required recovery targets:
- named Manual V12 source set;
- Personalized Training specification/flow artifacts;
- curriculum and technique catalogs;
- progression/XP/graduation/certification rules;
- fighter/loadout model artifacts;
- UX navigation/onboarding/session/failure-state specifications and any usability evidence.

Once recovered, these sources should be ingested losslessly before reconciliation against current Foundation/domain contracts. Reconstruction from memory is not an acceptable substitute for evidence ingestion.

## SEO evidence map — pass 001
No implementation evidence has yet been mapped for the SEO denominator rows. This is intentionally `UNKNOWN`, not 0%.

## Evidence rules
1. A configured CI command proves configuration, not successful execution.
2. A failed workflow does not prove an individual quality gate failed unless execution evidence shows that gate ran.
3. A historical artifact proves genealogy, not current implementation.
4. A directory proves manifestation of a unit, not completeness of that unit.
5. A CANON spec proves an approved decision, not shipped product behavior.
6. Asset-level verification does not prove page/product integration.
7. Supporting platform code does not prove UX flow completion.
8. An expected historical concept without retrievable source remains a source gap, not a completed or rejected feature.
9. Verification requires executable evidence: passing test/run, accepted QA, or another explicit gate appropriate to the row.
10. Missing logs/steps/source commits/source documents are evidence limitations and remain explicit.
11. Every future percentage must be reproducible from this evidence map + accepted DoD denominator.

## Next evidence passes
- Pass 005: SEO discovery.
- Pass 006: denominator closure candidates for DESIGN/UI after remaining token/wordmark/theme evidence is classified.
- Source recovery/ingestion: Manual V12 + Personalized Training + curriculum/progression/fighter artifacts before UX/GAMEDESIGN reconciliation can close.
- CI remediation remains a DEVOPS blocker; do not rewrite product code to guess at an unknown runner failure.

## Baseline readiness
- CODE: NOT READY — denominator scope open; verification blocked.
- DEVOPS: NOT READY — CI execution blocker + operational denominator incomplete.
- DESIGN: CLOSER — Ω1 master verified and HNK/wordmark genealogy mapped; production type/tokens/components/wordmark master remain open.
- UI: NOT READY — P0/P2/P5 partially evidenced; theme/Dojo Gate/integration/responsive/QA open.
- UX: BLOCKED BY SOURCE GAP — supporting Foundation surfaces exist, but UX source/flow evidence is not retrievable.
- SEO: NOT READY — discovery incomplete.
- GAMEDESIGN: BLOCKED BY SOURCE GAP — Manual V12/curriculum/progression/fighter artifacts require recovery/ingestion.
