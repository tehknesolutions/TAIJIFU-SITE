# H2-06 — Historical Propagation Closeout

Status: PASS — GOVERNANCE SCOPE
Epic: EPIC-002 — Canon Histórico
Authority: `tehknesolutions/TAIJIFU-SITE`

## Decision

H2-06 is closed for the scope of **Canon Histórico governance and propagation architecture**.

The gate does not require Academy or Masters to already exist as standalone runtime products. Their runtime implementation belongs to their product epics. What H2-06 requires is that their authority boundary and historical-consumption contract are unambiguous before those products evolve.

That condition is now satisfied.

## Verified chain

`TAIJIFU-SITE Canon → Platform → Experience → Products`

### Canon

PASS.

Historical origin invariant:

**TAIJIFU — Desde 2006**

2026 remains `MODERN_PHASE_UNCLASSIFIED` and is prohibited as an origin marker.

### Platform

PASS.

The interactive web has an explicit governed historical-origin projection derived from the Canon boundary.

### Experience

PASS.

Experience consumes the governed projection and has regression coverage preventing `Desde 2026` / year `2026` from returning as origin.

### SW / Academy

GOVERNANCE PASS / RUNTIME DEFERRED TO EPIC-009.

`SW-TAIJIFU` is classified as a legacy curriculum/training source and migration source. Academy is a product consumer/target for curriculum migration, not a historical authority.

The absence of a currently identified standalone Academy runtime does not block the historical governance gate. Runtime binding is an EPIC-009 acceptance concern.

### Masters

GOVERNANCE PASS / RUNTIME DEFERRED TO EPIC-010.

Masters legacy evidence is classified as product/gameplay evidence. Masters consumes Canon and does not establish historical facts.

The absence of a currently identified standalone runtime location does not block the historical governance gate. Runtime binding is an EPIC-010 acceptance concern.

## Product rule

Any current or future downstream product that displays TAIJIFU historical origin MUST consume or faithfully project the canonical invariant:

**TAIJIFU — Desde 2006**

A downstream implementation cannot supersede Canon by age, repository history, product release, cached content or legacy wording.

## Deferred implementation gates

The following are explicitly deferred rather than unresolved historical blockers:

- Academy runtime location and Canon binding → EPIC-009;
- Masters runtime location and Canon binding → EPIC-010;
- inventory/binding of future products → EPIC-011;
- release enforcement and Canon version evolution → EPIC-012.

## Result

`H2-06=PASS`

This PASS means the historical authority model, propagation direction, Platform/Experience implementation, and downstream product boundaries are defined sufficiently for EPIC-002.

It does **not** claim that EPIC-009, EPIC-010 or EPIC-011 implementation work is complete.
