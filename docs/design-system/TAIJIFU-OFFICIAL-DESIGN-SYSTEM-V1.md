# TAIJIFU Official Design System v1

**Status:** APPROVED ARCHITECTURE / IMPLEMENTATION SOURCE
**Authority order:** CANON + Ω1 → North Star Web → reference synthesis → Design System → implementation

## 1. Authority

### Tier C — immutable authority
The TAIJIFU Canon, `TAIJIFU-OFFICIAL-LOGO-OMEGA1.md`, and Ω1 engineering specification govern identity. No visual reference may override them.

Ω1 is the official mark. ORIGIN, NEXUS and FLOW are ancestral/genealogical states, not competing logos. HNK glyph genealogy is structural, never decorative invention.

### Tier A — Web North Star
The supplied `taijifu-site-design-oficial` / cinematic Dojo Gate composition is the primary product-direction reference for the public Web experience when it does not conflict with Tier C.

### Tier B — reference synthesis
All supplied identity boards are evidence libraries. They may contribute applications, material language, composition, photography, icon use and component patterns, but do not independently create new canonical identity.

## 2. Design thesis

TAIJIFU is a **living martial knowledge system presented as a virtual dojo**, not a SaaS dashboard. The interface should feel disciplined, ceremonial, spatial and contemporary without becoming ornamental pseudo-Japanese UI.

Core contrast:
- strong axis + adaptive flow;
- dark field + controlled light;
- editorial precision + human/martial gesture;
- stillness + purposeful motion;
- ancestry + contemporary implementation.

## 3. Layer model

`Canon → Brand → Tokens → Primitives → Components → Patterns → Experiences`

Brand geometry is vector-first. Presentation may use photography, natural light, material depth and cinematic atmosphere. Effects never become intrinsic Ω1 geometry.

## 4. Foundations

### Color roles
- `ink`: near-black / charcoal foundation.
- `paper`: warm ivory / off-white.
- `metal`: restrained ritual metal/gold for ceremony and premium emphasis.
- `tai`: canonical red.
- `ji`: canonical blue.
- `fu`: canonical gold/yellow.
- `integration`: canonical green.

Exact production values remain governed by the color-calibration gate. Raster reference colors are evidence, not print canon.

Default composition target: 70–80% neutral field, 15–20% contextual semantic color, 5–10% emphasis.

### Typography
Two-role system:
1. ceremonial/editorial display face for TAIJIFU, chapter titles and major statements;
2. highly legible sans for navigation, metadata, labels and body UI.

Use tracking deliberately for ceremonial labels. Never rasterize essential UI copy into generated hero art.

### Space and geometry
- generous negative space;
- strong vertical/horizontal axes;
- fine rules and restrained borders;
- asymmetric balance over rigid mirroring;
- squared/low-radius UI geometry; avoid generic pill-card language except where interaction semantics require it.

### Material language
Allowed in presentation/media: dark timber, stone, fabric, brushed/aged metal, paper, water, mountain atmosphere, natural sunrise/sunset light.

Forbidden as UI primitives: fake chrome controls, gratuitous bevels, neon, glassmorphism, magical particles, decorative HUDs, generic cyberpunk effects.

## 5. Brand component family

- `Omega1Mark`: canonical one-color Ω1.
- `Omega1AccentMark`: four semantic accent loci only.
- `Omega1ReverseMark`: light-on-dark.
- `Omega1MicroMark`: dedicated small-size master.
- `TaijifuLockupHorizontal` / `Vertical`.
- `HnkSignature`: official seven-glyph signature.
- `AncestralStateDiagram`: ORIGIN/NEXUS/FLOW genealogy, documentation contexts only.
- `CanonicalAccentMark`: TAI/JI/FU/Integração state without redrawing Ω1.

Never generate a replacement logo from a text-to-image model for production use.

## 6. UI primitives

`Container`, `Stack`, `Cluster`, `Grid`, `Rule`, `Surface`, `Eyebrow`, `Display`, `Heading`, `Body`, `Meta`, `Button`, `IconButton`, `TextLink`, `FocusRing`, `MediaFrame`.

Primitives consume semantic tokens only; they do not know curriculum or route semantics.

## 7. Product components

