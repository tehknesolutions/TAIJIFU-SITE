# P3-01 — Philosophical Source Inventory

Date: 2026-10-04
Status: IN_PROGRESS
Authority: `tehknesolutions/TAIJIFU-SITE`

## Purpose

Record the evidence actually located for EPIC-003 before any philosophical claim is promoted to Canon.

This inventory follows the evidence-first rule:

`Sources → Claims → Domains → Provenance → Canon Registry`

Absence of located evidence is recorded as a governed gap. It is not filled by model inference.

## Sources searched in this increment

### SRC-PHI-AUDIT-001 — TAIJIFU-SITE current repository

- Class: `OFFICIAL_CURRENT`
- Locator: `tehknesolutions/TAIJIFU-SITE@main`
- Search focus: philosophy, manifesto, principles, method, values, terminology.
- Result: no sufficiently identifiable philosophical corpus was located by the available indexed searches for direct promotion.
- Limitation: search-index absence is not proof that no relevant content exists anywhere in repository history.

### SRC-PHI-AUDIT-002 — SW-TAIJIFU legacy repository

- Class: `LEGACY_PRODUCT`
- Locator: `tehknesolutions/SW-TAIJIFU`
- Search focus: manifesto and philosophical vocabulary.
- Result: no traceable philosophical source was located by the available indexed searches in this increment.
- Limitation: legacy material must not be promoted merely because it predates the current Canon.

### SRC-PHI-AUDIT-003 — Project TAIJIFU attached records

- Class: `PROJECT_RECORD`
- Locator: Project TAIJIFU attached records available to the current project context.
- Search focus: TAIJIFU philosophy, manifesto, principles, method, values, terminology.
- Result: no additional passage sufficient to establish the philosophical domains as official doctrine was located by the available attachment search in this increment.
- Limitation: project records are archaeological evidence and require claim-level provenance before promotion.

## Domain coverage after this increment

| Domain | Coverage | Promotion status | Notes |
| --- | --- | --- | --- |
| Manifesto | GAP | none | No traceable philosophical Manifesto corpus located. |
| Principles | GAP | none | No evidence set sufficient for stable principles located. |
| Method | GAP | none | No philosophical method corpus located; martial curriculum remains EPIC-004. |
| Values | GAP | none | No evidence set sufficient for canonical values located. |
| Terminology | PARTIAL / UNRESOLVED | none | Project language exists, but no bounded philosophical terminology corpus has yet been established. |

## Governance result

- Canon claims promoted: **0**.
- Speculative promotions: **0**.
- Legacy passages promoted by age alone: **0**.
- Unsupported doctrine synthesized: **0**.
- Known domains represented as gaps where evidence is insufficient: **yes**.

## Important interpretation rule

A failed or empty indexed search means only that the current discovery mechanism did not locate adequate evidence. It must not be interpreted as proof that the historical material never existed.

Likewise, Project TAIJIFU records are not external references: they are part of the official archaeological input to reconciliation. They still require source classification, exact locators where available, and claim-level review before becoming `CANON`.

## CI status

Automated validation remains blocked by GitHub Actions infrastructure issue #184. The blocker does not authorize bypassing validation or declaring GREEN. Evidence inventory may proceed independently because it does not require runtime execution.

## Next evidence targets

1. Search repository history and legacy repositories for explicit creator-authored philosophical declarations.
2. Reconcile Project TAIJIFU conversation records that contain explicit rulings or definitions.
3. Register only sources with stable locators.
4. Extract bounded claims as `CANDIDATE`, `LEGACY`, `CONFLICT`, or `GAP` before any promotion.
5. Request/record a `CREATOR_RULING` only when documentary archaeology cannot resolve a required Canon dimension.
