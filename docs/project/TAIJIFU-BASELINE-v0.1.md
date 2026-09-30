# TAIJIFU Project Baseline — v0.1

Status: PARTIAL / EVIDENCE-STATE BASELINE
Date: 2026-09-27
Updated: 2026-09-30 — operating-mode reconciliation
Authority: TPT archaeology + Evidence Map + Denominator Closure + current project decisions

## Why this baseline exists
This baseline publishes the current project state without fabricating a global completion percentage. Six division denominators are closed; GAMEDESIGN GD1 remains blocked by Manual V12 source ingestion/reconciliation. Therefore telemetry is expressed as evidence states and executable gaps.

## Current operating mode

TAIJIFU development uses the repository-native **GitHub + GPT** operating mode (GIP in project conversation shorthand):

- `TAIJIFU-SITE/main` is the sole official repository and persistent project authority;
- GitHub code, docs, issues, PRs and commits are the durable execution/provenance surfaces;
- GPT is the implementation/review interface used to advance the repository;
- local workstation state is not a required project authority or blocker;
- paid/external development services are not required gates for Web v1;
- GitHub Actions, hosting providers, local PHP/Node installations, staging systems, Search Console and similar external/runtime surfaces may provide additional evidence when intentionally used, but their absence or infrastructure failure does not by itself block repository implementation;
- verification claims remain evidence-based: source/static tests can establish repository-level verification; runtime/deployment claims require runtime/deployment evidence and must remain explicitly unverified when unavailable.

This operating-mode decision supersedes earlier baseline language that elevated GitHub Actions runner execution, a particular local workstation, external hosting, or other external tooling into mandatory project blockers. Historical incidents remain valid genealogy/evidence; their blocker classification does not govern current execution.

## State vocabulary
- VERIFIED — direct acceptance/test/run/static-contract evidence appropriate to the claim exists.
- IMPLEMENTED — source/artifact exists but applicable verification is incomplete.
- PARTIAL — only part of the closed capability is evidenced.
- SPECIFIED — authoritative implementation source exists but current implementation is not evidenced.
- OPEN — required capability is known but not evidenced as implemented.
- UNKNOWN — required evidence surface has not been inspected/recovered.
- BLOCKED — progress cannot advance without a required authority/input, not merely because an optional external execution surface is unavailable.

UNKNOWN is not converted to zero. SPECIFIED is not converted to IMPLEMENTED. IMPLEMENTED is not converted to VERIFIED.

## Division baseline

### CODE — C1 CLOSED
Strong implemented Foundation: domain, application/contracts, identity, relationships, capability resolver, dashboard BFF, adapters and runtime composition are manifested. Product surfaces include the interactive-web runtime and the current WordPress presentation theme. Repository-level implementation can continue directly through GitHub + GPT; unavailable Actions/local runtimes do not block source evolution. Runtime behavior remains unverified wherever runtime evidence is absent.

Baseline state: `FOUNDATION IMPLEMENTED / PRODUCT SURFACES MANIFESTED / RUNTIME VERIFICATION PARTIAL`.

### DEVOPS — D1 CLOSED WITH OPTIONAL EXTERNAL EVIDENCE SURFACES
Repository quality contracts and historical CI definitions are preserved. Historical Actions runs that terminated before steps executed remain evidence of infrastructure non-execution, not code-test failure. Current project execution does not require repairing Actions, provisioning a paid provider, or establishing a local workstation dependency before Web v1 can advance.

Deployment, observability and rollback become release/operations concerns when a deployment target is intentionally selected. They are not prerequisites for repository-native implementation.

Baseline state: `REPOSITORY DELIVERY GOVERNED / EXTERNAL OPERATIONS OPTIONAL UNTIL RELEASE TARGET`.

### DESIGN — DS1 CLOSED
TAI/JI/FU semantic authority is CANON. Ω1 has manifested master assets and recorded technical gate PASS. HNK source assets are manifested. Wordmark V2 is a candidate but not promoted to master. Production typography, reusable tokens, component visual language and whole-product visual regression remain open/partial; the current theme manifests a concrete CANON token layer without closing the broader design-system implementation gap.

Baseline state: `CANON ESTABLISHED / Ω1 VERIFIED / DESIGN SYSTEM PARTIAL`.

### UI — UI1 CLOSED
The current `wordpress/themes/taijifu-canon/` source is manifested with shell/templates, CANON material tokens, approved Ω1 production copies, Dojo Gate composition, presentation-safe `taijifu-core` boundary, responsive rules, reduced-motion rules and source-level contract tests. Runtime WordPress activation and browser-level acceptance remain distinct evidence surfaces, not blockers for continuing source implementation.

Baseline state: `CURRENT CANON SOURCE MANIFESTED / Ω1 PROVENANCE VERIFIED / BROWSER-RUNTIME ACCEPTANCE OPEN`.

Evidence ledger: `docs/project/TAIJIFU-R2-UI-EVIDENCE-v0.1.md`.

### UX — UX1 CLOSED
Approved sources define site navigation/Dojo Gate behavior and Personalized Training journeys: adaptive interview, review, composition, regeneration, session, feedback, responsive/accessibility, failure/recovery, privacy and acceptance gates. The Dojo Gate/entry source surface is manifested, but end-to-end Personalized Training implementation remains incomplete.

