# TAIJIFU Canon Inventory — 2026-09-28

## Purpose
Track what is actually supported by current project evidence before generating site structure or copy. Missing material is recorded as missing; it is not silently invented.

## Canon rule
The project history defines the intended reconciliation model as:

`PROJECT TAIJIFU history + current chat + TAIJIFU repositories + project files/documents = TAIJIFU CANON`.

This document records the evidence currently available to the Web v1 implementation.

## Sources inspected

### Project file: SITE TAIJIFU.txt
Supports the reconciliation rule above and explicitly states that historical chats inside the shared TAIJIFU project are legitimate project history. It does **not** provide a complete page tree, body copy, design tokens or final sitemap.

### Project file: Relatório Taijifu Masters.txt
Describes production-pack rules for Taijifu Masters reaction-frame assets (including Lian Wu and Training Rival). This is game-production evidence, not sufficient evidence for Web site information architecture.

### Project file: Análise Taijifu Masters.txt
Defines technical validation requirements for a Lian Wu character-lock package in Godot. This is game asset/runtime evidence, not official Web page copy.

### Project file: Desenvolvimento e Atualização PR.txt
Describes a proposed modular fighter architecture (Base Fighter, Visual Loadout, Combat Loadout and preset packs). This is relevant to Taijifu Masters product architecture but does not establish official Web routes or final site copy.

### Repository: tehknesolutions/TAIJIFU-SITE
The active interactive-web implementation confirms an `interactive-web-site` product identity and a canonical node:
- `TAI` → `/principios/tai/`

Repository code search on the default indexed branch did not surface additional authoritative page/content matches for the queried terms. This is not proof that historical project content does not exist; it means it has not yet been recovered into this inventory.

## Confirmed Web canon entries

| ID | Title | Canonical URL | Evidence | Status |
|---|---|---|---|---|
| tai | TAI | /principios/tai/ | interactive-web repository contract | confirmed |

## Evidence present but not yet Web-canonized
- Lian Wu character identity / validation pipeline.
- Training Rival.
- Taijifu Masters reaction-frame production rules.
- Modular Fighter System proposal: Base Fighter, Visual Loadout, Combat Loadout.
- Asset pack naming proposals BASE-00..05 and PRESET-01..02.

These items must not automatically become public Web pages until the project history/repository establishes that they belong in the official site IA.

## Missing evidence required for full Web v1 canon
- Complete official page/section inventory.
- Official body copy for each page.
- Final official TAI / JI / FU definitions and relationships beyond the currently confirmed TAI URL.
- Official global navigation and footer structure.
- Official visual identity source: logos, typography, colors, spacing, components and motion rules.
- Official media/assets intended for Web publication.
- SEO titles/descriptions and any historical canonical URLs that must be preserved/redirected.

## Next archaeology targets
1. Historical TAIJIFU project chats containing SITE/DESIGN/UI/UX/SEO decisions.
2. Any legacy site export/theme/content files not yet represented in `apps/interactive-web`.
3. Project documents containing principle definitions and institutional copy.
4. Official design assets and approved visual references.

## Implementation consequence
The Content Registry is now the only source used to generate interactive nodes. It starts conservatively with the confirmed TAI entry and expands only when evidence is reconciled.
