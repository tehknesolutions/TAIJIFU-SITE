# TAIJIFU Design System — Tokens & Editorial Primitives Spec

Status: proposed
Issue: #34 (child of #33)
Authority boundary: presentation system only

## 1. Goal

Create the reusable visual foundation for TAIJIFU Web so presentation is driven by one semantic token authority and a small set of editorial primitives, without coupling the design system to routes, Canon entities, curriculum semantics, or page-specific content.

The dependency direction is:

`design tokens → editorial primitives → TAIJIFU components → pages`

Dependencies MUST NOT point back from tokens or primitives into Canon, route IA, Experience Graph, curriculum snapshots, or page content.

## 2. Source-of-truth boundaries

`packages/design-tokens` is the technological authority for reusable semantic presentation tokens. It is not a new brand authority and MUST NOT redefine Ω1 geometry, Canon meaning, editorial content, or route semantics.

Existing approved brand assets remain authoritative for marks and geometry. Raster/reference boards are calibration evidence only: values sampled from them MUST NOT silently become official fixed color authority before the calibration gate is explicitly accepted.

## 3. Token model

The package MUST expose the same semantic vocabulary to TypeScript and CSS custom properties.

Required semantic families:

- color: `ink`, `paper`, `metal`, `tai`, `ji`, `fu`, `integration`;
- spacing: a compact monotonic scale suitable for page gutters, stacks, clusters, grids and component padding;
- typography: display, heading, body and meta roles plus reusable size/line-height/letter-spacing roles;
- motion: duration/easing roles and a reduced-motion-safe contract;
- mark-space: reusable clear-space and mark sizing roles for approved marks.

Token names describe meaning/role, not page names or screenshots. No token may be named after a route, specific curriculum entity, or one-off R01 coordinate.

CSS exports use a stable `--tj-` namespace. TypeScript exports are typed/read-only and represent the same semantic concepts as CSS.

## 4. Color calibration rule

Issue #34 explicitly forbids freezing raster-derived HEX values before calibration. Therefore initial implementation may reuse already-authorized repository values where authority is documented, or expose semantic aliases without claiming new brand-color authority.

A new literal color sampled only from a screenshot/reference raster requires a separate calibration decision before it becomes a design token.

## 5. Editorial primitives

The first primitive set is:

- `Container`
- `Stack`
- `Cluster`
- `Grid`
- `Rule`
- `Surface`
- `Eyebrow`
- `Display`
- `Heading`
- `Body`
- `Meta`
- `Button`
- `IconButton`
- `TextLink`
- `FocusRing`
- `MediaFrame`

Primitives are presentation infrastructure. They MUST NOT know about TAI/JI/FU content meaning, Canon IDs, route IDs, belts, paths, nuclei, Experience Graph nodes, or navigation policy.

Layout primitives own layout behavior only. Typography primitives own semantic text presentation only. Interaction primitives own reusable interaction states only. `MediaFrame` owns generic media framing and never selects official assets by itself.

## 6. Accessibility contract

Interactive primitives MUST provide a visible keyboard focus state. Focus treatment must remain perceivable against the supported paper/ink surfaces.

Text and interactive states target WCAG AA contrast. Semantic HTML is preferred over ARIA reconstruction. `Button` is for actions; `TextLink` is for navigation. `IconButton` requires an accessible name supplied by the consumer.

Motion tokens and consumers MUST honor `prefers-reduced-motion` and must not require animation to understand state or navigation.

## 7. Consumption contract

Consumers import tokens/primitives; they do not copy their values into route/page styles. Page-specific composition may add local presentation rules, but reusable semantic values belong in the token package.

The existing interactive Web may migrate incrementally. Issue #34 does not require a big-bang rewrite of every existing stylesheet. New primitives must be usable independently before broad migration.

## 8. Package/API boundary

`packages/design-tokens` must be consumable by both CSS and TypeScript without runtime knowledge of the Web app.

The primitive implementation may live in a dedicated package or the repository's established shared-UI location, but it must depend only on the token contract and generic Web/platform types. The implementation plan must choose the exact repository path after inspecting current package conventions; it must not create a parallel UI architecture unnecessarily.

## 9. Testing and verification

Acceptance requires:

- token exports are consumable from TypeScript;
- CSS custom-property export is consumable without the TS runtime;
- semantic token families are present and stable;
- primitives have no imports from Canon/route/content modules;
- focus-visible behavior is covered;
- reduced-motion behavior is covered where motion exists;
- accessible-name requirements for icon-only interaction are covered;
- typecheck, lint and relevant tests pass under the repository's own workflows.

Visual calibration against approved references is a separate gate from structural correctness of the design system.

## 10. Non-goals

This spec does not:

- redesign the TAIJIFU brand;
- define new official HEX values from raster boards;
- alter Ω1;
- change Canon or Experience Graph semantics;
- create page templates or route IA;
- migrate every existing Web component in one change;
- invent iconography or official marks.

## 11. Exit criteria

Issue #34 is complete when the repository has one reusable semantic token package, the listed editorial primitives consume that token authority, accessibility contracts are test-covered, CSS/TS consumers can use the system without importing Canon or route code, and repository verification passes.
