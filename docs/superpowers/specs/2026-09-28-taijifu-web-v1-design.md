# TAIJIFU Web v1 — Canon-Driven Interactive Site Design

## Outcome
Build the fastest path to a production-ready TAIJIFU Web v1: every official TAIJIFU content item identified in the project canon is reachable through a canonical URL, rendered as semantic Web content, represented in the interactive Three.js experience where appropriate, and presented with the official TAIJIFU design language.

## Source of truth
- GitHub repository `tehknesolutions/TAIJIFU-SITE` is the canonical implementation source.
- Official project documents and historical project material are source evidence for content/design decisions; gaps are not silently invented.
- Content provenance must remain traceable during canon reconciliation.

## Product principles
1. One TAIJIFU, not separate HTML and Three.js sites.
2. Content and canonical URLs exist independently of WebGL.
3. Three.js is an experience/navigation layer over the canonical content graph.
4. Official content precedes invented copy; conflicts are surfaced for reconciliation.
5. Official design precedes new aesthetic invention.
6. Desktop, mobile, keyboard-accessible and non-WebGL navigation remain viable.
7. Build breadth before polish: first make the whole canon reachable, then raise visual fidelity globally.

## Architecture

`TAIJIFU Canon -> Content Registry -> Site Document / Experience Model -> Semantic Web UI + Three.js Experience -> Canonical Navigation`

### Canon layer
A normalized registry stores official content identity, title, slug, canonical URL, body/content reference, media, hierarchy/relations, SEO metadata, visual role, provenance and reconciliation status.

### Semantic Web layer
The complete information architecture is rendered as normal Web content and links. This is the baseline for navigation, accessibility, SEO and WebGL fallback.

### Interactive layer
Three.js consumes the same content graph. Interactive objects carry canonical node identity and canonical URL metadata. Pointer/touch selection resolves through the existing raycast/navigation boundary; Three.js never invents routes.

### Design layer
Official TAIJIFU visual evidence is consolidated into design tokens and reusable components. Semantic UI and Three.js materials/motion derive from the same visual system.

## Delivery strategy
### M1 — Executable browser runtime
Close `browser-bootstrap`, browser entrypoint and document/canvas mounting so `apps/interactive-web` runs visibly in a browser.

### M2 — Canon inventory and registry
Inventory official project content/assets, record provenance, identify duplicates/conflicts/gaps, and materialize the canonical content registry.

### M3 — Complete information architecture
Generate all official routes/pages/navigation from the registry. Reach 100% content breadth before deep visual polish.

### M4 — Official design system
Extract official typography, colors, logos/symbols, spacing, surfaces, imagery and motion rules into shared tokens/components.

### M5 — Interactive content graph
Replace demonstration nodes with the real information architecture and add spatial focus, hover/touch selection, camera transitions and contextual navigation.

### M6 — Full content experience
Connect all reconciled official content/media to both semantic and interactive representations.

### M7 — Production quality
Responsive behavior, touch, keyboard/accessibility, reduced motion, WebGL fallback, asset optimization, lazy loading, SEO metadata, sitemap, structured data where supported, error handling and performance work.

### M8 — Web v1 release
Release when every reconciled official content item is accessible at a canonical URL through the semantic site, with appropriate interactive representation and official design, on desktop and mobile.

## Existing foundation to preserve
The current `apps/interactive-web` foundation already separates ExperienceNode/RenderFrame, Three.js projection, canonical metadata, raycast selection, pointer-to-NDC conversion, canonical navigation, interactive surface lifecycle and browser WebGLRenderer creation. Extend these boundaries rather than replacing them.

## Definition of Done
TAIJIFU Web v1 is complete when all official content identified by the reconciled canon is reachable by canonical URL, navigable without WebGL and through the interactive experience where appropriate, uses the official consolidated design system, works on desktop/mobile with keyboard/touch accessibility, and passes production QA for navigation, content integrity, performance and SEO.

## Explicit non-goals for the fast path
- Do not build a CMS before a demonstrated need.
- Do not create a separate content store for Three.js.
- Do not perfect one page while most canonical content is still unreachable.
- Do not invent missing official content or redesign the brand without source evidence.
- Do not block product implementation on non-critical CI infrastructure defects.