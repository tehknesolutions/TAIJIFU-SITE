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
| DEVOPS-01 | Runtime/package contract | root package/runtime contract + CI | CODE/CI | CORROBORATED | IMPLEMENTED |
| DEVOPS-02..06 | quality gates configured | root scripts + Foundation workflow | CODE/TEST/CI | CORROBORATED | IMPLEMENTED / EXECUTION BLOCKED |
| DEVOPS-07 | CI pipeline definition | `.github/workflows/platform-foundation.yml` | CI | DIRECT | IMPLEMENTED / RUN FAILED PRE-STEPS |
| DEVOPS-08 | Deploy environments | not mapped | — | PENDING | UNKNOWN |
| DEVOPS-09 | Release/version automation | not mapped | — | PENDING | UNKNOWN |
| DEVOPS-10 | Runtime observability | not mapped | — | PENDING | UNKNOWN |
| DEVOPS-11 | Rollback/recovery | not mapped | — | PENDING | UNKNOWN |

## Evidence Mapping Pass 002 — GitHub Actions execution
Foundation workflow run `36331039103` triggered on merge PR #13 / SHA `436cec1c3f1bb5b4f99667a0e25cab223913d2e6` and concluded failure. Retained evidence does not prove individual quality commands executed. CODE-10/11 remain `IMPLEMENTED / VERIFICATION BLOCKED`; DEVOPS quality gates remain `CONFIGURED / EXECUTION BLOCKED`.

## Evidence Mapping Pass 003 — DESIGN / UI / WordPress

### DESIGN asset inventory
| DoD ID | Evidence | Confidence | Telemetry state |
|---|---|---|---|
| DESIGN-01 semantic TAI/JI/FU | Issue #7 | DIRECT | CANON / DONE decision |
| DESIGN-02 Ω1 emblem authority | Issue #7 + official logo spec + master assets | CORROBORATED | CANON / MASTER MANIFESTED / TECHNICAL GATE PASS |
| DESIGN-03 HNK glyph identity | Issue #7 + HNK SVG sources + construction proof | CORROBORATED | CANON / SOURCE ASSETS MANIFESTED |
| DESIGN-04 wordmark system | V1/V2 construction + V1 optical audit | DIRECT | ACTIVE / V2 CANDIDATE / MASTER NOT MANIFESTED |
| DESIGN-05 color/token system | Issue #7 semantic colors; implementation tokens not mapped | SPEC | CORROBORATED | CANON SEMANTICS / IMPLEMENTATION OPEN |
| DESIGN-06 typography system | production type system not mapped | SPEC | PENDING | OPEN |
| DESIGN-07 spacing/grid/radius/elevation/motion | P1/P8 scope; implementation not mapped | SPEC | PENDING | PLANNED |
| DESIGN-08 component visual language | Dojo Gate direction exists; component implementation not mapped | SPEC | PENDING | PLANNED |
| DESIGN-09 asset master/source governance | Ω1 auditable; wordmark construction-only | CODE/TEST | CORROBORATED | PARTIAL |
| DESIGN-10 visual regression | Ω1 audits exist; whole-site P9 open | TEST/SPEC | CORROBORATED | PARTIAL |

### v2.2 genealogy
Issue #3 directly documents Premium Visual Rebuild v2.2.0 implementation while leaving live QA unchecked. Its cited source SHA is not currently resolvable. Classification: `HISTORICAL IMPLEMENTATION / LIVE QA UNVERIFIED / CURRENT CANON SUPERSEDED BY DOJO GATE-Ω1`.

### UI P0-P10
P0 partial; P1 planned; P2 partial/strong; P3 theme not manifested; P4 CANON spec only; P5 `taijifu-core` manifested partial; P6-P8 open; P9 partial at Ω1 asset level; P10 open.

## Evidence Mapping Pass 004 — UX / GAMEDESIGN source reconciliation

Repository/current evidence search did not recover the expected Personalized Training, Manual V12, curriculum, technique, progression/XP/certification, fighter/loadout source set. Supporting Foundation code does not prove UX flows. Historical concepts without retrievable source remain source gaps rather than completed/rejected features.

- UX: `BLOCKED BY SOURCE GAP` for named experience/source artifacts.
- GAMEDESIGN: `BLOCKED BY SOURCE GAP` for Manual V12/domain rules ingestion.
- Reconstruction from memory is prohibited as an evidence substitute.

## Evidence Mapping Pass 005 — SEO discovery

### Search scope
Current `main` code search and issue search were queried for SEO-specific implementation vocabulary: `robots`, `sitemap`, `canonical`, `schema.org`, `JSON-LD`, metadata/meta description, OpenGraph/`og:title`, Twitter cards, title hooks, and SEO/performance issue terminology. No dedicated SEO implementation artifact or SEO issue was recovered from those searches.

The recursive repository tree was also inspected for obvious SEO-specific files. No dedicated `robots.txt`, sitemap implementation, SEO module, Search Console/analytics configuration, or current theme surface was identified in the evidence recovered by this pass.

