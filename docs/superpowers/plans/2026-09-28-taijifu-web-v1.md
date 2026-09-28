# TAIJIFU Web v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a complete, official-design, canon-driven TAIJIFU website with semantic navigation and an integrated Three.js interactive experience.

**Architecture:** A single canonical content registry feeds both semantic Web UI and the existing Three.js experience. Canonical URLs remain authoritative; Three.js projects and selects content nodes but does not define routes or duplicate content.

**Tech Stack:** TypeScript, Three.js, HTML/CSS browser runtime, Vitest; GitHub as implementation source of truth.

**Spec:** `docs/superpowers/specs/2026-09-28-taijifu-web-v1-design.md`

## Global Constraints
- GitHub repository `tehknesolutions/TAIJIFU-SITE` remains the canonical implementation source.
- Do not silently invent missing official content or design decisions.
- Semantic Web navigation/content must work independently of WebGL.
- Three.js must consume canonical node identity/URLs rather than create routes.
- Prefer complete content breadth before per-page polish.
- CI defects that do not prevent implementation are tracked but do not block product work.

## Review Focus
- Missing/duplicate/conflicting canon entries must remain visible rather than being silently merged.
- Invalid or missing canonical URLs must not become interactive navigation targets.
- WebGL absence/failure must leave semantic navigation usable.
- Touch/keyboard/reduced-motion users must retain access to content and navigation.
- Large media/content graphs must not force eager loading of the entire experience.

---

### Task 1: Executable browser vertical slice
**Files:** create/modify browser bootstrap, entrypoint, HTML shell and package scripts/config under `apps/interactive-web`.
- [ ] Add a bootstrap contract that creates the initial canonical experience and delegates to `mountBrowserThreeSurface`.
- [ ] Add browser navigation adapter using `window.location` at the outer boundary only.
- [ ] Add HTML/canvas entrypoint and minimal semantic fallback/navigation shell.
- [ ] Add a dev/build path appropriate to the existing package without restructuring unrelated workspace packages.
- [ ] Verify the app can render and canonical navigation remains authoritative.
- [ ] Commit the working vertical slice.

### Task 2: Canon inventory and content registry
**Files:** create focused canon/registry modules and provenance data under `apps/interactive-web/src/content` (or the closest established project convention).
- [ ] Inventory official TAIJIFU content and visual assets from project documents/repository sources.
- [ ] Record source/provenance and reconciliation state for every candidate item.
- [ ] Define registry schema for identity, hierarchy, canonical URL, content/media, SEO, visual role and relations.
- [ ] Surface conflicts/duplicates/gaps explicitly.
- [ ] Materialize the first complete registry from supported official evidence.
- [ ] Commit registry and inventory together.

### Task 3: Complete semantic information architecture
**Files:** route/navigation/page rendering modules plus semantic styles/components.
- [ ] Generate primary and contextual navigation from the registry.
- [ ] Render every reconciled canonical content item at its canonical route.
- [ ] Add not-found and invalid-node behavior without inventing content.
- [ ] Ensure internal links remain ordinary semantic links.
- [ ] Verify complete registry-to-route coverage.
- [ ] Commit the navigable content-complete alpha.

### Task 4: Official TAIJIFU design system
**Files:** design tokens, shared components/styles, asset manifest and Three.js visual mapping.
- [ ] Inventory official visual evidence/assets and document provenance.
- [ ] Consolidate typography, colors, spacing, surfaces, symbols, imagery and motion rules.
- [ ] Implement shared tokens and semantic components.
- [ ] Map the same design language to Three.js materials/scene treatment.
- [ ] Apply the system globally rather than polishing pages independently.
- [ ] Commit the official-design pass.

### Task 5: Real interactive content graph
**Files:** experience graph/projection/navigation modules and scene behavior.
- [ ] Replace demonstration nodes with registry-derived ExperienceNodes.
- [ ] Preserve canonical URL metadata through projection.
- [ ] Add hover/focus/touch states and spatial hierarchy.
- [ ] Add camera/focus transitions without changing route authority.
- [ ] Keep reduced-motion and semantic alternatives available.
- [ ] Commit the content-graph experience.

### Task 6: Full official content/media integration
**Files:** registry data, page presenters and media loaders.
- [ ] Integrate all reconciled official text/media.
- [ ] Preserve provenance for content decisions and unresolved gaps.
- [ ] Add lazy media loading and appropriate fallbacks.
- [ ] Verify semantic and interactive representations point to the same canonical entities.
- [ ] Commit the content-complete beta.

### Task 7: Production hardening
**Files:** responsive/accessibility/performance/SEO/fallback configuration and tests.
- [ ] Complete mobile/touch/responsive behavior.
- [ ] Complete keyboard/focus/accessibility and reduced-motion behavior.
- [ ] Add WebGL capability fallback and resilient error handling.
- [ ] Optimize loading, assets and Three.js lifecycle/performance.
- [ ] Add canonical metadata, OpenGraph, sitemap and structured data where source content supports it.
- [ ] Repair/complete CI as a quality gate and run the meaningful verification suite.
- [ ] Commit production hardening.

### Task 8: Web v1 release gate
- [ ] Audit registry coverage against the canon inventory: no supported official item unintentionally omitted.
- [ ] Audit canonical route/navigation integrity.
- [ ] Audit official design consistency across semantic and interactive layers.
- [ ] Audit desktop/mobile/touch/keyboard/WebGL-fallback flows.
- [ ] Resolve release-blocking defects.
- [ ] Tag/merge/release according to repository release conventions once approved.
