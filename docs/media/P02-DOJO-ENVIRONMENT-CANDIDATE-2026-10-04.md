# P02 — Dojo Environment — candidate provenance

Status: **PASS — generation-content gate / awaiting durable binary persistence**

Date: 2026-10-04
Issue: #39
Prompt ID: P02
Layer: Presentation
Canonical master: **false**

## Candidate

The latest architectural retry is the first P02 candidate to pass visual generation review.

Conversation artifact filename: `wide_cinematic_photorealistic_interior_of_a_trad.png`

Observed binary metadata at review time:
- format: PNG
- dimensions: 1672 × 941
- intended aspect ratio: 16:9
- SHA-256: `17d044352cfad7530c9018d5d46cda69a2ae55ef4b7b38c3e8dc721e13c059b1`
- generator: OpenAI image generation tool
- generation id: `401c937f-9d5d-4ac6-86f9-d96e808ed76f`
- seed: unavailable / null
- created/reviewed: 2026-10-04
- human approval: **pending**
- deterministic brand assets composited: **false**
- is canonical master: **false**

## Generation-content review

PASS at the generation-content gate:

- empty functional training hall is the dominant subject;
- no people;
- no presentation-board UI or baked metadata;
- no visible TAIJIFU wordmark;
- no invented Ω1/HNK;
- no visible yin-yang floor emblem;
- no calligraphy/banner system;
- exterior landscape is secondary to the architecture;
- training floor, racks and equipment read as functional rather than ceremonial.

## Authority boundary

This candidate is Presentation-layer media only. Passing generation review does not make it approved and does not make it canonical.

The binary is currently a conversation/tool artifact rather than a durable repository asset. The available GitHub connector in this session can create/update UTF-8 repository files but cannot upload this local PNG binary through the repository contents API. Therefore no fake `sourcePath` and no `MediaAsset` registry row are created yet.

## Promotion gate

When the exact binary identified by the SHA-256 above is persisted to a durable repository path (target family: `apps/interactive-web/public/media/`), then:

1. verify the persisted binary matches SHA-256 `17d044352cfad7530c9018d5d46cda69a2ae55ef4b7b38c3e8dc721e13c059b1`;
2. add a P02 `MediaAsset` row with truthful `sourcePath` and the provenance above;
3. keep `humanApproval: pending` until an explicit human approval event;
4. keep `deterministicBrandAssetsComposited: false` unless authoritative brand assets are actually composited later;
5. keep `isCanonicalMaster: false` permanently.
