# GitHub-first testable site plan

## Goal
Produce a navigable build of the new TAIJIFU interactive web directly from the canonical `TAIJIFU-SITE` repository, without making Vercel a prerequisite for QA.

## Current evidence
- `apps/interactive-web` is the target web application.
- `Verify` is configured to run install, lint, typecheck, tests, architecture tests, build, then upload `apps/interactive-web/dist`.
- Recent GitHub Actions runs fail before any job step starts, so those runs do not establish a code/test failure.
- Vercel statuses are separately affected by build-rate-limit.

## Task 1 — Establish a reproducible build contract
1. Inspect root and app package scripts plus build configuration.
2. Add/adjust a focused test only if the expected build output contract is not already covered.
3. Confirm the intended static output is `apps/interactive-web/dist` and that route generation includes the canonical locale/Dojo surfaces.
4. Commit only evidence-backed changes.

## Task 2 — Add a GitHub-first preview/publish path
1. Prefer GitHub Pages-compatible static output when the current architecture permits it without changing canonical route semantics.
2. Add a dedicated workflow that builds the interactive web and publishes the static artifact using GitHub-native actions.
3. Keep Vercel optional; do not introduce paid/external runtime dependencies.
4. Preserve `/pt-br/`, `/en/`, `/es/`, Dojo, Manifesto, and Nucleus canonical routes.

## Task 3 — Smoke-test the generated site
Validate at minimum:
- PT-BR entry/Manifesto.
- Dojo map.
- NUC-N001 page.
- Practice focus enter/exit and Escape.
- N004 → next Path/N005 boundary.
- EN and ES UI chrome while recovered instruction remains source-language content.
- NUC-N128 → Dojo Map final curriculum boundary.
- No invented XP, completion, rank, certification, or personal progress state.

## Task 4 — Publish QA evidence
1. Record the exact tested commit SHA.
2. Record the public preview URL when GitHub Pages is available.
3. Record smoke-test results and any defects as repository issues.
4. Only call the build/site verified after fresh execution evidence exists.

## Definition of done
A public or GitHub-native preview built from `main` is navigable without Vercel, the canonical Dojo journey passes smoke QA, and defects/limitations are documented in the repository.
