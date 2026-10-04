# EPIC-003 P3-01 Philosophical Source & Claims Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the evidence-first Source/Claims foundation for TAIJIFU Canon Filosófico without inventing or prematurely publishing philosophical doctrine.

**Architecture:** Add small machine-readable philosophy registries modeled after the repository's existing Canon/history governance pattern, plus validation tests and a human-readable evidence audit. P3-01 stops before Platform/Experience projection and before final Manifesto prose.

**Tech Stack:** JSON Canon artifacts; TypeScript/Vitest validation in `apps/interactive-web`; Markdown governance documentation; GitHub repository provenance.

**Spec:** `docs/superpowers/specs/2026-10-04-epic-003-canon-filosofico-design.md`

## Global Constraints

- `TAIJIFU-SITE` is the single official authority.
- Flow: `Sources → Philosophical Claims → Canon Domains → Provenance → Canon Registry → Platform → Experience → Products`.
- Domains: `manifesto`, `principle`, `method`, `value`, `terminology`.
- Governance states: `CANON`, `CANDIDATE`, `LEGACY`, `CONFLICT`, `GAP`.
- Missing evidence is `GAP`; model inference must never fill it.
- Copying legacy text into this repository does not promote it to Canon.
- EPIC-003 cannot rewrite EPIC-002 historical facts or absorb EPIC-004 technical martial curriculum.
- P3-01 does not publish final Manifesto prose and does not project philosophy into Platform/Experience.
- No new paid/external runtime dependency is introduced.

## Review Focus

- A claim referencing an unknown source must fail validation rather than silently becoming usable.
- An unsupported governance state/domain must fail validation rather than be accepted as arbitrary text.
- `CONFLICT`, `LEGACY`, and `GAP` records must never appear in the canonical projection set.
- Duplicate stable IDs must fail deterministically so later provenance links cannot become ambiguous.
- A terminology alias/deprecated form must not resolve to two competing preferred terms.

---

### Task 1: Philosophy registry contracts and structural validator

**Files:**
- Create: `canon/philosophy/sources.json`
- Create: `canon/philosophy/claims.json`
- Create: `canon/philosophy/terminology.json`
- Create: `canon/philosophy/provenance.json`
- Create: `canon/philosophy/registry.json`
- Create: `apps/interactive-web/src/content/canon-philosophy-validation.ts`
- Test: `apps/interactive-web/src/content/canon-philosophy-validation.test.ts`

**Interfaces:**
- Consumes: the five domains, five governance states, and source classes defined by the design spec.
- Produces: `validatePhilosophyFoundation(input: PhilosophyFoundation): PhilosophyValidationResult` and typed registry contracts used by Task 2.

- [ ] **Step 1: Write failing validator tests**

Create tests asserting that validation rejects: duplicate source/claim IDs, unknown `sourceId`, invalid domain/state, and ambiguous terminology alias ownership; also assert that an empty-but-well-formed foundation is valid.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm --prefix apps/interactive-web test -- --run src/content/canon-philosophy-validation.test.ts`

Expected: FAIL because the validator/contracts do not exist yet.

- [ ] **Step 3: Implement the minimal contracts and validator**

In `canon-philosophy-validation.ts`, define exact unions:

`PhilosophyDomain = 'manifesto' | 'principle' | 'method' | 'value' | 'terminology'`

`PhilosophyGovernanceState = 'CANON' | 'CANDIDATE' | 'LEGACY' | 'CONFLICT' | 'GAP'`

`PhilosophySourceClass = 'CREATOR_RULING' | 'OFFICIAL_CURRENT' | 'LEGACY_TAIJIFU' | 'LEGACY_PRODUCT' | 'PROJECT_RECORD' | 'EXTERNAL_REFERENCE'`

Define the focused data contracts needed to validate stable IDs, source references, provenance, conflict state, terminology aliases/deprecations, and registry entries. `validatePhilosophyFoundation` returns `{ valid: boolean; errors: string[] }` and must produce deterministic errors for the review-focus cases.

Initialize each JSON artifact with a version/status envelope and empty arrays where evidence has not yet been inventoried; do not insert philosophical prose merely to avoid emptiness.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run: `npm --prefix apps/interactive-web test -- --run src/content/canon-philosophy-validation.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

