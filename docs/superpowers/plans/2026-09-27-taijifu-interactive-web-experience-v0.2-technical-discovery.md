# TAIJIFU Interactive Web Experience v0.2 — Technical Discovery

Date: 2026-09-27
Status: DISCOVERY COMPLETE / IMPLEMENTATION NOT STARTED

## Finding

The repository already contains a TypeScript monorepo/platform foundation:

- root package manager: pnpm 10.17.1
- Node requirement: >=22
- Turbo workspace
- TypeScript 5.9
- Vitest
- `platform/runtime`
- `packages/application`
- `packages/domain`
- `packages/contracts`
- adapters/services

The existing `platform/runtime` is an application/domain runtime, not a browser rendering engine. It currently exposes an in-memory runtime and identity use case.

## Decision boundary

Do not replace or overload `platform/runtime` with rendering concerns.

The First-Person Site Shell should be a presentation application that consumes the existing platform/runtime/contracts through an explicit boundary.

## Browser rendering direction

For the first prototype, use a web-first 3D presentation layer only where it materially improves spatial navigation.

The rendering layer must remain replaceable. Do not let Three.js/Babylon/another renderer become domain authority.

Recommended boundary:

`Interactive Web App → Experience Shell → content/telemetry adapters → existing platform contracts`

and separately:

`Experience Shell → renderer/camera/input`

## Prototype architecture

- Browser app owns route, canvas, camera, input, scene presentation and overlays.
- Existing platform packages own domain/runtime concepts.
- WordPress remains canonical public content/SEO surface.
- Interactive nodes resolve to canonical URLs/content identifiers.
- Telemetry emits semantic events, not raw movement streams.
- Renderer assets remain presentation assets with provenance metadata.

## Engine selection gate

Before adding a rendering dependency, benchmark the smallest vertical slice against:

1. bundle/build complexity;
2. first-load cost;
3. keyboard/mouse/touch baseline;
4. reduced-motion fallback;
5. accessibility of non-canvas content;
6. route/deep-link integration;
7. asset loading strategy;
8. mobile degradation;
9. ability to keep renderer replaceable.

No engine has been promoted to a project dependency by this discovery document.

## First implementation target

Create an isolated browser experience package/app rather than modifying the WordPress theme into a 3D runtime.

The first slice should prove:
- first-person camera;
- simple navigable room;
- one semantic interaction node;
- overlay/content transition;
- return to world;
- canonical URL fallback;
- telemetry adapter.

## Anti-rework

Do not:
- create game domain models;
- duplicate WordPress/Core content;
- move canonical content into the renderer;
- add multiplayer/combat/RPG systems;
- copy heavy Runway binaries into Git;
- make the character required for the first technical slice.
