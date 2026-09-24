# TAIJIFU Personalized Training Engine V1

Status: APPROVED DESIGN / implementation source of truth

## Intent
Create a **Treino Personalizado** area that generates a session from the user's actual answers and evolving feedback. It MUST NOT map a fixed profile or answer to a permanently fixed workout.

## Core invariant
**Personalized means composed at runtime.**

A session is a function of the current profile, current answers, constraints, preferences, available resources, requested duration/intensity, exercise metadata, recent session history and feedback. The same user may receive a different valid session on another generation while the engine preserves their constraints and goals.

No implementation may reduce V1 to `if answer X => workout Y` or a small set of static profile templates.

## TAI → JI → FU
- **TAI / State:** capture what must be respected: context, goals, resources, preferences, limits and session request.
- **JI / Adaptation:** filter unsafe/incompatible candidates, score compatible exercises and compose a balanced session.
- **FU / Manifestation:** produce the concrete workout with order, dosage, rest, instructions, rationale and alternatives.
- **Feedback loop:** session result returns as evidence for the next composition.

## Adaptive interview
The interview is conditional. Questions appear only when relevant. V1 domains:
- age band;
- training experience;
- primary and secondary goals;
- preferred training styles/practices;
- movements/exercises liked and disliked;
- target areas/capabilities;
- available equipment;
- available space;
- session duration;
- weekly frequency;
- desired perceived intensity;
- relevant exercise limitations/safety constraints;
- optional current-session state such as energy/readiness.

Answers are normalized into a profile and session request; raw answers remain traceable where stored.

## Exercise model
Every exercise candidate must carry structured metadata sufficient for composition, including:
- stable ID and name;
- category/phase;
- goals/capabilities;
- level/difficulty range;
- equipment requirements;
- space requirements;
- intensity/load characteristics;
- compatible/incompatible constraints;
- duration or rep/set dosage ranges;
- regressions/progressions;
- preference/style tags;
- TAIJIFU principle/axis references when applicable;
- instruction and safety notes.

## Composition pipeline
1. Normalize answers and session request.
2. Apply hard constraints; incompatible exercises are excluded, not merely down-ranked.
3. Score remaining candidates against goals, preferences, level, equipment, space, duration, intensity, variety and recent history.
4. Allocate a session budget across appropriate phases (e.g. preparation, mobility/skill, main work, challenge/conditioning where appropriate, recovery).
5. Select candidates using weighted scoring plus controlled variation; selection is not a fixed lookup table.
6. Assign dosage/rest inside exercise-supported ranges according to user/session state.
7. Validate total duration, constraint compliance, phase balance and duplicate/repetition limits.
8. Produce rationale: why each exercise was selected for this user/session.
9. Persist session recipe + inputs + engine version so generation is reproducible/auditable.

## Controlled variation
Variation must never override constraints. Among similarly suitable candidates, the engine may vary selection/order within valid bounds. Recent exercises receive a configurable repetition penalty unless repetition is pedagogically required. A “Gerar outro treino” action recomposes from the same profile/request rather than returning a hard-coded alternate.

## Feedback adaptation
After a session, capture at minimum:
- completed / partially completed / stopped;
- perceived difficulty: easy / adequate / difficult;
- optional exercise-level likes/dislikes;
- optional notes.

Future scoring/dosage may use this feedback. Feedback modifies weighting; it does not silently rewrite user-declared hard constraints.

## Safety boundary
The feature is a fitness/training composer, not a medical diagnostic system. User-declared safety constraints are treated conservatively as hard filters where exercise metadata supports them. When available data is insufficient to compose safely, the engine must say so rather than invent compatibility. Children/minors and other contexts requiring different programming rules must be represented explicitly in policy/metadata rather than handled as an adult profile with smaller numbers.

## WordPress architecture
### `taijifu-core`
Owns:
- profile/session request schema;
- exercise catalog/content model;
- answer normalization;
- hard-constraint filtering;
- scoring/composition engine;
- feedback/history model;
- REST/AJAX boundary with nonce/capability/privacy controls;
- deterministic audit metadata (`engine_version`, input fingerprint, selected IDs, scores/reasons).

### `taijifu-canon`
Owns presentation:
- navigation tab **Treino Personalizado**;
- adaptive interview UI;
- progress/review screen;
- generated workout view;
- regenerate action;
- session execution presentation;
- feedback UI;
- responsive/accessibility/motion behavior.

The theme MUST NOT contain the workout-selection algorithm.

## Privacy/data minimization
Store only data required for personalization/history. Avoid free-text sensitive data unless it serves an explicit user-facing purpose. Profile/history deletion/export must remain compatible with WordPress privacy mechanisms. Do not expose private profiles or session histories through public REST endpoints.

## Acceptance gates
1. Two materially different answer sets produce materially different candidate scores/compositions.
2. A hard constraint can remove an otherwise high-scoring exercise.
3. Changing equipment, time, goal or intensity can change the generated session without changing a static profile template.
4. Regeneration can yield a different valid workout while preserving hard constraints.
5. Recent-history/feedback affects subsequent weighting/dosage.
6. Every selected exercise includes an explainable selection reason.
7. The generated session fits the requested duration tolerance and phase rules.
8. No hard-coded `profile A => workout A` architecture exists.
9. Theme can render a graceful unavailable state if the core plugin is inactive.
10. Core tests verify filtering, scoring, composition, variation boundaries, history adaptation and privacy/authorization paths.