Commit message: `feat(canon): add philosophical registry contracts`

---

### Task 2: Canon projection eligibility rules

**Files:**
- Modify: `apps/interactive-web/src/content/canon-philosophy-validation.ts`
- Modify: `apps/interactive-web/src/content/canon-philosophy-validation.test.ts`

**Interfaces:**
- Consumes: `PhilosophyFoundation`, `PhilosophyClaim`, and governance-state contracts from Task 1.
- Produces: `selectCanonicalPhilosophyClaims(foundation: PhilosophyFoundation): PhilosophyClaim[]`.

- [ ] **Step 1: Write failing eligibility tests**

Assert that only claims with `state === 'CANON'`, registered source references, and no unresolved conflict are returned. Explicitly assert that `CANDIDATE`, `LEGACY`, `CONFLICT`, and `GAP` records are excluded.

- [ ] **Step 2: Run focused tests and verify RED**

Run: `npm --prefix apps/interactive-web test -- --run src/content/canon-philosophy-validation.test.ts`

Expected: FAIL because `selectCanonicalPhilosophyClaims` does not exist.

- [ ] **Step 3: Implement minimal canonical selection**

Add `selectCanonicalPhilosophyClaims(...)`. It must validate the foundation first and throw on structurally invalid input; for valid input it returns only eligible `CANON` claims in stable registry order.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run the same focused command; expected PASS.

- [ ] **Step 5: Commit**

Commit message: `test(canon): enforce philosophy promotion boundary`

---

### Task 3: Evidence inventory and initial Source Registry

**Files:**
- Modify: `canon/philosophy/sources.json`
- Modify: `canon/philosophy/claims.json`
- Modify: `canon/philosophy/provenance.json`
- Create: `docs/canon-philosophy/P3-01-SOURCE-INVENTORY.md`

**Interfaces:**
- Consumes: actual discoverable repository/project evidence and Task 1 registry contracts.
- Produces: registered sources and non-speculative claim records for later domain promotion.

- [ ] **Step 1: Inventory sources before claims**

Inspect current `TAIJIFU-SITE`, accessible legacy TAIJIFU/SW repositories, and available project records for philosophical material. Record exact repository/file/document locators and source classes. If a previously assumed path cannot be located, record that as an evidence gap rather than inventing a replacement locator.

- [ ] **Step 2: Register only located sources**

Populate `sources.json` with stable IDs and exact locators for evidence actually found. Do not register inferred files or generic philosophical references.

- [ ] **Step 3: Extract bounded claims**

Populate `claims.json` only with statements directly supported by registered sources. Preserve source terminology and framing. Default uncertain legacy material to `CANDIDATE`, `LEGACY`, `CONFLICT`, or `GAP`; do not use `CANON` merely because wording sounds aligned.

- [ ] **Step 4: Link provenance**

Populate `provenance.json` so every extracted claim has its source IDs/locators, source classification, and conflict state.

- [ ] **Step 5: Write the inventory report**

`P3-01-SOURCE-INVENTORY.md` must list, per source: locator, class, discoverability status, candidate domains, and limitations. It must distinguish source-derived statements from audit inference.

- [ ] **Step 6: Run validator tests**

Run: `npm --prefix apps/interactive-web test -- --run src/content/canon-philosophy-validation.test.ts`

Expected: PASS with the populated registries.

- [ ] **Step 7: Commit**

Commit message: `docs(canon): inventory philosophical source evidence`

---

### Task 4: Domain coverage audit and governed gaps

