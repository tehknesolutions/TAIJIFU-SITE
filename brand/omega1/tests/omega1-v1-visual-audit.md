# TAIJIFU Ω1 — Vector Candidate V1 Visual Audit

**Candidate:** `brand/omega1/construction/omega1-vector-v1.svg`
**Status:** FAIL — DO NOT PROMOTE TO MASTER
**Audit date:** 2026-09-23

## Render inspection

V1 was rendered from its SVG geometry for optical inspection.

## Findings

### 1. Silhouette overload — FAIL
The current candidate has too many equally strong strokes competing in the same central field. At normal and reduced size the result reads as a dense knot rather than a single memorable Taijifu mark.

### 2. Hierarchy — FAIL
The martial vertical axis exists, but does not dominate cleanly because the diamond, multiple curves, horizontal bar, lower bowl and diagonals carry similar visual weight.

### 3. Portal / Flow — FAIL
The intended incomplete circular adaptive gesture is not visually isolated. Multiple overlapping loops create accidental closed masses instead of one controlled flow gesture.

### 4. Origin archaeology — FAIL
Source-glyph ancestry is being exposed too literally through additive strokes. Canon requires archaeology: source traces should be discoverable in the synthesis, not appear as a pile of glyph fragments.

### 5. Nexus — PARTIAL
The central axis and nucleus concept are present, but the nexus lacks negative-space discipline.

### 6. Small-size behavior — FAIL BY INSPECTION
At micro scale, internal apertures will collapse and the center becomes a dark blob. V1 is not suitable for favicon/app-icon derivation.

### 7. Canonical direction retained
The following concepts remain valid and should be carried into V2:
- strong vertical martial axis;
- dynamic asymmetry;
- incomplete portal/flow;
- HNK genealogy;
- monochrome-first construction;
- ORIGIN × NEXUS × FLOW synthesis.

## V2 correction order

1. Reduce the number of visible primary gestures to three: **AXIS / PORTAL / FLOW**.
2. Convert the remaining HNK ancestry into junctions, terminals, curvature decisions and negative-space cuts rather than independent full-strength strokes.
3. Remove the full diamond as an explicit contour; retain only useful angular DNA.
4. Remove redundant lower bowl/horizontal competition.
5. Establish one clear nucleus and at least two deliberate negative-space apertures.
6. Rebalance line/shape weight so the vertical axis is primary, flow secondary and archaeological traces tertiary.
7. Test silhouette at 16, 24, 32 and 48 px before adding accent color.

## Gate result

`OMEGA1_V1_VISUAL_AUDIT = FAIL_EXPECTED_ITERATION`

This is a productive engineering failure: V1 proved that direct additive fusion of source geometry is too literal. V2 must synthesize the genealogy rather than stack it.