Baseline state: `AUTHORITATIVE UX SPEC CLOSED / ENTRY SURFACE IMPLEMENTED / END-TO-END IMPLEMENTATION PARTIAL`.

### SEO — SEO1 CLOSED WITH OPTIONAL RUNTIME/EXTERNAL EVIDENCE SURFACES
Public content architecture and semantic presentation provide a partial discoverability foundation. Metadata, canonical/redirect strategy, structured data, sitemap/robots policy, social metadata and internal linking can be implemented repository-first. Search Console/analytics/CWV production measurements are external verification surfaces and are not prerequisites for implementing Web v1.

Baseline state: `CONTENT + SEMANTIC PRESENTATION FOUNDATION PARTIAL / DEDICATED SEO IMPLEMENTATION OPEN`.

### GAMEDESIGN — GD1 BLOCKED BY SOURCE AUTHORITY
Personalized Training contributes some current game/system behavior, but Manual V12's historical source package is not manifested. XP, curriculum, techniques, journey, certification/exam and related historical game-system authority cannot be losslessly reconciled from filenames/inventory alone.

Baseline state: `PARTIAL CURRENT SYSTEM AUTHORITY / MANUAL V12 SOURCE-AUTHORITY BLOCKER / DENOMINATOR NOT CLOSED`.

## Project-level telemetry
- Denominators closed: 6 / 7.
- Global completion percentage: `WITHHELD — GD1 denominator authority not closed`.
- Current governance gate: `BASELINE v0.1 PARTIAL / GIP OPERATING MODE RECONCILED`.
- Primary source blocker: `Manual V12 payload recovery/ingestion` (only for the historical GAMEDESIGN denominator).
- Primary product implementation gap: `navigable Web v1 + end-to-end Personalized Training/UX integration`.
- Primary UI gap: `browser/runtime acceptance`, without making a particular local/runtime provider mandatory.
- Primary growth gap: `dedicated SEO implementation`; external measurement follows an actual deployment target.
- Historical Actions runner failure: `NON-BLOCKING INFRASTRUCTURE EVIDENCE`.

## Gap Roadmap — execution order

### R0 — Preserve project truth
Keep Evidence Map, Denominator Closure, Recovery Ledger and this Baseline synchronized with material changes. Never rewrite historical authority silently.

### R1 — Repository-native verification
Maintain deterministic source/static contracts and execute whatever verification surfaces are available through the GitHub + GPT workflow. Do not gate implementation on GitHub Actions or a specific local workstation. Record runtime-only claims as unverified until an appropriate runtime surface exists.

Exit: repository changes carry auditable implementation/static evidence without external-tool dependency.

### R2 — Complete current product UI
Continue the manifested `taijifu-canon`/interactive-web surfaces, tokens, Ω1 assets, semantic shell, Dojo Gate, Core boundary and responsive/accessibility contracts. Treat browser/runtime QA as an acceptance layer rather than a prerequisite for source progress.

Exit: repository contains the complete current-CANON Web v1 presentation implementation.

### R3 — Close end-to-end UX
Implement/expose UX1 journeys against approved Personalized Training and web architecture sources. Add responsive, accessibility, failure/recovery and privacy-facing behavior with repository-testable contracts where possible.

Exit: UX1 journeys are manifested end-to-end in the official product source.

### R4 — Product hardening
Complete remaining design/UI gaps: typography/tokens/component language, responsive/motion/accessibility behavior, visual references and runtime acceptance when an appropriate execution surface is available.

Exit: Web v1 source is release-candidate quality under current CANON.

### R5 — Release operations when selected
When a real deployment target is selected, establish only the operational capabilities required by that target: build/package/deploy, configuration boundary, release/version evidence, observability and rollback/recovery. No paid/external provider is assumed by default.

Exit: the selected release target has auditable operational evidence.

### R6 — Implement SEO1 repository layer
Implement metadata policy, canonical/redirect behavior, structured data, sitemap/robots policy, social metadata and internal-link strategy. Production indexability/CWV/Search Console/analytics evidence follows deployment and does not block source implementation.

Exit: repository-controlled SEO1 capabilities are implemented; production-only evidence is separately classified.

### R7 — Recover Manual V12 and close GD1
Recover the source payload; import losslessly; create count/hash manifest; classify artifacts; reconcile XP/curriculum/techniques/journey/certification and related systems against current CANON. Do not promote historical material automatically.

Exit: GD1 denominator closes and GAMEDESIGN can enter normal baseline scoring.

### R8 — Baseline v0.2 / quantitative telemetry
After GD1 closure, accept an explicit weighting/state-conversion model and compute reproducible telemetry only from evidence.

## Parallelism / anti-rework
R2, R3 and R6 are the direct Web v1 path and can advance now through GitHub + GPT. R7 remains a parallel historical-source recovery track. R5 activates when a deployment target is actually chosen. No unrelated product work waits for Manual V12, GitHub Actions, a local workstation, a paid service or an external provider.

## Current next action
`R2 WEB V1 COMPLETION` + `R3 END-TO-END UX IMPLEMENTATION` are the highest-leverage product tracks. `R7 MANUAL V12 RECOVERY` remains parallel and must not block them.
