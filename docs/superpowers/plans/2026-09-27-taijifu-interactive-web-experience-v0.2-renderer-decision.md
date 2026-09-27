# TAIJIFU Interactive Web Experience v0.2 — Renderer Decision

Date: 2026-09-27
Status: DECISION RECORDED

## Decision

Use **Three.js directly** as the initial rendering layer for the First-Person Site Shell.

Do not add React Three Fiber for the first slice. Do not adopt PlayCanvas as the project runtime for this slice.

## Why Three.js

The product is a website with a spatial/first-person navigation layer, not a game. Three.js gives the project a low-level, browser-native 3D presentation layer without forcing a game-engine product model.

The existing repository is TypeScript/pnpm/Turbo based and has no established React application surface in the searched tree. Adding React solely to host the renderer would introduce a new application framework before it is justified.

Three.js supports WebGL 2 through WebGLRenderer and has a WebGPU renderer with WebGL 2 fallback capability in its current renderer architecture. This lets the Experience Shell keep the renderer behind an adapter while the first slice remains conservative.

## Why not React Three Fiber now

React Three Fiber is a React renderer for Three.js. It is useful when the surrounding UI/application is already React-driven, but this repository currently has no established React surface for the Experience Shell. Introducing it now would increase the stack before the product requires it.

If a future Experience Shell adopts React for a broader application UI, R3F can be reconsidered without changing the domain boundary.

## Why not PlayCanvas now

PlayCanvas Engine is technically strong for this problem: WebGL 2 and WebGPU are supported, with WebGPU fallback to WebGL 2, and it provides camera/input/asset/scene systems. Its standalone mode can be embedded in a normal HTML page.

However, the first TAIJIFU slice is intentionally small and website-oriented. Adopting an engine-oriented stack now would add a larger runtime abstraction than necessary. PlayCanvas remains a valid future option if scene authoring, asset management, XR or more engine-level facilities become dominant requirements.

## Rendering boundary

The renderer must be isolated:

Experience Shell → RendererAdapter → Three.js

No TAIJIFU domain logic may depend directly on Three.js types.

Domain/content:

Experience Shell → ContentAdapter → canonical TAIJIFU URLs/contracts

Telemetry:

Experience Shell → TelemetryAdapter

This makes the renderer replaceable.

## Initial renderer scope

Only implement what the first vertical slice requires:

- Perspective camera.
- Pointer/mouse look.
- Keyboard movement.
- Raycast/context interaction.
- One semantic node.
- Simple lighting/materials.
- Resize/device-pixel-ratio handling.
- WebGL 2 baseline.
- Optional WebGPU path only after the WebGL slice is stable.
- Graceful non-3D fallback.

Do not add:
- physics engine;
- combat;
- multiplayer;
- game loop abstractions beyond rendering/input;
- large asset pipeline;
- procedural world;
- post-processing stack;
- WebXR.

## Performance gate

Before visual polish, measure:
- first load;
- JS payload;
- scene asset weight;
- frame rate on representative desktop/mobile;
- memory/GPU pressure;
- fallback behavior.

The prototype is successful only if the first-person layer feels immediate enough to behave like navigation rather than an app loading screen.

## Sources checked

Three.js: WebGLRenderer, WebGPURenderer, renderer/backend documentation.
PlayCanvas: Engine, graphics/backend, standalone engine, supported browsers documentation.
React Three Fiber: current stable documentation and React renderer model.

The final decision is a project architecture decision, not a claim that one renderer is universally superior.