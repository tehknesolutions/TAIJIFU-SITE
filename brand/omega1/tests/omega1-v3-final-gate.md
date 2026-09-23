# TAIJIFU Ω1 V3 — Final Technical Gate

**Candidate:** `omega1-vector-v3.svg`
**Micro candidate:** `omega1-micro-v1.svg`
**Status:** TECHNICAL GATE PASS / MASTER PROMOTION READY

## Fresh render verification

12 fresh raster renders were generated for this gate:

### V3 standard
- mono: 128 / 48 / 32 px
- reverse: 128 / 48 / 32 px

### MICRO V1
- mono: 32 / 24 / 16 px
- reverse: 32 / 24 / 16 px

The standard and reverse variants preserve the same geometry; only foreground/background polarity changes.

## Results

- V3 128 px: PASS
- V3 48 px: PASS
- V3 32 px: PASS as lower bound for standard mark
- MICRO 32 px: PASS
- MICRO 24 px: PASS
- MICRO 16 px: PASS as dedicated micro silhouette
- Reverse polarity: PASS at all tested target sizes
- Monochrome dependency: PASS; no gradient, glow, shadow or raster effect is required
- Open portal: preserved
- AXIS / PORTAL / FLOW hierarchy: preserved
- HNK genealogy: covered by `OMEGA1-HNK-CONSTRUCTION-PROOF.md`

## Responsive rule

- `>= 32 px`: standard Ω1 master
- `< 32 px`: Ω1 MICRO master

The MICRO asset is not a replacement logo; it is an optical-size master belonging to the same identity system.

## Deterministic test-source hashes

- V3 test source SHA-256: `5d02eb442e1d137e2497f02c8375978bcd51040984bd2bc2690319e93a363e52`
- MICRO test source SHA-256: `c5484a87c553d82e2e586b1d97e678e5e86b3d491ce053db1abcd544b199fa64`

## Gate verdict

The technical gates required before vector-master promotion are satisfied for V3 + MICRO V1.

Promotion may now copy/freeze these geometries into `brand/omega1/master/` while retaining construction candidates as historical evidence.
