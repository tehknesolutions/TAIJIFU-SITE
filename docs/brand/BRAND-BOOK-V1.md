# TAIJIFU Brand Book v1

Status: normative navigation index for identity implementation.

This document does not replace the Canon, Ω1 master, engineering specifications, reference set, tokens, components, or prompt library. It maps their authority boundaries and traceability.

## Authority map

| Layer | Authority | Role |
| --- | --- | --- |
| Canon | canonical content sources and `apps/interactive-web/src/content/canon-snapshot.ts` projection | Meaning, curriculum, official terminology |
| Ω1 | `brand/omega1/` and `apps/interactive-web/public/brand/omega1-master.svg` | Deterministic identity master |
| Engineering | repository specifications and contracts | Implementation constraints and invariants |
| References | R01–R08 reference/acceptance documents | Visual direction and decision evidence |
| Tokens | `packages/design-tokens/` | Shared visual values consumed by UI |
| Components | `apps/interactive-web/src/` | Product implementation |
| Media | `apps/interactive-web/src/media-catalog.ts`, `media-registry.ts`, `media-runtime.ts` | Presentation-only media governance |
| Prompts | `docs/prompts/TAIJIFU-VISUAL-PROMPT-LIBRARY.md` | Controlled presentation-media recipes |

## Non-negotiable boundaries

1. Presentation media is not Canon and is not a canonical brand master.
2. Ω1, HNK marks, UI text and canonical diagrams remain deterministic assets/components; they are not generated inside presentation media.
3. Experience/spatial parentage is navigation/presentation hierarchy, not Canon semantics.
4. Canonical URLs come from the canonical/IA registry, not from renderers or media.
5. A presentation asset must retain provenance and human-approval state before runtime activation.
6. No-media and reduced-motion modes must remain complete product experiences, not degraded error states.

## Reference → decision → component → code

| Reference | Decision | Component/system | Code |
| --- | --- | --- | --- |
| R01 + R02 | Ceremonial Dojo environment is presentation-only | Dojo Gate | `apps/interactive-web/src/r01-presentation.css`, `media-runtime.ts` |
| R01 + R02 | P01 may supply environment media only after approval | Media System | `media-catalog.ts`, `media-registry.ts` |
| Ω1 master | Identity mark remains deterministic | Header / Dojo identity | `apps/interactive-web/public/brand/omega1-master.svg` |
| Canon snapshot | Curriculum meaning is source-controlled | Canon UI | `content/canon-snapshot.ts`, `canon-ui.ts`, `content/canon-ui-render.ts` |
| Experience registry | Spatial tree is an experience projection | Spatial UI | `spatial-ui.ts`, `three-web-surface.ts` |
| Design tokens | Presentation consumes semantic values | Web UI | `packages/design-tokens/`, `styles.css`, `canon-ui.css` |
| Prompt library | P01–P08 cannot generate canonical identity | Media pipeline | `docs/prompts/TAIJIFU-VISUAL-PROMPT-LIBRARY.md`, `media-catalog.ts` |

## Anti-patterns

- Recreating Ω1 inside an AI-generated image.
- Baking navigation labels or curriculum text into raster/generated media.
- Treating R01–R08 as Canon content.
- Inventing a URL in Three.js, CSS, media metadata, or a presentation component.
- Duplicating Canon facts in a presentation-only registry.
- Activating an unapproved presentation asset merely because its file exists.
- Hiding essential meaning behind hover, animation, color alone, or a WebGL-only interaction.
- Making the no-media fallback visually or functionally incomplete.

## Regression matrix

Brand Book v1 requires deterministic review of these modes:

| Mode | Required invariant |
| --- | --- |
| Desktop | Full hierarchy, identity, Canon UI and Dojo composition remain legible |
| Tablet | Layout reflows without changing authority or navigation semantics |
| Mobile | Single-column/compact composition preserves content and ≥44px critical targets |
| Reduced motion | Navigation and focus remain complete without motion dependency |
| No media | Dojo remains intentional using deterministic CSS/assets only |

Screenshot baselines are evidence of presentation state. They do not become a new source of identity truth.

## Legacy identity policy

Historical exploration is evidence, not current authority. Legacy documents should be marked historical/deprecated in place where practical rather than deleted. A historical artifact may explain how a decision emerged, but current implementation must trace to the authority map above.

## Release gate

A visual/identity change is ready only when its authority is known, its deterministic identity assets remain untouched unless explicitly governed, Canon meaning is preserved, accessibility/fallback modes remain complete, and the change can be traced from reference/decision to component/code.
