# Deterministic Visual Regression Capture — Design Spec

## Goal

Add a reproducible browser-based capture layer for TAIJIFU Brand Book v1 visual regression evidence without making screenshots a source of identity truth.

## Architecture

Playwright is the capture executor. The existing `visualRegressionMatrix` remains the source of scenario definitions and `visualRegressionEvidence` remains the evidence manifest. The executor consumes those contracts, starts from a deterministic browser state, visits the canonical `/` route, applies viewport and motion/media state, and captures the declared PNG evidence path.

The authority flow remains:

`Brand Book → regression matrix → capture executor → deterministic browser state → PNG evidence → explicit human approval`

A screenshot is evidence only. It never replaces Canon, Ω1, engineering contracts, R01–R08, tokens, components, or the prompt/media governance layers.

## Components

### Scenario contract

Existing `apps/interactive-web/src/visual-regression-contract.ts` owns the five required modes: desktop, tablet, mobile, reduced-motion, and no-media. Capture code must consume this contract rather than duplicate viewport or environment values.

### Evidence manifest

Existing `apps/interactive-web/src/visual-regression-evidence.ts` maps each scenario to a baseline PNG path and approval state. Capture code writes only to paths declared here. A capture must not automatically promote `pending-capture` to `captured` or `approved`; approval remains an explicit repository change after review.

### Playwright executor

Add Playwright as the browser automation dependency for `apps/interactive-web`. A dedicated visual-regression spec iterates the scenario matrix and configures viewport plus `prefers-reduced-motion` before loading the canonical route.

Media state is deterministic: `no-media` and the current unapproved-media scenarios use the product fallback. The executor must not bypass `media-runtime.ts` approval governance merely to make a screenshot richer.

### Application server

The executor runs against the built/served interactive web app, not mocked HTML. It must use the repository's normal Vite application so captures exercise the same HTML, CSS, media runtime, Canon UI, and spatial shell shipped by the product.

## Determinism

Each capture must:

- use the viewport from `visualRegressionMatrix`;
- emulate reduced motion from the scenario contract;
- use the canonical `/` route;
- wait for the document and stable UI state before capture;
- preserve the registry-governed media fallback/approval behavior;
- avoid timestamps, random values, generated identity, or test-only identity replacements;
- write only to the manifest-declared PNG path.

No-media is a first-class visual state, not an error case. Reduced-motion is independent from no-media even when both currently resolve to presentation fallback.

## Failure handling

A missing manifest entry is a contract failure, not a reason to invent a path. A browser startup or navigation failure fails the visual test. A screenshot difference fails comparison but does not automatically update the baseline. Baseline replacement is an explicit review action.

If optional presentation media is unavailable or unapproved, the application must remain on its deterministic CSS/asset fallback; the test executor must not patch around it.

## Testing

Keep Vitest unit tests for matrix/manifest governance. Add Playwright tests for browser-state application and screenshot comparison. The first implementation should cover exactly the five Brand Book scenarios; no additional route matrix is introduced in #40.

The visual runner must be invokable independently from ordinary unit tests so CI or local review can run it deliberately. Existing unit/type/build commands remain unchanged except for any minimal dependency/configuration needed by the visual runner.

## CI boundary

Do not make visual baselines authoritative through CI. CI may run the capture/comparison job and upload failure evidence, but it must never auto-approve or auto-rewrite baselines. Because the repository currently has an independent GitHub Actions runner-allocation issue, #40 must not disguise that infrastructure problem as an application-code failure.

## Acceptance

The design is implemented when:

1. Playwright can execute the five scenarios directly from the existing matrix.
2. Each scenario uses its declared viewport, motion state, media governance, route, and evidence path.
3. Baseline updates require an explicit reviewer action.
4. No-media and reduced-motion remain complete product states.
5. Vitest continues to protect the governance contracts while Playwright owns browser screenshot comparison.
6. Screenshots remain marked and treated as evidence-only throughout the system.
