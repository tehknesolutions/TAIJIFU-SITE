# TAIJIFU Canon Inventory — 2026-09-28

## Canon rule
`PROJECT TAIJIFU history + current chat + TAIJIFU repositories + project files/documents = TAIJIFU CANON`.

Missing material is recorded as missing. Historical/current conflicts are preserved for reconciliation rather than silently normalized.

## Current authoritative repository evidence

### Official brand
`docs/superpowers/specs/2026-09-23-taijifu-official-brand-system-design.md` is an approved implementation specification.

Locked decisions include Ω1 as official emblem, monochrome-first identity, TAI red / JI blue / FU gold / Integration green, contemporary serious dojo material language, and explicit rejection of neon/gradient/gamer/cliché martial presentation.

### Current CANON theme / Dojo Gate
`wordpress/themes/taijifu-canon/front-page.php` provides current public home copy:
- Arte Marcial de se Adaptar
- Firme na essência. Livre na forma.
- Mudar sem deixar de ser.
- TAI — Essência · Permanência · Axis
- JI — Discernimento · Adaptação · Nexus
- FU — Manifestação · Fluxo · Flow
- Integração — Axis · Nexus · Flow em relação.
- Entrar no Dojo
- Comece pela essência
- Criado por Miguel Da Vinci e Thales Walisson — Desde 2026

### Public routing authority
`docs/CANON_SYNC.md` records the current public destination routes and legacy redirects:
- /o-que-e/ → /manifesto/
- /filosofia/ → /fundamentos/
- /artes-base/ → /influencias/
- /trilhas/ → /metodo/
- /niveis-e-graduacao/ → /graduacao/
- /textos-oficiais/ → /referencias/
- /registro/ → /historia/

It also records the released TAIJIFU-CANON-1.0 snapshot counts:
- 4 Bases
- 10 Faixas
- 32 Caminhos
- 128 Núcleos
- exactly 4 Núcleos per Caminho

The source snapshot is described as living in `Tehkne-Solutions/taijifu-platform/packages/canon` at checkpoint `15c81fc99f0bf95560521098e70dec7a92915f24`. That repository/package is not currently accessible through the connected GitHub installation, so the individual 174 curriculum records cannot yet be losslessly materialized here.

### Personalized Training
`docs/TAIJIFU-PERSONALIZED-TRAINING-ENGINE-V1.md` is APPROVED DESIGN / implementation source of truth and assigns a public navigation tab “Treino Personalizado” to the presentation layer. The current Web IA therefore reserves `/treino-personalizado/` without inventing training content or engine behavior.

### WordPress content-domain model
`taijifu-core` registers Principles, Paths, Library and Lab CPTs and Axis/Level/Governance Status taxonomies. However, `CANON_SYNC.md` explicitly says official public curriculum no longer renders from editable legacy CPTs: those records are historical/admin material while official public pages come from the Canon snapshot.

Therefore CPT archive slugs are **not** promoted as competing current public IA.

## Current Web IA

| Route | Authority | Body state |
|---|---|---|
| / | current CANON theme | recovered |
| /manifesto/ | CANON_SYNC | body pending recovery |
| /fundamentos/ | CANON_SYNC | body pending recovery |
| /influencias/ | CANON_SYNC | body pending recovery |
| /metodo/ | CANON_SYNC | body pending recovery |
| /graduacao/ | CANON_SYNC | body pending recovery |
| /referencias/ | CANON_SYNC | body pending recovery |
| /historia/ | CANON_SYNC | body pending recovery |
| /principios/tai/ | active Interactive Web contract | body pending recovery |
| /treino-personalizado/ | approved Personalized Training spec | implementation/content pending |

## Semantic principles with unresolved public URLs
- JI — Discernimento · Adaptação · Nexus
- FU — Manifestação · Fluxo · Flow
- Integração — Axis · Nexus · Flow em relação.

The current sources establish their semantic authority but do not yet establish their final individual Web URLs.

## Remaining recovery blockers
1. Connected access to the released `taijifu-platform/packages/canon` snapshot or an equivalent manifested copy.
2. Official body copy for current public route destinations.
3. Final individual public URL policy for JI/FU/Integration.
4. Wordmark master promotion (current construction V2 is not master).
5. Dedicated SEO metadata/structured-data policy.

## Implementation consequence
The browser runtime now materializes the current destination IA and documented legacy redirects. Routes whose body copy has not been recovered render an explicit reconciliation state rather than fabricated official text. The same confirmed public route registry feeds the Three.js ExperienceNodes.
