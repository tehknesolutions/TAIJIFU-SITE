# TAIJIFU Ω1 — Canonical Brand Family Usage

**Authority:** `docs/lab-ui-ux/TAIJIFU-OMEGA1-ENGINEERING-SPEC.md` and `docs/design-system/TAIJIFU-OFFICIAL-DESIGN-SYSTEM-V1.md`.

## Optical sizes

- `16 px`: use `Omega1MicroMark` / MICRO geometry.
- `24 px`: use `Omega1MicroMark` / MICRO geometry.
- `32 px`: lower bound for the standard Ω1 master.
- `48 px`: standard Ω1 master.
- `Omega1Mark({ size })` switches to MICRO automatically below `32 px`.

## Clear space

The master nucleus has radius 28 in a 1000-unit viewBox, therefore `N = 56/1000` of the rendered mark size.
Normal applications reserve `2N` around the complete mark. Compact UI reserves `N`. Ceremonial applications may exceed `3N`.
The UI contract encodes normal as `0.112em` and compact as `0.056em` relative to the Ω1 size.

## Accessibility

Meaningful brand components expose `role="img"` with a concise `aria-label`. Decorative instances use `aria-hidden="true"` and do not create a duplicate accessible name. The embedded SVG is always hidden from the accessibility tree because the component wrapper owns the accessible name.

## Semantic accent loci

The four token-driven loci preserve canonical geometry: TAI = AXIS family, JI = PORTAL, FU = FLOW, Integration = NEXUS. Values come from `--tj-color-tai`, `--tj-color-ji`, `--tj-color-fu`, and `--tj-color-integration`; calibration remains external to geometry.

## Identity boundary

ORIGIN, NEXUS and FLOW are ancestral/genealogical documentation states; they are not production logos. Production identity uses the approved Ω1 family only. HNK signature order is `G22 · G01 · G03 · G36 · G03 · G25 · G05`.
