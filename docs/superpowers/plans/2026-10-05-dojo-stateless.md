# Dojo Stateless Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Harden the existing N001–N128 Dojo so curriculum navigation and focused practice remain source-faithful, Canon-structured, locale-safe and completely stateless for the practitioner.

**Architecture:** Keep the current read-only composition: Canon snapshot owns curriculum identity/structure; the Dojo projection attaches recovered `legacy-candidate` instruction; page/rendering modules expose that composition without a learner model. Harden invariants in focused modules and tests rather than adding persistence, authentication, gamification or new instructional data.

**Tech Stack:** TypeScript, browser DOM, Vitest, existing `apps/interactive-web` content/router modules.

**Spec:** `docs/superpowers/specs/2026-10-05-dojo-stateless-design.md`

## Global Constraints

- Canon entity identity and curriculum structure remain authoritative and unchanged.
- Recovered `summary` and `practice` remain explicitly `legacy-candidate`.
- Focus mode is ephemeral UI state only.
- Do not add completion, progress percentage, mastery, approval, XP, score, streak, practice history, unlock rules or mandatory identity.
- Do not add local-storage, cookie, backend or database persistence for learning progress.
- Do not invent repetitions, timers, evaluation criteria, safety claims or teaching steps absent from the recovered source.
- Previous/next navigation MUST remain inside the current Canon Path.
- EN/ES route localization MUST NOT fabricate translated recovered instruction.
- No new paid/external runtime dependency.

## Review Focus

- Direct navigation to an unknown or malformed Nucleus ID must fail safely without synthesizing content — pinned in Task 1.
- First/last Nucleus of every Path must not leak into the neighboring Path — pinned in Task 2.
- Repeated focus enter/exit must not create hidden progress/persistence state — pinned in Task 3.
- EN/ES pages must preserve source-language recovered instruction while communicating translation status — pinned in Task 4.
- Rendering all 128 Nuclei must preserve Canon identity and `legacy-candidate` authority consistently — pinned in Task 5.

---

### Task 1: Harden Nucleus page authority and unknown-ID behavior

**Files:**
- Modify: `apps/interactive-web/src/content/dojo-nucleus-page.test.ts`
- Modify only if required by failing tests: `apps/interactive-web/src/content/dojo-nucleus-page.ts`
- Reference: `apps/interactive-web/src/content/canon-dojo-projection.ts`

**Interfaces:**
- Consumes: `renderDojoNucleusPage(nucleusId: string, locale: SupportedLocale): string | null`
- Produces: page rendering that exposes Canon identity and recovered authority without fabricating unknown content.

- [ ] **Step 1: Write failing tests for authority and malformed/unknown IDs**

Add assertions that a known page contains its exact `data-nucleus-id`, `data-authority="canon-entity-plus-legacy-candidate-instruction"`, and `data-practice-authority="legacy-candidate"`; assert `NUC-N999`, empty string and malformed IDs return `null`.

- [ ] **Step 2: Run the focused page test**

Run: `pnpm --filter @taijifu/interactive-web test -- --run src/content/dojo-nucleus-page.test.ts`

Expected: new assertions FAIL before any required implementation adjustment; existing behavior that already satisfies an assertion may PASS.

- [ ] **Step 3: Make the minimum rendering/read-model change required**

Do not introduce fallback instructional text. Preserve the signature of `renderDojoNucleusPage` and return `null` whenever the existing projection/route/navigation cannot resolve the requested Nucleus.

- [ ] **Step 4: Re-run the focused test**

Expected: PASS.

- [ ] **Step 5: Commit**

`git commit -am "test(dojo): harden nucleus authority boundaries"`

### Task 2: Prove Canon Path navigation boundaries across the curriculum

**Files:**
- Modify: `apps/interactive-web/src/content/dojo-nucleus-navigation.test.ts`
- Modify only if required: `apps/interactive-web/src/content/dojo-nucleus-navigation.ts`

