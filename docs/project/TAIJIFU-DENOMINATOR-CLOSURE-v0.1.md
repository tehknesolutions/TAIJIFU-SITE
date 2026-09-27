# TAIJIFU Denominator Closure — v0.1

Status: ACTIVE CLOSURE CANDIDATE
TPT Gate: DENOMINATOR CLOSURE
Date: 2026-09-27
Evidence source: `TAIJIFU-EVIDENCE-MAP-v0.1.md`
DoD source: `TAIJIFU-DIVISION-DOD-MATRIX-v0.1.md`

## Purpose
Freeze what counts as the denominator for each division before any percentage is emitted. This document does not award completion for planned work. It defines scope, evidence requirements and blockers so future progress is reproducible and cannot drift with conversation memory.

## Closure rule
A denominator can be `CLOSED` even when many rows are incomplete, provided the rows that define the intended scope are known and accepted. A denominator remains `OPEN` when material scope itself is unresolved or required source authority is missing.

Statuses: `CLOSED | CLOSED WITH EXTERNAL EVIDENCE SURFACES | OPEN | BLOCKED BY SOURCE AUTHORITY`.

## DESIGN — DS1

### Frozen denominator
The existing ten-row DESIGN denominator is retained:
1. semantic TAI/JI/FU system;
2. Ω1 emblem authority;
3. HNK glyph identity rules;
4. wordmark system;
5. color/token system;
6. typography system;
7. spacing/grid/radius/elevation/motion tokens;
8. component visual language;
9. asset master/source governance;
10. visual regression references.

### Scope decision
No additional design capability is required to define the current visual-system denominator. Product implementation may add components later, but those additions are instances under rows 7/8/10 rather than denominator expansion unless CANON itself changes.

### Evidence gates
- A CANON decision may close a semantic/authority row.
- Production asset rows require manifested source/master artifacts.
- System rows require reusable tokens/rules, not screenshots alone.
- Visual regression requires explicit comparison/audit evidence.

### Closure
`DESIGN DS1: CLOSED`.

Current incompleteness remains visible: wordmark master, production type system, implementation tokens, component language and whole-product regression are not promoted to DONE by denominator closure.

## UI — UI1

### Frozen denominator
The P0-P10 sequence is accepted as the UI denominator:
- P0 CANON + asset inventory
- P1 tokens/grid/breakpoints
- P2 Ω1/wordmark/HNK production assets
- P3 `taijifu-canon` theme shell/header/footer
- P4 Dojo Gate
- P5 `taijifu-core` presentation/content surface
- P6 theme/core integration
- P7 responsive pass
- P8 motion/performance/visual accessibility
- P9 visual regression
- P10 packaging/staging/QA

### Scope decision
P0-P10 spans source inventory through staging/QA and therefore provides an end-to-end implementation denominator. Missing theme source is an implementation/source gap, not a reason to keep changing the denominator.

### Closure
`UI UI1: CLOSED`.

The closure does not claim UI completion. It freezes the ruler by which UI work will be measured.

## SEO — SEO1

### Frozen denominator
The ten existing SEO capabilities are accepted as the intended product SEO denominator:
1. crawl/indexation policy;
2. semantic HTML/content hierarchy;
3. metadata/title/description policy;
4. canonical/redirect strategy;
5. structured data/schema;
6. sitemap/robots;
7. performance/Core Web Vitals;
8. social metadata;
9. content discoverability/internal linking;
10. measurement/Search Console/analytics.

### Evidence-surface classification
SEO spans multiple evidence surfaces:
- repository/source: metadata implementation, structured data, semantic templates, routing/canonical logic, social metadata, internal linking;
- runtime/staging/production: rendered head, HTTP redirects/status, robots response, generated sitemap, indexability, performance/CWV;
- external webmaster/measurement: Search Console and analytics ownership/configuration/measurement.

