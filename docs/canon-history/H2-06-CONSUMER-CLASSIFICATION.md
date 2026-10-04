# H2-06 — Downstream Consumer Classification

Status: IN_PROGRESS
Epic: EPIC-002 — Canon Histórico
Authority: `tehknesolutions/TAIJIFU-SITE`

## Rule

`TAIJIFU-SITE` is the single historical Canon authority. Downstream repositories and products consume Canon; they do not redefine it.

## Evidence snapshot

The accessible GitHub inventory currently exposes two repositories matching TAIJIFU directly:

- `tehknesolutions/TAIJIFU-SITE` — authority / Canon + Platform + Experience;
- `tehknesolutions/SW-TAIJIFU` — downstream/legacy training and curriculum material.

`SW-TAIJIFU` contains a substantial module corpus (`M001+`) covering manifesto, definitions, progression, assessments, training protocols, stances and movement material. It is therefore classified as a downstream content consumer/legacy source, not an independent Canon authority.

A cross-repository code search for the literal stale marker `Desde 2026` returned no indexed matches in these two repositories at audit time. This is evidence of no indexed literal conflict, not proof that all rendered/runtime/archived surfaces are clean.

## Classification

| Surface / product | Classification | Historical authority | Action |
|---|---|---|---|
| TAIJIFU-SITE Canon | AUTHORITY | YES | maintain |
| TAIJIFU-SITE Platform | CONSUMER | NO | consume Canon |
| TAIJIFU-SITE Experience | CONSUMER | NO | consume Platform/Canon projection |
| SW-TAIJIFU | LEGACY CONSUMER / MIGRATION SOURCE | NO | migrate useful content; consume Canon |
| Academy | PRODUCT CONSUMER — LOCATION TO VERIFY | NO | locate implementation; bind to Canon |
| Masters | PRODUCT CONSUMER — LOCATION TO VERIFY | NO | locate implementation; bind to Canon |
| Other products | PRODUCT CONSUMER | NO | inventory and bind to Canon |

## Non-negotiable origin invariant

All consumers that display TAIJIFU historical origin must resolve to:

**TAIJIFU — Desde 2006**

2026 remains `MODERN_PHASE_UNCLASSIFIED` and cannot be promoted downstream into an origin marker.

## Migration rule

Legacy content may be valuable evidence or product material, but migration into `TAIJIFU-SITE` requires provenance and classification. Copying content does not transfer authority from a legacy repository.

## Remaining gate

H2-06 cannot be closed merely because a repository name is absent from the current GitHub search. Academy and Masters remain `TO VERIFY` until their implementation/source locations are identified or an explicit architecture ruling establishes that they exist only as future product projections within `TAIJIFU-SITE`.
