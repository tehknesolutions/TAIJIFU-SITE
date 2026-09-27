# TAIJIFU Denominator Closure — v0.1

Status: ACTIVE CLOSURE
TPT Gate: DENOMINATOR CLOSURE
Date: 2026-09-27
Evidence source: `TAIJIFU-EVIDENCE-MAP-v0.1.md`
DoD source: `TAIJIFU-DIVISION-DOD-MATRIX-v0.1.md`

## Purpose
Freeze what counts as the denominator for each division before any percentage is emitted. Closure defines the ruler; it does not award completion.

## Closure rule
A denominator can be `CLOSED` while rows remain incomplete if intended scope is known and authoritative. `OPEN` means material scope itself remains unresolved. `BLOCKED BY SOURCE AUTHORITY` means the source required to freeze scope has not been recovered.

Statuses: `CLOSED | CLOSED WITH EXTERNAL EVIDENCE SURFACES | OPEN | BLOCKED BY SOURCE AUTHORITY`.

## DESIGN — DS1
Frozen denominator: semantic TAI/JI/FU; Ω1; HNK; wordmark; color/tokens; typography; spacing/grid/radius/elevation/motion; component visual language; asset governance; visual regression.

`DESIGN DS1: CLOSED`.

## UI — UI1
Frozen denominator: approved P0-P10 sequence from CANON/assets through theme/core integration, responsive/accessibility/regression and staging/QA.

`UI UI1: CLOSED`.

## SEO — SEO1
Frozen denominator: crawl/indexation; semantic HTML; metadata; canonical/redirects; structured data; sitemap/robots; CWV/performance; social metadata; discoverability/internal linking; measurement.

Evidence surfaces span repository, runtime and external webmaster/analytics systems.

`SEO SEO1: CLOSED WITH EXTERNAL EVIDENCE SURFACES`.

## CODE — C1
Frozen denominator capability groups:
1. domain primitives/invariants;
2. application ports/use-case boundary;
3. cross-boundary contracts;
4. identity/TUID;
5. relationship authority/lifecycle;
6. capability resolution;
7. dashboard/adaptive BFF;
8. infrastructure adapters;
9. runtime composition;
10. event/snapshot logical-version correctness;
11. architecture dependency enforcement;
12. Platform application/product surface;
13. WordPress domain/content runtime (`taijifu-core`);
14. WordPress presentation runtime (`taijifu-canon`);
15. approved cross-runtime canonical/static contracts without hard boot dependency.

`CODE C1: CLOSED`.

## Evidence Mapping Pass 008 — UX closure + DEVOPS boundary

### UX authority set
Two current approved implementation sources are sufficient to define the UX ruler without inventing product behavior:

- `docs/TAIJIFU-PERSONALIZED-TRAINING-ENGINE-V1.md` — `APPROVED DESIGN / implementation source of truth` for Personalized Training.
- `docs/TAIJIFU-WORDPRESS-ARCHITECTURE-V1.md` — `APPROVED / implementation source of truth` for the WordPress Dojo Gate experience.

The WordPress spec establishes header/footer/navigation, responsive behavior, accessibility-facing presentation, responsive semantic hierarchy, accessible collapsed navigation, reachable CTA, reduced motion, semantic landmarks/headings, keyboard operation, visible focus, contrast and no hover-only interaction. It also explicitly excludes LMS/payment/membership, social network, native mobile app and custom CMS from V1.

The Personalized Training spec establishes adaptive interview, progress/review, generated workout, regeneration, session execution, feedback, runtime adaptation, graceful core-unavailable state, privacy/data minimization and explainability/audit requirements.

### UX — UX1 CLOSED
The UX denominator is frozen as:

1. **Site IA/navigation** — header/footer/navigation and discoverable access to primary WordPress experiences;
2. **Entry/orientation journey** — Dojo Gate semantic hierarchy and primary CTA into the experience; no separate account onboarding flow is assumed unless later CANON expands scope;
3. **Adaptive dashboard/context journey** — current Foundation dashboard/adaptive surface where exposed by the product;
4. **Personalized Training adaptive interview**;
5. **review/request confirmation before composition where required by the approved training flow**;
6. **generated training composition + explainable rationale**;
7. **regeneration preserving hard constraints**;
8. **session execution presentation**;
9. **feedback/history adaptation loop**;
10. **responsive experience** across site + training surfaces;
11. **accessibility interaction contract** — landmarks/headings, keyboard, focus, contrast, alternatives, reduced motion, no hover-only dependency;
12. **failure/recovery states** — at minimum graceful core-unavailable behavior and explicit refusal to invent compatibility when safe composition data is insufficient; implementation-specific loading/empty/error states are instances under this row rather than new denominator capabilities;
13. **privacy-facing UX** for profile/history minimization and compatibility with deletion/export mechanisms;
14. **usability/acceptance validation** against the approved WordPress and Personalized Training acceptance gates.

