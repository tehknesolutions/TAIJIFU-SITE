# TAIJIFU Visual Reference Map

This document maps the eight supplied visual boards into the official authority model. The images are references/evidence; the repo Canon and Ω1 documents remain authoritative.

## R01 — `taijifu-site-design-oficial`
**Role:** Web North Star.
**Extract:** cinematic dojo threshold; black/wood environment; centered monumental Ω1; TAIJIFU title; subtitle; flanking maxims; TAI/JI/FU row; gold-outline Dojo CTA; provenance/footer; sparse ceremonial header.
**Components:** `SiteHeader`, `DojoGateHero`, `PrincipleTriad`, `DojoThreshold`, `ProvenanceFooter`, `ScrollCue`.
**Keep:** hierarchy, ceremony, environmental depth, restrained UI chrome.
**Do not copy literally:** raster text, generated glyphs, logo geometry, exact colors.

## R02 — `Dojo Cinematográfico TAIJIFU`
**Role:** environment/media direction.
**Extract:** architectural frame as portal; mountain/water vista; low warm natural light; timber; floor reflection; banners; lanterns; foreground depth.
**Components/patterns:** `HeroMedia`, `DojoEnvironment`, `ThresholdFrame`.
**Constraint:** environmental photography sits behind deterministic HTML/brand layers.

## R03 — `Painel de Identidade TAIJIFU`
**Role:** Ω1 synthesis/application board.
**Extract:** ORIGIN/NEXUS/FLOW ancestry; Ω1 synthesis; monochrome and four semantic states; wordmark; HNK construction; app/uniform/site applications.
**Components:** `Omega1*`, `HnkSignature`, `AncestralStateDiagram`, application specimens.
**Conflict resolution:** ORIGIN/NEXUS/FLOW are genealogy, never primary logos.

## R04 — `Painel de identidade TaiJiFu Lab`
**Role:** ancestral comparison.
**Extract:** ORIGIN = root/editorial/genealogy; NEXUS = axis/portal/convergence; FLOW = movement/adaptation/equilibrium; shared construction and application rows.
**Use:** Brand Book anatomy and motion-story documentation.
**Do not ship:** three selectable brand identities.

## R05 — `Guia de Marca TAIJIFU: Três Caminhos, Um DNA`
**Role:** consistency matrix.
**Extract:** three columns compare mark behavior across monochrome, semantic accents, type, HNK signature, app, textile and hero media.
**Use:** validation matrix for `Omega1Mark`, app icon, seal, embroidery and hero presentation.

## R06 — `Painel de Identidade Taijifu: Seis Caminhos`
**Role:** divergence archive.
**Extract:** six stylistic hypotheses: tradition, HNK nexus, editorial legacy, adaptive flow, techno-human, minimal essential.
**Decision:** these become a decision/rejection record. Useful traits may be synthesized, but no theme switcher or six-brand system is created.
**Preferred extracted traits:** solemnity/respect; unique HNK structure; editorial depth; movement/adaptation; contemporary clarity; legibility.

## R07 — `Painel de DNA da Marca TAIJIFU`
**Role:** production/application evidence.
**Extract:** logo construction from seven HNK glyphs; palette intent; horizontal/isolated marks; hero/site; app; kimono; seal/paper; positioning statement; ecosystem signature.
**Components:** construction specimen, `AppIconApplication`, `UniformApplication`, `SealApplication`, ecosystem lockup documentation.
**Constraint:** glyph IDs and Ω1 geometry come from canonical engineering docs, not raster tracing by eye.

## R08 — `Painel de Identidade TAIJIFU em Ouro e Ônix`
**Role:** premium editorial/material direction.
**Extract:** onyx field; ivory typography; ritual gold; vital red; sparse rules; chapter numbering; Japanese-influenced editorial composition; textile/seal/app/site applications.
**Use:** ceremonial surface and material tokens after calibration.
**Constraint:** does not replace canonical TAI/JI/FU/Integração semantic colors.

# Cross-reference synthesis

## Repeated signals (high confidence)
- near-black/charcoal primary field;
- warm ivory text;
- restrained gold/metal ceremonial emphasis;
- semantic red/blue/gold/green;
- large Ω1/isotipo focal point;
- serif display + tracked sans metadata;
- fine rules and disciplined grid;
- martial/landscape environmental imagery;
- textile, seal, app and engraving applications;
- HNK genealogy as hidden construction logic;
- premium restraint rather than dense UI decoration.

## Signals that remain reference-only
- exact raster logo curves;
- exact generated Japanese/HNK characters unless independently canonical;
- exact HEX values shown in boards;
- image-generated typography;
- metallic bevel/glow as logo geometry;
- individual alternate logos from exploratory columns.

# Traceability IDs
Use `R01`…`R08` in component docs, issues, PRs and visual-regression metadata.