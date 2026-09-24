# TAIJIFU WordPress V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build independently installable `taijifu-canon` WordPress theme and `taijifu-core` plugin that manifest the approved TAIJIFU Visual System V1 and preserve TAIJIFU domain content independently of presentation.

**Architecture:** The theme owns the responsive CANON visual system and Dojo Gate. The plugin owns WordPress-native TAIJIFU content types, taxonomies and stable query/render interfaces. Integration occurs only through documented WordPress APIs and plugin helpers; theme absence or replacement never deletes domain content.

**Tech Stack:** WordPress/PHP, block theme primitives (`theme.json`, templates, parts, patterns), semantic HTML, CSS, minimal vanilla JavaScript, PHPUnit/WordPress test harness where available, WP-CLI smoke tests.

**Spec:** `docs/TAIJIFU-WORDPRESS-ARCHITECTURE-V1.md`

## Global Constraints
- TAIJIFU = Arte Marcial de se Adaptar.
- TAI = Essência/Permanência/Axis; JI = Discernimento/Adaptação/Nexus; FU = Manifestação/Fluxo/Flow.
- HNK glyphs are HNK, never Japanese glyphs mislabeled as HNK.
- Theme = presentation; plugin = domain/content.
- Deactivation or theme switching never deletes TAIJIFU content.
- No front-end framework dependency in V1.
- `prefers-reduced-motion` must be respected.
- Both packages must produce independently installable ZIPs.

## Review Focus
- Plugin absent/deactivated: theme must fail gracefully without PHP fatal errors.
- Empty/new installation: templates and archives must render useful empty states rather than broken layouts.
- Long/translatable titles and navigation labels: no clipping or catastrophic overflow.
- Mobile and keyboard-only navigation: all destinations and CTA remain operable with visible focus.
- Missing/non-final art asset: use explicit fallback/placeholders without inventing HNK glyph semantics.

---

## File map

### Plugin
- `wordpress/plugins/taijifu-core/taijifu-core.php` — bootstrap/version/constants.
- `wordpress/plugins/taijifu-core/includes/class-content-types.php` — CPT registration.
- `wordpress/plugins/taijifu-core/includes/class-taxonomies.php` — taxonomy registration.
- `wordpress/plugins/taijifu-core/includes/class-query.php` — stable read/query helpers.
- `wordpress/plugins/taijifu-core/includes/class-render.php` — minimal semantic render helpers/shortcodes if needed.
- `wordpress/plugins/taijifu-core/includes/class-activation.php` — idempotent activation/rewrite handling.
- `wordpress/plugins/taijifu-core/tests/` — plugin tests.

### Theme
- `wordpress/themes/taijifu-canon/style.css` — WordPress theme header + minimal global CSS entry.
- `wordpress/themes/taijifu-canon/theme.json` — tokens/settings/styles.
- `wordpress/themes/taijifu-canon/functions.php` — setup/assets/integration guards.
- `wordpress/themes/taijifu-canon/templates/index.html` — fallback template.
- `wordpress/themes/taijifu-canon/templates/front-page.html` — Dojo Gate entry.
- `wordpress/themes/taijifu-canon/parts/header.html`, `footer.html` — shell.
- `wordpress/themes/taijifu-canon/patterns/dojo-gate.php` — canonical hero composition.
- `wordpress/themes/taijifu-canon/patterns/triad.php` — TAI/JI/FU presentation.
- `wordpress/themes/taijifu-canon/assets/css/dojo-gate.css` — composition/responsive rules.
- `wordpress/themes/taijifu-canon/assets/js/navigation.js` — only required interactive navigation behavior.
- `wordpress/themes/taijifu-canon/assets/images/`, `assets/icons/` — approved optimized assets.

### Build/QA
- `scripts/package-wordpress.sh` or cross-platform equivalent — reproducible ZIP packaging.
- `docs/WORDPRESS-QA.md` — install/smoke/visual checklist.

---

### Task 1: Plugin bootstrap and content contract

**Files:** plugin bootstrap, content type/taxonomy classes, plugin tests.

**Interfaces:** Produces registered `tjf_principle`, `tjf_path`, `tjf_library`, `tjf_lab`; taxonomies `tjf_axis`, `tjf_level`, `tjf_status`.

- [ ] Write tests asserting all required CPT/taxonomy registrations and public/admin behavior.
- [ ] Run tests and confirm failure before implementation.
- [ ] Implement bootstrap and registrations with translated labels, explicit capabilities/supports and rewrite slugs.
- [ ] Add idempotent activation hook and rewrite flush only on activation.
- [ ] Run plugin tests and confirm pass.
- [ ] Commit: `feat(core): register Taijifu domain model`.

### Task 2: Stable plugin query/render boundary

**Files:** `class-query.php`, `class-render.php`, tests.

**Interfaces:** Produces documented helpers for retrieving axis/level/status content without theme-owned SQL or metadata assumptions.

- [ ] Write failing tests for empty result, valid filtered query and escaped semantic output.
- [ ] Implement minimal query helpers using `WP_Query`/taxonomy APIs.
- [ ] Implement only render helpers actually consumed by V1; escape by context.
- [ ] Verify tests pass with no content and representative fixtures.
- [ ] Commit: `feat(core): expose stable content interfaces`.

