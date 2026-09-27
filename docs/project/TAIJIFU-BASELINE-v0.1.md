# TAIJIFU Project Baseline — v0.1

Status: PARTIAL / EVIDENCE-STATE BASELINE
Date: 2026-09-27
Authority: TPT archaeology + Evidence Map + Denominator Closure

## Why this baseline exists
This baseline publishes the current project state without fabricating a global completion percentage. Six division denominators are closed; GAMEDESIGN GD1 remains blocked by Manual V12 source ingestion/reconciliation. Therefore telemetry is expressed as evidence states and executable gaps.

## State vocabulary
- VERIFIED — direct acceptance/test/run evidence exists.
- IMPLEMENTED — source/artifact exists but verification is incomplete or blocked.
- PARTIAL — only part of the closed capability is evidenced.
- SPECIFIED — authoritative implementation source exists but current implementation is not evidenced.
- OPEN — required capability is known but not evidenced as implemented.
- UNKNOWN — required evidence surface has not been inspected/recovered.
- BLOCKED — progress/verification cannot advance until a named dependency is resolved.

UNKNOWN is not converted to zero. SPECIFIED is not converted to IMPLEMENTED. IMPLEMENTED is not converted to VERIFIED.

## Division baseline

### CODE — C1 CLOSED
Strong implemented Foundation: domain, application/contracts, identity, relationships, capability resolver, dashboard BFF, adapters and runtime composition are manifested. Event/snapshot and architecture verification remain blocked by CI execution evidence. Platform product shell and current WordPress presentation runtime remain implementation gaps. `taijifu-core` provides a partial WordPress domain/content runtime.

Baseline state: `FOUNDATION IMPLEMENTED / PRODUCT SURFACES PARTIAL / VERIFICATION BLOCKED`.

### DEVOPS — D1 CLOSED WITH EXTERNAL EVIDENCE SURFACES
Quality commands and CI workflow are configured. The Foundation merge CI run failed before retained evidence can prove individual gates executed. Platform/WordPress packaging, environment topology, release evidence, observability and rollback/recovery require repository or external operational evidence.

Baseline state: `QUALITY PIPELINE CONFIGURED / CI EXECUTION BLOCKED / OPERATIONS EVIDENCE OPEN`.

### DESIGN — DS1 CLOSED
TAI/JI/FU semantic authority is CANON. Ω1 has manifested master assets and recorded technical gate PASS. HNK source assets are manifested. Wordmark V2 is a candidate but not promoted to master. Production typography, reusable tokens, component visual language and whole-product visual regression remain open/partial.

Baseline state: `CANON ESTABLISHED / Ω1 VERIFIED / DESIGN SYSTEM PARTIAL`.

### UI — UI1 CLOSED
P0 asset/CANON inventory is partial; P2 is materially advanced via Ω1/HNK; `taijifu-core` is manifested partial. Current `taijifu-canon` theme is not manifested on main. Dojo Gate implementation, theme/core integration, responsive pass, motion/performance/accessibility integration, whole-site visual regression and staging/QA remain open or unverified.

Baseline state: `CANON SPECIFIED / ASSET FOUNDATION PARTIAL / CURRENT PRODUCT UI NOT YET MANIFESTED END-TO-END`.

### UX — UX1 CLOSED
Approved sources define site navigation/Dojo Gate behavior and Personalized Training journeys: adaptive interview, review, composition, regeneration, session, feedback, responsive/accessibility, failure/recovery, privacy and acceptance gates. Current end-to-end product UX implementation is not evidenced because presentation/application surfaces are incomplete.

Baseline state: `AUTHORITATIVE UX SPEC CLOSED / IMPLEMENTATION EVIDENCE PARTIAL`.

### SEO — SEO1 CLOSED WITH EXTERNAL EVIDENCE SURFACES
Public CPT/taxonomy content architecture supplies a partial discoverability foundation. Dedicated metadata, canonical/redirect strategy, structured data, sitemap/robots policy, CWV evidence, social metadata and measurement are not evidenced on current main. Runtime CMS behavior and external webmaster tooling remain separate evidence surfaces.

Baseline state: `CONTENT MODEL FOUNDATION PARTIAL / DEDICATED SEO NOT EVIDENCED / RUNTIME-EXTERNAL UNKNOWN`.

