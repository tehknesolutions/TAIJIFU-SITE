# TAIJIFU Canon Inventory — 2026-09-28

## Canon rule
`PROJECT TAIJIFU history + current chat + TAIJIFU repositories + project files/documents = TAIJIFU CANON`.

Missing material is recorded as missing. Historical/current conflicts are preserved for reconciliation rather than silently normalized.

## Current authoritative repository evidence

### Official brand
`docs/superpowers/specs/2026-09-23-taijifu-official-brand-system-design.md` is an approved implementation specification.

Locked decisions include:
- official emblem: Ω1;
- standard master: `brand/omega1/master/omega1-master.svg`;
- micro master for <32 px;
- uppercase TAIJIFU wordmark direction;
- monochrome-first identity;
- semantic accents: TAI red, JI blue, FU gold/yellow, Integration/Survival green;
- serious contemporary dojo material language;
- avoid neon/gradient/gamer/cliché martial presentation;
- site consequence: the experience should feel like entering the TAIJIFU dojo.

### Current CANON theme
`wordpress/themes/taijifu-canon/front-page.php` manifests the Dojo Gate copy:
- “Arte Marcial de se Adaptar”
- “Firme na essência. Livre na forma.”
- “Mudar sem deixar de ser.”
- TAI — “Essência · Permanência · Axis”
- JI — “Discernimento · Adaptação · Nexus”
- FU — “Manifestação · Fluxo · Flow”
- Integração — “Axis · Nexus · Flow em relação.”
- CTA “Entrar no Dojo”
- entry heading “Comece pela essência”
- public-path statement preserving TAI/JI/FU CANON hierarchy
- authorship “Criado por Miguel Da Vinci e Thales Walisson — Desde 2026”

The current theme tokens establish paper/charcoal/ink/muted plus TAI/JI/FU/Integration semantic colors, responsive spacing and reduced-motion behavior.

### Content-domain model
`taijifu-core` registers four public REST-visible content types:
- Principles — rewrite `/principles/`
- Paths — rewrite `/paths/`
- Library — rewrite `/library/`
- Lab — rewrite `/lab/`

It registers hierarchical taxonomies:
- Axis — `/axis/`
- Level — `/level/`
- Governance Status — `/governance-status/`

These are current content-model evidence, not proof that all content records/body copy are already present.

## Confirmed Web canon entries

| ID | Title | Canonical URL | Status |
|---|---|---|---|
| tai | TAI | /principios/tai/ | confirmed |

## Confirmed semantic canon without final Web URL
| ID | Title | Official semantic meaning | Status |
|---|---|---|---|
| ji | JI | Discernimento · Adaptação · Nexus | URL needs reconciliation |
| fu | FU | Manifestação · Fluxo · Flow | URL needs reconciliation |
| integration | Integração | Axis · Nexus · Flow em relação. | URL needs reconciliation |

## Route conflict requiring explicit reconciliation
The active Interactive Web contract fixes TAI at `/principios/tai/`, while the current WordPress content type uses the English rewrite base `/principles/`. The implementation must not silently change either. Before content-wide routing is finalized, choose the canonical public route family and define redirects/compatibility.

## Project TXT evidence
The Project TXT files available in the current workspace establish the archaeology/reconciliation requirement and contain Taijifu Masters asset/game-production material (Lian Wu, Training Rival, reaction frames, character-lock validation, modular fighter proposal). They do not by themselves establish public Web routes or full official site body copy.

## Remaining canon recovery targets
- Actual records/body copy for Principles, Paths, Library and Lab.
- Final URL family and redirect policy.
- Historical project chats/documents containing approved site copy.
- Official wordmark master once promoted from candidate status.
- Web publication media inventory.
- Dedicated SEO metadata/structured-data policy.

## Implementation state
The Web runtime now uses the registry for interactive nodes. The public Dojo Gate and Ω1 master are manifested in the browser vertical slice from current repository CANON rather than newly invented presentation.
