# H2-06 — Historical Canon Propagation Audit

Status: IN_PROGRESS
Epic: EPIC-002 — Canon Histórico
Authority: `tehknesolutions/TAIJIFU-SITE`

## Canon invariant under audit

**TAIJIFU — Desde 2006.**

2026 is not an origin marker. Its current historical classification is `MODERN_PHASE_UNCLASSIFIED`.

## Audit objective

Ensure that historical-origin representations follow the project contract:

`Canon → Platform → Experience → Products`

Downstream surfaces must consume the Canon rather than establish independent historical facts.

## Repository search snapshot

A default-branch GitHub code-search pass was executed for:

- `Desde 2026`
- `2026`
- `Desde 2006`

The connector returned no indexed code-search matches for these literal queries at the time of this audit. This is **not** treated as proof that no stale representation exists: generated assets, non-indexed files, runtime data, images, external deployments and downstream repositories may not be represented by this search result.

## Audit matrix

| Layer | Required behavior | State |
|---|---|---|
| Canon | Defines historical origin as 2006 | PASS |
| Platform | Reads/derives historical origin from Canon | TO VERIFY |
| Experience | Displays Canon-derived historical origin | TO VERIFY |
| Academy | Consumes Canon; no independent origin claim | TO VERIFY |
| Masters | Consumes Canon; no independent origin claim | TO VERIFY |
| Other products | Consume Canon; no independent origin claim | TO VERIFY |

## Failure conditions

The propagation audit fails if any official surface:

- presents 2026 as TAIJIFU origin, creation year or `Desde`;
- hard-codes a conflicting origin year;
- treats a downstream product repository as historical authority over `TAIJIFU-SITE`;
- duplicates the historical fact without a traceable Canon contract where a shared Canon consumer is expected.

## Remediation rule

When a stale surface is found, remediation should prefer:

1. canonical data consumption;
2. a shared adapter/API/index generated from Canon;
3. only then a local representation, if architecture requires it, with explicit provenance back to the Canon source.

## Gate

`H2-06=PASS` requires verification of the official Platform and Experience surfaces plus an explicit downstream-consumer policy for Academy, Masters and other products.

Until then:

`H2-06=IN_PROGRESS`
