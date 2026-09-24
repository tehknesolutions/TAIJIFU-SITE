# TAIJIFU Personalized Training Engine V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a dynamic `Treino Personalizado` experience whose workouts are composed at runtime from each user's answers, constraints, preferences, resources, history and feedback.

**Architecture:** `taijifu-core` owns exercise data, profiles, normalization, filtering, scoring, composition, audit/history and secure endpoints. `taijifu-canon` owns the adaptive interview and workout/feedback UI. The algorithm filters hard constraints first, scores remaining candidates, uses controlled variation among similarly valid candidates, validates the session budget and stores an auditable recipe; it never maps a static profile directly to a fixed workout.

**Tech Stack:** WordPress/PHP 8+, WordPress REST API, WP user meta/custom post/meta where appropriate, semantic HTML/CSS, minimal vanilla JavaScript, WordPress PHPUnit test harness.

**Spec:** `docs/TAIJIFU-PERSONALIZED-TRAINING-ENGINE-V1.md`

## Global Constraints
- Runtime composition, never fixed `profile => workout` templates.
- Hard constraints filter before scoring/variation.
- Controlled variation may change valid selections but never violate constraints.
- Each selection must be explainable and auditable.
- Theme contains no selection algorithm.
- Plugin inactive must not fatal the theme.
- Private profile/history data must not be publicly exposed.
- Insufficient compatibility/safety data yields an unavailable/needs-review result rather than invented safety.
- V1 is training/fitness personalization, not medical diagnosis.

## Review Focus
- Hidden static-workout lookup disguised behind questionnaire logic.
- Randomness that can bypass safety/equipment/space constraints.
- Scoring that ignores recent history and feedback.
- Duration math that produces sessions far outside requested time.
- Public REST exposure of user profile/history.
- Adult programming assumptions applied to minors by merely scaling numbers.

## File Map

### Core plugin
- `wordpress/plugins/taijifu-core/includes/training/class-training-profile.php` — normalized profile/session request.
- `.../class-exercise-catalog.php` — exercise model/query adapter.
- `.../class-training-constraints.php` — hard filtering.
- `.../class-training-scorer.php` — explainable candidate scoring.
- `.../class-training-composer.php` — phase/time-budget composition + controlled variation.
- `.../class-training-feedback.php` — history/feedback weighting.
- `.../class-training-rest.php` — authenticated API routes/authorization.
- `.../class-training-audit.php` — engine version/input fingerprint/recipe metadata.
- `tests/training/**` — engine/API tests.

### Theme
- `wordpress/themes/taijifu-canon/patterns/personalized-training.php` — page shell.
- `assets/js/personalized-training.js` — adaptive interview/session/feedback client.
- `assets/css/personalized-training.css` — responsive CANON UI.
- header/navigation files — add `Treino Personalizado` destination.

### Documentation/data
- `manual/registry/exercises/` or canonical exercise registry location chosen during unified-repo migration — structured exercise metadata.
- `docs/WORDPRESS-QA.md` — personalization QA cases.

---

### Task 1: Define normalized profile and interview contract
- [ ] Write failing tests for answer normalization, conditional answers and session request defaults.
- [ ] Implement immutable normalized profile/request value objects.
- [ ] Define question IDs/options/conditional visibility contract without embedding workout outcomes.
- [ ] Test different answer sets normalize to different fingerprints.
- [ ] Commit: `feat(training): define adaptive profile contract`.

### Task 2: Establish structured exercise catalog
- [ ] Write failing validation tests for required exercise metadata.
- [ ] Define catalog schema covering category, goals, level, equipment, space, intensity, constraints, dosage, regressions/progressions and semantic tags.
- [ ] Import only exercises whose metadata is sufficient for safe composition; mark incomplete records unavailable.
- [ ] Add representative fixtures spanning multiple goals/equipment/levels.
- [ ] Commit: `feat(training): establish composable exercise catalog`.

### Task 3: Hard-constraint engine
- [ ] Write failing tests proving incompatible equipment/space/constraint/age-policy candidates are removed.
- [ ] Implement filtering as a separate pure service.
- [ ] Return machine-readable exclusion reasons for audit/debugging.
- [ ] Test that no later scorer/randomizer can reintroduce excluded IDs.
- [ ] Commit: `feat(training): enforce hard composition constraints`.

### Task 4: Explainable scoring engine
- [ ] Write failing tests for goal, preference, level, intensity and variety/history weights.
- [ ] Implement additive/normalized scoring with per-factor reason breakdown.
- [ ] Add recent-exercise repetition penalty without making repetition impossible when required.
- [ ] Verify changing one meaningful answer changes relevant candidate scores.
- [ ] Commit: `feat(training): score exercises from user context`.

