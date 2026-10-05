# TAIJIFU Visual Regression Governance

Status: active execution contract
Tracker: #206
Parent: #40

## Baseline policy

Visual snapshots are release evidence, not a source of Canon or identity authority.

The current suite uses Playwright and keeps approved baselines under:
`apps/interactive-web/tests/visual/locale-matrix.spec.ts-snapshots/`

Seven baselines are currently approved:

- pt-BR: desktop, tablet, mobile, reduced-motion, no-media
- en: desktop
- es: desktop

The remaining eight combinations are explicitly represented as `pending` in the regression matrix. Pending scenarios are skipped by the visual test with an explicit reason; they are not silently treated as passing baselines.

## Required matrix

Every supported locale must eventually cover:

- desktop — 1440×1024
- tablet — 1024×1366
- mobile — 390×844
- reduced-motion — 1440×1024
- no-media — 1440×1024

Locales:

- pt-BR
- en
- es

## Promotion rule

A new screenshot baseline may be promoted only after visual review confirms:

1. Canon meaning and route identity are unchanged.
2. Ω1 and deterministic identity assets remain authoritative.
3. Layout is intentional at the target viewport.
4. Accessibility/focus behavior remains complete.
5. The locale does not leak another locale's copy.
6. The no-media and reduced-motion states remain complete.
7. The baseline is attributable to the reviewed commit.

Do not use snapshot regeneration as an automatic repair mechanism.

## Determinism gate

The current filenames contain the Playwright runner platform suffix (for example `-win32`). This is legacy evidence and is not yet considered cross-runner deterministic.

Before visual regression becomes a blocking GitHub gate, migrate approved baselines to a runner-independent snapshot naming strategy and verify them in GitHub Actions.

## GIP constraint

Visual verification must run through GitHub Actions with repository-controlled Playwright/Chromium dependencies. Vercel, local-only tooling and paid external visual-testing services are not required dependencies.

Failures must retain inspectable Playwright artifacts in CI.
