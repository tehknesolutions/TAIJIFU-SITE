# R2 Current UI Manifestation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Manifest `wordpress/themes/taijifu-canon/` as the single current-CANON WordPress presentation surface, integrated with `taijifu-core`, using approved Ω1 identity and carrying executable source-level acceptance evidence.

**Architecture:** The theme remains independently bootable and owns presentation only. `taijifu-core` retains domain/content behavior. R2 is delivered in testable slices: theme contract → tokens/assets → semantic shell → Dojo Gate → Core integration → hardening/package evidence. Historical v2.2 is genealogy, never implementation authority.

**Tech Stack:** WordPress/PHP, semantic HTML, CSS custom properties, minimal vanilla JavaScript only where interaction requires it, PHPUnit/WordPress test conventions already present under `wordpress/plugins/taijifu-core/tests`, GitHub Actions once runner execution is restored.

**Spec:** `docs/superpowers/specs/2026-09-27-r2-current-ui-manifestation-design.md`

## Global Constraints
- Theme target is exactly `wordpress/themes/taijifu-canon/`.
- Warm paper is the dominant canvas; charcoal is limited to authority/dojo surfaces.
- No gradients, neon, glow, glass or faux material textures.
- Mobile gutter is at least `24px`.
- Tai/Ji/Fu/Integration colors remain functional semantic tokens.
- Use approved Ω1 master assets; do not redraw Ω1.
- Wordmark V2 remains candidate-only until its independent master gate closes.
- Theme owns presentation; Core owns domain/content behavior.
- Theme must fail gracefully when Core capabilities are unavailable.
- Do not claim CI/runtime verification while GitHub Actions jobs still fail before runner assignment.

## Review Focus
1. Core plugin inactive/unavailable → theme still boots and presents an explicit graceful state rather than fatal error.
2. Keyboard-only navigation → every interactive navigation/CTA target is reachable with visible focus and no hover-only dependency.
3. Narrow viewport → horizontal content gutter never falls below 24px and navigation remains usable.
4. Reduced-motion preference → non-essential transitions/animation are removed or reduced.
5. Identity authority → theme references/copies approved Ω1 masters and never substitutes the wordmark candidate as master identity.

---

## File Structure

Create under `wordpress/themes/taijifu-canon/`:
- `style.css` — WordPress theme metadata plus token/import entrypoint.
- `functions.php` — theme setup, assets, menus and integration bootstrap only.
- `index.php` — safe fallback template.
- `front-page.php` — Dojo Gate composition.
- `header.php` / `footer.php` — semantic global shell.
- `inc/theme-contract.php` — Core availability and presentation-safe capability helpers.
- `inc/assets.php` — enqueue/version logic.
- `assets/css/tokens.css` — current CANON design tokens.
- `assets/css/base.css` — reset/base/accessibility primitives.
- `assets/css/components.css` — header/nav/buttons/Dojo Gate components.
- `assets/css/responsive.css` — responsive/reduced-motion rules.
- `assets/js/navigation.js` — only the collapsed-navigation behavior.
- `assets/brand/omega1-master.svg` and `assets/brand/omega1-micro-master.svg` — approved production copies, provenance documented.
- `tests/bootstrap.php` — lightweight theme contract test bootstrap.
- `tests/test-theme-contract.php` — theme metadata/file/ownership contract.
- `tests/test-canon-tokens.php` — material/token invariants.
- `tests/test-accessibility-contract.php` — static semantic/focus/reduced-motion/navigation invariants.
- `tests/test-brand-assets.php` — approved asset/provenance checks.
- `tests/test-core-boundary.php` — graceful Core-unavailable contract.
- `README.md` — authority, local verification and packaging notes.

Do not add a parallel theme directory.

---

### Task 1: Theme Contract and Bootable Scaffold

**Files:** Create `style.css`, `functions.php`, `index.php`, `inc/theme-contract.php`, `tests/bootstrap.php`, `tests/test-theme-contract.php`, `README.md`.