Repository absence cannot settle runtime/external rows. CMS defaults cannot receive project completion credit without observed runtime evidence.

### Closure
`SEO SEO1: CLOSED WITH EXTERNAL EVIDENCE SURFACES`.

This means the denominator is stable while completion remains largely unverified. Runtime/external inventory is evidence acquisition, not denominator discovery.

## CODE — C1 candidate
The existing CODE denominator is not yet frozen because `CODE-12 Product application shell(s)` still has unresolved product/app scope. Foundation architecture is evidenced, but the number and identity of intended product applications is not established by current evidence.

`CODE C1: OPEN`.

Closure requirement: identify the authoritative intended app/product surfaces and decide whether WordPress is the public product shell, one shell among several, or separate from the platform application denominator.

## DEVOPS — D1 candidate
The quality-pipeline denominator is strong, but operational scope remains unresolved for deploy environments, release/version automation, runtime observability and rollback/recovery.

`DEVOPS D1: OPEN`.

Closure requirement: establish intended runtime/deployment topology and which operational responsibilities belong to this repository/project.

## UX — UX1 candidate
UX rows are conceptually formed, but Personalized Training and related journey source authority is not currently retrievable. Freezing the denominator without those artifacts risks silently redefining the intended experience.

`UX UX1: BLOCKED BY SOURCE AUTHORITY`.

Closure requirement: recover/ingest the named UX source set, then reconcile IA, onboarding, adaptive dashboard, interview, composition/regeneration, feedback/progression, responsive, accessibility, recovery states and usability validation.

## GAMEDESIGN — GD1 candidate
The existing 12-row candidate is useful, but Manual V12 and curriculum/progression/fighter/loadout authority are not currently retrievable. The intended game-system scope therefore cannot yet be frozen losslessly.

`GAMEDESIGN GD1: BLOCKED BY SOURCE AUTHORITY`.

Closure requirement: recover/ingest Manual V12 and authoritative curriculum, techniques, progression/XP, rank/certification, fighter/loadout and training-loop sources before accepting exclusions/additions.

## Closure register
| Division | Denominator | State | Primary blocker |
|---|---|---|---|
| CODE | C1 | OPEN | product/app-shell authority |
| DEVOPS | D1 | OPEN | deployment/operations topology |
| DESIGN | DS1 | CLOSED | none for scope; implementation gaps remain |
| UI | UI1 | CLOSED | none for scope; implementation/source gaps remain |
| UX | UX1 | BLOCKED BY SOURCE AUTHORITY | Personalized Training/UX source recovery |
| SEO | SEO1 | CLOSED WITH EXTERNAL EVIDENCE SURFACES | runtime/external verification, not scope |
| GAMEDESIGN | GD1 | BLOCKED BY SOURCE AUTHORITY | Manual V12/domain source recovery |

## Percentage policy after Pass 006
- DESIGN and UI are now eligible for reproducible interim scoring once a scoring weight model is explicitly accepted.
- SEO is eligible only for a split evidence score or a conservative scoring model that preserves runtime/external UNKNOWN states; UNKNOWN must never be converted to zero by accident.
- CODE, DEVOPS, UX and GAMEDESIGN remain ineligible for percentage reporting until their denominator state closes.
- Global Product Progress remains prohibited until all seven denominators are closed.

## Anti-rework invariant
Future implementation does not reopen a closed denominator merely because more files/components appear. Reopening requires one of:
1. authoritative CANON/product scope change;
2. evidence that a material capability was omitted from the ruler;
3. explicit governance decision with provenance.

This prevents percentages from moving because the denominator was silently rewritten after work was completed.

## Next gate
`PASS 006 -> PASS 007 CODE/DEVOPS CLOSURE -> SOURCE RECOVERY UX/GAMEDESIGN -> BASELINE v0.1`.

A Baseline v0.1 may include closed-division telemetry and explicit blocked/open divisions, but no single global completion percentage until all denominator authorities are closed.
