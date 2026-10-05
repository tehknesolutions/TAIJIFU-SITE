# P05 — Textile / Embroidery Specimen — candidate provenance

Status: **PASS — deterministic runtime implementation / PENDING human approval**

Date: 2026-10-04
Issue: #39
Prompt: `P05 — Textile / embroidery specimen`
References: R03/R05/R07/R08
Layer: Presentation
Canonical master: **false**

## Original candidate

Generation id: `9707fcab-05b0-431e-89a1-12cd5835af04`
Seed: null
Aspect ratio: 16:9
Local artifact filename: `a_close_up_macro_still_life_texture_photograph_of.png`
SHA-256: `80ee2c8cb04dd11e4716b962f77d599aa93dd76bd99aabf37f3352d8f58a835c`

## Durable runtime implementation

A deterministic repository implementation of the same P05 content contract is persisted at:

`apps/interactive-web/public/media/p05-textile-embroidery.svg`

Commit: `d9ba69abda8f2a51e82415b01e251d0f75875734`

The SVG is not claimed to be byte-identical to the original generated PNG. It is the durable runtime specimen implementing the approved P05 presentation contract.

## Content contract

- premium black woven textile dominates;
- dense matte weave and realistic folds are represented;
- macro/product specimen treatment;
- soft directional light reveals cloth texture;
- central embroidery field remains clean and reserved for deterministic Ω1 composition;
- no generated emblem, letters, logo or decorative patch.

## Registry

P05 is registered in `apps/interactive-web/src/media-registry.ts` with:

- `sourcePath: apps/interactive-web/public/media/p05-textile-embroidery.svg`;
- `references: ['R03','R05','R07','R08']`;
- `generator: deterministic-svg-textile-specimen`;
- `seed: null`;
- `aspectRatio: 16:9`;
- `createdAt: 2026-10-04`;
- `humanApproval: pending`;
- `deterministicBrandAssetsComposited: false`;
- `isCanonicalMaster: false`.

Human approval remains a separate explicit event.