**Interfaces:** Produces `taijifu_canon_core_available(): bool` and a bootable WordPress theme contract used by later tasks.

- [ ] **Step 1: Write failing theme-contract tests** asserting required theme files exist, `style.css` declares `Theme Name: TAIJIFU Canon`, and `functions.php` loads `inc/theme-contract.php` without requiring Core.
- [ ] **Step 2: Run the narrow test** using the repository's available PHP test runner; expected result is FAIL because the theme does not yet exist. If no local runner is available, record `EXECUTION BLOCKED` rather than fabricating PASS.
- [ ] **Step 3: Implement minimal scaffold** with `taijifu_canon_core_available(): bool` implemented via capability/class/function existence checks only; no domain logic enters the theme.
- [ ] **Step 4: Re-run the narrow test**; expected PASS when executable locally, otherwise retain source-level IMPLEMENTED state only.
- [ ] **Step 5: Commit** `feat(theme): scaffold taijifu canon contract`.

### Task 2: CANON Tokens and Ω1 Asset Wiring

**Files:** Create `assets/css/tokens.css`, `assets/css/base.css`, `inc/assets.php`, `tests/test-canon-tokens.php`, `tests/test-brand-assets.php`, approved Ω1 copies under `assets/brand/`; modify `functions.php`, `style.css`, `README.md`.

**Interfaces:** Produces stable CSS custom properties for paper, charcoal, Tai, Ji, Fu, Integration, spacing and motion; produces versioned theme asset enqueue.

- [ ] **Step 1: Write failing token tests** asserting paper/charcoal/TAI/JI/FU/integration variables exist, `--space-page-gutter` is at least 24px at the mobile contract, and banned visual constructs are absent from theme CSS.
- [ ] **Step 2: Write failing brand tests** asserting both Ω1 theme assets exist and provenance points to `brand/omega1/master/*`; assert no wordmark construction asset is treated as master.
- [ ] **Step 3: Run the narrow tests** and confirm expected FAIL before implementation, or record runner unavailability.
- [ ] **Step 4: Implement tokens/assets/enqueue** with no new identity geometry and no historical v2.2 styling import.
- [ ] **Step 5: Re-run tests**; expected PASS where executable.
- [ ] **Step 6: Commit** `feat(theme): add canon tokens and omega1 assets`.

### Task 3: Semantic Shell and Accessible Navigation

**Files:** Create `header.php`, `footer.php`, `assets/css/components.css`, `assets/js/navigation.js`, `tests/test-accessibility-contract.php`; modify `functions.php`.

**Interfaces:** Produces primary menu registration, semantic header/nav/main/footer shell, collapsed navigation behavior and visible focus contract.

- [ ] **Step 1: Write failing accessibility tests** asserting landmarks/headings hooks, a keyboard-operable nav toggle with `aria-expanded`, visible `:focus-visible` styling and no hover-only disclosure contract.
- [ ] **Step 2: Run narrow tests**; expected FAIL before shell exists.
- [ ] **Step 3: Implement shell/navigation** with minimal vanilla JS that only synchronizes expanded state and menu visibility; content remains usable without animation.
- [ ] **Step 4: Re-run tests**; expected PASS where executable.
- [ ] **Step 5: Commit** `feat(theme): add semantic accessible shell`.

### Task 4: Dojo Gate / Front Page

**Files:** Create `front-page.php`; extend `assets/css/components.css`; add/extend theme contract tests for front-page structure.

**Interfaces:** Produces the current-CANON entry composition and primary CTA while consuming the shell/tokens from Tasks 2-3.

- [ ] **Step 1: Write failing front-page contract tests** for one H1, approved Ω1 asset usage, semantic TAI/JI/FU/Integration sections where required by the WordPress architecture source, and a reachable primary CTA.
- [ ] **Step 2: Run narrow tests**; expected FAIL before `front-page.php` exists.
- [ ] **Step 3: Implement the minimal Dojo Gate composition** from approved WordPress/CANON sources only; do not revive v2.2 page composition as authority.
- [ ] **Step 4: Re-run tests**; expected PASS where executable.
- [ ] **Step 5: Commit** `feat(theme): manifest current dojo gate`.

