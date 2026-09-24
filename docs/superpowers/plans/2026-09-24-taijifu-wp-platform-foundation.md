# TAIJIFU WordPress Platform Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing TAIJIFU WordPress plugin into the single platform foundation for public site + authenticated Meu Dojo, with shared identity, capabilities, application routes and extensible domain boundaries for LMS, Personalized Training, Community and Library.

**Architecture:** `taijifu-core` owns platform/domain behavior and WordPress capabilities; the theme owns presentation. Foundation work creates the shared practitioner identity and Meu Dojo application contract before LMS/community/training features are layered on. The historical `taijifu-platform` is not a runtime dependency.

**Tech Stack:** WordPress/PHP 8+, WP users/capabilities, CPT/taxonomy APIs, WP REST API, WordPress PHPUnit.

**Spec:** `docs/TAIJIFU-WORDPRESS-PLATFORM-V1.md`

## Global Constraints
- WordPress site IS the TAIJIFU Platform.
- One WordPress account across LMS, Community and Personalized Training.
- Business rules live in `taijifu-core`, not the theme.
- Public Dojo Gate visual direction remains unchanged by foundation work.
- Capabilities, not role-name checks, govern privileged actions.
- Private practitioner/progress/training data is private by default.
- Plugin deactivation must not delete platform data.
- No dependency on the historical Platform runtime.

## Review Focus
- Accidental second authentication/profile system.
- Theme-side business rules.
- Public REST leakage of practitioner state.
- Destructive activation/deactivation behavior.
- Hard-coded role-name authorization.
- Foundation abstractions that prematurely implement LMS/community behavior.

## Current repository observation
At plan time, `wordpress/plugins/taijifu-core/` exists with `taijifu-core.php`, `includes/` and `tests/`. The current `includes/` contains activation, content-type and taxonomy classes. The theme used for current WordPress testing is not yet represented under `wordpress/themes/` on this branch, so this foundation plan avoids pretending theme files exist and defines the presentation contract for a later synchronized theme task.

### Task 1: Baseline plugin boot and test harness
**Files:** existing `wordpress/plugins/taijifu-core/taijifu-core.php`, `tests/**`, new focused bootstrap tests as needed.
- [ ] Read current plugin bootstrap/activation/content-type/taxonomy code and existing tests.
- [ ] Write/extend a failing smoke test proving Core can boot without the TAIJIFU theme.
- [ ] Run test and confirm failure where the new platform contract is absent.
- [ ] Add minimal platform service bootstrap without implementing feature domains.
- [ ] Run plugin tests and require green.
- [ ] Commit: `refactor(core): establish platform service bootstrap`.

### Task 2: Platform capabilities and roles
**Files:** `includes/platform/class-capabilities.php`, activation integration, tests.
- [ ] Write failing tests for practitioner, instructor, moderator and canon-editor capability sets.
- [ ] Implement stable custom capabilities and role assignment on activation/upgrade.
- [ ] Test authorization using capabilities rather than role names.
- [ ] Verify deactivation leaves users/content intact.
- [ ] Commit: `feat(platform): establish TAIJIFU capabilities`.

### Task 3: Practitioner profile contract
**Files:** `includes/platform/class-practitioner-profile.php`, tests.
- [ ] Write failing tests for a bounded non-sensitive practitioner profile contract.
- [ ] Implement read/update APIs over WP user/meta with explicit allowed fields.
- [ ] Add ownership/capability checks and sanitization.
- [ ] Test another practitioner cannot read/write private profile fields.
- [ ] Commit: `feat(platform): add practitioner profile domain`.

### Task 4: Meu Dojo application contract
**Files:** `includes/platform/class-meu-dojo.php`, REST/application service tests.
- [ ] Define dashboard response contract: identity summary, continuation slots, training slot, learning slot, community slot, achievements slot.
- [ ] Write failing authenticated/anonymous tests.
- [ ] Implement an authenticated dashboard service returning empty/available states without fabricating feature data.
- [ ] Verify inactive/unimplemented domains degrade explicitly instead of fataling.
- [ ] Commit: `feat(platform): establish Meu Dojo dashboard contract`.

### Task 5: Secure REST foundation
**Files:** `includes/platform/class-rest.php`, tests.
- [ ] Write failing tests for authentication, ownership, permission callbacks and malformed input.
- [ ] Implement versioned `/taijifu/v1/` route registration for platform profile/dashboard interfaces.
- [ ] Ensure private endpoints are never public-readable.
- [ ] Add consistent error envelope/status behavior.
- [ ] Commit: `feat(platform): add secure application API foundation`.

### Task 6: Domain extension interfaces
**Files:** `includes/platform/class-domain-registry.php`, tests.
- [ ] Write tests for registering LMS, Training, Community and Library providers by stable domain ID.
- [ ] Implement a small provider/registry contract so Meu Dojo can aggregate feature summaries without coupling implementations.
- [ ] Reject duplicate domain IDs and invalid providers.
- [ ] Test missing providers produce unavailable states.
- [ ] Commit: `feat(platform): add platform domain registry`.

### Task 7: Privacy/export/erase hooks
**Files:** `includes/platform/class-privacy.php`, tests.
- [ ] Write tests for platform-owned practitioner fields in WordPress privacy export.
- [ ] Implement exporter/eraser hooks for Foundation-owned profile data only.
- [ ] Ensure content/progress deletion is not performed on plugin deactivation.
- [ ] Commit: `feat(platform): integrate WordPress privacy controls`.

### Task 8: Foundation integration validation
**Files:** tests, `docs/WORDPRESS-QA.md`.
- [ ] Run full Core tests.
- [ ] Activate/deactivate/reactivate against a clean WordPress test instance.
- [ ] Verify one WP account accesses profile + Meu Dojo API.
- [ ] Verify anonymous/private-cross-user access is denied.
- [ ] Verify existing public content types/taxonomies still register.
- [ ] Record evidence and exact commands/output in QA doc.
- [ ] Commit: `test(platform): validate unified WordPress foundation`.

## Definition of Done
Foundation is complete when `taijifu-core` boots independently, provides stable capabilities, a private practitioner profile, an authenticated Meu Dojo dashboard contract, secure versioned APIs and domain extension points; deactivation is non-destructive; and no second runtime/authentication system is introduced.