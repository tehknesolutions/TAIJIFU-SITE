# Canon Hierarchical Web Projection Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Project the complete TAIJIFU-CANON-1.0 curriculum into the interactive web runtime without inventing URLs or flattening 174 curriculum entities into one scene.

**Architecture:** A typed `canon-snapshot` adapter imports the mirrored JSON as Vite raw assets and derives immutable entities/relations. Semantic pages consume that adapter through a dedicated curriculum content block with progressive disclosure. A separate hierarchical experience projector exposes bounded context slices for future Three.js drill-down while the current public route scene remains stable.

**Tech Stack:** TypeScript 5.9, Vite 7, Vitest 3, Three.js 0.180.

**Spec:** `docs/superpowers/specs/2026-09-28-canon-hierarchical-web-projection.md`

## Global Constraints

- `canon/TAIJIFU-CANON-1.0/*.json` is read-only authority.
- Exact snapshot counts: 4 Bases, 10 Faixas, 32 Caminhos, 128 Núcleos.
- Exactly four Núcleos per Caminho.
- Faixa Preta has zero additional Caminhos.
- Do not invent curriculum URLs.
- Preserve existing public routes and redirects.

## Review Focus

- Raw snapshot import must typecheck under the Vite package without copying JSON into `src`.
- Malformed or orphan Canon references must fail fast rather than silently disappear.
- Black belt must remain a synthesis state with no fabricated paths.
- Semantic output must escape Canon text through the existing renderer.
- Hierarchical context projection must stay bounded and never return all 174 curriculum entities for one context.

---

### Task 1: Typed Canon snapshot adapter

**Files:**
- Create: `apps/interactive-web/src/content/canon-snapshot.ts`
- Create: `apps/interactive-web/src/content/canon-snapshot.test.ts`
- Create: `apps/interactive-web/src/vite-env.d.ts`

**Interfaces:**
- Produces: `canonSnapshot`, `canonCurriculumEntities`, `getCanonChildren(parentId)`, `getCanonEntity(id)`.

- [ ] Write tests proving release identity, exact counts, 174 unique curriculum IDs, belt→path integrity, path→four-nuclei integrity, no orphan references, and Black belt zero paths.
- [ ] Run the package test workflow and observe the new assertions fail before production implementation.
- [ ] Implement raw JSON parsing and immutable typed derivation. Derive Núcleo IDs from 1-based canonical order.
- [ ] Run typecheck, tests, and build; expect all green.
- [ ] Commit.

### Task 2: Canon-driven semantic curriculum pages

**Files:**
- Modify: `apps/interactive-web/src/content/official-page-content.ts`
- Modify: `apps/interactive-web/src/content/official-page-content.test.ts`
- Modify: `apps/interactive-web/src/semantic-site.ts`
- Modify: `apps/interactive-web/src/semantic-site.test.ts`

**Interfaces:**
- Consumes: `canonSnapshot` from Task 1.
- Produces: `ContentBlock` variant `curriculum` rendered as progressive `<details>` disclosure.

- [ ] Write failing tests that require recovered Base names on Influências, all 10 ordered Faixas on Graduação, and Caminho C01 plus its four Núcleos on Método.
- [ ] Verify RED in CI.
- [ ] Add Canon-generated content blocks and semantic renderer support; remove stale “snapshot not recovered” notices.
- [ ] Run typecheck, tests, and build; expect all green.
- [ ] Commit.

### Task 3: Bounded hierarchical experience projection

**Files:**
- Create: `apps/interactive-web/src/content/canon-experience-projection.ts`
- Create: `apps/interactive-web/src/content/canon-experience-projection.test.ts`

**Interfaces:**
- Consumes: `canonCurriculumEntities`, `getCanonChildren` from Task 1.
- Produces: `projectCanonExperienceContext(parentId?: string): readonly CanonExperienceNode[]` where nodes carry `id`, `label`, `kind`, `parentId?`, and `hasChildren` but no invented URL.

- [ ] Write failing tests for root projection (4 Bases + 10 Faixas, bounded), a belt projection containing only that belt’s Caminhos, and a path projection containing exactly four Núcleos.
- [ ] Verify RED in CI.
- [ ] Implement minimal context projection without changing the existing public-route Three.js bootstrap.
- [ ] Run the full interactive-web typecheck, test, and build workflow; expect all green.
- [ ] Commit.

### Completion

Compare the branch with `main`, inspect the complete diff for Canon drift or invented URLs, and leave the branch/PR unmerged for human integration.
