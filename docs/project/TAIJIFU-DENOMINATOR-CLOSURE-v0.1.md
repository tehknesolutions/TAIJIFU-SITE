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

## Evidence Mapping Pass 007 — CODE / DEVOPS scope closure

### Recovered authority affecting CODE
The approved Unified Repository Spec establishes two independently deployable product/runtime surfaces:

1. **Platform application/runtime** — historically targeted as `apps/platform/`, with reusable libraries under top-level packages.
2. **WordPress** — independently deployable, with `taijifu-core` owning domain/content behavior and `taijifu-canon` owning presentation.

It explicitly states that Platform and WordPress may share generated/static canonical data contracts but **must not require each other to boot**. This is sufficient to settle the product-shell ambiguity without forcing the current Foundation tree to be relocated back into the historical target path.

Current architecture reconciliation still governs physical placement: the executable workspace topology and manifested `services/packages/platform` Foundation are protected. The Unified Spec supplies product/runtime authority; it does not override the later anti-rework placement decision.

### CODE — C1 CLOSED
The CODE denominator is frozen as these capability groups:

1. domain primitives/invariants;
2. application ports/use-case boundary;
3. cross-boundary contracts;
4. identity/TUID service;
5. relationship authority/lifecycle;
6. capability resolution;
7. dashboard/adaptive BFF;
8. infrastructure adapters;
9. runtime composition;
10. event/snapshot logical-version correctness;
11. architecture dependency enforcement;
12. **Platform application/product surface** — independently bootable application experience consuming Foundation contracts/services as appropriate;
13. **WordPress domain/content runtime** — `taijifu-core`, independently bootable from Node Platform;
14. **WordPress presentation runtime** — `taijifu-canon`, independently bootable with graceful core-unavailable behavior where required;
15. cross-runtime canonical/static contract integration where approved, without hard boot dependency.

`CODE C1: CLOSED`.

Important: rows 12-15 are scope closure, not implementation completion. The current absence of a manifested `apps/` shell and current absence of `taijifu-canon` remain implementation/source gaps.

### Personalized Training source correction
`docs/TAIJIFU-PERSONALIZED-TRAINING-ENGINE-V1.md` is present on current `main` and declares itself `APPROVED DESIGN / implementation source of truth`. It defines runtime composition, adaptive interview, exercise metadata, hard-constraint filtering, scoring/composition, controlled variation, feedback adaptation, WordPress ownership boundaries, privacy and ten acceptance gates.

Therefore the earlier statement that Personalized Training source authority was not retrievable is superseded. UX is no longer blocked on this specific source. Manual V12 remains a separate GAMEDESIGN/source-ingestion concern.

UX denominator closure will be handled in the next source-reconciliation pass using this recovered authority rather than reconstructed memory.

### DEVOPS authority recovered
The Unified Repository Spec gives several operational requirements that belong in the DEVOPS denominator:

- WordPress and Platform are independently deployable/bootable;
- Platform must build/test independently after relocation/adaptation;
- WordPress theme/plugin must install independently;
- M9 validation includes file/hash integrity, semantic conflict checks, Platform tests, WordPress tests, responsive/accessibility/visual gates;
- M10 release includes unified release notes, WordPress ZIPs, Platform build artifacts where applicable, and migration/genealogy report;
- source import must not copy secrets or `.env` values.

Current repository evidence additionally shows GitHub Actions quality workflows, but current-main search did not recover dedicated deploy topology/IaC, staging/production environment configuration, observability implementation, or rollback/recovery implementation.

### DEVOPS — D1 remains OPEN, but ambiguity is narrowed
The DEVOPS denominator candidate is now:

1. deterministic runtime/package contract;
2. lint gate;
3. typecheck gate;
4. test gate;
5. build gate;
6. architecture-test gate;
7. CI execution;
8. Platform independent build/package/deploy path;
9. WordPress independent test/package/install path;
10. release/version artifacts and release notes;
11. environment/staging/production topology;
12. secrets/configuration boundary;
13. runtime observability/telemetry;
14. rollback/recovery;
15. migration integrity/provenance validation where migration is active.

`DEVOPS D1: OPEN`.

Only one material scope decision remains before closure: establish whether observability + rollback/recovery are mandatory first-release responsibilities of TAIJIFU-SITE itself or external hosting/platform responsibilities with evidence surfaces tracked here. Repository absence cannot decide that ownership question.

## UX — UX1 candidate, source block partially removed
Personalized Training authority is recovered. The source directly establishes adaptive interview, generated workout, regeneration, session execution, feedback, responsive/accessibility/motion presentation responsibilities and graceful core-unavailable state. This materially supports UX-04/05/06/07/08/09.

`UX UX1: OPEN — SOURCE RECONCILIATION ACTIVE`.

Remaining closure work: reconcile the Personalized Training source with site-wide IA/navigation, onboarding, dashboard journey and usability-validation scope. Do not retain the obsolete blanket `BLOCKED BY SOURCE AUTHORITY` label for UX.

## GAMEDESIGN — GD1 candidate
Manual V12 is named and inventoried by the Unified Repository Spec as a 166-file historical source package, including `sistema-xp.html`, `codex-tecnicas.html`, `jornada-90-dias.html`, certification/exam files, modules 00-08 and 12 technique sheets. The spec requires lossless import + classification before promotion to current CANON.

The inventory proves the source package existed and defines expected content, but the 166-file source is not currently manifested under the planned Manual destination. Therefore detailed game-system semantics must not be reconstructed from filenames alone.

`GAMEDESIGN GD1: BLOCKED BY SOURCE INGESTION / AUTHORITY RECONCILIATION`.

## Closure register after Pass 007
| Division | Denominator | State | Primary blocker |
|---|---|---|---|
| CODE | C1 | CLOSED | none for scope; app/theme implementation gaps remain |
| DEVOPS | D1 | OPEN | observability/recovery ownership + deployment evidence surfaces |
| DESIGN | DS1 | CLOSED | none for scope |
| UI | UI1 | CLOSED | none for scope |
| UX | UX1 | OPEN | reconcile recovered Personalized Training authority with site-wide journeys |
| SEO | SEO1 | CLOSED WITH EXTERNAL EVIDENCE SURFACES | runtime/external verification only |
| GAMEDESIGN | GD1 | BLOCKED BY SOURCE INGESTION / AUTHORITY RECONCILIATION | Manual V12 source package |

## Percentage policy after Pass 007
- CODE, DESIGN and UI now have closed repository-governed denominators.
- SEO has a closed denominator with explicit external evidence surfaces.
- DEVOPS and UX remain open; GAMEDESIGN remains source-blocked.
- Interim scoring still requires an explicit weight/state conversion model; denominator closure alone is not a percentage.
- Global Product Progress remains prohibited until all seven denominator authorities are closed.

## Anti-rework invariant
Future implementation does not reopen a closed denominator merely because more files/components appear. Reopening requires an authoritative scope/CANON change, evidence of a materially omitted capability, or an explicit governance decision with provenance.

## Next gate
`PASS 007 -> PASS 008 UX CLOSURE + DEVOPS OWNERSHIP DECISION -> MANUAL V12 SOURCE INGESTION -> BASELINE v0.1`.
