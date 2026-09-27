# TAIJIFU Canon Theme

Current-CANON WordPress presentation surface.

## Authority

- `docs/TAIJIFU-WORDPRESS-ARCHITECTURE-V1.md`
- `docs/CANON_SYNC.md`
- `docs/superpowers/specs/2026-09-27-r2-current-ui-manifestation-design.md`

Presentation belongs here. Domain/content behavior remains in `wordpress/plugins/taijifu-core/`.

## Identity provenance

Theme production copies are lossless copies of:
- `brand/omega1/master/omega1-master.svg`
- `brand/omega1/master/omega1-micro-master.svg`

The wordmark V2 construction artifact is **not a master** and is not promoted by this theme.

## Contract checks

Run from the repository root when PHP is available:

- `php wordpress/themes/taijifu-canon/tests/test-theme-contract.php`
- `php wordpress/themes/taijifu-canon/tests/test-canon-tokens.php`
- `php wordpress/themes/taijifu-canon/tests/test-brand-assets.php`

GitHub Actions runtime verification remains blocked by the repository-level runner scheduling issue; source presence alone is not CI verification.
