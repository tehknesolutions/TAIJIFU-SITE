# P06 — Seal / Paper Specimen — candidate provenance

Status: **PASS — deterministic runtime implementation / PENDING human approval**

Date: 2026-10-04
Issue: #39
Prompt: `P06 — Seal / paper specimen`
References: none specified by the Prompt Library
Layer: Presentation
Canonical master: **false**

## Original candidate

Generation id: `e07ba132-03dd-456b-8692-7fb91f198ee2`
Seed: null
Aspect ratio: 16:9
Local artifact filename: `a_highly_detailed_cinematic_close_up_still_life_s.png`
SHA-256: `02b5c0d1b4981b9009f184077bc1d1079d060c80779dcae65b87fb96713ce41a`

## Durable runtime implementation

A deterministic repository implementation of the same P06 content contract is persisted at:

`apps/interactive-web/public/media/p06-seal-paper.svg`

Commit: `a682de2118b1a1d83306b875f450733e5f8b746d`

The SVG is not claimed to be byte-identical to the original generated PNG. It is the durable runtime specimen implementing the approved P06 presentation contract.

## Content contract

- warm off-white archival/fibrous paper is dominant;
- dark handmade paper/mat and natural wood support the composition;
- physical aged seal object and ink dish are present;
- central paper surface remains blank for deterministic Ω1/mark compositing;
- raking/warm light reveals paper fibers and material texture;
- no generated characters, logo or readable text.

## Registry

P06 is registered in `apps/interactive-web/src/media-registry.ts` with:

- `sourcePath: apps/interactive-web/public/media/p06-seal-paper.svg`;
- `references: []`;
- `generator: deterministic-svg-seal-paper-specimen`;
- `seed: null`;
- `aspectRatio: 16:9`;
- `createdAt: 2026-10-04`;
- `humanApproval: pending`;
- `deterministicBrandAssetsComposited: false`;
- `isCanonicalMaster: false`.

Human approval remains a separate explicit event.
