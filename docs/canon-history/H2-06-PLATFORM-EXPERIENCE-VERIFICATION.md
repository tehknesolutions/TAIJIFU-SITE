# H2-06 — Platform + Experience Verification

Status: VERIFIED ARCHITECTURE / PROPAGATION INTEGRATION PENDING
Epic: EPIC-002 — Canon Histórico
Authority: `tehknesolutions/TAIJIFU-SITE`

## Inspected surface

The official interactive web surface is rooted at `apps/interactive-web`.

Its `src/` tree contains explicit Canon-to-UI architecture, including:

- `content/canon-registry.ts`
- `content/canon-snapshot.ts`
- `content/canon-experience-projection.ts`
- `content/canon-ui-render.ts`
- `canon-ui.ts`
- Canon/experience tests and localization boundaries.

## Architecture finding

`content/canon-registry.ts` already establishes a governed content registry and exposes `canonToExperienceNodes(...)` plus `buildLocalizedExperienceNodes(...)`. This is positive evidence that Platform/Experience are designed to project governed Canon content rather than operate as an unrelated historical authority.

## Historical-origin finding

The inspected registry does **not** currently expose the EPIC-002 historical invariant (`historicalSinceYear = 2006`) as a typed Platform/Experience value.

Therefore:

- Platform architecture: **VERIFIED**
- Experience projection architecture: **VERIFIED**
- Historical-origin propagation: **NOT YET WIRED**

This is not a conflicting historical claim. It is an integration gap.

## Required integration

A subsequent implementation increment should expose the canonical history milestone through the existing content boundary and test that Experience consumes the same value.

The implementation MUST derive from the canonical historical source/policy rather than introducing an independent `2006` fact with no provenance contract.

## Current H2-06 matrix update

| Layer | State |
|---|---|
| Canon | PASS |
| Platform architecture | VERIFIED |
| Platform historical value | INTEGRATION PENDING |
| Experience architecture | VERIFIED |
| Experience historical value | INTEGRATION PENDING |
| Academy | TO VERIFY |
| Masters | TO VERIFY |
| Other products | TO VERIFY |

## Next implementation gate

`PLATFORM_EXPERIENCE_HISTORY_PROPAGATION=PASS` requires:

1. one governed historical-origin view model/value derived from Canon;
2. Platform test asserting year `2006` and label `Desde 2006`;
3. Experience projection test asserting it consumes that governed value;
4. no `2026` origin representation introduced by the integration.