**Files:**
- Modify: `canon/philosophy/claims.json`
- Modify: `canon/philosophy/terminology.json`
- Modify: `canon/philosophy/registry.json`
- Create: `docs/canon-philosophy/P3-01-DOMAIN-AUDIT.md`
- Test: `apps/interactive-web/src/content/canon-philosophy-validation.test.ts`

**Interfaces:**
- Consumes: located sources/claims from Task 3 and canonical selection from Task 2.
- Produces: explicit evidence coverage for all five philosophical domains and a registry containing only eligible Canon IDs.

- [ ] **Step 1: Write failing coverage tests**

Add tests asserting every required domain is represented by at least one governed record (`CANON`, `CANDIDATE`, `LEGACY`, `CONFLICT`, or `GAP`) and that `registry.json` contains no non-`CANON` claim ID.

- [ ] **Step 2: Run focused tests and verify RED**

Expected: FAIL until all domains and registry rules are represented.

- [ ] **Step 3: Record evidence-backed coverage or GAP per domain**

For Manifesto, Principles, Method, Values, and Terminology, add only evidence-backed records; when evidence is insufficient, add an explicit `GAP` record describing the missing evidence requirement without supplying doctrine.

- [ ] **Step 4: Populate terminology conservatively**

Add preferred terms/aliases/deprecations only when supported by located evidence. Any ambiguous alias remains unresolved and must not produce competing preferred-term mappings.

- [ ] **Step 5: Build the registry boundary**

Populate `registry.json` with only claim IDs eligible under `selectCanonicalPhilosophyClaims`. It is valid for the initial registry to contain zero canonical claims if the evidence audit has not yet justified promotion.

- [ ] **Step 6: Write the domain audit**

For each domain record: coverage state, supporting source IDs, promoted claim IDs if any, conflicts, gaps, and next evidence required. State explicitly that P3-01 is a foundation audit, not the final philosophical Canon.

- [ ] **Step 7: Run focused and existing test suite**

Run:
- `npm --prefix apps/interactive-web test -- --run src/content/canon-philosophy-validation.test.ts`
- `npm --prefix apps/interactive-web test -- --run`

Expected: PASS.

- [ ] **Step 8: Commit**

Commit message: `feat(canon): establish philosophy evidence foundation`

---

### Task 5: P3-01 closeout gate

**Files:**
- Create: `docs/canon-philosophy/P3-01-CLOSEOUT.md`

**Interfaces:**
- Consumes: validator results, source inventory, domain audit, and registry state from Tasks 1–4.
- Produces: explicit P3-01 gate status and the bounded input for the next EPIC-003 increment.

- [ ] **Step 1: Verify repository evidence**

Run the complete interactive-web tests and inspect the final philosophy registries for invalid/untraceable records.

- [ ] **Step 2: Record the gate**

Set exactly one status based on evidence:

- `P3-01=PASS` when registries validate, every domain is represented by evidence or an explicit governed gap, and no unsupported claim is projected as Canon;
- `P3-01=BLOCKED` when structural/provenance integrity cannot be established.

Do not use number of `CANON` claims as the pass criterion.

- [ ] **Step 3: Define next increment from evidence**

The closeout must identify the smallest next unit: conflict resolution, creator rulings, terminology normalization, or domain-specific promotion. It must not automatically declare final Manifesto work next unless the evidence supports that priority.

- [ ] **Step 4: Commit**

Commit message: `docs(canon): close P3-01 philosophy foundation gate`

---

## Plan Self-Review Result

- Spec coverage: source classes, states, domains, provenance, promotion, boundaries, error handling, testing, and P3-01 scope are all assigned to tasks.
- Type consistency: validator and canonical selector interfaces are defined once and consumed by later tasks.
- Scope: limited to P3-01; Platform/Experience projection and final Manifesto remain excluded.
- Ambiguity: empty Canon registry is explicitly valid when evidence does not justify promotion.
- Review-focus failure modes are each pinned to Task 1, 2, or 4 tests.
