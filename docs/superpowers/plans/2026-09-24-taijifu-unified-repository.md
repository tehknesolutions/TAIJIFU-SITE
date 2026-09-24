# TAIJIFU Unified Repository Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Unify current TAIJIFU-SITE CANON, `Tehkne-Solutions/taijifu-platform`, and Manual Ciclo 1 V12 into one authoritative, provenance-preserving TAIJIFU-SITE monorepo.

**Architecture:** TAIJIFU-SITE becomes the source of truth while preserving each imported source losslessly or traceably. Current Creator-declared CANON has semantic precedence; imported Platform and Manual material is classified before promotion. WordPress and Platform remain independently bootable/deployable and share canonical contracts only where appropriate.

**Tech Stack:** Git/GitHub, Node/pnpm workspace where inherited from Platform, WordPress/PHP for `taijifu-core` + `taijifu-canon`, JSON/Markdown registries, SHA-256 provenance manifests, HTML/manual source preservation.

**Spec:** `docs/TAIJIFU-UNIFIED-REPOSITORY-SPEC-V1.md`

## Global Constraints
- Current Creator-declared CANON outranks Platform, Manual V12 and Legacy.
- TAIJIFU = Arte Marcial de se Adaptar.
- TAI = Essência / Permanência / Axis.
- JI = Discernimento / Adaptação / Nexus.
- FU = Manifestação / Fluxo / Flow.
- HNK glyphs are HNK, not Japanese glyphs.
- Manual V12 historical source must never be rewritten in place to appear current.
- Imported Platform code must not carry secrets or `.env` values.
- WordPress must not require Node packages to boot in production.
- Platform and WordPress remain independently buildable/deployable.
- Every semantic conflict is explicit: KEEP, ADAPT, LEGACY, REJECT, DUPLICATE or OPEN.

## Review Focus
- Same concept with different meanings across CANON/Platform/Manual must never be silently merged.
- Binary/manual assets must remain byte-accounted for even when they are not promoted to current presentation.
- Platform import must not overwrite current WordPress/CANON paths or smuggle secrets/history-specific build state.
- Duplicate assets with different filenames must be detected by content hash without destroying provenance.
- A clean checkout must make current truth, historical truth and experimental material distinguishable without tribal knowledge.

---

## File Map

- `canon/registry/canon-registry.json` — machine-readable canonical concept registry.
- `canon/registry/schema.json` — validation contract for registry entries.
- `docs/migration/sources.json` — immutable migration source refs/hashes.
- `docs/migration/platform-manifest.json` — imported Platform provenance.
- `docs/migration/manual-v12-manifest.json` — every Manual V12 file + hash/size/path.
- `docs/migration/semantic-ledger.json` — KEEP/ADAPT/LEGACY/REJECT/DUPLICATE/OPEN decisions.
- `docs/genealogy/TAIJIFU-GENEALOGY.md` — human-readable evolution map.
- `apps/platform/` — imported/adapted Platform application tree.
- `packages/` — reusable Platform packages promoted only when actually shared.
- `manual/ciclo-1/source-v12/` — lossless Manual V12 source.
- `manual/ciclo-1/normalized/` — current structured Manual content.
- `manual/registry/` — manual curriculum/asset indexes.
- `tests/canon/` — registry/semantic conflict checks.
- `tests/migration/` — provenance and hash-integrity checks.
- `wordpress/plugins/taijifu-core/` — runtime WordPress domain model/import boundary.

### Task 1: Freeze migration sources

**Files:** `docs/migration/sources.json`, `docs/migration/README.md`, migration tests.

- [ ] Record destination branch and current TAIJIFU-SITE base/head commit.
- [ ] Record exact `taijifu-platform` source repository, branch and commit SHA.
- [ ] Compute SHA-256, byte size and 166-file baseline for the supplied Manual V12 ZIP.
- [ ] Write a failing integrity test that rejects missing source identity/hash fields.
- [ ] Implement source manifest and make the test pass.
- [ ] Commit: `chore(migration): freeze TAIJIFU source identities`.

### Task 2: Import Platform without semantic promotion

**Files:** `apps/platform/**`, selectively `packages/**`, `tooling/**`, `docs/migration/platform-manifest.json`.