### Task 5: Dynamic session composer
- [ ] Write failing tests for phase allocation, requested-time tolerance, duplicates and controlled variation.
- [ ] Implement phase budget allocation from the session request.
- [ ] Select from scored candidates using bounded weighted variation among suitable choices.
- [ ] Assign dosage/rest inside exercise metadata ranges.
- [ ] Validate final recipe against hard constraints and time budget before returning it.
- [ ] Test regeneration can differ while remaining valid.
- [ ] Commit: `feat(training): compose personalized sessions at runtime`.

### Task 6: Feedback/history adaptation
- [ ] Write failing tests for easy/adequate/difficult and completion outcomes affecting future weighting/dosage.
- [ ] Implement history adapter and feedback weighting.
- [ ] Ensure feedback cannot weaken declared hard constraints.
- [ ] Test exercise likes/dislikes affect future scoring where valid alternatives exist.
- [ ] Commit: `feat(training): adapt composition from session feedback`.

### Task 7: Audit and reproducibility metadata
- [ ] Write failing tests for engine version, normalized input fingerprint, candidate/exclusion reasons and selected recipe IDs.
- [ ] Implement audit record generation without logging unnecessary sensitive raw data.
- [ ] Persist enough information to explain why a session was generated.
- [ ] Commit: `feat(training): add explainable generation audit`.

### Task 8: Secure REST boundary
- [ ] Write failing authorization/privacy tests for profile, generate, history and feedback routes.
- [ ] Implement authenticated endpoints with nonce/capability/ownership checks.
- [ ] Validate/sanitize all request fields against the interview contract.
- [ ] Ensure public/anonymous requests cannot enumerate private profile/history.
- [ ] Commit: `feat(training): expose secure personalization API`.

### Task 9: Adaptive interview UI
- [ ] Add theme integration test/smoke assertion for `Treino Personalizado` navigation and page shell.
- [ ] Implement one-question/section-at-a-time adaptive interview with conditional branches.
- [ ] Add review/edit answers step before generation.
- [ ] Ensure keyboard, touch, progress indication and error states work.
- [ ] Theme calls API only; no workout-selection rules in JavaScript.
- [ ] Commit: `feat(theme): add adaptive personalized training interview`.

### Task 10: Generated workout + regeneration UI
- [ ] Implement session summary with objective, duration, intensity and required equipment.
- [ ] Render ordered exercises with dosage/rest/instruction and `por que entrou no seu treino` rationale.
- [ ] Add `Gerar outro treino` using the same profile/request and a new generation request.
- [ ] Add graceful states for insufficient candidates/core unavailable.
- [ ] Verify regeneration does not silently change hard constraints.
- [ ] Commit: `feat(theme): render dynamic personalized workouts`.

### Task 11: Execution and feedback UI
- [ ] Implement session execution/progress presentation without requiring motion.
- [ ] Capture completion, perceived difficulty, optional likes/dislikes and notes.
- [ ] Submit feedback securely and show how it will affect future adaptation in plain language.
- [ ] Verify incomplete/stopped sessions remain valid history events.
- [ ] Commit: `feat(theme): close personalized training feedback loop`.

### Task 12: Personalization regression matrix
- [ ] Add automated scenarios varying goal, time, equipment, intensity, preference, constraint and history independently.
- [ ] Assert materially different inputs alter scores/composition where relevant.
- [ ] Assert hard constraints are invariant under repeated regeneration.
- [ ] Assert all generated recipes meet phase/time/duplicate rules.
- [ ] Run privacy/authorization tests.
- [ ] Record QA evidence in `docs/WORDPRESS-QA.md`.
- [ ] Commit: `test(training): validate runtime personalization matrix`.

### Task 13: Package updated plugin and theme
- [ ] Run all taijifu-core tests and theme smoke/accessibility checks.
- [ ] Generate independently installable `taijifu-core.zip` and `taijifu-canon.zip` from clean package roots.
- [ ] Install both on a clean WordPress instance and execute at least three materially different interview scenarios.
- [ ] Deactivate plugin and confirm theme shows graceful unavailable state rather than fatal error.
- [ ] Reactivate and verify saved profile/history remain.
- [ ] Record versions and SHA-256 hashes.
- [ ] Commit: `release: add dynamic personalized training V1`.

## Definition of Done
The feature is complete only when workouts are demonstrably composed from current answers rather than static profile templates; constraints cannot be bypassed by variation; meaningful answer/history changes affect scoring/composition; generated sessions are explainable and fit their requested budget; private data is protected; the theme remains functional without the plugin; and independently installable updated theme/plugin ZIPs pass clean-install validation.