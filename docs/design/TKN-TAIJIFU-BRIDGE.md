# TKN → TAIJIFU Design Bridge

Status: normative integration contract

## Purpose

TAIJIFU does not create a competing visual engine beside TKN. TKN supplies the reusable design grammar; TAIJIFU supplies its own canon, world, pedagogy, martial identity and experience.

## 1. Universal TKN grammar

TAIJIFU may inherit these system-level capabilities without inheriting Tehkné-site content:

- semantic design tokens and governed energy/color roles;
- canonical surface/material primitives rather than page-local repainting;
- motion as semantic state with reduced-motion parity;
- spatial composition and depth as information architecture;
- glyph/symbol primitives;
- environment-driven presentation;
- responsive/accessibility contracts and regression gates.

These are grammar, not Taijifu canon.

## 2. Adaptable TKN language

The following TKN advances are references/patterns to adapt, not assets to copy blindly:

### Mandala

Use as a relational/spatial system: geometry can express connections, progression, state, energy and navigation. In TAIJIFU it must derive from Taijifu relationships and canon, not decorative occultism.

### Arcane / environmental composition

Use the principle of environment + material + energy + geometry to give concepts spatial presence. TAIJIFU environments remain Dojo/martial/canonical environments.

### Glyphs

Use a governed symbolic primitive where a Taijifu concept genuinely has a canonical symbol. Do not manufacture symbols merely to fill UI.

### Hero composition

TKN's mature hero grammar demonstrates how multiple conceptual environments can remain members of one coherent system. TAIJIFU may reuse the compositional grammar while keeping its own hierarchy and content.

## 3. TAIJIFU-exclusive canon

The following remain owned by TAIJIFU and must not be reinterpreted merely to fit a TKN component:

- TAI · JI · FU;
- Fundamentos and their canonical relationships;
- martial arts, techniques, training and progression;
- history and lineage;
- Dojo and Taijifu environments;
- Taijifu terminology, symbols, routes and educational structure;
- official Taijifu media and narrative.

## 4. Non-negotiable TAI · JI · FU rule

TAI, JI and FU are one structural unit of three equivalent parts.

- TAI = JI = FU in structural visual prominence.
- Current route is location, not conceptual importance.
- A current TAI/JI/FU route must not demote its two peers.
- Hover, keyboard focus or selection may create temporary interaction feedback, but must not redefine the trio's canonical hierarchy.
- At rest the trio returns to visual equivalence.

## 5. State model

Separate semantic dimensions instead of overloading one visual hierarchy:

- `location`: where the visitor currently is;
- `attention`: what the visitor is temporarily inspecting;
- `structure`: canonical importance/relationship;
- `energy`: governed TKN/Taijifu semantic presentation state;
- `environment`: presentation context.

`location` MUST NOT silently mutate `structure`.

## 6. Implementation direction

Before adding new bespoke Three.js styling, evaluate whether the requirement belongs to an existing TKN grammar primitive. Taijifu-specific implementation should be introduced only when the concept is genuinely Taijifu-exclusive or the TKN primitive cannot express it without violating canon.

Target flow:

`TAIJIFU Canon → structural model → TKN grammar → Taijifu materialization → Web/Three presentation`

Not:

`page-specific styling → isolated Three effect → new local visual rule`

## 7. Immediate migration priorities

1. Audit existing Taijifu Three/CSS presentation against TKN tokens, surfaces, motion and environment grammar.
2. Remove visual-state logic that confuses route location with canonical hierarchy.
3. Preserve TAI · JI · FU peer symmetry across HTML, legend, Three and media presentation.
4. Map Mandala-like relational geometry only from canonical Taijifu relationships.
5. Introduce shared primitives incrementally with regression tests; do not rewrite working canonical/navigation layers merely for aesthetic convergence.

## Decision

**TKN supplies the grammar. TAIJIFU supplies the world.**

The bridge exists to make the ecosystem visually/systemically coherent without turning Taijifu into a skin of the Tehkné site.