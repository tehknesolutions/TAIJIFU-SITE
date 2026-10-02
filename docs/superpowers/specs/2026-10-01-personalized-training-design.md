# TAIJIFU Personalized Training Web V1 — Design Spec

## Status
Approved architectural direction for specification. Implementation remains gated on review of this written spec.

## Goal
Transform `/treino-personalizado/` from an editorial page into the flagship functional Web V1 experience: a runtime training composer expressed through the canonical TAI → JI → FU model.

## Canonical authority
The implementation must preserve the official content already registered in `apps/interactive-web/src/content/official-page-content.ts` under `treino-personalizado` and the versioned CANON data used by the site.

The official model is:
- TAI / State: capture context, objectives, resources, preferences, limits, and the session request.
- JI / Adaptation: filter incompatible candidates, score compatible exercises, and compose a balanced session.
- FU / Manifestation: produce the concrete workout with order, dosage, rest, instructions, rationale, and alternatives.
- Feedback loop: return session outcome as evidence for a future composition.

The V1 interview covers age range, training experience, primary/secondary goals, preferred styles/practices, liked/rejected movements, target areas/capacities, available equipment/space, duration/frequency, desired perceived intensity, relevant safety restrictions, and optional energy/readiness.

## Product principles
1. The triad is the interaction model, not decorative branding.
2. Composition happens at runtime.
3. The composer is deterministic and client-side for Web V1.
4. No login, backend, paid API, external AI service, Vercel dependency, or GitHub Actions dependency is required for the experience to work.
5. ChatGPT + GitHub remain the project development workflow; end users do not require ChatGPT to run a session.
6. Canonical curriculum content must come from repository-owned official data. Do not invent Bases, Belts, Paths, Nuclei, exercises, or relationships absent from the CANON.
7. Personalized training is a training/fitness composer, not a medical diagnostic system. Declared restrictions are handled conservatively where metadata supports it.
8. Progressive enhancement: the canonical explanatory content remains understandable even if interactive JavaScript is unavailable.

## Experience architecture

### Entry
The route introduces Personalized Training as a runtime composition experience and exposes a clear action to begin. The source authority and non-medical boundary remain visible without dominating the experience.

### TAI — State
TAI captures the current state and the invariants for this session. Inputs are grouped around intention, current context, available resources, preferences, limits, requested duration/intensity, and readiness.

The user can review the captured state before advancing. Required fields must be minimal; optional fields must be visibly optional. No health diagnosis is inferred from answers.

### JI — Adaptation
JI converts state into composition constraints and decisions. The UI must show enough of the reasoning to make adaptation legible rather than behaving as an opaque randomizer.

The deterministic engine:
1. excludes candidates that conflict with explicit constraints when repository metadata can establish the conflict;
2. scores compatible candidates against goals, preferences, resources, duration, intensity, and recent feedback where available;
3. selects a balanced set without claiming relationships not represented by official data;
4. produces rationale data that FU can display.

If repository data is insufficient to safely make a requested distinction, the engine must degrade explicitly rather than fabricate metadata.

### FU — Manifestation
FU renders the concrete session. The result should expose, when supported by official data:
- ordered session structure;
- selected canonical entities/exercises;
- dosage or time;
- rest;
- concise instructions;
- composition rationale;
- alternatives compatible with the same known constraints;
- provenance back to official repository data.

The result must be usable as a practice surface, not merely a prose report.

### Feedback loop
After the session, the user can record lightweight outcome evidence suitable for future composition: completion, perceived intensity, preference/rejection signals, and optional readiness/outcome notes that do not become medical records.

Web V1 persistence should be local-only if persistence is implemented. The core composer must not require an account.

## Data boundaries
The implementation should separate four responsibilities:

1. `training-profile` — validated user/session state.
2. `training-catalog` — adapter over official repository-owned training/CANON data.
3. `training-composer` — pure deterministic filtering/scoring/composition logic.
4. `training-experience` — UI state machine for TAI → JI → FU → Feedback.

The composer receives explicit data and returns an explicit composition result. It must not read the DOM or depend on network calls.

## State model
Minimum state machine:
- `intro`
- `tai`
- `ji`
- `fu`
- `feedback`

Transitions are explicit and reversible before composition. Returning to TAI and changing an input invalidates downstream JI/FU output and recomposes from the new state.

## Determinism
Given the same canonical catalog, profile, session request, and feedback state, the composer returns the same result. Tie-breaking must use stable repository identifiers rather than randomness.

This is essential for testing, explainability, and independence from external services.

## Visual language
TAI, JI, and FU reuse the official design tokens already used by the principle pages. The interaction should feel like movement through three related states rather than a generic SaaS wizard.

- TAI emphasizes grounding/state and the TAI token.
- JI emphasizes choices/adaptation and the JI token.
- FU emphasizes the manifested session and the FU token.
- Motion is optional enhancement and respects `prefers-reduced-motion`.
- Keyboard operation, visible focus, semantic form controls, fieldsets/legends, error association, and screen-reader status for recomposition are required.

## URL and navigation
The canonical route remains `/pt-br/treino-personalizado/` for pt-BR localization. Existing canonical IA and contextual navigation remain authoritative. The experience must not create a second route tree for its internal stages in V1.

## Failure and empty states
The UI must define explicit states for:
- insufficient required input;
- no compatible candidates after filtering;
- requested equipment unavailable in catalog metadata;
- requested duration too small for a meaningful supported composition;
- canonical data missing metadata required for a decision;
- JavaScript unavailable.

None of these states may silently invent a workout.

## Testing strategy
Use TDD with tests below the UI first.

1. Unit tests for profile normalization and validation.
2. Unit tests for deterministic filtering, scoring, tie-breaking, and empty states.
3. Contract tests proving selected canonical IDs exist in the repository catalog.
4. Semantic rendering tests for TAI/JI/FU/Feedback surfaces and accessibility structure.
5. Browser tests for the complete keyboard-operable TAI → JI → FU journey when a browser runner is available.
6. Presentation contracts proving reuse of official TAI/JI/FU tokens and reduced-motion support.

Do not claim execution of a test suite unless execution evidence exists in the active workflow.

## Initial Web V1 scope
Included:
- one-session composition;
- canonical/local data only;
- deterministic engine;
- TAI/JI/FU interaction;
- explainable result;
- graceful empty states;
- lightweight local feedback if supported cleanly;
- responsive and accessible presentation.

Deferred:
- accounts and cloud profiles;
- remote synchronization;
- coach dashboards;
- social/community features;
- generative AI composition;
- medical diagnosis or treatment recommendations;
- dependencies on external hosted services.

## Acceptance criteria
The feature is ready for Web V1 when a user can enter the canonical Personalized Training route, complete TAI state capture, observe JI adaptation, receive a deterministic FU session sourced only from official repository data, understand why the session was composed, and provide feedback, with the core flow functioning without external services.
