# Web V1 Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform `apps/interactive-web` into the official navigable TAIJIFU Web V1 experience while preserving CANON authority and GIP constraints.

**Architecture:** Evolve the existing interactive-web application instead of creating a parallel platform. The application owns the user-facing experience, semantic routes, interactive layers and progressive enhancement. Repository content and CANON documents remain the authority source.

**Tech Stack:** Existing web stack in `apps/interactive-web`: TypeScript, Vite-based frontend, Vitest, Playwright, existing semantic/interactive modules.

**Spec:** `docs/superpowers/specs/2026-09-30-web-v1-experience-design.md`

## Global Constraints

- `TAIJIFU-SITE` is the only source of truth.
- Operational workflow depends on ChatGPT + GitHub only.
- Do not add GitHub Actions, hosting providers or external operational dependencies as requirements.
- Preserve CANON terminology and existing semantic contracts.
- Prefer evolution of existing interactive-web code over rewrites.

## Review Focus

- Canon content integrity.
- Navigation accessibility without interactive rendering.
- Progressive enhancement of visual/3D surfaces.
- Avoiding hidden infrastructure dependencies.
- Keeping tests as product contracts.

## Implementation Tasks

- [ ] Audit current interactive-web routes, components and tests against Web V1 spec.
  - Verify existing files and identify missing surfaces.
  - Record gaps before implementation.

- [ ] Establish Web V1 information architecture.
  - Define canonical routes.
  - Connect navigation graph to existing semantic contracts.
  - Add tests proving route discoverability.

- [ ] Implement Home / Dojo Gate experience.
  - Preserve Ω1 visual direction.
  - Keep semantic HTML fallback.
  - Add interaction tests.

- [ ] Integrate CANON content surfaces.
  - Move only approved content sources.
  - Preserve provenance metadata where required.
  - Add content contract tests.

- [ ] Expand interactive layer.
  - Keep pointer/navigation systems isolated.
  - Ensure non-WebGL fallback behavior.
  - Validate reduced-motion/accessibility paths.

- [ ] Validate browser experience.
  - Run existing Vitest and Playwright suites when available.
  - Record evidence in repository documentation.

- [ ] Update project telemetry.
  - Mark completed evidence only when directly verified.
  - Preserve archaeology records.

## Definition of Done

- Web V1 routes are navigable.
- CANON content is represented through official surfaces.
- Interactive features enhance rather than block access.
- Tests describe the supported experience.
- Repository remains reproducible through GitHub + ChatGPT workflow.
