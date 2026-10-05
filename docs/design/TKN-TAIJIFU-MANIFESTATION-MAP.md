# TKN → TAIJIFU Manifestation Map

Status: normative design mapping

## Principle

TKN is the manifestation grammar. TAIJIFU remains the Canon.

The Taijifu implementation must not copy Tehkné content, ZARENU topology, or TKN environments as if they were Taijifu canon. It may consume the underlying system concepts when they preserve Taijifu identity.

## Layer map

| TKN layer | TAIJIFU application | Rule |
|---|---|---|
| Canon | Taijifu Canon | Source of truth for meaning and relationships |
| Geometry | Taijifu spatial/relational model | Deterministic geometry may visualize canonical relationships |
| Glyph | Taijifu canonical symbols | Only symbols supported by Taijifu Canon |
| Energy | Taijifu semantic energy/state roles | Must not silently reuse TKN brand-energy meaning |
| Environment | Dojo / Taijifu environments | TKN environment grammar may inform composition, not content |
| Surface | Taijifu material presentation | Consume governed TKN surface primitives where compatible |
| Manifestation | Signal / Artifact / Ritual intensity | Intensity is presentation state, not conceptual rank |
| Motion | Taijifu semantic interaction | Motion must communicate state/progression, not decoration |
| Consumer | Web / Three / media | Materializes the model; does not redefine Canon |

## TKN concepts that are reusable as grammar

### Environment

TKN's environment model demonstrates that one identity can have distinct spatial/material contexts while remaining one system.

Taijifu may create its own environment set using the same contract:

`environment → surface → geometry → energy → motion`

Environment names and meanings must come from Taijifu Canon.

### Manifestation

TKN's `SIGNAL → ARTIFACT → RITUAL` hierarchy is an intensity/manifestation hierarchy.

For Taijifu:

- it may control visual density, geometry, atmosphere, motion and depth;
- it must never establish that TAI, JI or FU is more important than another;
- it must never replace semantic structure with visual intensity.

### Glyph

TKN's canonical-consumer pattern is:

`Canon glyph → manifestation mode → consumer`

Taijifu should follow the same pattern:

`Taijifu canonical symbol → manifestation mode → Web/Three`

A derived motif must never be presented as a canonical Taijifu symbol.

### Geometry

TKN separates canonical identity from deterministic geometry.

Taijifu should likewise separate:

`canonical relationship → spatial calculation → manifestation`

This is the intended foundation for future Taijifu Mandala work.

### Surface

TKN's governed surface/material model can be consumed where it does not alter Taijifu identity.

Do not introduce page-local material rules merely to create visual novelty.

## TAI · JI · FU invariant

TAI, JI and FU are one structural triad.

They are peers in:

- canonical importance;
- structural representation;
- default visual prominence;
- navigation semantics.

Interaction may expose:

- location;
- attention;
- focus;
- temporary manifestation intensity.

Interaction must not mutate canonical structure.

Therefore:

`location ≠ structure`

`attention ≠ importance`

`intensity ≠ rank`

## Mandala rule

The Taijifu Mandala must be derived from actual Taijifu relationships.

It should be treated as a spatial/relational engine rather than an ornamental background.

Potential uses include:

- relationships among canonical concepts;
- progression;
- navigation;
- training structure;
- states and transitions;
- spatial orientation.

No specific Mandala topology is declared canonical by this document. The topology must be derived from the Taijifu source model before implementation.

## Three-layer implementation contract

### 1. Canon layer

Defines:

- canonical concepts;
- names;
- relationships;
- symbols;
- progression;
- provenance.

### 2. Manifestation layer

Defines:

- signal/artifact/ritual intensity;
- environment;
- surface;
- energy presentation;
- motion;
- accessibility tier.

### 3. Consumer layer

Defines:

- HTML;
- CSS;
- Three;
- media;
- responsive composition.

Consumer code must not become the source of Canon.

## Immediate engineering rule

Before adding a bespoke Three effect, answer:

1. Is the requirement canonical?
2. Is there already a TKN primitive that expresses it?
3. If not, is it a Taijifu-specific primitive or merely decoration?
4. Does it preserve TAI · JI · FU peer symmetry?
5. Does reduced motion preserve the same semantic information?

If the answer is unclear, do not add the effect yet.

## Target architecture

`TAIJIFU CANON → RELATIONAL MODEL → TKN MANIFESTATION GRAMMAR → TAIJIFU MATERIALIZATION → WEB / THREE`

The objective is not to make Taijifu look like Tehkné.

The objective is to make Taijifu and the rest of the HNK ecosystem speak the same design-system language while remaining distinct products and canons.