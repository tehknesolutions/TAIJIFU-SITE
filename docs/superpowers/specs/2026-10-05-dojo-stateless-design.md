# TAIJIFU Dojo Stateless — Design Spec

## Status

Approved architectural direction for the current Dojo phase.

## Intent

Turn the Canon curriculum and recovered N001–N128 instructional corpus into a continuous, usable study/practice experience without inventing pedagogical authority or introducing personal progress state before the Canon defines what progress means.

## Authority model

The Dojo composes two distinct layers:

1. **Canon entity** — identity, names, belts, Paths, nucleus membership and curriculum structure come from `canon/TAIJIFU-CANON-1.0/` through the existing Canon snapshot/read models.
2. **Recovered instructional projection** — `summary` and `practice` come from the pinned `Tehkne-Solutions/taijifu-platform` recovery corpus and remain explicitly `legacy-candidate`.

The UI MUST NOT merge these authority levels semantically. Rendering recovered instruction beside a Canon entity does not promote that instruction to Canon.

## Stateless rule

The current Dojo is stateless with respect to the practitioner.

It MUST NOT create or persist:

- completion state;
- progress percentage;
- mastery or approval state;
- XP, score, streaks or ranks;
- practice history;
- duration or repetition targets not present in the source;
- belt/path unlocking rules;
- mandatory account or practitioner identity;
- local-storage, cookie, backend or database records representing learning progress.

Reloading, leaving or revisiting a Nucleus page therefore carries no personal achievement state forward.

## Existing product flow to preserve

The current product chain is:

`Canon → Belt → Path → Nucleus → stable localized URL → Nucleus page → recovered Summary/Practice`

Each Nucleus page preserves:

- Canon identity;
- current Belt and Path context;
- position within the four-Nucleus Canon Path;
- links to all Nuclei in that Path;
- previous/next navigation constrained to that Path;
- recovered instructional provenance and `legacy-candidate` status;
- localized route shape without invented EN/ES instructional translations.

## Practice experience

`Practice` is an execution surface, not a progress record.

The existing focus mode may change presentation state for the current page only. It may emphasize the recovered `practice` text, retain the current `Nucleus X/4` context and allow the user to enter/exit focus.

Focus state is ephemeral UI state. It MUST NOT imply completion, success, mastery or curriculum advancement.

The recovered `practice` string MUST remain source-faithful. The product MUST NOT synthesize checklists, repetitions, timers, evaluation criteria, safety claims or teaching steps that are absent from the recovered source.

## Navigation semantics

Canon structure controls navigation.

Previous/next Nucleus navigation MUST remain within the current Canon Path. A Path boundary MUST NOT silently behave like a continuous global N001–N128 lesson sequence.

Movement to another Path or Belt is a curriculum-context transition and must remain distinguishable from movement between Nuclei inside the same Path.

## Localization

Stable localized route families remain supported:

- PT-BR: `/pt-br/dojo/nucleos/...`
- EN: `/en/dojo/nuclei/...`
- ES: `/es/dojo/nucleos/...`

Route localization does not authorize translation of recovered instructional content. Until an official translation exists, the recovered text remains in its source language and the product communicates that limitation rather than fabricating localized instruction.

## Product boundaries

This phase MAY improve:

- readability and focus of Nucleus/Practice pages;
- navigation within existing Canon structure;
- contextual links between curriculum surfaces;
- accessibility and responsive presentation;
- explicit provenance/authority communication;
- deterministic rendering and tests.

This phase MUST NOT introduce a learner model, authentication requirement, progress service, database schema, gamification subsystem, assessment engine or new instructional corpus.

## Data and dependency policy

The implementation remains repository-driven and compatible with the existing GitHub + GPT workflow. No new paid/external runtime dependency is required by this design.

The official repository remains the source of truth. Local workspaces are not an operational dependency of the product architecture.

## Verification contract

Tests for this phase must protect at least these invariants:

1. all rendered instructional practice remains marked `legacy-candidate`;
2. focus interaction creates no completion/progress state;
3. Path navigation cannot cross a Canon Path boundary through previous/next controls;
4. EN/ES routes do not fabricate translated instructional content;
5. unknown Nucleus IDs fail safely;
6. no persistence API is required for practice focus;
7. Canon identity remains unchanged by the instructional projection.

## Deferred architecture

Personal progress is intentionally deferred until its semantics are defined authoritatively. A future progress layer, if approved, should compose with the Dojo rather than mutate Canon or the recovered instructional corpus.

Likely future questions include what `practiced`, `completed`, `approved` and `mastered` mean; who may assert each state; whether progression is self-recorded or instructor-authorized; and how those states relate to Paths and Belts. None of those meanings are defined by this spec.

## Success condition

This phase succeeds when a visitor can navigate the official Canon curriculum, enter any available Nucleus, understand its Canon context, read the recovered summary, execute the recovered practice in a focused interface and continue navigating the Path — while the system stores no personal learning progress and makes no unsupported pedagogical claim.
