# TAIJIFU Project Baseline — v0.1

Status: PARTIAL / EVIDENCE-STATE BASELINE
Date: 2026-09-27
Updated: 2026-09-28 — R2 current UI source evidence
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
Strong implemented Foundation: domain, application/contracts, identity, relationships, capability resolver, dashboard BFF, adapters and runtime composition are manifested. Event/snapshot and architecture verification remain blocked by CI execution evidence. Product surfaces now include the interactive-web runtime and the current WordPress presentation theme, but end-to-end product/runtime verification remains incomplete. `taijifu-core` provides the WordPress domain/content runtime.

Baseline state: `FOUNDATION IMPLEMENTED / PRODUCT SURFACES MANIFESTED IN PART / VERIFICATION BLOCKED`.

### DEVOPS — D1 CLOSED WITH EXTERNAL EVIDENCE SURFACES
Quality commands and CI workflow are configured. The Foundation merge CI run failed before retained evidence can prove individual gates executed. Fresh main Actions after PR #25 continue the same pre-step failure pattern. Platform/WordPress packaging, environment topology, release evidence, observability and rollback/recovery require repository or external operational evidence.

Baseline state: `QUALITY PIPELINE CONFIGURED / CI EXECUTION BLOCKED / OPERATIONS EVIDENCE OPEN`.

### DESIGN — DS1 CLOSED
TAI/JI/FU semantic authority is CANON. Ω1 has manifested master assets and recorded technical gate PASS. HNK source assets are manifested. Wordmark V2 is a candidate but not promoted to master. Production typography, reusable tokens, component visual language and whole-product visual regression remain open/partial; the current theme now manifests a concrete CANON token layer without closing the broader design-system denominator.

Baseline state: `CANON ESTABLISHED / Ω1 VERIFIED / DESIGN SYSTEM PARTIAL`.

### UI — UI1 CLOSED
The current `wordpress/themes/taijifu-canon/` source is now manifested. It contains the theme shell/templates, CANON material tokens, approved Ω1 production copies, Dojo Gate composition, presentation-safe `taijifu-core` availability boundary, responsive rules, reduced-motion rules and source-level contract tests. Ω1 theme copies are blob-identical to the approved masters. Executable PHP tests were not run in the inspected workstation because PHP is unavailable, and repository CI remains blocked before runner execution. WordPress activation, Core-on/Core-off runtime QA, keyboard/viewport/reduced-motion acceptance, whole-product visual regression, independent ZIP install and staging QA remain open.

Baseline state: `CURRENT CANON SOURCE MANIFESTED / Ω1 PROVENANCE VERIFIED / RUNTIME + P9-P10 RELEASE EVIDENCE OPEN`.

Evidence ledger: `docs/project/TAIJIFU-R2-UI-EVIDENCE-v0.1.md`.

### UX — UX1 CLOSED
Approved sources define site navigation/Dojo Gate behavior and Personalized Training journeys: adaptive interview, review, composition, regeneration, session, feedback, responsive/accessibility, failure/recovery, privacy and acceptance gates. The Dojo Gate/entry source surface is now manifested, but end-to-end Personalized Training and runtime usability evidence remain incomplete.

Baseline state: `AUTHORITATIVE UX SPEC CLOSED / ENTRY SURFACE IMPLEMENTED / END-TO-END IMPLEMENTATION EVIDENCE PARTIAL`.

### SEO — SEO1 CLOSED WITH EXTERNAL EVIDENCE SURFACES
Public CPT/taxonomy content architecture supplies a partial discoverability foundation, and the current theme now provides semantic presentation source that supersedes the earlier presentation-source gap. Dedicated metadata, canonical/redirect strategy, structured data, sitemap/robots policy, CWV evidence, social metadata and measurement are still not evidenced. Runtime CMS behavior and external webmaster tooling remain separate evidence surfaces.

Baseline state: `CONTENT + SEMANTIC PRESENTATION FOUNDATION PARTIAL / DEDICATED SEO NOT EVIDENCED / RUNTIME-EXTERNAL UNKNOWN`.

### GAMEDESIGN — GD1 BLOCKED
Personalized Training contributes some current game/system behavior, but Manual V12's 166-file historical source package is not manifested. XP, curriculum, techniques, journey, certification/exam and related game-system authority cannot be losslessly reconciled from filenames/inventory alone.

Baseline state: `PARTIAL CURRENT SYSTEM AUTHORITY / MANUAL V12 INGESTION BLOCKER / DENOMINATOR NOT CLOSED`.

## Project-level telemetry
- Denominators closed: 6 / 7.
- Global completion percentage: `WITHHELD — GD1 denominator authority not closed`.
- Current governance gate: `BASELINE v0.1 PARTIAL / R2 SOURCE EVIDENCE UPDATED`.
- Primary source blocker: `Manual V12 payload recovery/ingestion`.
- Primary engineering blocker: `CI runner/execution evidence`.
- Primary product implementation gap: `end-to-end Personalized Training/product UX integration plus runtime acceptance of manifested surfaces`.
- Primary UI release gap: `WordPress activation + keyboard/viewport/reduced-motion QA + visual regression + ZIP/staging evidence`.
- Primary operational evidence gap: `deploy/environment/observability/recovery surfaces`.
- Primary growth evidence gap: `dedicated SEO implementation + runtime/external verification`.

## Gap Roadmap — execution order

### R0 — Preserve project truth
Keep Evidence Map, Denominator Closure, Recovery Ledger and this Baseline synchronized with every material change. Never rewrite historical authority silently.

### R1 — Unblock executable verification
Resolve the GitHub Actions runner/pre-step failure. Re-run architecture:test, typecheck, lint, test and build. Promote individual gates only from retained successful execution evidence.

Exit: Foundation quality gates have explicit PASS/FAIL evidence rather than CONFIGURED/BLOCKED.

### R2 — Manifest current product UI
Source manifestation is materially implemented: `taijifu-canon` exists under current CANON with tokens, approved Ω1 assets, semantic shell, Dojo Gate, Core boundary and responsive/accessibility-oriented source contracts. Remaining R2 work is executable/runtime acceptance and release evidence: PHP theme tests, WordPress activation, Core-on/Core-off behavior, keyboard/viewport/reduced-motion QA, visual regression, independent ZIP install and staging QA.

Exit: current CANON has a runtime-accepted WordPress presentation surface integrated with `taijifu-core`, with P9/P10 evidence recorded.

### R3 — Close end-to-end UX
Implement/expose the UX1 journeys against the approved Personalized Training and WordPress architecture sources. Add responsive, accessibility, failure/recovery and privacy-facing behavior with acceptance evidence.

Exit: UX1 acceptance gates are executable/testable against product surfaces.

### R4 — Product hardening
Complete remaining UI release hardening and DESIGN system gaps: runtime integration evidence, responsive/motion/performance/accessibility acceptance, visual regression, packaging/staging/QA, wordmark master, typography/tokens/component language and product-level regression references.

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
R1, remaining R2 runtime acceptance, R5, R6 and R7 can proceed independently where dependencies allow. R3 can now advance against the manifested source surfaces, but end-to-end acceptance still depends on runtime-capable environments. R4 follows sufficient R2/R3 integration. R8 depends on R7/GD1 closure.

No team should wait for Manual V12 to advance unrelated CODE, DEVOPS, DESIGN, UI, UX or SEO work.

## Current next action
`R1 CI VERIFICATION`, `R2 RUNTIME ACCEPTANCE`, and `R3 END-TO-END UX IMPLEMENTATION` are the highest-leverage product tracks while `R7 MANUAL V12 RECOVERY` remains a parallel source-recovery track.
