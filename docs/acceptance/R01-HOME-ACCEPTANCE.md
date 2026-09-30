# R01 Home — Acceptance Gate

Status: **implementation complete; visual acceptance pending final comparison**

This record separates what the repository can prove automatically from what requires visual comparison against the approved R01 reference.

## Implemented and repository-testable

- Ceremonial Dojo Gate with semantic TAIJIFU identity and canonical copy.
- TAI / JI / FU remain equal, real canonical route links.
- Presentation-only atmosphere is isolated from Canon and brand calibration.
- Environment is failure-safe and independent from remote runtime media.
- Compact/mobile composition preserves the R01 information hierarchy.
- Touch targets and `prefers-reduced-motion` behavior are explicit.
- `ENTRAR NO DOJO`, header entry, and continuation cue hand off to `#interactive-experience`.
- Handoff reuses the existing Experience Graph runtime and focuses canonical node `taijifu`.
- Ω1 geometry, canonical calibration values, content registry, routes, and Experience Graph authority are not redefined by the R01 presentation layer.

## Repository-owned R01 reference

The approved visual reference is now represented in the repository at:

`docs/acceptance/assets/r01-home-reference.jpg`

The committed asset is a faithful 768×512 JPEG derivative used for repository comparison and provenance. The source supplied in the project conversation was 1536×1024 PNG with SHA-256:

`22e815ab5b3784825d17428526bacd98880a7fd77d2fb12be31b50fc7cb726af`

The derivative is intentionally treated as a **reference asset**, not as Canon or a production background image.

## Visual acceptance — pending final comparison

Now that the reference is repository-owned, final acceptance requires comparison of:

1. desktop threshold composition and hierarchy;
2. Ω1 apparent scale and central placement;
3. dojo depth, threshold/wood warmth, light falloff, and background balance;
4. TAI / JI / FU spacing and visual equality;
5. CTA placement and emphasis;
6. maxims and provenance placement;
7. compact/mobile hierarchy as an adaptation rather than a crop;
8. focus, reduced-motion, and failure-safe states.

The R01 screenshot must not be used as a single production background because it contains text and interface elements. Production remains semantic HTML/CSS plus repository-owned presentation assets.

## Acceptance rule

> **FUNCTIONAL / STRUCTURAL ACCEPTANCE: ELIGIBLE**
>
> **R01 REFERENCE: VERSIONED**
>
> **VISUAL R01 PARITY: PENDING FINAL COMPARISON**

No external deployment provider is authoritative for Canon or visual acceptance. CI/deployment failures caused by provider quotas or build-rate limits must be recorded separately from code/test failures.

## Traceability

R01 Home implementation sequence:

- Presentation Layer — PR #81
- Failure-safe environment — PR #83
- Mobile + reduced motion — PR #84
- Experience Graph handoff — PR #85
- Desktop visual calibration — PR #87
- Reference asset + provenance — current PR

Primary planning/traceability issues: #75 and #78.
