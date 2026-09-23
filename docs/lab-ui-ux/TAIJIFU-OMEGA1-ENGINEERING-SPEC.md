# TAIJIFU Ω1 — Engineering Specification

**Branch:** `brand/omega1-engineering`
**Status:** WORKING SPEC — CANON-PRESERVING
**Parent canon:** `TAIJIFU-OFFICIAL-LOGO-OMEGA1.md`

## 1. Objective

Transform the approved Ω1 visual identity into a deterministic production brand system without changing its canonical DNA.

The raster presentation is a visual reference. Production masters must be vector-first and reproducible.

## 2. Immutable DNA

`C-D-D-D-C-D-D`

Construction ancestry:

`G22 · G01 · G03 · G36 · G03 · G25 · G05`

Reading principle:

> First glance: TAIJIFU.  
> On study: HNK is inside it.  
> On decomposition: the seven source glyphs.

## 3. Ω1 anatomy

Ω1 must preserve simultaneously:

- a strong martial vertical axis;
- an incomplete dynamic circular/portal gesture;
- asymmetric but balanced mass distribution;
- controlled human/brush gesture over geometric construction;
- identifiable central nucleus;
- four semantic accent loci;
- silhouette integrity at small scale;
- archaeological relationship to the seven HNK glyphs.

The final symbol must not become a literal pile of seven glyphs.

## 4. Construction layers

### L0 — Source glyphs

Seven ordered HNK units:

1. G22 — T
2. G01 — A
3. G03 — I
4. G36 — DJ / JI
5. G03 — I
6. G25 — F
7. G05 — U

### L1 — Skeleton

Normalize the source glyphs into a common construction field. Extract axis, dominant curves, intersections, terminals and directional gestures.

### L2 — Nexus

Resolve the martial vertical axis, central nucleus and portal geometry.

### L3 — Flow

Introduce the adaptive incomplete circular gesture and controlled asymmetry.

### L4 — Origin

Retain archaeological traces of the source glyph genealogy without sacrificing recognition.

### L5 — Ω1 master

Optically correct the synthesis into one coherent mark. Geometry may be mathematically derived but optical correction is permitted where necessary for visual balance.

## 5. Master coordinate system

Use a normalized square master canvas:

- viewBox: `0 0 1000 1000`
- optical center: `(500, 500)`
- principal martial axis: `x = 500`
- nominal safe construction field: `100..900`
- outer portal reference radius: `360`
- nucleus reference radius: `48`

These are engineering starting values, not permission to alter the approved silhouette. Final coordinates must be documented after vector tracing/construction.

## 6. Stroke and shape policy

Production master should prefer closed vector shapes over runtime strokes.

Required characteristics:

- geometric continuity;
- no accidental cusps;
- no self-intersections that break fill rules;
- terminal variation must appear intentional;
- human gesture is controlled, never distressed/grunge;
- no glow, bevel, shadow or raster effect in the canonical master.

Effects belong to presentation layers, never to the logo geometry.

## 7. Color architecture

Ω1 is canonically valid in one color.

Semantic accents are optional and occupy four predetermined structural loci:

- TAI — red;
- JI — blue;
- FU — gold/yellow;
- Integration/Survival — green.

The exact production HEX/RGB/CMYK/Pantone-equivalent values remain a separate color-calibration gate. Until calibrated, applications must not treat provisional screen colors as canonical print values.

## 8. Required production variants

1. `omega1-master.svg` — canonical one-color vector.
2. `omega1-accent.svg` — four semantic accents.
3. `omega1-reverse.svg` — reversed/light-on-dark.
4. `omega1-micro.svg` — optically simplified small-size mark.
5. `taijifu-lockup-horizontal.svg`.
6. `taijifu-lockup-vertical.svg`.
7. `taijifu-hnk-signature.svg`.
8. favicon family.
9. app-icon family.
10. seal/embroidery master.

## 9. Responsive logo behavior

### Large / ceremonial

Ω1 + TAIJIFU wordmark + HNK signature may appear together.

### Standard

Ω1 + TAIJIFU wordmark.

### Compact

Ω1 only.

### Micro

Use the dedicated micro master. Do not merely scale the ceremonial construction until details disappear.

## 10. Clear space

Define `N` as the final diameter of the Ω1 central nucleus.

Initial clear-space rule:

- normal applications: minimum `2N` around the complete mark;
- compact UI: minimum `N`;
- ceremonial applications may exceed `3N`.

Final Brand Book must test and freeze these values against the completed vector master.

## 11. Prohibited transformations

Do not:

- stretch or skew;
- close the adaptive portal merely to make a conventional circle;
- mirror the mark;
- rotate it as decoration;
- replace canonical accent loci with arbitrary rainbow coloring;
- apply gradients as part of the master identity;
- use neon/glow as intrinsic logo geometry;
- redraw the HNK genealogy with invented glyphs;
- substitute generic yin-yang, enso or martial-arts symbols;
- remove the dynamic asymmetry;
- expose all seven glyphs simultaneously in the everyday isotipo.

## 12. HNK reveal motion

Official motion identity may use this sequence:

`G22 → G01 → G03 → G36 → G03 → G25 → G05 → convergence → Ω1`

The animation must communicate construction/revelation rather than magical particle spectacle. The final resting frame is always the canonical Ω1 mark.

## 13. Site/App token contract

Planned semantic tokens:

```css
--taijifu-ink
--taijifu-paper
--taijifu-tai
--taijifu-ji
--taijifu-fu
--taijifu-integration
--taijifu-metal
--taijifu-space-logo
--taijifu-radius-mark
```

Values are frozen only after color/material calibration.

## 14. Validation gates

A production candidate cannot be called `MASTER` until it passes:

- source-glyph genealogy review;
- silhouette comparison against approved Ω1;
- black-only test;
- white-only/reverse test;
- 16/24/32/48 px UI test;
- favicon test;
- embroidery/single-thread simulation;
- laser/engraving simulation;
- monochrome print test;
- four-accent semantic test;
- horizontal/vertical lockup test;
- HNK reveal/decomposition audit.

## 15. Repository target structure

```text
brand/
  omega1/
    master/
    variants/
    construction/
    hnk/
    icons/
    lockups/
    tests/
  tokens/
docs/
  brand/
  lab-ui-ux/
```

## 16. Current gate

**ENGINEERING SPEC LOCKED FOR IMPLEMENTATION.**

Next implementation milestone: construct the first deterministic Ω1 vector candidate and its construction proof, then validate it against the approved visual reference before promoting any file to `MASTER`.
