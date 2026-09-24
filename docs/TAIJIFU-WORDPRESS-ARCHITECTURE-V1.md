# TAIJIFU WordPress Architecture V1 — CANON Implementation Spec

Status: APPROVED / implementation source of truth
Issue: #7

## Goal
Implement the approved TAIJIFU Dojo Gate as a production WordPress experience while keeping presentation and TAIJIFU knowledge independent.

## Canon constraints
- TAIJIFU = Arte Marcial de se Adaptar.
- TAI = Essência/Permanência/Axis.
- JI = Discernimento/Adaptação/Nexus.
- FU = Manifestação/Fluxo/Flow.
- Maxims: “Firme na essência. Livre na forma.” and “Mudar sem deixar de ser.”
- HNK glyphs are HNK, not Japanese glyphs.
- The approved Dojo Gate is the visual/compositional reference.
- Authorship: “Criado por Miguel Da Vinci e Thales Walisson — Desde 2026”.

## Package boundary

### Theme: `taijifu-canon`
Owns presentation only:
- design tokens and global styles;
- semantic typography and color system;
- header/footer/navigation;
- Dojo Gate hero;
- TAI/JI/FU presentation components;
- page/archive/single templates;
- responsive behavior;
- progressive motion and reduced-motion behavior;
- accessibility-facing presentation.

The theme MUST NOT own canonical knowledge records.

### Plugin: `taijifu-core`
Owns domain/content behavior:
- canonical content types and taxonomies;
- Canon / Method / Library / Lab governance metadata;
- TAI/JI/FU semantic records;
- Principles, Paths and Levels;
- safe render/query interfaces consumed by the theme;
- activation/version metadata;
- future block/API extension points.

Content MUST remain in WordPress when the theme changes or the plugin is deactivated. Deactivation must not delete content. Uninstall deletion is out of V1 scope.

## Content model V1
Use WordPress-native data rather than custom database tables.

Custom post types:
- `tjf_principle` — principles and philosophical teaching units.
- `tjf_path` — curriculum/path units.
- `tjf_library` — validated forms/resources.
- `tjf_lab` — experimental material.

Taxonomies:
- `tjf_axis` — TAI, JI, FU, Integration.
- `tjf_level` — N1…N7.
- `tjf_status` — Canon, Method, Library, Lab, Rejected where semantically applicable.

Canonical immutable identifiers are stored as post meta only where required for cross-reference; human content remains editable through WordPress.

## Theme architecture
Expected structure:

```text
wp-content/themes/taijifu-canon/
  style.css
  theme.json
  functions.php
  templates/
  parts/
  patterns/
  assets/css/
  assets/js/
  assets/images/
  assets/icons/
  inc/
```

Use modern WordPress block-theme primitives where they reduce bespoke code, but preserve exact CANON art direction. The Dojo Gate is a real responsive composition, not a single raster screenshot used as UI.

## Plugin architecture
Expected structure:

```text
wp-content/plugins/taijifu-core/
  taijifu-core.php
  includes/
    class-content-types.php
    class-taxonomies.php
    class-query.php
    class-render.php
    class-activation.php
  assets/
  tests/
```

No framework dependency in V1. Prefix PHP symbols with `TJF_` or namespace them under `Taijifu\Core` consistently.

## Visual system
Semantic roles:
- TAI: red / Axis / essence.
- JI: blue / Nexus / adaptation.
- FU: gold / Flow / manifestation.
- Integration: green only when semantically needed.
- Environmental neutrals: ink/black, dark wood, ivory/paper, metal, warm light.

The visual hierarchy is: environment → Ω1 → TAIJIFU wordmark → descriptor → triad → primary CTA.

## Dojo Gate behavior
Desktop preserves the approved symmetrical cinematic composition. Tablet/mobile must preserve semantic hierarchy rather than mechanically shrink the desktop frame. Navigation collapses accessibly. TAI/JI/FU remains readable. CTA remains reachable without precision pointing.

Motion sequence may express Axis → Nexus → Flow → Integration. All essential information remains available with motion disabled and `prefers-reduced-motion: reduce` must be respected.

## Accessibility
- semantic landmarks and headings;
- keyboard-operable navigation and controls;
- visible focus;
- sufficient text contrast;
- meaningful image alternatives where appropriate;
- decorative imagery excluded from the accessibility tree;
- reduced-motion support;
- no interaction requiring hover only.

## Performance
- no giant screenshot as the complete hero UI;
- responsive images and modern formats where appropriate;
- lazy-load non-critical media;
- keep critical hero dependencies minimal;
- avoid JS for behavior CSS/HTML can provide;
- no unnecessary front-end framework.

## Security / WordPress discipline
- escape output according to context;
- sanitize and validate stored inputs;
- nonce/capability checks for mutating admin actions;
- no remote code execution/update mechanism;
- no secrets in theme/plugin;
- plugin activation is idempotent.

## Acceptance gates
1. Dojo Gate is immediately recognizable against the approved CANON reference.
2. Ω1, wordmark and TAI/JI/FU retain hierarchy across desktop/tablet/mobile.
3. No Japanese glyph is represented as an HNK glyph.
4. Theme contains presentation; plugin contains domain behavior.
5. Switching themes does not delete TAIJIFU content.
6. Plugin deactivation does not delete content.
7. Keyboard navigation, visible focus, contrast and reduced motion work.
8. No major overflow/layout break at common responsive widths.
9. WordPress admin remains usable.
10. Theme and plugin can each be packaged as independently installable ZIPs.

## Out of scope for V1
- LMS/payment/membership engine;
- social network;
- bespoke database schema;
- mobile native app;
- destructive uninstall routine;
- replacing WordPress editor with a custom CMS.
