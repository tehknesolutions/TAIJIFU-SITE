# TAIJIFU Ω1 V2 — Optical Audit

**Candidate:** `brand/omega1/construction/omega1-vector-v2.svg`
**Status:** PARTIAL PASS / REFINEMENT REQUIRED
**Test sizes:** 1024, 128, 48, 32, 24, 16 px

## What improved versus V1

V2 successfully reduces the identity to three dominant gestures: AXIS, PORTAL and FLOW. The silhouette is substantially cleaner and the central knot/noise problem of V1 is removed.

## Size audit

- **1024 px:** PASS for structural readability. Axis, open portal and flow are independently legible.
- **128 px:** PASS. Overall silhouette remains recognizable.
- **48 px:** PASS WITH NOTES. Three-gesture hierarchy remains visible, but the top axis/chevron begins to compact visually.
- **32 px:** CONDITIONAL PASS. Main silhouette survives; nucleus and crossing relationships begin to merge.
- **24 px:** FAIL for canonical standard master. The central nucleus/crossing and terminal relationships become too dense for a clean UI mark.
- **16 px:** FAIL for standard master. Requires a dedicated micro master as already required by the engineering specification.

## Optical findings

1. The open portal is now readable and should remain open.
2. The FLOW gesture has enough independence to communicate adaptation, but its lower terminal competes with the axis terminal at small sizes.
3. The top chevron + top dot + vertical axis create unnecessary micro-detail below 32 px.
4. The nucleus is useful at large sizes but must be optically simplified or removed in the micro variant.
5. V2 is not promoted to MASTER because 24/16 px are not clean and the canonical genealogy proof has not yet been completed.

## V3 directives

- preserve AXIS + PORTAL + FLOW architecture;
- reduce top-terminal complexity;
- separate lower FLOW termination from AXIS termination;
- tune stroke hierarchy rather than adding geometry;
- preserve asymmetry and open portal;
- create a separate MICRO candidate for 24/16 px rather than destroying the ceremonial/standard Ω1 geometry;
- complete source-glyph construction proof before MASTER promotion.

## Gate result

`V2 = OPTICAL BASE ACCEPTED, MASTER REJECTED.`

Proceed to **Ω1 V3 — Optical Refinement** plus **Ω1 MICRO V1**.
