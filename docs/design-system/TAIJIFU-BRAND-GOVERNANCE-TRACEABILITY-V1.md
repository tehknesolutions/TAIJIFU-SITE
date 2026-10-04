# TAIJIFU — Brand Governance & Traceability v1

**Status:** GOVERNANCE / PRE-MASTER  
**Parent:** #33 / #40  
**Purpose:** provide one navigable authority map without promoting missing production artifacts to MASTER.

## Authority chain

`CANON + Ω1` → `R01 North Star Web` → `R02–R08 reference synthesis` → `Design System` → `implementation`

### Tier C — immutable identity authority
- `docs/lab-ui-ux/TAIJIFU-OFFICIAL-LOGO-OMEGA1.md`
- `docs/lab-ui-ux/TAIJIFU-OMEGA1-ENGINEERING-SPEC.md`
- current Canon documents

### Tier A — Web North Star
- `docs/design/R01-HOME-NORTH-STAR.md`

### Tier B — reference synthesis
- `docs/design-system/TAIJIFU-VISUAL-REFERENCE-MAP.md`
- R02–R08 are evidence/reference material; they cannot create alternate canonical identity.

## Traceability matrix

| Reference / authority | Role | Production implication | Current gate |
|---|---|---|---|
| Canon | immutable content/identity authority | canonical data/content | governed |
| Ω1 Canon | official mark | deterministic production asset | #199 |
| Ω1 Engineering Spec | construction/validation contract | SVG variants + tests | #199 |
| R01 | Web presentation North Star | Dojo Gate composition | #78 / #198 |
| R02 | environment/media direction | Dojo environment | #39 |
| R03 | Ω1 synthesis/application evidence | identity applications | #199 / #40 |
| R04 | ancestral comparison | Brand Book documentation | #40 |
| R05 | consistency matrix | application validation | #40 |
| R06 | divergence archive | rejection/decision record | #40 |
| R07 | production/application evidence | specimens | #40 |
| R08 | premium material direction | presentation/material tokens | color gate |
| Visual Prompt Library | media production contract | generated presentation media | #39 |
| Design System v1 | implementation authority | tokens/primitives/components | #33 |

## Non-promotion rules

- Reference boards do not become logos.
- Raster reference colors do not become print canon.
- Generated media does not become Ω1/HNK master.
- A vector candidate is not a MASTER until the Ω1 validation gates pass.
- R01 is presentation/product authority, not a new martial Canon.
- Semantic HTML remains authoritative over canvas/media.

## Regression matrix

Required future snapshots:
- desktop;
- tablet;
- mobile;
- reduced-motion;
- no-media/fallback.

Each snapshot must identify:
- commit;
- viewport;
- media state;
- reduced-motion state;
- reference ID;
- approval status.

## Current blockers

1. **#199** — deterministic Ω1 vector candidate/master pipeline.
2. **#198** — immutable R01 binary artifact.
3. **Color calibration** — exact production values remain unfrozen.

## Exit condition

Brand governance is complete when the repository can trace:

`reference → decision → authority tier → component → implementation → regression evidence`

without reconstructing the chain from chat history.

This document does not claim #199, #198 or color calibration complete.
