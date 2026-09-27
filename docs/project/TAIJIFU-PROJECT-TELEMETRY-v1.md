# TAIJIFU Project Telemetry — TPT v1

Status: ACTIVE
Version: 1.0.0
Established: 2026-09-27

## Purpose

TPT is the canonical project-control layer for TAIJIFU. It exists to prevent architectural rework, fragmented progress reporting, and loss of historical decisions.

## Sources of truth

TAIJIFU Canon is reconciled from:

1. Historical ChatGPT Project TAIJIFU conversations and project files.
2. Current TAIJIFU project conversation.
3. TAIJIFU GitHub repositories and their code, commits, issues, pull requests, CI and documentation.
4. Approved product, design, game-design and technical artifacts.

Historical material is preserved with provenance and is never silently overwritten. Conflicts are classified and reconciled explicitly.

## Lifecycle

VISION -> ARCHITECTURE -> FOUNDATION -> VERTICAL_SLICES -> EXPERIENCE -> INTEGRATION -> HARDENING -> RELEASE

Work-unit states:

PLANNED -> RED -> IMPLEMENTED -> VERIFIED -> INTEGRATED -> DONE

Additional states: BLOCKED, EXPERIMENTAL, SUPERSEDED, REJECTED, ARCHIVED.

## Divisions

- CODE — domain, application, services, APIs, engines, data and integrations.
- DEVOPS — CI/CD, environments, deployment, observability, security gates and releases.
- DESIGN — brand, visual language, design system, art direction and assets.
- UI — components, layouts, surfaces, responsive implementation and visual states.
- UX — journeys, information architecture, onboarding, accessibility and interaction behavior.
- SEO — semantics, metadata, structured data, indexation, content discoverability and web performance.
- GAMEDESIGN — progression, training loops, combat systems, challenges, rewards, balance and game economy.

## Telemetry dimensions

Progress must not be inferred from one division alone.

- Product Progress — manifested product scope / planned canonical product scope.
- Engineering Progress — verified/integrated engineering scope / planned engineering scope.
- Division Progress — independently measured for CODE, DEVOPS, DESIGN, UI, UX, SEO and GAMEDESIGN.

Percentages require an inventoried denominator and evidence. Unknown scope is reported as UNKNOWN, never estimated.

## Required project status

Every status checkpoint must expose:

- product version
- current lifecycle phase
- milestone
- sprint
- active division(s)
- active epic and slice
- work-unit state
- product progress
- engineering progress
- per-division progress
- issue completion
- test/CI state
- blockers
- architectural debt
- last verified commit
- current gate
- next gate
- evidence/provenance

## Current baseline — 2026-09-27

Repository: tehknesolutions/TAIJIFU-SITE
Current integrated branch: main
Foundation merge: PR #13 / commit 436cec1c3f1bb5b4f99667a0e25cab223913d2e6

Current lifecycle phase: FOUNDATION
Primary active division: CODE
Active epic: Identity & Adaptive Authority
Active slice: Event-Sourced Relationship Authority
Current gate: Snapshot Version <-> Logical Stream Version synchronization and verification

Recent integrated evidence includes:

- Relationship lifecycle persistence and snapshot checkpoints.
- EventStore and SnapshotStore application ports.
- Optimistic-concurrency and monotonic-snapshot in-memory adapters.
- Relationship event-sourced repository.
- Logical event-stream versions independent of retained event count.
- Application contract aligned with logical stream versions.

The foundation work was merged into main by PR #13 on 2026-09-27.

## Archaeology gate

Before declaring authoritative product or division completion percentages, perform historical archaeology and reconciliation across Project TAIJIFU materials and repositories.

Required classifications:

CANON | ACTIVE | EXPERIMENTAL | SUPERSEDED | REJECTED | ARCHIVED | NEEDS_REVIEW

Required archaeology output by division:

CODE | DEVOPS | DESIGN | UI | UX | SEO | GAMEDESIGN

For each artifact/decision capture: source, date if known, scope, status, successor if any, evidence, impacted division(s), and canonical decision.

## Anti-rework rules

1. Architecture-changing work requires a recorded target architecture or ADR before broad implementation.
2. No progress percentage without a defined denominator and evidence.
3. A newer implementation does not automatically invalidate an older decision; conflicts require explicit reconciliation.
4. DONE requires verification evidence, not implementation alone.
5. Historical rejected/superseded work remains discoverable.
6. Commits, issues, tests and CI are execution evidence; product/design decisions require their own provenance.
7. New work must identify phase, division, epic, slice and gate.

## Immediate next actions

1. Inventory historical Project TAIJIFU sources.
2. Inventory repository artifacts and execution evidence.
3. Reconcile the seven divisions into the first evidence-backed baseline.
4. Publish roadmap/milestones/gaps from that baseline.
5. Resume the CODE gate from Snapshot Version <-> Logical Stream Version synchronization without discarding integrated foundation work.
