# TAIJIFU Personalized Training Web V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the canonical `/treino-personalizado/` experience as a deterministic, accessible TAI → JI → FU → Feedback runtime training composer using only repository-owned official data.

**Architecture:** Keep composition logic pure and separate from rendering. Introduce focused modules for profile normalization, canonical catalog adaptation, deterministic composition, and browser experience state; then mount that experience into the existing semantic route with progressive enhancement. The canonical explanatory copy remains the non-JavaScript baseline.

**Tech Stack:** TypeScript, existing Vitest setup, existing browser bootstrap/semantic renderer, HTML/CSS, repository CANON snapshot; no new runtime dependency.

**Spec:** `docs/superpowers/specs/2026-10-01-personalized-training-design.md`

## Global Constraints

- Runtime flow is TAI / State → JI / Adaptation → FU / Manifestation → Feedback.
- Composition is deterministic and client-side.
- No login, backend, paid API, external AI service, Vercel dependency, or GitHub Actions dependency is required.
- Do not invent Bases, Faixas, Caminhos, Núcleos, exercises, metadata, or relationships absent from repository-owned official data.
- The feature is a training/fitness composer, not a medical diagnostic system.
- Canonical explanatory content must remain understandable without JavaScript.
- Same catalog + profile + request + feedback produces the same result; ties use stable repository IDs.
- Reuse official TAI/JI/FU design tokens and respect `prefers-reduced-motion`.
- Do not claim tests were executed without execution evidence.

## Review Focus

- Missing/blank required session intent must block composition with a typed validation result rather than invent defaults.
- Explicit restrictions that can be matched by catalog metadata must exclude conflicting candidates; unknown metadata must degrade explicitly.
- Equal-scoring candidates must resolve by stable canonical ID so repeated composition is identical.
- No-compatible-candidate and insufficient-metadata states must produce explicit non-session results rather than an invented workout.
- Editing TAI state after a FU result must invalidate downstream adaptation/result state before recomposition.

---

### Task 1: Define and normalize TAI session state

**Files:**
- Create: `apps/interactive-web/src/training/training-profile.ts`
- Create: `apps/interactive-web/src/training/training-profile.test.ts`

**Interfaces:**
- Produces: `TrainingProfileInput`, `TrainingProfile`, `ProfileValidationResult`, `normalizeTrainingProfile(input)`.
- `TrainingProfile` carries age range, experience, primary/secondary goals, preferred/rejected practices or movements, target capacities, equipment/space, duration, frequency, desired intensity, declared restrictions, and optional readiness.

- [ ] **Step 1: Write failing normalization and validation tests** covering trimming/deduplication, optional readiness, duration/intensity bounds, and blank primary intent returning an invalid result.
- [ ] **Step 2: Run** `npm test -- training-profile.test.ts` from `apps/interactive-web`; expect RED because the module does not exist.
- [ ] **Step 3: Implement** `normalizeTrainingProfile(input: TrainingProfileInput): ProfileValidationResult` as a pure function with no DOM/storage/network access.
- [ ] **Step 4: Run** the same focused test; expect PASS.
- [ ] **Step 5: Commit** `feat(training): define canonical session profile`.

### Task 2: Adapt repository CANON into a training catalog without inventing metadata

**Files:**
- Create: `apps/interactive-web/src/training/training-catalog.ts`
- Create: `apps/interactive-web/src/training/training-catalog.test.ts`
- Read/consume: `apps/interactive-web/src/content/canon-snapshot.ts`

**Interfaces:**
- Consumes: repository CANON snapshot types/data.
- Produces: `TrainingCandidate`, `TrainingCatalog`, `buildTrainingCatalog()` and provenance fields containing canonical IDs.

- [ ] **Step 1: Write failing catalog contract tests** asserting every exposed candidate has a stable repository ID, every referenced ID exists in CANON, and absent exercise/dosage/rest metadata remains absent rather than synthesized.
- [ ] **Step 2: Run** `npm test -- training-catalog.test.ts`; expect RED.
- [ ] **Step 3: Implement** `buildTrainingCatalog(): TrainingCatalog` as a read-only adapter over official data; represent unsupported composition metadata explicitly as unavailable.
- [ ] **Step 4: Run** the focused test; expect PASS.
- [ ] **Step 5: Commit** `feat(training): adapt canonical training catalog`.

### Task 3: Implement deterministic JI filtering and scoring

