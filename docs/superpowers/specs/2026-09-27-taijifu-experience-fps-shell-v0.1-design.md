# TAIJIFU Experience — First-Person Shell v0.1

Status: DESIGN SPEC / PRE-IMPLEMENTATION
Date: 2026-09-27
Track: TAIJIFU Experience
Relationship: New interactive projection; does not replace taijifu-canon WordPress.

## Intent

Create a first-person interactive TAIJIFU experience that produces the sensation of entering and navigating a world rather than browsing a conventional website.

This is not yet a combat FPS. The first milestone is a navigable Dojo/world shell that can expose canonical TAIJIFU knowledge and later host Journey/RPG, Academy, Training and game experiences.

## Authority

- TAIJIFU Canon remains authoritative for domain meaning.
- Ω1 remains institutional identity and portal/reveal symbol.
- Character assets remain governed candidates until promoted through Character Canon.
- WordPress remains the current public/CANON delivery surface.
- This Experience is a projection/consumer, not a new source of truth.
- Domain behavior must use governed contracts; no direct duplication of canonical domain state.

## Experience model

LANDING → Ω1 REVEAL → ENTER DOJO → FIRST-PERSON NAVIGATION → INTERACTIVE NODES → CANON CONTENT / EXPERIENCE MODULES

The user should feel that they entered TAIJIFU, not that they opened a page with a game-like skin.

## First milestone: First-Person Dojo Prototype

Acceptance target:

1. Ω1 reveal/transition.
2. First-person camera.
3. Navigable spatial environment.
4. At least one interactive TAI/JI/FU node.
5. Interaction opens or projects real TAIJIFU content without losing orientation.
6. Return path to the Dojo/world.
7. Keyboard/mouse baseline and accessible fallback.
8. Telemetry for entry, movement/session, node interaction and exit without collecting unnecessary sensitive data.

No combat, economy, RPG progression or multiplayer is required for this milestone.

## UX / UI

The interface should be intentionally sparse.

World-first rules:
- environment carries hierarchy;
- HUD is minimal;
- interaction affordances appear contextually;
- Ω1 is used as identity/orientation, not decoration;
- TAI/JI/FU semantic colors may guide nodes;
- content surfaces can open as spatial panels, overlays or transitions;
- user must always have a clear way to orient, interact and exit.

Accessibility:
- keyboard navigation baseline;
- reduced-motion support;
- non-3D content fallback;
- readable contrast;
- no essential information communicated only by motion.

## Game Design

The initial world is a Dojo Gate/world-space metaphor.

Candidate semantic zones:
- TAI — Axis / essence / stability;
- JI — Nexus / discernment / adaptation;
- FU — Flow / manifestation;
- Integration — relation of Axis/Nexus/Flow.

These are experience semantics, not claims about martial progression.

Real martial progression, TAIJIFU ecosystem progression and RPG progression remain separate.

## Character

The Runway character is a candidate visual asset, not automatically Canon.

Initial use:
- optional distant/avatar presence;
- orientation/guide;
- future training/game projection.

Do not make character presence a dependency for the first technical prototype.

## CODE

Preferred first prototype: Web-first 3D runtime compatible with the existing Experience Platform direction.

Keep engine/runtime behind an Experience Shell boundary.

Initial modules:
- boot/reveal;
- scene/world;
- first-person controller;
- interaction system;
- content bridge;
- telemetry adapter;
- accessibility/fallback layer.

No direct database access from the scene.

## DEVOPS

Prototype must be independently runnable without destabilizing WordPress.

Required:
- isolated app/runtime;
- reproducible local build;
- preview deployment;
- environment configuration;
- basic health/build telemetry;
- versioned assets/manifests.

Do not extract microservices for the prototype.

## DESIGN

Preserve current visual authority:
- warm paper;
- charcoal authority/Dojo surfaces;
- semantic TAI/JI/FU/Integration colors;
- Ω1 masters;
- no gradients/neon/glow/glass as identity defaults.

3D art may develop its own environmental treatment, but must remain recognizable as TAIJIFU.

## SEO

The interactive shell must not become an SEO dead end.

Public/indexable knowledge remains available through semantic HTML/content routes.
Each major experience node should have a canonical content target/URL where appropriate.
Do not require JavaScript/3D to discover core textual knowledge.

## TELEMETRY

Initial events:
- experience_loaded
- omega1_reveal_completed
- dojo_entered
- node_seen
- node_interacted
- content_opened
- experience_exited

Telemetry must be privacy-aware and should avoid unnecessary raw movement tracking.

## Non-goals

- full FPS combat;
- multiplayer;
- physical microfrontend extraction;
- full RPG system;
- economy;
- AI Coach;
- computer-vision judging;
- replacing WordPress immediately.

## Gate

This document authorizes planning/prototyping only. It does not promote any Runway character asset to Canon and does not authorize replacing the current WordPress public surface.

Next artifact: executable implementation plan split into CODE / DEVOPS / DESIGN / UI-UX / SEO / GAMEDESIGN, followed by a minimal first-person Dojo prototype.