- [ ] Inventory Platform root tree, workspace files, apps, packages, docs, tests and release/tooling.
- [ ] Identify and exclude secrets, `.env*`, generated caches/build output and repository-only metadata.
- [ ] Write manifest tests for source SHA, imported path and excluded-sensitive patterns.
- [ ] Import Platform under `apps/platform/` preserving internal relative structure unless a shared-package move is required.
- [ ] Record every intentional relocation in the manifest.
- [ ] Run inherited Platform tests/build from relocated location; fix relocation-only path breakage without semantic rewrites.
- [ ] Commit: `feat(unify): import Taijifu Platform with provenance`.

### Task 3: Preserve Manual V12 losslessly

**Files:** `manual/ciclo-1/source-v12/**`, `docs/migration/manual-v12-manifest.json`, migration tests.

- [ ] Extract the supplied ZIP into a staging directory without editing files.
- [ ] Generate deterministic manifest entries for all 166 files: relative path, SHA-256, bytes and media type/extension.
- [ ] Write a failing test asserting file count and every manifest hash against source bytes.
- [ ] Import the exact source tree into `manual/ciclo-1/source-v12/`.
- [ ] Re-run integrity test against repository copy and require 166/166 matches.
- [ ] Commit: `feat(unify): preserve Manual Ciclo 1 V12 source`.

### Task 4: Build semantic conflict ledger

**Files:** `docs/migration/semantic-ledger.json`, `docs/migration/SEMANTIC-DIFF.md`, tests.

- [ ] Extract candidate concepts from current CANON, Platform docs/data and Manual HTML.
- [ ] Seed explicit high-risk comparisons: TAI/JI/FU, HNK relation, Ω1/visual identity, ranks, elements, animals, bases, principles, paths, levels, techniques, XP/certification.
- [ ] Write validation test requiring every ledger entry to have concept ID, sources, classification, authority and rationale.
- [ ] Classify each known collision as KEEP/ADAPT/LEGACY/REJECT/DUPLICATE/OPEN; never infer CANON from age/frequency.
- [ ] Produce human-readable semantic diff referencing the ledger IDs.
- [ ] Commit: `docs(canon): classify imported Taijifu semantics`.

### Task 5: Materialize Canon Registry

**Files:** `canon/registry/schema.json`, `canon/registry/canon-registry.json`, `tests/canon/**`.

- [ ] Write schema tests for stable ID, canonical name, status, authority source, source reference, supersedes/superseded-by and notes.
- [ ] Seed locked current concepts: TAIJIFU, TAI, JI, FU, the two maxims, HNK glyph identity, Ω1/Dojo Gate direction.
- [ ] Add compatible approved concepts from the ledger only after classification.
- [ ] Encode supersession links for historical definitions rather than deleting them.
- [ ] Add test preventing two active CANON entries from claiming the same stable semantic role without explicit relationship.
- [ ] Commit: `feat(canon): establish machine-readable TAIJIFU registry`.

### Task 6: Create genealogy layer

**Files:** `docs/genealogy/TAIJIFU-GENEALOGY.md`, `docs/legacy/**` as needed.

- [ ] Map chronological source evolution from Manual/Platform to current CANON.
- [ ] Document older TAI/JI/FU interpretations as historical, not current truth.
- [ ] Link legacy visual/pedagogical concepts to ledger/registry IDs.
- [ ] Verify genealogy never labels external/Japanese symbols as HNK glyphs.
- [ ] Commit: `docs(canon): preserve TAIJIFU genealogy`.

### Task 7: Normalize Manual content

**Files:** `manual/ciclo-1/normalized/**`, `manual/registry/**`, normalization tests.

- [ ] Define structured JSON/Markdown contracts for modules, technique sheets, principles, paths, XP/certification references and assets.
- [ ] Write parser/normalizer tests against representative Manual HTML pages before implementation.
- [ ] Transform KEEP material without semantic change.
- [ ] Transform ADAPT material using current CANON wording while retaining source/ledger provenance.
- [ ] Exclude LEGACY/REJECT from current normalized curriculum while keeping them discoverable through genealogy.
- [ ] Leave OPEN items unresolved and explicitly marked.
- [ ] Validate normalized content against registry IDs and source references.
- [ ] Commit: `feat(manual): normalize Ciclo 1 against current CANON`.

### Task 8: Deduplicate and classify assets