### SEO evidence map — pass 005
| DoD ID | Capability | Evidence | Telemetry state |
|---|---|---|---|
| SEO-01 | crawl/indexation policy | No dedicated policy/module recovered. WordPress public content types exist, but public registration alone is not an indexation policy. | UNKNOWN / DISCOVERY COMPLETE FOR CURRENT MAIN |
| SEO-02 | semantic HTML/content hierarchy | Current presentation theme is not manifested on `main`; semantic page markup cannot be verified. | BLOCKED BY PRESENTATION SOURCE GAP |
| SEO-03 | metadata/title/description policy | No dedicated metadata implementation or policy recovered. | UNKNOWN / NOT EVIDENCED |
| SEO-04 | canonical/redirect strategy | No canonical/redirect implementation recovered. CPT/taxonomy rewrite slugs are routing primitives, not canonical strategy. | UNKNOWN / NOT EVIDENCED |
| SEO-05 | structured data/schema | No `schema.org` / JSON-LD implementation recovered. | UNKNOWN / NOT EVIDENCED |
| SEO-06 | sitemap/robots | No dedicated sitemap/robots artifact recovered. WordPress may provide runtime defaults, but runtime behavior was not inspected and is not claimed as project implementation evidence. | UNKNOWN / NOT EVIDENCED |
| SEO-07 | performance/Core Web Vitals | No CWV/Lighthouse/performance budget or measurement artifact recovered. Historical visual performance intent is not measurement evidence. | UNKNOWN / NOT EVIDENCED |
| SEO-08 | social metadata | No OpenGraph/Twitter-card implementation recovered. | UNKNOWN / NOT EVIDENCED |
| SEO-09 | content discoverability/internal linking | Four public CPTs (`principles`, `paths`, `library`, `lab`) and public hierarchical taxonomies (`axis`, `level`, `governance-status`) provide a crawlable information-model foundation, but current navigation/internal-link implementation is not manifested/verified. | FOUNDATION PARTIAL / EXPERIENCE OPEN |
| SEO-10 | measurement/Search Console analytics | No measurement/Search Console/analytics artifact recovered. | UNKNOWN / NOT EVIDENCED |

### SEO-positive foundation evidence
`taijifu-core` is a real content-domain foundation rather than an SEO implementation. It registers four public, REST-visible, archived content types with stable rewrite slugs and title/editor/excerpt/thumbnail/revision support. It also registers three public, hierarchical, REST-visible taxonomies with stable rewrite slugs. These structures can support discoverability and semantic content organization, but they do not by themselves satisfy metadata, canonical, schema, sitemap, social or measurement gates.

### SEO authority / source conflict note
The repository README still describes an older WordPress state (`taijifu-theme` v2.2.0 / `taijifu-core` v2.2.0 and an external platform Canon source), while the current physical plugin identifies itself as `TAIJIFU Core 1.0.0-alpha.1` and the current archaeology has established Dojo Gate/Ω1 as the later visual authority. Therefore README SEO/presentation implications are historical/stale until reconciled; they are not current implementation proof.

### Pass 005 conclusion
SEO discovery for current `main` is now sufficiently bounded to replace the previous blanket `DISCOVERY INCOMPLETE` state with a more useful baseline statement:

- a crawlable content-model foundation is partially manifested;
- dedicated SEO implementation is **not evidenced** in current `main`;
- semantic-page SEO is blocked by the absent current presentation/theme source;
- runtime WordPress defaults, production hosting configuration and external webmaster tooling have not been inspected and must not be inferred from repository absence.

SEO remains **UNSCORED**, because the denominator is known conceptually but several gates depend on runtime/external surfaces not yet inventoried.

## Evidence rules
1. A configured CI command proves configuration, not successful execution.
2. A failed workflow does not prove an individual quality gate failed unless execution evidence shows that gate ran.
3. A historical artifact proves genealogy, not current implementation.
4. A directory proves manifestation of a unit, not completeness of that unit.
5. A CANON spec proves an approved decision, not shipped product behavior.
6. Asset-level verification does not prove page/product integration.
7. Supporting platform code does not prove UX flow completion.
8. An expected historical concept without retrievable source remains a source gap, not a completed or rejected feature.
9. Repository absence does not prove absence in production/runtime/external tooling.
10. Framework/CMS defaults are not credited as project implementation without runtime evidence.
11. Verification requires passing run/test/accepted QA or another explicit gate appropriate to the row.
12. Every future percentage must be reproducible from this evidence map + accepted DoD denominator.

## Next evidence passes
- Pass 006: denominator closure candidates for DESIGN/UI and SEO runtime-surface requirements.
- Pass 007: CODE/DEVOPS scope closure candidates and CI blocker disposition.
- Source recovery/ingestion remains required for UX/GAMEDESIGN.

## Baseline readiness
- CODE: NOT READY — denominator scope open; verification blocked.
- DEVOPS: NOT READY — CI execution blocker + operational denominator incomplete.
- DESIGN: CLOSER — Ω1 verified; type/tokens/components/wordmark master open.
- UI: NOT READY — theme/Dojo Gate/integration/responsive/QA open.
- UX: BLOCKED BY SOURCE GAP.
- SEO: DISCOVERY BOUNDED / UNSCORED — content-model foundation partial; dedicated SEO not evidenced; runtime/external surfaces not inventoried.
- GAMEDESIGN: BLOCKED BY SOURCE GAP.
