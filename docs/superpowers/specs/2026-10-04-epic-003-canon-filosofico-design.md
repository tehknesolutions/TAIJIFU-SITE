# EPIC-003 — Canon Filosófico v1 Design

Date: 2026-10-04
Status: DESIGN_APPROVED — USER_REVIEW_GATE
Authority: `tehknesolutions/TAIJIFU-SITE`

## 1. Purpose

EPIC-003 establishes a governed philosophical Canon for TAIJIFU without generating philosophy to fill documentary gaps.

The design follows an evidence-first architecture: sources are inventoried, claims are extracted and classified, and only traceable claims may be promoted into the philosophical Canon.

## 2. Authority rule

`TAIJIFU-SITE` remains the single official authority.

Legacy repositories, project documents, product copy, Academy/SW material, Masters material, and runtime surfaces may provide evidence or candidate wording. They do not become authoritative merely because they predate the current Canon repository.

## 3. Selected architecture

Selected approach: **B — Source/Claims Registry before promotion**.

Flow:

`Sources → Philosophical Claims → Canon Domains → Provenance → Canon Registry → Platform → Experience → Products`

This approach is preferred over direct legacy promotion or writing a new philosophy first because it preserves provenance and makes conflicts explicit before publication.

## 4. Canon domains

EPIC-003 v1 is divided into five governed domains:

1. **Manifesto** — identity-level philosophical declarations and purpose statements.
2. **Principles** — stable propositions that constrain interpretation and practice.
3. **Method** — philosophical operating logic: how principles are applied, without absorbing the technical martial curriculum owned by EPIC-004.
4. **Values** — normative commitments and behavioral orientation.
5. **Terminology** — controlled philosophical vocabulary, definitions, aliases, deprecated terms, and ambiguity notes.

A sixth cross-cutting layer, **Provenance**, governs all five domains rather than acting as a content domain itself.

## 5. Source classes

Every source entering the philosophical pipeline must be registered with a source class and locator.

Initial source classes:

- `CREATOR_RULING` — explicit creator statement intended to govern Canon;
- `OFFICIAL_CURRENT` — material already published by the official TAIJIFU authority;
- `LEGACY_TAIJIFU` — historical TAIJIFU material requiring review before promotion;
- `LEGACY_PRODUCT` — SW/Academy/Masters/product material that may contain philosophical candidates but has no independent Canon authority;
- `PROJECT_RECORD` — project conversation/report/document evidence retained with its original framing;
- `EXTERNAL_REFERENCE` — contextual research; never self-promoting to Canon.

## 6. Claim states

Every extracted philosophical claim has exactly one governance state:

- `CANON` — approved and authoritative;
- `CANDIDATE` — supported enough for review but not yet authoritative;
- `LEGACY` — preserved as historical/product wording without current authority;
- `CONFLICT` — incompatible claims or definitions require resolution;
- `GAP` — a required philosophical dimension lacks sufficient evidence.

Absence of evidence is recorded as `GAP`; it must never be filled by model inference.

## 7. Claim model

Each philosophical claim should minimally carry:

- stable `claimId`;
- domain (`manifesto`, `principle`, `method`, `value`, `terminology`);
- canonical/candidate statement;
- governance state;
- source IDs;
- source locators;
- provenance classification;
- conflict state;
- notes on scope/precision;
- supersedes/supersededBy links when applicable.

Terminology entries additionally carry preferred term, definition, aliases and deprecated forms when evidence supports them.

## 8. Promotion rules

A claim may become `CANON` only when:

1. its source is registered and traceable;
2. its wording does not exceed what the source supports;
3. conflicts are resolved or explicitly bounded;
4. its domain is clear;
5. it does not silently redefine EPIC-002 historical facts or EPIC-004 martial curriculum;
6. creator rulings override lower-authority legacy wording when the ruling explicitly addresses the same claim.

Copying a legacy passage into `TAIJIFU-SITE` does not itself promote it.

## 9. Boundary rules

### EPIC-002 — Canon Histórico

EPIC-003 may reference historical facts but cannot rewrite them. Historical identity/origin remains governed by EPIC-002.

### EPIC-004 — Canon Marcial

EPIC-003 Method defines philosophical operating logic only. Technical bases, techniques, belts, paths, nuclei and curriculum remain EPIC-004.

### EPIC-009 / EPIC-010

Academy and Masters consume philosophical Canon. Product-specific pedagogy/gameplay cannot become philosophical authority by implementation.

## 10. Data flow

1. Inventory candidate sources.
2. Register each source before extracting claims.
3. Extract claims while preserving original terminology and framing.
4. Classify each claim into a domain and governance state.
5. Link provenance and conflicts.
6. Review candidates for promotion.
7. Publish only `CANON` claims through the Canon Registry.
8. Platform consumes the Registry.
9. Experience/products consume governed projections rather than embedding independent philosophy.

## 11. Error and conflict handling

- Missing source → claim cannot be `CANON`.
- Ambiguous source → preserve ambiguity in notes/precision.
- Contradictory sources → `CONFLICT` until explicit resolution.
- Cross-domain ambiguity → classify conservatively and record relationships rather than duplicate authority.
- Unsupported philosophical language → `GAP` or excluded; never synthesized as official doctrine.
- Stale product wording → retain as `LEGACY` and point to the governing claim when one exists.

## 12. Initial implementation surfaces

The implementation plan should prefer small machine-readable registries plus human-readable audit documents, following the existing Canon/history pattern.

Expected surfaces, subject to repository-pattern verification during planning:

- `canon/philosophy/sources.json`;
- `canon/philosophy/claims.json`;
- `canon/philosophy/terminology.json`;
- `canon/philosophy/provenance.json`;
- `canon/philosophy/registry.json`;
- `docs/canon-philosophy/` audit and migration records.

No Manifesto prose is created merely to populate these files. Empty or incomplete domains are valid when represented as governed gaps.

## 13. Testing and acceptance

EPIC-003 implementation must include structural validation sufficient to prove that:

- every `CANON` claim references registered sources;
- every claim has one valid governance state and domain;
- unresolved `CONFLICT` claims are not projected as Canon;
- `LEGACY` and `GAP` claims are not projected as Canon;
- terminology aliases/deprecations resolve deterministically;
- Platform/Experience projections consume the Registry rather than maintaining independent philosophical truth.

The final v1 gate evaluates evidence coverage per domain and may use `PASS_WITH_RECORDED_GAPS`, as EPIC-002 did, when missing detail does not create a contradiction.

## 14. First implementation increment

The first implementation increment is intentionally narrow:

**P3-01 — Philosophical Source & Claims Foundation**

It will:

1. create the philosophy directory/registry schema following current repository conventions;
2. inventory known candidate source locations across `TAIJIFU-SITE`, legacy TAIJIFU/SW material, and available project records;
3. create the Source Registry;
4. create the initial Claims Registry with states but without speculative promotion;
5. create an audit document listing evidence coverage and gaps for Manifesto, Principles, Method, Values and Terminology.

P3-01 does not write the final Manifesto and does not project philosophy into the website yet.

## 15. Success criteria

The design is successfully implemented when a contributor can answer, for every philosophical statement considered official:

- What exactly is the claim?
- Which domain owns it?
- What is its governance state?
- Which source supports it?
- Where is that source located?
- Is there a conflict or superseded wording?
- Which downstream surfaces are allowed to project it?

If any official claim cannot answer those questions, EPIC-003 is not ready for v1.