**Files:**
- Create: `apps/interactive-web/src/training/training-composer.ts`
- Create: `apps/interactive-web/src/training/training-composer.test.ts`

**Interfaces:**
- Consumes: `TrainingProfile` and `TrainingCatalog`.
- Produces: `CompositionDecision`, `CompositionResult`, `composeTraining(profile, catalog, feedback?)`.
- Result union must distinguish `composed`, `no-compatible-candidates`, `insufficient-metadata`, and `invalid-request`.

- [ ] **Step 1: Write failing composer tests** for explicit constraint filtering, goal/preference scoring only when matching metadata exists, stable-ID tie-breaking, repeated-call determinism, no-compatible-candidate, and insufficient-metadata results.
- [ ] **Step 2: Run** `npm test -- training-composer.test.ts`; expect RED.
- [ ] **Step 3: Implement** `composeTraining(...)` as a pure deterministic function. Never randomize and never infer missing catalog metadata.
- [ ] **Step 4: Run** the focused test; expect PASS.
- [ ] **Step 5: Commit** `feat(training): compose deterministic adaptive sessions`.

### Task 4: Define the TAI → JI → FU → Feedback experience state machine

**Files:**
- Create: `apps/interactive-web/src/training/training-experience.ts`
- Create: `apps/interactive-web/src/training/training-experience.test.ts`

**Interfaces:**
- Consumes: normalized profile and composer result.
- Produces: `TrainingStage = 'intro' | 'tai' | 'ji' | 'fu' | 'feedback'`, `TrainingExperienceState`, and pure transition helpers.

- [ ] **Step 1: Write failing transition tests** for forward/back navigation, preventing FU without a successful composition, and invalidating JI/FU output when TAI input changes after composition.
- [ ] **Step 2: Run** `npm test -- training-experience.test.ts`; expect RED.
- [ ] **Step 3: Implement** pure state transitions; changing TAI increments a revision and clears downstream decision/result/feedback state.
- [ ] **Step 4: Run** the focused test; expect PASS.
- [ ] **Step 5: Commit** `feat(training): model tai ji fu experience state`.

### Task 5: Render a progressively enhanced canonical training surface

**Files:**
- Create: `apps/interactive-web/src/training/training-render.ts`
- Create: `apps/interactive-web/src/training/training-render.test.ts`
- Modify: `apps/interactive-web/src/semantic-site.ts`
- Modify: `apps/interactive-web/src/semantic-site.test.ts`

**Interfaces:**
- Consumes: existing official page content plus `TrainingExperienceState`.
- Produces: semantic training markup with one enhancement mount root, stage labels, native form controls, accessible errors/status, and preserved source authority.

- [ ] **Step 1: Write failing semantic tests** requiring `content-page--training`, `data-surface="personalized-training"`, a stable enhancement root, visible TAI/JI/FU labels, fieldsets/legends, an `aria-live` composition status, and the existing official non-medical/canonical explanatory copy.
- [ ] **Step 2: Run** `npm test -- training-render.test.ts semantic-site.test.ts`; expect RED.
- [ ] **Step 3: Implement** the renderer and route specialization without creating a second route tree. The static route remains useful when scripts fail.
- [ ] **Step 4: Run** the focused tests; expect PASS.
- [ ] **Step 5: Commit** `feat(training): render canonical personalized training surface`.

### Task 6: Mount browser interaction without network dependencies

**Files:**
- Create: `apps/interactive-web/src/training/training-browser.ts`
- Create: `apps/interactive-web/src/training/training-browser.test.ts`
- Modify: `apps/interactive-web/src/browser-bootstrap.ts`
- Modify: `apps/interactive-web/src/browser-bootstrap.test.ts`
- Modify: `apps/interactive-web/src/browser-bootstrap.progressive-enhancement.test.ts`

**Interfaces:**
- Consumes: training mount root, profile/catalog/composer/state modules.
- Produces: `mountTrainingExperience(root: HTMLElement)` with local event handling only.

- [ ] **Step 1: Write failing browser tests** for mounting only on the training route/root, collecting native form values, composing on JI transition, rendering FU result/error state, returning to TAI, and no network/fetch requirement.
- [ ] **Step 2: Run** `npm test -- training-browser.test.ts browser-bootstrap.test.ts browser-bootstrap.progressive-enhancement.test.ts`; expect RED.
- [ ] **Step 3: Implement** event delegation and state-driven rerendering. Do not introduce fetch, remote persistence, or framework/runtime dependencies.
- [ ] **Step 4: Run** the focused tests; expect PASS.
- [ ] **Step 5: Commit** `feat(training): mount personalized training experience`.