### Task 3: Theme shell and semantic tokens

**Files:** `style.css`, `theme.json`, `functions.php`, header/footer/index templates.

**Interfaces:** Consumes standard WordPress APIs; plugin integration must be guarded with `class_exists`/`function_exists` as appropriate.

- [ ] Add theme validation/smoke assertions for required files and metadata.
- [ ] Define semantic token roles for ink/wood/ivory/metal/warm-light and TAI/JI/FU/integration.
- [ ] Implement shell, landmarks, navigation and footer authorship.
- [ ] Add guarded plugin integration so plugin absence never fatals.
- [ ] Validate theme activation with plugin enabled and disabled.
- [ ] Commit: `feat(theme): establish canonical Taijifu shell`.

### Task 4: CANON Dojo Gate

**Files:** front-page template, `patterns/dojo-gate.php`, `patterns/triad.php`, CSS, approved visual assets.

**Interfaces:** Consumes approved Ω1/wordmark/glifos assets. Missing assets use explicit neutral fallbacks; never fabricate glyph meaning.

- [ ] Create reference checklist from Issue #7: environment, Ω1 hierarchy, wordmark, descriptor, triad, banners, CTA and depth.
- [ ] Implement semantic HTML composition before motion.
- [ ] Implement desktop layout matching the CANON hierarchy.
- [ ] Implement tablet/mobile recomposition preserving hierarchy rather than scaled desktop.
- [ ] Verify long text and missing-image fallbacks.
- [ ] Commit: `feat(theme): implement canonical Dojo Gate`.

### Task 5: Navigation, interaction and motion

**Files:** navigation JS and related CSS.

- [ ] Add keyboard/mobile navigation behavior tests or deterministic manual harness.
- [ ] Implement minimal menu toggle with correct ARIA state and focus behavior.
- [ ] Add progressive TAI→JI→FU motion without hiding essential content.
- [ ] Add `prefers-reduced-motion: reduce` path that removes nonessential motion.
- [ ] Test keyboard-only, touch-size controls and no-JS fallback.
- [ ] Commit: `feat(theme): add accessible adaptive interaction`.

### Task 6: Domain templates

**Files:** archive/single templates/patterns for plugin content.

- [ ] Add empty-state and populated-state fixtures/checks.
- [ ] Implement reusable archive/single presentation for Principles, Path, Library and Lab.
- [ ] Surface axis/level/status semantically without encoding domain truth in CSS/classes alone.
- [ ] Verify graceful behavior when plugin is disabled.
- [ ] Commit: `feat(theme): present Taijifu domain content`.

### Task 7: Accessibility and responsive gate

**Files:** theme CSS/templates and `docs/WORDPRESS-QA.md`.

- [ ] Audit headings/landmarks/alt handling/focus/contrast/keyboard flow.
- [ ] Test representative widths: 320, 375, 768, 1024, 1440 and wide desktop.
- [ ] Fix overflow and touch-target issues without changing CANON hierarchy.
- [ ] Verify reduced motion and high zoom behavior.
- [ ] Record QA evidence/checklist.
- [ ] Commit: `fix(theme): close responsive and accessibility gates`.

### Task 8: Performance and asset gate

**Files:** assets/enqueue code/QA doc.

- [ ] Inventory bytes and requests needed above the fold.
- [ ] Convert/size imagery appropriately and provide responsive candidates where useful.
- [ ] Ensure non-critical media is lazy and JS is minimal/deferred appropriately.
- [ ] Verify hero is not implemented as one giant screenshot.
- [ ] Record before/after asset metrics.
- [ ] Commit: `perf(theme): optimize canonical visual assets`.

### Task 9: Packaging and clean-install verification

**Files:** packaging script, QA docs.

- [ ] Create reproducible package script excluding repository/dev/test artifacts from distributable ZIPs.
- [ ] Generate `taijifu-canon.zip` and `taijifu-core.zip`.
- [ ] Install both on a clean WordPress instance.
- [ ] Activate plugin then theme; verify front page/admin/content creation.
- [ ] Switch theme and verify TAIJIFU content remains.
- [ ] Deactivate/reactivate plugin and verify content remains and theme does not fatal.
- [ ] Re-enable packages and rerun smoke/visual checks.
- [ ] Commit: `build: package Taijifu WordPress V1`.

### Task 10: CANON visual regression and release gate

**Files:** `docs/WORDPRESS-QA.md`, release notes/screenshots if repository policy allows.

- [ ] Compare desktop implementation against the approved Dojo Gate reference element by element.
- [ ] Compare tablet/mobile against semantic hierarchy acceptance gates.
- [ ] Confirm exact copy: TAIJIFU, descriptor, maxims, TAI/JI/FU meanings and authorship.
- [ ] Confirm no Japanese glyph is labeled as HNK.
- [ ] Run all automated tests and clean-install smoke tests.
- [ ] Record final hashes/version numbers for both ZIPs.
- [ ] Commit: `release: Taijifu WordPress V1 canonical theme and core plugin`.

## Definition of Done
V1 is complete only when the theme and plugin independently install, the Dojo Gate visibly matches the approved CANON hierarchy, TAIJIFU domain content survives presentation changes/deactivation, accessibility/responsive gates pass, and reproducible ZIP artifacts are produced with recorded versions/hashes.
