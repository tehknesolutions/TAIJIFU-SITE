# P02 — Dojo Environment — candidate provenance

Status: **PASS — deterministic runtime implementation / PENDING human approval**

Date: 2026-10-04
Issue: #39
Prompt ID: P02
References: R02
Layer: Presentation
Canonical master: **false**

## Original candidate

Conversation artifact filename: `wide_cinematic_photorealistic_interior_of_a_trad.png`

Observed binary metadata at review time:
- format: PNG
- dimensions: 1672 × 941
- intended aspect ratio: 16:9
- SHA-256: `17d044352cfad7530c9018d5d46cda69a2ae55ef4b7b38c3e8dc721e13c059b1`
- generator: OpenAI image generation tool
- generation id: `401c937f-9d5d-4ac6-86f9-d96e808ed76f`
- seed: unavailable / null
- human approval: pending
- deterministic brand assets composited: false
- is canonical master: false

## Durable runtime implementation

A deterministic repository implementation of the same P02 visual contract is now persisted at:

`apps/interactive-web/public/media/p02-dojo-interior.svg`

Commit: `e7ff44c7c2903b4066e387f5ef332fab8f94d66a`

The SVG is **not claimed to be byte-identical to the original generated PNG**. It is the durable runtime specimen used to remove the binary-upload dependency while preserving the approved content contract.

## Content contract

- empty functional training hall is dominant;
- no people;
- no presentation-board UI or baked metadata;
- no visible TAIJIFU wordmark;
- no generated Ω1/HNK;
- no visible yin-yang floor emblem;
- no calligraphy/banner system;
- exterior landscape is secondary;
- floor, racks and equipment read as functional rather than ceremonial.

## Registry

P02 is registered in `apps/interactive-web/src/media-registry.ts` with:

- `sourcePath: apps/interactive-web/public/media/p02-dojo-interior.svg`;
- `generator: deterministic-svg-dojo-interior`;
- `seed: null`;
- `aspectRatio: 16:9`;
- `createdAt: 2026-10-04`;
- `humanApproval: pending`;
- `deterministicBrandAssetsComposited: false`;
- `isCanonicalMaster: false`.

Human approval remains a separate gate.