**Interfaces:**
- Consumes: `getDojoNucleusNavigation(nucleusId: string, locale: SupportedLocale): DojoNucleusNavigation | null`
- Produces: previous/next navigation constrained to `path.nucleusIds`, with `pathPosition`, `pathSize` and `pathNuclei` consistent with Canon.

- [ ] **Step 1: Write a table-driven boundary test for every Canon Path**

For each Path, assert its first Nucleus has `previous === null`, its last has `next === null`, `pathSize === 4`, positions are 1–4, and every `pathNuclei` ID belongs to that Path.

- [ ] **Step 2: Run the navigation test**

Run: `pnpm --filter @taijifu/interactive-web test -- --run src/content/dojo-nucleus-navigation.test.ts`

Expected: FAIL if any global N001–N128 adjacency or inconsistent Path projection remains.

- [ ] **Step 3: Correct only Path-derived navigation if needed**

Keep adjacency derived from the current `path.nucleusIds`; do not add automatic transition to another Path or Belt.

- [ ] **Step 4: Re-run the navigation test**

Expected: PASS for every Path boundary.

- [ ] **Step 5: Commit**

`git commit -am "test(dojo): enforce all Canon path boundaries"`

### Task 3: Make practice focus explicitly ephemeral

**Files:**
- Modify: `apps/interactive-web/src/content/dojo-practice-focus.test.ts`
- Modify only if required: `apps/interactive-web/src/content/dojo-practice-focus.ts`

**Interfaces:**
- Consumes: `toggleDojoPracticeFocus(root: HTMLElement, button: HTMLButtonElement): void`, `wireDojoPracticeFocus(scope: ParentNode): void`
- Produces: DOM-only focus state via `data-practice-focus` and `aria-pressed`; no progress API.

- [ ] **Step 1: Write tests for repeated toggles and absence of persistence semantics**

Assert enter/exit/enter toggles only `data-practice-focus`, `aria-pressed` and button copy. Assert no `data-practice-complete`, progress field, storage write, cookie write or network call occurs.

- [ ] **Step 2: Run the focus test**

Run: `pnpm --filter @taijifu/interactive-web test -- --run src/content/dojo-practice-focus.test.ts`

Expected: FAIL if focus code mutates anything beyond ephemeral presentation state.

- [ ] **Step 3: Remove any non-ephemeral behavior if discovered**

Keep focus implementation DOM-local. Do not create a storage abstraction merely to prove storage is unused.

- [ ] **Step 4: Re-run the focus test**

Expected: PASS.

- [ ] **Step 5: Commit**

`git commit -am "test(dojo): guarantee stateless practice focus"`

### Task 4: Harden locale safety for recovered instruction

**Files:**
- Modify: `apps/interactive-web/src/content/dojo-nucleus-page.test.ts`
- Modify: `apps/interactive-web/src/content/dojo-nucleus-routes.test.ts`
- Modify only if required: `apps/interactive-web/src/content/dojo-nucleus-page.ts`
- Modify only if required: `apps/interactive-web/src/content/dojo-nucleus-routes.ts`

**Interfaces:**
- Consumes: `renderDojoNucleusPage`, `findDojoNucleusRoute`
- Produces: locale-specific URLs with source-faithful recovered instructional text.

- [ ] **Step 1: Write tests comparing recovered instruction across PT-BR, EN and ES**

For the same Nucleus, assert EN/ES pages contain the same recovered `summary` and `practice` strings as the projection and include the existing official-translation-pending notice. Assert route prefixes remain `/pt-br/dojo/nucleos/`, `/en/dojo/nuclei/`, `/es/dojo/nucleos/`.

- [ ] **Step 2: Run page and route tests**

Run: `pnpm --filter @taijifu/interactive-web test -- --run src/content/dojo-nucleus-page.test.ts src/content/dojo-nucleus-routes.test.ts`

Expected: FAIL if route localization alters instructional authority/content.

- [ ] **Step 3: Correct localization only if tests expose drift**

Do not introduce translations. Keep route/title localization separate from recovered instructional strings.

