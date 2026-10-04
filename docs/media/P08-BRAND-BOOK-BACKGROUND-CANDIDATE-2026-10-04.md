# P08 — Brand Book Background Plate — candidate provenance

Status: **PASS — content/texture gate / PENDING human approval**

Date: 2026-10-04
Issue: #39
Prompt: `P08 — Brand Book background plate`
References: none specified by the Prompt Library
Layer: Presentation
Canonical master: **false**

## Candidate

Original procedural raster artifact:

- generation method: deterministic procedural raster texture;
- seed: `20261004`;
- aspect ratio: 16:9;
- dimensions: 1600x900;
- local filename: `P08-brand-book-background-procedural.png`;
- SHA-256: `d91ab3254fdeef22c155fc6637e36c77105fb572ef3c53fb8335403cd0712006`.

Durable repository presentation asset:

- sourcePath: `apps/interactive-web/public/media/p08-brand-book-background.svg`;
- generator: `deterministic-svg-mineral-texture`;
- seed: `20261004`;
- aspect ratio: 16:9;
- commit: `b2c8622ed26bd78c2df853c4a984645d441a4ce0`.

The SVG is a deterministic repository implementation of the same P08 visual contract. It is not claimed to be the byte-identical PNG above.

## Content review

The durable SVG satisfies the P08 contract:

- near-black mineral-paper-like field;
- subtle tonal/fiber-scale variation;
- flat base illumination;
- no text;
- no symbols;
- no logos;
- no UI;
- no people;
- no vignette;
- suitable as restrained editorial Brand Book background.

Earlier cinematic stone/landscape attempts were rejected because they introduced scene elements, strong directional lighting, rocks/foliage and non-paper environmental composition.

## Registry state

The durable SVG is registered as presentation media with `humanApproval: pending` and `deterministicBrandAssetsComposited: false`.

This does not constitute human approval and `isCanonicalMaster` remains permanently false.
