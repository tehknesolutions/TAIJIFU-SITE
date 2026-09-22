# Taijifu Identity Reset v2.0

Status: implementation candidate / WordPress validation pending.

## Why v2.0

The v1.8.x discovery established the semantic palette but still carried legacy visual DNA: oversized banners, insufficient mobile gutters, faux material textures, HUD-like cards and conflicting CSS layers.

v2.0 is a visual reset rather than another skin.

## North Star

A serious contemporary martial art. A virtual dojo that communicates strength, intelligence and adaptation.

## Core rules

- content always keeps safe viewport gutters;
- hierarchy before decoration;
- TAI = red, JI = blue, FU = aged gold;
- dojo, not dashboard;
- no neon, glow, glassmorphism, cyber HUD or faux material textures;
- mobile keeps a minimum 24px gutter;
- reading measure stays close to 780px.

## Typography

- Display: Barlow Condensed
- Body: Inter
- fallbacks remain available if remote fonts fail.

## Layout

- max content width: 1240px;
- home hero: editorial split;
- internal page banners: compact and left aligned;
- cards: flat surfaces and one border language;
- footer: calm provenance area.

## Plugin invariant

Core v2.0.0 emits semantic classes for the Fundamentals board and corrects the color mapping:
- TAI / force / distance = red;
- JI / intelligence / contact = blue;
- FU / mastery / transition = aged gold.

## QA gate

1. Install Theme v2.0.0 and Core v2.0.0.
2. Purge W3 Total Cache.
3. Validate Home, Fundamentos, Artes, Trilhas, Níveis and mobile menu.
4. Capture 1440px desktop and 390px mobile screenshots.
5. Approve spacing and typography before photography/emblem work.