- `SiteHeader`: Ω1/lockup, canonical navigation, search trigger, Dojo CTA.
- `DojoGateHero`: cinematic media + Ω1 + title + maxim + principle triad + primary threshold CTA.
- `PrincipleTriad`: TAI / JI / FU with semantic colors and canonical questions.
- `FourBases`: TAI / JI / FU / Integração projection.
- `PrincipleMark` and `PrincipleCard`.
- `EditorialChapter`: long-form Canon presentation.
- `CanonMetric`: factual curriculum counts only.
- `GraduationTrack`: belts/progression from Canon data.
- `CanonHierarchy`: Base → Faixa → Caminho → Núcleo disclosure.
- `DojoThreshold`: transition from semantic page into spatial experience.
- `SpatialNavigator`: Three.js hierarchy; Ω1 remains origin.
- `NodeLegend`: accessible HTML mirror of spatial navigation.
- `ProvenanceFooter`: creator/ecosystem/year provenance.
- `SealApplication`, `AppIconApplication`, `UniformApplication`: brand application documentation, not core navigation widgets.

## 8. North Star Web composition

Desktop home hierarchy:
1. ceremonial header;
2. cinematic Dojo Gate occupying primary viewport;
3. Ω1 as dominant identity anchor;
4. TAIJIFU wordmark/title + `Arte Marcial de se Adaptar`;
5. maxims `Firme na essência. Livre na forma.` and `Mudar sem deixar de ser.`;
6. TAI/JI/FU principle triad;
7. `Entrar no Dojo` threshold CTA;
8. creator provenance and scroll cue;
9. semantic content continues below the fold.

The background is environmental media, not a substitute for HTML structure. Text, navigation, CTA and canonical marks remain independent accessible layers.

## 9. Responsive behavior

Large: ceremonial Ω1 + wordmark; full header; cinematic composition.
Standard: Ω1 + wordmark; reduced navigation density.
Compact: Ω1; condensed navigation; content remains semantic.
Micro: dedicated Ω1 micro master.

Mobile must not crop away the only expression of identity or require Three.js to navigate. Semantic HTML remains authoritative.

## 10. Motion

Motion expresses adaptation, not spectacle.
- focus: subtle depth/scale;
- navigation: short Ω1-origin → focus → approach → canonical route;
- HNK reveal: `G22 → G01 → G03 → G36 → G03 → G25 → G05 → convergence → Ω1`;
- reduced-motion: immediate state changes/navigation with no camera travel.

## 11. Media system

Three media families:
1. **Dojo Environment** — architectural threshold, timber/stone, landscape, natural light, contemplative emptiness.
2. **Martial Landscape** — human practice in real terrain; disciplined, non-superhero, non-fantasy.
3. **Material Application** — embroidery, seal, paper, app icon, garment and engraving tests.

Generated media must not contain authoritative text, invented HNK glyphs or replacement Ω1 geometry. Production text and marks are composited from deterministic assets.

## 12. Accessibility

- WCAG AA contrast minimum for text/control states.
- keyboard-equivalent access for every spatial destination.
- visible focus.
- semantic headings/navigation independent of canvas.
- decorative hero media uses empty alt; meaningful media receives concise alt.
- reduced-motion honored.
- no color-only distinction between TAI/JI/FU/Integração.

## 13. Anti-patterns

Do not ship:
- alternate logos derived from exploratory boards;
- generic yin-yang/enso/martial icons as Ω1 substitutes;
- invented HNK glyphs;
- rainbow Ω1 coloring outside canonical loci;
- image-generated UI copy;
- glass cards/neon HUDs;
- 174 curriculum nodes simultaneously in one flat orbit;
- photography that turns TAIJIFU into fantasy/superhero imagery;
- arbitrary Japanese characters used as decoration;
- visual fidelity that destroys semantic routing/accessibility.

## 14. Traceability rule

Every production component must identify:
- authority tier;
- source reference(s);
- canonical data dependencies;
- token dependencies;
- accessibility contract;
- visual-regression state.

Exploration may inspire a component; only Canon/approved Design System can authorize it.

## 15. Definition of done

The system is official when the repository contains: calibrated tokens; deterministic Ω1 family; primitives; documented product components; North Star Home implementation; responsive/a11y tests; visual regression references; media prompt library; Brand Book; and a traceability matrix linking references → decisions → components → code.