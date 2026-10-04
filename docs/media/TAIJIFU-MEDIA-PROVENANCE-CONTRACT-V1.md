# TAIJIFU — Media Provenance Contract v1

**Status:** IMPLEMENTATION CONTRACT / PRE-MASTER
**Parent:** #33 / #39
**Authority:** `docs/prompts/TAIJIFU-VISUAL-PROMPT-LIBRARY.md`

## Media families

### Dojo Environment
Architectural threshold, timber/stone, landscape, natural light and contemplative spatial atmosphere.

### Martial Landscape
Grounded human practice in real terrain; disciplined, believable and non-superhero.

### Material Application
Embroidery, seal, paper, app icon, garment and engraving specimens.

## Required provenance

Every generated media asset must record:
- prompt ID;
- source Rxx reference IDs;
- generator/model;
- seed when available;
- aspect ratio;
- creation date;
- human approval state;
- whether deterministic brand assets were composited afterward.

## Non-promotion contract

Generated media is presentation material only.

It must never:
- generate or replace Ω1;
- generate or replace HNK glyphs;
- contain authoritative UI copy;
- become a canonical diagram;
- silently define production color values.

Deterministic HTML/SVG assets remain authoritative for text, identity and UI.

## Fallback contract

Every media-dependent experience must remain usable with media disabled or unavailable.

The semantic page structure, navigation, CTA and canonical identity must not depend on a generated image being present.

## R-reference policy

R01–R08 identify reference authority and design intent. They do not authorize copying raster text, invented glyphs, alternate logos or exact pixel colors into production.

## Asset record template

asset_id:
family: dojo-environment | martial-landscape | material-application
prompt_id:
references: []
generator:
model:
seed:
aspect_ratio:
created_at:
human_approval:
deterministic_brand_composite: false
production_status: reference | candidate | approved

## Acceptance

An asset can be `approved` only when its provenance is complete, its role is classified, human approval is recorded, and its deterministic-brand boundary is explicit.