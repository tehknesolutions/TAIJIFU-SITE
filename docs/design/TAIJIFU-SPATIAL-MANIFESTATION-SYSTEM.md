# TAIJIFU Spatial Manifestation System

Status: architecture proposal grounded in the TKN → TAIJIFU bridge

## Purpose

Define the next architectural layer for the official Taijifu interactive experience without inventing new Taijifu Canon.

The system separates:

- Canon: what Taijifu means;
- relational model: how canonical concepts relate;
- spatial model: how those relationships can be represented geometrically;
- manifestation: how TKN grammar presents that model;
- consumer: Web, Three and media presentation.

## Source hierarchy

1. TAIJIFU Canon is authoritative for Taijifu meaning.
2. TKN is the manifestation grammar and design-system layer.
3. Renderer/consumer code is not a source of Canon.
4. HNK/CODEX geometry may only be consumed where an explicit Taijifu/HNK relationship is established; it must not be silently imported as Taijifu meaning.

## Core pipeline

`TAIJIFU CANON → RELATIONAL MODEL → SPATIAL MODEL → TKN MANIFESTATION → WEB / THREE`

## Relational model

The current interactive experience already represents canonical nodes with:

`id + label + canonicalUrl + parentId`

This model should remain canonical-data-oriented.

Future spatial metadata should be introduced as a derived representation rather than mixed into canonical navigation data.

Conceptual separation:

`CanonicalNode → RelationGraph → SpatialProjection`

## Spatial model

The spatial layer may express:

- canonical relationships;
- navigation;
- progression;
- training structure;
- states and transitions;
- orientation.

It must not assign semantic importance merely because an object is visually larger, closer, brighter or deeper.

### TAI · JI · FU invariant

TAI, JI and FU remain one structural triad.

`location ≠ structure`

`attention ≠ importance`

`intensity ≠ rank`

A route state may identify where the visitor is. A focus state may identify what the visitor is inspecting. Neither may demote the other members of the triad.

## Manifestation layer

TKN ARCANE establishes a reusable distinction between canonical geometry and manifestation intensity:

- SIGNAL;
- ARTIFACT;
- RITUAL.

For Taijifu these are implementation/experience states, not new Canon categories.

Manifestation may change:

- atmosphere;
- material;
- depth;
- motion;
- geometry visibility;
- density.

Manifestation must not change:

- canonical identity;
- canonical relationships;
- canonical terminology;
- TAI/JI/FU structural equivalence.

## Mandala direction

A future Taijifu Mandala must be derived from the Taijifu relational model.

It is therefore a projection of relationships, not a decorative background.

No Taijifu Mandala topology is declared canonical by this document.

Do not import HNK Mandala constants, paths or glyph topology merely because they are technically available. Such reuse requires an explicit Canon/provenance decision.

## Glyph direction

The TKN ARCANE architecture establishes:

`one canon → one renderer → multiple manifestations`

Taijifu should follow the same engineering principle.

A canonical Taijifu symbol, when one exists, should be represented once and manifested through governed presentation modes.

A derived visual motif must not be promoted to a canonical Taijifu glyph by implementation alone.

## Renderer boundary

Three.js remains a consumer.

The renderer may:

- project spatial data;
- animate semantic states;
- provide focus/attention feedback;
- materialize TKN surfaces and environments;
- provide progressive atmosphere.

The renderer must not:

- invent canonical relationships;
- infer canonical importance from focus;
- encode hidden Canon in arbitrary geometry;
- make visual effects required for comprehension.

## Accessibility and degradation

TKN ARCANE's progressive-enhancement principle applies:

- full;
- reduced;
- static.

When atmosphere or WebGL is disabled, canonical content, navigation and semantic relationships must remain understandable.

## Implementation sequence

### Phase 1 — relational audit

Inventory the existing Taijifu canonical nodes and explicit relationships.

### Phase 2 — spatial projection contract

Define a derived projection schema without changing Canon data.

### Phase 3 — TKN manifestation adapter

Map spatial states to governed TKN primitives: surface, energy, environment, glyph and motion.

### Phase 4 — Mandala candidate

Generate a deterministic relational visualization from the projection schema.

Do not freeze a topology until the source relationships justify it.

### Phase 5 — Three consumer

Move Three toward consuming the derived projection rather than embedding semantic assumptions in visual code.

### Phase 6 — visual QA

Validate:

- TAI/JI/FU peer symmetry;
- canonical navigation;
- focus/attention behavior;
- reduced motion;
- static fallback;
- responsive composition;
- absence of semantic drift.

## Non-goals

This document does not:

- define new Taijifu Canon;
- define a Taijifu Mandala topology;
- declare new Taijifu glyphs;
- import HNK Mandala constants as Taijifu constants;
- prescribe a new visual hierarchy for TAI/JI/FU;
- replace the existing canonical route model.

## Architectural decision

The next Taijifu visual evolution should be built as a **derived spatial manifestation system**, not as a collection of page-specific Three effects.

TKN supplies the manifestation grammar.

Taijifu supplies the world and meaning.
