# P03 — Martial Landscape — candidate provenance

Status: **PASS — deterministic runtime implementation / PENDING human approval**

Date: 2026-10-04
Issue: #39
Prompt: `P03 — Martial landscape / discipline`
References: R04/R05/R07/R08
Layer: Presentation
Canonical master: **false**

## Original candidate

Generation id: `cace231b-d79a-4ca2-a818-69cfba52fe60`
Seed: null
Aspect ratio: 16:9
Local artifact filename: `wide_epic_landscape_scene_at_golden_sunrise_a_cin.png`
SHA-256: `da5711f50dceaf1e7bf95d6e7e0c111c89c5bca8c72a023a506fffe108c1953f`

## Durable runtime implementation

A deterministic repository implementation of the same P03 content contract is persisted at:

`apps/interactive-web/public/media/p03-martial-landscape.svg`

Commit: `a91d18c86219ec23dc35ee50f593a61554936d21`

The SVG is not claimed to be byte-identical to the original generated PNG. It is the durable runtime specimen implementing the approved P03 presentation contract.

## Content contract

- one adult martial practitioner at medium/long distance;
- practical dark training clothing;
- grounded stance integrated into terrain;
- mountain/water landscape remains dominant;
- natural cinematic light and atmospheric depth;
- no visible text or UI;
- no supernatural energy;
- no weapon glamour;
- no face-centric celebrity portrait.

## Registry

P03 is registered in `apps/interactive-web/src/media-registry.ts` with:

- `sourcePath: apps/interactive-web/public/media/p03-martial-landscape.svg`;
- `references: ['R04','R05','R07','R08']`;
- `generator: deterministic-svg-martial-landscape`;
- `seed: null`;
- `aspectRatio: 16:9`;
- `createdAt: 2026-10-04`;
- `humanApproval: pending`;
- `deterministicBrandAssetsComposited: false`;
- `isCanonicalMaster: false`.

Human approval remains a separate explicit event.