### GAMEDESIGN — GD1 BLOCKED
Personalized Training contributes some current game/system behavior, but Manual V12's 166-file historical source package is not manifested. XP, curriculum, techniques, journey, certification/exam and related game-system authority cannot be losslessly reconciled from filenames/inventory alone.

Baseline state: `PARTIAL CURRENT SYSTEM AUTHORITY / MANUAL V12 INGESTION BLOCKER / DENOMINATOR NOT CLOSED`.

## Project-level telemetry
- Denominators closed: 6 / 7.
- Global completion percentage: `WITHHELD — GD1 denominator authority not closed`.
- Current governance gate: `BASELINE v0.1 PARTIAL PUBLISHED`.
- Primary source blocker: `Manual V12 payload recovery/ingestion`.
- Primary engineering blocker: `CI runner/execution evidence`.
- Primary product implementation gap: `current product presentation/application surfaces, especially taijifu-canon + end-to-end UX integration`.
- Primary operational evidence gap: `deploy/environment/observability/recovery surfaces`.
- Primary growth evidence gap: `dedicated SEO implementation + runtime/external verification`.

## Gap Roadmap — execution order

### R0 — Preserve project truth
Keep Evidence Map, Denominator Closure, Recovery Ledger and this Baseline synchronized with every material change. Never rewrite historical authority silently.

### R1 — Unblock executable verification
Resolve the GitHub Actions runner/pre-step failure. Re-run architecture:test, typecheck, lint, test and build. Promote individual gates only from retained successful execution evidence.

Exit: Foundation quality gates have explicit PASS/FAIL evidence rather than CONFIGURED/BLOCKED.

### R2 — Manifest current product UI
Recover or implement `taijifu-canon` from current CANON rather than reviving v2.2 as authority. Complete P0-P5 first: inventory, tokens, production assets, theme shell, Dojo Gate and core integration.

Exit: current CANON has a bootable WordPress presentation surface integrated with `taijifu-core`.

### R3 — Close end-to-end UX
Implement/expose the UX1 journeys against the approved Personalized Training and WordPress architecture sources. Add responsive, accessibility, failure/recovery and privacy-facing behavior with acceptance evidence.

Exit: UX1 acceptance gates are executable/testable against product surfaces.

### R4 — Product hardening
Complete UI P6-P10: integration, responsive, motion/performance/accessibility, visual regression, packaging/staging/QA. Finish DESIGN wordmark master, typography/tokens/component language and product-level regression references.

Exit: WordPress/product surface is release-candidate quality under current CANON.

### R5 — Operationalize DEVOPS
Establish explicit Platform and WordPress build/package/deploy paths, environment topology, secrets/config boundary, release/version artifacts, observability and rollback/recovery evidence. External provider evidence is acceptable when linked and auditable.

Exit: D1 capabilities are evidenced for release operations.

### R6 — Implement/verify SEO1
Add explicit metadata policy, canonical/redirect behavior, structured data, sitemap/robots policy, social metadata and internal-link strategy; collect runtime indexability/CWV and external Search Console/analytics evidence.

Exit: SEO1 rows move from UNKNOWN/NOT EVIDENCED to implementation/verification states.

### R7 — Recover Manual V12 and close GD1
Recover the source payload; import losslessly; create count/hash manifest; classify every artifact; reconcile XP/curriculum/techniques/journey/certification and related systems against current CANON. Do not promote historical material automatically.

Exit: GD1 denominator closes and GAMEDESIGN can enter normal baseline scoring.

### R8 — Baseline v0.2 / quantitative telemetry
After GD1 closure, accept an explicit weighting/state-conversion model, compute per-division telemetry reproducibly, publish global progress only if every denominator and UNKNOWN policy is accounted for, then generate milestone burn-up from the same evidence ledger.

## Parallelism / anti-rework
R1, R2, R5, R6 and R7 can proceed independently where dependencies allow. R3 depends materially on product surfaces from R2. R4 follows sufficient R2/R3 integration. R8 depends on R7/GD1 closure.

No team should wait for Manual V12 to advance unrelated CODE, DEVOPS, DESIGN, UI, UX or SEO work.

## Current next action
`R1 CI VERIFICATION` and `R2 CURRENT UI MANIFESTATION` are the highest-leverage executable tracks while `R7 MANUAL V12 RECOVERY` remains a parallel source-recovery track.