`UX UX1: CLOSED`.

Closure does not claim these journeys are implemented. Current evidence still shows major implementation gaps, especially absent current `taijifu-canon` source and unverified end-to-end Personalized Training UI.

### UX0 reconciliation
The earlier ten-row UX0 candidate is superseded by UX1. Nothing is silently deleted: UX0-01/02/03 map to UX1-01/02/03; UX0-04/05/06 expand into UX1-04..09; responsive/accessibility map to UX1-10/11; error/recovery maps to UX1-12; usability maps to UX1-14. Privacy-facing UX is added because it is explicit in the recovered implementation source of truth.

### DEVOPS ownership decision rule
Current approved architecture establishes that WordPress and Platform must remain independently bootable/deployable and that theme/plugin must package independently. It does **not** establish a specific hosting provider, infrastructure stack or observability vendor.

Therefore DEVOPS denominator scope must be capability-based, not vendor/IaC-file-based. Deployment, observability and recovery are product operational responsibilities even when implemented by an external host/platform. Evidence may live outside this repository; ownership of implementation may be delegated, but ownership of proving the capability for a releasable product is not silently excluded.

This resolves the remaining scope ambiguity from Pass 007.

### DEVOPS — D1 CLOSED WITH EXTERNAL EVIDENCE SURFACES
Frozen denominator:
1. deterministic runtime/package contract;
2. lint gate;
3. typecheck gate;
4. test gate;
5. build gate;
6. architecture-test gate;
7. CI executes required quality pipeline;
8. Platform independent build/package/deploy path;
9. WordPress independent test/package/install path;
10. release/version artifacts + release notes;
11. environment topology sufficient to distinguish validation/staging/production responsibilities;
12. secrets/configuration boundary;
13. runtime observability/telemetry sufficient to detect operational failure;
14. rollback/recovery path appropriate to deployed runtime;
15. migration integrity/provenance validation while unification migration is active.

`DEVOPS D1: CLOSED WITH EXTERNAL EVIDENCE SURFACES`.

External hosting, runtime dashboards, deployment controls or recovery mechanisms may satisfy rows 8/11/13/14 if explicitly evidenced. Repository absence alone is not scored as failure. Current CI execution blocker remains an implementation/verification blocker, not a denominator blocker.

## GAMEDESIGN — GD1 candidate
Manual V12 is named and inventoried by the Unified Repository Spec as a 166-file historical source package, including `sistema-xp.html`, `codex-tecnicas.html`, `jornada-90-dias.html`, certification/exam files, modules 00-08 and 12 technique sheets. The spec requires lossless import + classification before promotion to current CANON.

The inventory proves the source package existed and defines expected content, but the 166-file source is not currently manifested under the planned Manual destination. Therefore detailed game-system semantics must not be reconstructed from filenames alone.

`GAMEDESIGN GD1: BLOCKED BY SOURCE INGESTION / AUTHORITY RECONCILIATION`.

## Closure register after Pass 008
| Division | Denominator | State | Primary blocker |
|---|---|---|---|
| CODE | C1 | CLOSED | none for scope |
| DEVOPS | D1 | CLOSED WITH EXTERNAL EVIDENCE SURFACES | implementation/runtime evidence only |
| DESIGN | DS1 | CLOSED | none for scope |
| UI | UI1 | CLOSED | none for scope |
| UX | UX1 | CLOSED | none for scope; implementation evidence incomplete |
| SEO | SEO1 | CLOSED WITH EXTERNAL EVIDENCE SURFACES | runtime/external verification only |
| GAMEDESIGN | GD1 | BLOCKED BY SOURCE INGESTION / AUTHORITY RECONCILIATION | Manual V12 source package |

## Closure telemetry
Six of seven division denominators are now closed. This is **scope-governance telemetry only**, not 85.7% product completion.

Only GAMEDESIGN remains denominator-blocked. Once Manual V12 is losslessly ingested/recovered and reconciled against current CANON, the project can freeze all seven denominators and proceed to Baseline v0.1 scoring.

## Percentage policy after Pass 008
- CODE, DESIGN, UI and UX have closed repository-governed denominators.
- DEVOPS and SEO have closed denominators with explicit external evidence surfaces.
- GAMEDESIGN remains ineligible for percentage reporting until source ingestion/reconciliation closes GD1.
- Interim division scoring requires an explicit state-to-score/weight model; denominator closure alone is not a completion percentage.
- Global Product Progress remains prohibited until GD1 closes.

## Anti-rework invariant
Future implementation does not reopen a closed denominator merely because more files/components appear. Reopening requires an authoritative scope/CANON change, evidence of a materially omitted capability, or an explicit governance decision with provenance.

## Next gate
`PASS 008 -> MANUAL V12 SOURCE RECOVERY/INGESTION -> GD1 CLOSURE -> ALL-7 DENOMINATORS CLOSED -> BASELINE v0.1 -> ROADMAP GAP GENERATION`.
