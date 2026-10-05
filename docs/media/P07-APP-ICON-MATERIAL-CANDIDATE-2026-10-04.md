# P07 — App Icon Material Study — candidate provenance

Status: **PASS — deterministic runtime implementation / PENDING human approval**

Date: 2026-10-04
Issue: #39
Prompt: `P07 — App icon material study`
References: none specified by the Prompt Library
Layer: Presentation
Canonical master: **false**

## Original candidate

Generation id: `bdb1f5a4-ba52-4b58-a5cc-75a61ba4a05b`
Seed: null
Aspect ratio: 16:9 presentation plate
Local artifact filename: `a_highly_detailed_cinematic_close_up_still_life_s.png`
SHA-256: `38202974d21066e0bc07a0bbcf643c9c67249a4f8471e9ed280bcd6e0ce97abe`

## Durable runtime implementation

A deterministic repository implementation of the same P07 content contract is persisted at:

`apps/interactive-web/public/media/p07-app-icon-material.svg`

Commit: `0e6343e81320133f5f7ebe168fa3145f7a1c2e04`

The SVG is not claimed to be byte-identical to the original generated PNG. It is the durable runtime specimen implementing the approved P07 presentation contract.

## Content contract

- minimal near-black matte square presentation object;
- physical rounded/beveled construction;
- clearly defined centered blank inset/recess reserved for deterministic Ω1 micro mark;
- controlled studio-like directional lighting;
- premium but functional material treatment;
- no generated logo;
- no text;
- no invented glyph or symbol.

## Registry

P07 is registered in `apps/interactive-web/src/media-registry.ts` with:

- `sourcePath: apps/interactive-web/public/media/p07-app-icon-material.svg`;
- `references: []`;
- `generator: deterministic-svg-app-icon-material`;
- `seed: null`;
- `aspectRatio: 16:9`;
- `createdAt: 2026-10-04`;
- `humanApproval: pending`;
- `deterministicBrandAssetsComposited: false`;
- `isCanonicalMaster: false`.

Human approval remains a separate explicit event.
