# EPIC-002 — Canon Histórico v1 Gate

Status: FINAL_GATE_IN_PROGRESS
Authority: `tehknesolutions/TAIJIFU-SITE`

## Purpose

This gate determines whether EPIC-002 has enough governed historical material to declare **Canon Histórico v1** without confusing product/runtime work with historical authority work.

## Completed foundation

The historical propagation work is closed:

- H2-06 = PASS — governance scope;
- `TAIJIFU-SITE` = sole historical Canon authority;
- Canon → Platform → Experience propagation = PASS;
- Academy/SW authority boundary = PASS, runtime deferred to EPIC-009;
- Masters authority boundary = PASS, runtime deferred to EPIC-010;
- future product binding = EPIC-011;
- release/version enforcement = EPIC-012.

## Locked invariant

**TAIJIFU — Desde 2006**

The historical `Desde` marker is 2006.

2026 remains `MODERN_PHASE_UNCLASSIFIED` and MUST NOT be represented as the origin, creation year, historical start or `Desde` marker.

## Final-gate dimensions

Canon Histórico v1 is ready only when the historical package has explicit governed coverage for:

1. **Origin** — the 2006 historical origin is registered with provenance.
2. **Founders / people** — biographical and founder claims are source-traceable and do not exceed available evidence.
3. **Timeline** — canonical milestones are ordered, classified and provenance-linked.
4. **HNK relationship** — historical relationship claims are distinguished from later ecosystem/product architecture.
5. **Provenance** — every promoted historical claim has a source class/status and traceable authority path.
6. **Propagation** — downstream consumers cannot supersede the Canon. **PASS via H2-06.**

## Acceptance rule

`CANON_HISTORY_V1=PASS` requires dimensions 1–5 to be demonstrably represented in the current Canon/history artifacts, with no unresolved contradiction that changes the official origin or identity narrative.

Missing detail may be explicitly deferred when it does not alter the locked historical invariant and is recorded as an evidence gap rather than silently invented.

## Non-goals

This gate does not require completion of:

- Canon Filosófico (EPIC-003);
- Canon Marcial (EPIC-004);
- Academy runtime/curriculum product (EPIC-009);
- Masters runtime/gameplay product (EPIC-010);
- ecosystem integration (EPIC-011);
- final release automation (EPIC-012).

## Current decision

`CANON_HISTORY_V1=PENDING_FINAL_EVIDENCE_AUDIT`

Next action: audit the current `canon/history` and `docs/canon-history` package against dimensions 1–5, record PASS/GAP per dimension, then either close EPIC-002 or create only the minimal remaining historical work packages.
