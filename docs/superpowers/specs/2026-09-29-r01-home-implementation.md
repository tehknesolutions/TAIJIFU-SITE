# R01 Home Implementation Specification

Status: APPROVED DESIGN SPEC
Date: 2026-09-29
Implements: `docs/design/R01-HOME-NORTH-STAR.md`
Tracker: #78

## Intent

Converge the existing TAIJIFU Home/Dojo Gate toward R01 without creating a parallel Home, redefining martial Canon, or introducing local/external/paid workflow dependencies. The existing semantic and interactive flow remains the product foundation; the presentation is rebuilt around the approved North Star.

## Architecture

The Home remains an accessible HTML threshold backed by the existing TAIJIFU content and experience graph. Presentation is divided into four explicit concerns:

1. `site header` — ceremonial navigation integrated with the first viewport;
2. `dojo environment` — presentation-only atmospheric framing and optional media;
3. `identity/content` — official Ω1, TAIJIFU descriptor, maxims and TAI/JI/FU copy;
4. `threshold transition` — Entrar no Dojo moves the user into the existing interactive experience.

No second router, second content registry or second Canon representation is introduced.

## Source boundaries

- `canon/TAIJIFU-CANON-1.0/` remains the martial Canon authority.
- official page copy continues to come from existing content modules.
- canonical Ω1 files remain governed by the brand asset contract.
- R01 governs presentation composition and hierarchy only.
- environmental imagery/effects are Presentation-layer resources.
- exact color calibration cannot be inferred from R01 pixels.

## Desktop composition

The first viewport should read as one coherent ceremonial scene rather than stacked application sections. Header occupies the upper frame. Ω1 is the primary focal point. TAIJIFU and its descriptor form the central typographic lockup. Maxims flank the center. TAI/JI/FU form three equal lower paths. Entrar no Dojo is the strongest action beneath them. Provenance and continuation cue close the viewport.

## Responsive composition

Mobile does not crop the desktop scene. It preserves semantic priority:

Ω1/TAIJIFU → descriptor → maxims → TAI/JI/FU → Entrar no Dojo → provenance.

Primary navigation may collapse/reduce, but the dojo entry action and keyboard access remain available.

## Environment strategy

The implementation must work without a remote image service. Environmental media is optional and has a deterministic CSS/layout fallback. If an approved local background asset is later added to the repository, it may enhance the scene without becoming required for content access or navigation.

Presentation may use controlled light, depth, materiality and reflection to approach R01. It must not alter canonical Ω1 geometry or silently promote atmospheric sampled colors into official brand calibration.

## Interaction

- TAI, JI and FU remain real links to their canonical public routes.
- Entrar no Dojo targets the existing interactive experience/threshold anchor.
- search/navigation affordances must be semantic controls or links when implemented.
- reduced-motion removes nonessential movement without removing information.
- keyboard focus must remain visible against the dark scene.

## Testing strategy

TDD gates should assert behavior and architecture rather than brittle incidental CSS strings. Tests cover:

- semantic first-viewport hierarchy;
- official Ω1 source;
- exact approved textual hierarchy;
- equal TAI/JI/FU links;
- Entrar no Dojo destination;
- optional-media fallback;
- presentation tokens do not define `--tj-calibration-*`;
- prohibited brand/presentation primitives do not leak into canonical Ω1;
- responsive and reduced-motion rules remain present.

Visual fidelity itself is reviewed against R01 and documented deviations; DOM tests do not pretend to measure cinematographic similarity.

## Delivery slices

### Slice A — structural fidelity
Recompose existing HTML and CSS to match R01 hierarchy using current assets and deterministic presentation fallback. This slice must be fully navigable without new imagery.

### Slice B — environmental fidelity
Add or reconcile an approved repository-owned environment asset if available/authorized, then tune framing, depth and responsive cropping. No remote runtime dependency.

### Slice C — interaction polish
Refine transitions, search/header behavior and threshold handoff to the existing interactive graph while preserving reduced-motion/accessibility.

### Slice D — visual acceptance
Compare desktop/mobile against R01, record deliberate deviations, and close #78 when Home v1 meets the North Star definition of done.

## Non-goals

- redesigning the martial Canon;
- creating a second Home implementation;
- inventing official color calibration;
- generating replacement official symbols for missing assets;
- adding paid SaaS, remote asset runtime dependencies or local-only build requirements;
- rewriting the existing interactive graph as part of the Home fidelity work.

## Acceptance

The result is successful when a user opening TAIJIFU immediately recognizes the R01 hierarchy and ceremonial identity, can understand TAI/JI/FU, can enter the Dojo, and can navigate the experience with keyboard/mobile/reduced-motion support, while the repository retains one Canon and one authoritative content flow.