# R2 Current UI Manifestation — Design Specification

Status: APPROVED DESIGN / PRE-IMPLEMENTATION
Date: 2026-09-27
Track: Baseline v0.1 → R2 Current UI Manifestation

## Intent
Manifest one current, auditable TAIJIFU WordPress presentation surface from existing authority instead of creating another visual branch. The implementation must preserve genealogy while treating current CANON/Ω1 authority as normative.

## Authority chain
1. `docs/TAIJIFU-WORDPRESS-ARCHITECTURE-V1.md` — approved WordPress implementation source of truth.
2. `docs/CANON_SYNC.md` — Canon snapshot/public routing/material reset contract.
3. `docs/lab-ui-ux/TAIJIFU-OFFICIAL-LOGO-OMEGA1.md` and `TAIJIFU-OMEGA1-ENGINEERING-SPEC.md` — Ω1 identity authority.
4. `brand/omega1/master/*` — manifested Ω1 production masters.
5. `brand/omega1/hnk/*` — HNK source glyphs.
6. `brand/wordmark/construction/*` — wordmark candidates; not master authority until promoted by its own gate.
7. Historical v2.2 evidence is genealogy only and must not override later CANON.

## Architecture
The public UI is implemented as an independently bootable WordPress theme at `wordpress/themes/taijifu-canon/`. Domain/content behavior remains in `wordpress/plugins/taijifu-core/`. Theme and Core may integrate through explicit WordPress contracts but neither may absorb the other's responsibility.

The theme is built from four layers:
- **authority assets** — copied/consumed from approved production identity assets without redesign;
- **design tokens** — CSS custom properties for paper/charcoal/TAI/JI/FU/integration color semantics, typography, spacing, layout and motion;
- **semantic shell** — header, accessible navigation, main/footer landmarks, template hierarchy and graceful Core-unavailable behavior;
- **Dojo Gate composition** — the current CANON landing experience, responsive and accessible by construction.

## Visual contract
- warm paper is the dominant canvas;
- charcoal is reserved for authority/dojo surfaces;
- no gradients, neon, glow, glass or faux material textures;
- mobile gutter is at least 24px;
- Tai red, Ji blue, Fu yellow/gold and Integration green are functional semantic colors;
- Ω1 uses the approved standard/micro master rules rather than a newly drawn emblem;
- wordmark remains a candidate asset until its master gate is closed; the theme must not silently promote V2 construction to master.

## UX/accessibility contract
- semantic landmarks and heading hierarchy;
- keyboard-operable navigation and controls;
- visible focus;
- no hover-only interaction;
- contrast appropriate to content role;
- reduced-motion support;
- responsive navigation with reachable primary CTA;
- explicit graceful behavior when `taijifu-core` capabilities are unavailable.

## Integration boundaries
- `taijifu-core` owns content/domain registration and platform/domain behavior.
- `taijifu-canon` owns presentation, templates, visual tokens and interaction shell.
- official Canon content remains subordinate to the versioned Canon snapshot/contract rather than editable legacy CPT authority.
- legacy routes documented by `CANON_SYNC.md` remain migration/routing concerns and must not be reintroduced as competing IA.

## Implementation slices
1. Theme contract/scaffold and executable theme tests.
2. Token system and approved identity asset wiring.
3. Semantic shell: header/navigation/main/footer + Core-unavailable state.
4. Dojo Gate/home composition from approved WordPress architecture/CANON.
5. Responsive/accessibility/motion hardening.
6. Core integration and Canon routing/content contract.
7. Visual regression + packaging/staging evidence.

## Verification
No slice is promoted from IMPLEMENTED to VERIFIED without executable evidence. Required evidence includes PHP/theme contract tests where practical, static asset/path checks, responsive/keyboard/accessibility acceptance, visual regression references and install/package/staging evidence. Current GitHub Actions runner failure remains an external verification blocker; local/source-level tests may be added but CI PASS must not be claimed until runner execution is restored.

## Anti-rework locks
- Do not resurrect v2.2 as current authority.
- Do not redraw Ω1.
- Do not silently promote wordmark V2 to master.
- Do not move domain behavior from Core into Theme.
- Do not create a second theme implementation path while `taijifu-canon` is the approved target.
- Do not redesign historical routes/content models while manifesting the shell.
- Do not claim runtime/visual verification from source presence alone.

## Success criteria
R2 is complete when `taijifu-canon` is manifested as a bootable current-CANON theme, integrates with `taijifu-core` through explicit boundaries, renders the Dojo Gate/current IA responsively and accessibly, uses approved Ω1/material authority, has graceful Core-unavailable behavior, and carries reproducible test/visual/package evidence sufficient to move UI P3-P10 through their appropriate states.
