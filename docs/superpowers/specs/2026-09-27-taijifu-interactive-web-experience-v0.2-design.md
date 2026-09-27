# TAIJIFU Interactive Web Experience v0.2

Status: DESIGN SPEC — clarified product model
Date: 2026-09-27

## Product definition

TAIJIFU is a **site-interactive first-person web experience**, not a game.

The first-person/FPS vocabulary describes the navigation and spatial interaction model. It does not define the product genre or require combat, RPG systems, game progression, weapons, enemies, economy, or multiplayer.

### Product principle

**The user does not play TAIJIFU. The user enters TAIJIFU.**

The experience should make a conventional website feel like a navigable world while preserving the information architecture, SEO, accessibility and content authority of a real website.

## Dual-surface model

### Canonical web surface

WordPress / TAIJIFU Canon remains responsible for:
- canonical content;
- semantic HTML;
- indexable URLs;
- SEO;
- archives/singles/pages;
- public content delivery;
- domain integration through TAIJIFU Core.

### Interactive surface

The first-person shell is responsible for:
- spatial navigation;
- environmental discovery;
- contextual interaction;
- transitions/reveals;
- orientation;
- immersive presentation of canonical content.

The interactive surface is a **projection of the website**, not a replacement for it.

## Navigation model

Traditional:

menu → page → back

Interactive:

look → move → approach → recognize → interact → reveal content → return

The same canonical content must remain reachable without the interactive runtime.

## First-person vocabulary

Allowed:
- first-person camera;
- spatial navigation;
- reticle/cursor;
- proximity/context affordances;
- environmental hotspots;
- world-space panels;
- reveal transitions.

Not required:
- combat;
- weapons;
- enemies;
- health;
- inventory;
- game-over;
- XP;
- RPG stats;
- multiplayer;
- game economy.

## Initial information world

The first interactive world may expose:

- **TAI** — Axis / essence / stability.
- **JI** — Nexus / discernment / adaptation.
- **FU** — Flow / manifestation.
- **Integration** — relationship of Axis / Nexus / Flow.

These are navigation/content semantics, not game progression.

## SEO rule

The search engine should see a real website.

For example:
- /principios/tai/
- /principios/ji/
- /principios/fu/
- /integracao/

remain canonical content destinations where the content model supports them.

The first-person layer provides another route to those destinations.

No essential knowledge may exist only inside a canvas.

## Character role

The TAIJIFU character is a visual manifestation/presence inside the world.

It is not a player avatar requirement and does not turn the site into a game.

Character assets remain governed by the Character Canon lifecycle and may be introduced as optional world presence, guide, practitioner or visual reference.

## Ω1 role

Ω1 remains the institutional identity and portal/reveal symbol.

A first-person transition may move through or around Ω1, but the character does not supersede Ω1.

## UX principles

- World-first, content-first.
- Minimal interface chrome.
- Contextual affordances.
- Immediate orientation.
- Always-visible exit/return path.
- Keyboard baseline.
- Reduced-motion support.
- Non-3D fallback.
- No essential information communicated only through movement.

## Architecture

TAIJIFU Canon → WordPress/Core → canonical content URLs

TAIJIFU Canon → Interactive Web Shell → spatial navigation → canonical content

Both paths consume the same authority.

The interactive shell must not create duplicate canonical domain state.

## First vertical slice

Acceptance is intentionally website-oriented:

1. User opens TAIJIFU.
2. Ω1 performs the identity/reveal transition.
3. User enters a first-person navigable space.
4. User discovers a TAI/JI/FU node.
5. Contextual affordance appears.
6. User interacts.
7. Canonical content is revealed.
8. User can close/return without losing orientation.
9. The same content is independently reachable as semantic web content.
10. Keyboard and reduced-motion alternatives remain usable.

## Explicit non-goals

This version does not authorize:
- FPS combat;
- game mechanics;
- RPG progression;
- player statistics;
- economy;
- multiplayer;
- replacing WordPress;
- making the character the domain authority.

## Implementation naming

Use:
- Interactive Web Experience
- First-Person Site Shell
- Spatial Web Navigation

Avoid using:
- FPS game
- TAIJIFU game
- game runtime

unless a later product decision explicitly introduces a game product.

## Decision gate

This document supersedes the earlier ambiguity in the v0.1 naming/model. The v0.1 technical first-person prototype remains useful as an implementation direction, but its product framing must follow this v0.2 definition.