### Task 5: Core Boundary and Graceful Degradation

**Files:** Modify `inc/theme-contract.php`, `front-page.php`; create `tests/test-core-boundary.php`.

**Interfaces:** Produces presentation-safe helpers that expose Core availability without duplicating Core domain behavior.

- [ ] **Step 1: Write failing boundary tests** for Core present and Core absent states; absent state must render an explicit non-fatal presentation state.
- [ ] **Step 2: Run narrow tests**; expected FAIL for the missing graceful path.
- [ ] **Step 3: Implement minimal boundary helpers/rendering**; no CPT/taxonomy/domain registration in the theme.
- [ ] **Step 4: Re-run tests**; expected PASS where executable.
- [ ] **Step 5: Commit** `feat(theme): integrate core boundary safely`.

### Task 6: Responsive, Reduced Motion and Visual Hardening

**Files:** Create `assets/css/responsive.css`; modify `inc/assets.php`, `assets/css/components.css`, `tests/test-accessibility-contract.php`, `tests/test-canon-tokens.php`.

**Interfaces:** Produces responsive breakpoints, >=24px mobile gutter, reduced-motion behavior and visual-contract enforcement.

- [ ] **Step 1: Add failing tests** for mobile gutter, reduced-motion media query, absence of gradient/glow/glass patterns and accessible focus persistence.
- [ ] **Step 2: Run narrow tests**; expected FAIL for rules not yet present.
- [ ] **Step 3: Implement responsive/reduced-motion CSS** without introducing a second token source.
- [ ] **Step 4: Re-run tests**; expected PASS where executable.
- [ ] **Step 5: Commit** `feat(theme): harden responsive accessible presentation`.

### Task 7: Packaging, Evidence and R2 Gate Update

**Files:** Modify `README.md`; create `docs/project/TAIJIFU-R2-UI-EVIDENCE-v0.1.md`; update Evidence Map/Baseline only for states directly proven by fresh evidence.

**Interfaces:** Produces the auditable evidence package used to advance UI P3-P10 without overstating CI/runtime verification.

- [ ] **Step 1: Run all executable theme tests** and capture exact command/result. Also run relevant Core tests if the environment supports them.
- [ ] **Step 2: Perform source/static acceptance** for theme file manifest, Ω1 provenance, no banned visual constructs, Core/theme ownership boundary and packaging completeness.
- [ ] **Step 3: Record runtime-required checks separately**: WordPress install/activation, keyboard pass, viewport pass, screenshots/visual regression and staging. Mark each `VERIFIED`, `OPEN` or `BLOCKED`; never infer runtime PASS from source tests.
- [ ] **Step 4: Create the R2 evidence ledger** with commit SHAs and state transitions. Update `TAIJIFU-EVIDENCE-MAP-v0.1.md` and `TAIJIFU-BASELINE-v0.1.md` only where evidence justifies promotion.
- [ ] **Step 5: Commit** `docs(r2): record current ui manifestation evidence`.

---

## Execution Order and Parallelism
Tasks 1 → 2 → 3 establish shared interfaces and run sequentially. Task 4 and Task 5 may proceed after Task 3 but both touch `front-page.php`, so execute sequentially in one branch to avoid merge churn. Task 6 follows the stable composition. Task 7 is the verification gate and must be last.

## Definition of Done
- `wordpress/themes/taijifu-canon/` exists and satisfies WordPress theme contract.
- Approved Ω1 masters are wired with provenance; no identity redesign occurs.
- CANON tokens and visual bans are explicit/tested.
- Header/navigation/main/footer and Dojo Gate are semantic, responsive and accessibility-oriented.
- Core absence is non-fatal and explicit.
- Theme does not own domain registration.
- Source-level tests/evidence are recorded honestly.
- Runtime/CI states remain BLOCKED/OPEN until actually executed.
- Evidence Map and Baseline move only from fresh proof.
