# TAIJIFU Experience — First-Person Shell v0.1 Execution Plan

Spec: `docs/superpowers/specs/2026-09-27-taijifu-experience-fps-shell-v0.1-design.md`
Date: 2026-09-27

## Project divisions

### CODE
- Create an isolated experience app/runtime; do not turn the WordPress theme into the 3D runtime.
- Establish a thin Experience Shell with modules: boot/reveal, scene, first-person controller, interaction, content bridge, telemetry, accessibility/fallback.
- Keep domain state outside the scene. Consume canonical content through an explicit adapter.
- First vertical slice: one scene, one controller, one TAI/JI/FU interaction node, one content projection, one return path.

### DEVOPS
- Add reproducible install/build scripts.
- Add preview deployment path independent of WordPress.
- Add environment contract and health/build metadata.
- Keep deployment surface small; no microservice extraction for v0.1.
- Record runtime/build status in repository evidence.

### DESIGN
- Start from existing CANON: paper, charcoal, semantic TAI/JI/FU/Integration colors and Ω1 masters.
- Define only the minimum spatial kit: floor, walls/threshold, Ω1 portal/reveal, three semantic nodes, integration point.
- Avoid adding a second visual identity system.
- Character remains optional and non-blocking.

### UI/UX
- World-first interface; minimal HUD.
- Interaction affordance appears only when a node is actionable.
- Provide clear enter/exit/orientation states.
- Preserve keyboard baseline and reduced-motion behavior.
- Provide non-3D fallback to semantic HTML/content routes.
- Validate focus and readable content in every overlay/panel.

### SEO
- Keep canonical text content discoverable outside the 3D canvas.
- Give experience nodes stable content URLs where a public canonical target exists.
- Do not hide essential information exclusively in WebGL/canvas.
- Preserve WordPress canonical routes during prototype.

### GAMEDESIGN
- Dojo is the first world-space metaphor, not a combat arena.
- TAI = Axis / essence / stability.
- JI = Nexus / discernment / adaptation.
- FU = Flow / manifestation.
- Integration = relation of Axis/Nexus/Flow.
- No claim that interacting with a node advances real martial rank.
- No RPG economy/progression in the first slice.

## Execution order

1. Repository/runtime discovery and engine decision.
2. Scaffold isolated app.
3. Establish shell + build/preview.
4. Implement camera/navigation.
5. Implement one interactive node.
6. Implement canonical content bridge.
7. Add telemetry events.
8. Add accessibility/fallback.
9. Add minimal spatial art kit and Ω1 reveal.
10. Add visual/interaction evidence.
11. Update R2/Experience evidence ledger.

## First vertical-slice acceptance

A reviewer can:
- open the preview;
- enter through the Ω1 reveal;
- move in first person;
- approach one semantic node;
- interact;
- read the related canonical content;
- close/return to the world;
- use keyboard fallback;
- use reduced-motion mode without losing essential information.

## Explicit non-goals

No combat, multiplayer, economy, full RPG progression, AI coach, computer-vision judging, or replacement of the WordPress public surface.

## Evidence discipline

Every milestone records:
- commit SHA;
- implementation state;
- executable verification state;
- runtime/preview evidence;
- blockers.

Never mark source presence as runtime PASS.