- [ ] **Step 4: Re-run both tests**

Expected: PASS.

- [ ] **Step 5: Commit**

`git commit -am "test(dojo): preserve recovered instruction across locales"`

### Task 5: Add whole-corpus stateless regression coverage

**Files:**
- Modify: `apps/interactive-web/src/content/canon-ui-render.dojo.test.ts`
- Create: `apps/interactive-web/src/content/dojo-stateless-contract.test.ts`
- Modify production code only if a contract test exposes a real violation.

**Interfaces:**
- Consumes: `dojoNucleusRoutes`, `getDojoNucleusPage`, `getDojoNucleusNavigation`, `renderDojoNucleusPage`
- Produces: one regression contract covering all N001–N128 surfaces.

- [ ] **Step 1: Write the whole-corpus contract test**

Iterate all 128 route records and assert: unique Canon Nucleus IDs; resolvable projection; `instructional.source.layer === 'legacy-candidate'`; renderable PT-BR page; unchanged Canon Nucleus ID/name; no completion/progress/mastery/XP/streak markup; and navigation Path context resolves.

- [ ] **Step 2: Run the contract test alone**

Run: `pnpm --filter @taijifu/interactive-web test -- --run src/content/dojo-stateless-contract.test.ts`

Expected: FAIL for any corpus-wide invariant not currently protected.

- [ ] **Step 3: Make minimal fixes for actual violations only**

Do not refactor unrelated Canon or site IA code. Do not add new product semantics to satisfy a test.

- [ ] **Step 4: Run the complete Dojo/Canon content test set**

Run: `pnpm --filter @taijifu/interactive-web test -- --run src/content/canon-ui-render.dojo.test.ts src/content/canon-ui-render.dojo-links.test.ts src/content/dojo-nucleus-navigation.test.ts src/content/dojo-nucleus-page.test.ts src/content/dojo-nucleus-routes.test.ts src/content/dojo-practice-focus.test.ts src/content/dojo-stateless-contract.test.ts`

Expected: PASS, 0 failed tests.

- [ ] **Step 5: Run the package test suite**

Run: `pnpm --filter @taijifu/interactive-web test -- --run`

Expected: PASS, 0 failed tests.

- [ ] **Step 6: Commit**

`git add apps/interactive-web/src/content && git commit -m "test(dojo): lock stateless curriculum contract"`

### Task 6: Verify repository/product boundary and document the result

**Files:**
- Modify only if the repository already has an appropriate Dojo verification/status document; otherwise no production/documentation file is required.

**Interfaces:**
- Consumes: completed Tasks 1–5 and the approved spec.
- Produces: evidence that implementation matches the spec without adding runtime dependencies.

- [ ] **Step 1: Inspect the final branch diff against `main`**

Confirm changes are limited to tests and minimal invariant fixes. Confirm no auth, database, storage, analytics-progress or new runtime dependency was introduced.

- [ ] **Step 2: Search the changed Dojo surface for forbidden progress semantics**

Search for `completed`, `progress`, `mastery`, `xp`, `streak`, `localStorage`, `sessionStorage`, `document.cookie` and new persistence/network calls. Review matches manually because words in negative tests are expected.

- [ ] **Step 3: Re-run the package test suite after the final diff review**

Run: `pnpm --filter @taijifu/interactive-web test -- --run`

Expected: PASS, 0 failed tests.

- [ ] **Step 4: Commit documentation only if Step 1 found an existing canonical place for verification evidence**

Do not create process documentation merely to manufacture a commit.

## Self-review result

- Spec coverage: authority model, stateless rule, practice focus, Path navigation, localization, dependency boundary and deferred learner model are all represented.
- Step granularity: each implementation task follows RED → minimal change → GREEN → commit.
- Type consistency: plan uses the existing public functions and route/navigation types already present in `apps/interactive-web/src/content`.
- Review Focus: all five identified failure modes are assigned to explicit tests.
- Proportion: plan hardens the existing implementation rather than proposing a second Dojo architecture.