### Task 7: Add lightweight local Feedback loop

**Files:**
- Create: `apps/interactive-web/src/training/training-feedback.ts`
- Create: `apps/interactive-web/src/training/training-feedback.test.ts`
- Modify: `apps/interactive-web/src/training/training-browser.ts`
- Modify: `apps/interactive-web/src/training/training-browser.test.ts`

**Interfaces:**
- Produces: `TrainingFeedback` and safe local serialization helpers. Feedback includes completion, perceived intensity, preference/rejection signals, and optional non-medical notes.

- [ ] **Step 1: Write failing tests** for round-trip serialization, malformed local data returning an empty safe state, and feedback influencing only metadata-supported future scoring.
- [ ] **Step 2: Run** `npm test -- training-feedback.test.ts training-browser.test.ts`; expect RED.
- [ ] **Step 3: Implement** local-only feedback helpers and browser integration. The composer must still work when storage is unavailable.
- [ ] **Step 4: Run** the focused tests; expect PASS.
- [ ] **Step 5: Commit** `feat(training): close local feedback loop`.

### Task 8: Apply official TAI/JI/FU visual language and accessibility states

**Files:**
- Modify: `apps/interactive-web/src/styles.css`
- Modify: `apps/interactive-web/src/canon-ui-presentation.test.ts`
- Test: `apps/interactive-web/src/training/training-render.test.ts`

**Interfaces:**
- Consumes: semantic classes/data attributes from Task 5.
- Produces: responsive training presentation using existing `--tj-color-tai`, `--tj-color-ji`, `--tj-color-fu`, spacing/type tokens, focus states, and reduced-motion behavior.

- [ ] **Step 1: Write failing presentation contract tests** for training surface selectors, official triad tokens, visible focus/error/current-stage treatment, compact-screen layout, and `prefers-reduced-motion` coverage.
- [ ] **Step 2: Run** `npm test -- canon-ui-presentation.test.ts training-render.test.ts`; expect RED.
- [ ] **Step 3: Recover the complete current stylesheet before replacement**, then add only training-specific rules that reuse official tokens.
- [ ] **Step 4: Run** focused presentation tests; expect PASS.
- [ ] **Step 5: Commit** `feat(training): style tai ji fu composition journey`.

### Task 9: Verify the integrated Web V1 journey and document evidence

**Files:**
- Create: `apps/interactive-web/src/training/training-integration.test.ts`
- Modify only if required by verified failures: training modules from Tasks 1–8.

**Interfaces:**
- Consumes: all prior public interfaces.
- Produces: one integration contract proving official data → TAI state → JI decision → FU result → feedback without external services.

- [ ] **Step 1: Write the integration test** with a fixed profile and assert deterministic result/provenance, explicit handling when the current CANON cannot support a concrete exercise session, and no fabricated metadata.
- [ ] **Step 2: Run** `npm test -- training-integration.test.ts`; expect PASS after Tasks 1–8, otherwise fix only the verified defect.
- [ ] **Step 3: Run the complete existing Vitest command defined by the app package**, if an execution environment is available; record actual output rather than assuming success.
- [ ] **Step 4: If a browser runner is available without adding project infrastructure**, exercise keyboard-only TAI → JI → FU and compact/desktop layouts; otherwise record browser verification as pending rather than introducing Actions/Vercel.
- [ ] **Step 5: Compare branch against its base** and verify no new external runtime/CI dependency was added.
- [ ] **Step 6: Commit** `test(training): verify personalized training web v1`.

## Self-review result

- Spec coverage: TAI/JI/FU/Feedback, deterministic composition, official-data provenance, progressive enhancement, accessibility, local-only persistence, failure states, and dependency constraints are each owned by a task.
- Type consistency: profile → catalog → composer → experience → renderer/browser interfaces flow in one direction; browser code does not own composition rules.
- Highest-risk gaps are pinned in Review Focus and Tasks 1, 3, 4, and 9.
- The current CANON may not expose exercise-level dosage/rest metadata. The plan deliberately treats that as an explicit `insufficient-metadata` path rather than authorizing invented workout content.