**Files:** asset registries/manifests under `manual/registry/`, `brand/`, optimized derivatives where approved.

- [ ] Hash all Manual/Platform/current-brand assets and identify byte-identical duplicates.
- [ ] Classify source/master vs web derivative vs legacy/conflicting visual.
- [ ] Preserve original source filenames and provenance even when one canonical derivative is reused.
- [ ] Ensure current Ω1/wordmark/HNK assets outrank conflicting older visual assets.
- [ ] Generate optimized derivatives only from approved assets; do not mutate source masters.
- [ ] Commit: `chore(assets): reconcile TAIJIFU source and canonical assets`.

### Task 9: Integrate normalized domain with `taijifu-core`

**Files:** `wordpress/plugins/taijifu-core/**`, plugin tests/import tooling.

- [ ] Map normalized Principles/Paths/Library/Lab/levels/statuses to existing WordPress CPT/taxonomy contract.
- [ ] Write failing importer tests for idempotency, provenance metadata and conflict refusal.
- [ ] Implement import/read interfaces without making Git JSON the live WordPress database.
- [ ] Ensure rerunning import updates by stable ID rather than duplicating posts.
- [ ] Refuse OPEN/LEGACY/REJECT promotion into current public content unless explicitly requested.
- [ ] Run plugin tests with theme enabled and disabled.
- [ ] Commit: `feat(core): consume unified canonical content contracts`.

### Task 10: Adapt Platform to Canon Registry

**Files:** `apps/platform/**`, generated/static contract adapter as required, Platform tests.

- [ ] Identify Platform hard-coded semantics that conflict with registry entries.
- [ ] Write tests around current public labels/semantic contracts before changing them.
- [ ] Replace conflicting hard-coded current truth with generated/static canonical contracts where useful.
- [ ] Keep Platform boot independent from WordPress and from network access to the registry.
- [ ] Run Platform build/tests after adaptation.
- [ ] Commit: `refactor(platform): align runtime with unified TAIJIFU CANON`.

### Task 11: Integrate current visual system

**Files:** `wordpress/themes/taijifu-canon/**`, Platform presentation where applicable, brand registry/tests.

- [ ] Audit imported visual references against Ω1 + Dojo Gate Visual System V1.
- [ ] Mark conflicting historical visuals LEGACY instead of silently deleting them.
- [ ] Ensure public current surfaces use HNK glyph assets only where they are actually HNK.
- [ ] Verify TAI/JI/FU semantic color/visual roles remain consistent across WordPress and Platform.
- [ ] Run responsive/accessibility/visual regression gates.
- [ ] Commit: `feat(visual): unify TAIJIFU canonical presentation`.

### Task 12: Full unified validation

**Files:** `tests/**`, QA/migration docs.

- [ ] Run Manual integrity test and require 166/166 source matches.
- [ ] Run semantic registry/ledger consistency tests.
- [ ] Run Platform inherited + adapted tests/build.
- [ ] Run WordPress Core/theme tests and clean activation/deactivation checks.
- [ ] Verify no secret patterns or `.env` values entered imported trees.
- [ ] Verify current/historical/experimental states are distinguishable from a clean checkout.
- [ ] Record evidence in `docs/migration/VALIDATION.md`.
- [ ] Commit: `test(unify): close unified TAIJIFU validation gates`.

### Task 13: Release unified TAIJIFU-SITE

**Files:** release notes, migration report, package manifests/artifacts.

- [ ] Produce final migration report with source SHAs, ZIP SHA-256, counts and semantic decision summary.
- [ ] Generate independently installable WordPress theme/plugin ZIPs.
- [ ] Produce Platform build/release artifacts according to inherited project conventions.
- [ ] Record versions and artifact hashes.
- [ ] Open final integration PR from `feat/taijifu-wordpress-v1` (or successor unification branch) to `main` with Issue #7 and migration docs linked.
- [ ] Commit: `release: unify TAIJIFU CANON Platform Manual and WordPress`.

## Definition of Done
The unification is complete only when all three source bodies are represented with provenance; Manual V12 is byte-accounted 166/166; Platform remains buildable; current CANON remains authoritative; semantic conflicts are classified rather than hidden; normalized Manual data can feed both WordPress and Platform; WordPress remains independently deployable; and the repository can produce verified release artifacts from a clean checkout.