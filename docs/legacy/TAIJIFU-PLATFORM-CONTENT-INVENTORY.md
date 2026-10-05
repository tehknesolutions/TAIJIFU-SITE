# taijifu-platform → TAIJIFU-SITE content inventory

Source repository: `Tehkne-Solutions/taijifu-platform`  
Source tree revision inspected: `15c81fc99f0bf95560521098e70dec7a92915f24`  
Destination/source of truth going forward: `tehknesolutions/TAIJIFU-SITE`

## Purpose

This inventory prevents loss of already-built Taijifu knowledge while the historical `taijifu-platform` is consolidated into the official repository.

The historical platform explicitly defined itself as both the official information/documentation surface and the Academy/App. Its README states that the same versioned Canon feeds Site, Academy/App, Dojo, Admin and AI.

## Product contract recovered

The historical platform declares:

- Canon 1.0: 4 Bases, 10 belts, 32 Caminhos, 128 Núcleos;
- Site Oficial as the highest-priority public reference surface;
- Manifesto and identity;
- history and provenance;
- four Bases;
- 12 Principles;
- 10 belts;
- 32 Caminhos;
- 128 Núcleos;
- Martial Science;
- Kinetic Arts;
- PFI;
- Integral Method;
- Kids & Youth;
- Lifetime;
- Safety;
- formation and governance;
- glossary, references and Canon changelog;
- Academy progression: Faixa → Caminho → Núcleo → Lição → Prática guiada → Checkpoint → Evidência/reflexão → Transferência → Travessia → Avaliação autorizada;
- Evidence, Dojo Workspace, Taijifu AI and Community support layers;
- explicit rule that XP/content completion does not automatically grant martial rank.

## Recoverable repository surfaces

The inspected tree contains a substantial implementation, not only documentation. Important families include:

### `apps/academy`

Application and API surfaces for practice, evidence, AI, community, profile/state and related Academy behavior. These are migration evidence for the future Academy surface; they MUST NOT be discarded merely because the current public site is static-first.

### `packages/content`

A structured content package exists with `data`, `schema`, `scripts` and `src`.

The `data` directory includes belt content/slices for the curriculum. These files are direct migration candidates for curriculum/Academy content and must be reviewed before any rewrite from memory.

#### Verified Canon alignment

Direct comparison against `TAIJIFU-CANON-1.0` confirms that the historical belt instructional content is keyed to the same current nucleus identifiers and meanings.

Verified blocks:

| Belt | Historical instructional block | Current Canon meaning |
| --- | --- | --- |
| Branca | `NUC-N001`–`NUC-N012` | Presença Corporal → Primeira Integração Tai–Ji–Fu |
| Amarela | `NUC-N013`–`NUC-N024` | Zonas e Alcance → Leitura de Estrutura |
| Laranja | `NUC-N025`–`NUC-N036` | Cadeia Cinética → Falhas, Defesas e Contramedidas |
| Vermelha | `NUC-N037`–`NUC-N048` | Criação de Abertura → Debrief e Autoavaliação |
| Verde | `NUC-N049`–`NUC-N064` | Tai → Ji → Síntese das Quatro Bases |
| Ciano | `NUC-N065`–`NUC-N080` | Famílias de Solução → Ambiente, Terceiros e Saída |
| Azul | `NUC-N081`–`NUC-N096` | Capacity State → Sustentação Longitudinal da Competência |
| Violeta | `NUC-N097`–`NUC-N112` | Style Signature → Prontidão para Governança e Preta |
| Marrom | `NUC-N113`–`NUC-N128` | Leitura de Necessidades e Contexto → Safety Institucional, Continuidade e Legado |
| Preta | synthesis state | no additional Caminhos/Núcleos in Canon 1.0 |

The current Canon belt records preserve the same progression functions: Branca/Entrar, Amarela/Perceber, Laranja/Compreender, Vermelha/Manifestar, Verde/Conectar, Ciano/Expandir, Azul/Sustentar, Violeta/Aprofundar, Marrom/Governar and Preta/Sintetizar.

The historical content files add `summary` and `practice` fields to nucleus IDs whose canonical names already exist in the current snapshot. This makes them high-value migration candidates for Academy/Dojo instructional material. Their presence does **not** by itself change the immutable Canon entity names/structure.

Examples verified directly:

- Branca establishes body presence, breathing/center, consent/Tap/Stop Response, safe space, base, locomotion, safe falling/return, distance, guard, cooperative contact and first Tai–Ji–Fu integration.
- Vermelha develops opening/entry, proportional force, controlled contact, progressive opposition, post-action control, function under resistance, chaining, resolution/exit and debrief.
- Ciano expands transfer, bilateral practice, constraints, environment/object context, locomotion and movement literacy while retaining Safety.
- Violeta develops Style Signature, Self-Lab, evidence portfolio, metacognition, adaptive planning and ethical/Safety leadership.
- Marrom develops development-cycle design, investigation, evidence analysis, teaching/scaffolding, authority/scope, credentials/authorization, Canon Change and institutional continuity.

#### Migration consequence

The N001–N128 instructional corpus should be treated as a coherent recovered curriculum layer over the current Canon IDs, not as disconnected notes. Migration should preserve its ID mapping and provenance. Canon names/relationships remain sourced from `TAIJIFU-CANON-1.0`; instructional `summary`/`practice` fields remain a distinct content layer until explicitly promoted for public/Academy use.

### `packages/canon`

Historical Canon package. Compare against the current `TAIJIFU-CANON-1.0` snapshot before promotion. Current official Canon wins on conflicts unless an explicit promotion/reconciliation decision is recorded.

### `packages/ai`

Historical Taijifu AI implementation/support code. Preserve as product/behavior evidence. Canon authority remains external to the AI.

### `packages/evidence`

Historical evidence/progression implementation. Preserve as migration evidence for practice, checkpoints, reflection and Travessia.

### `packages/ui`

Historical reusable UI. It is a visual/product reference, not automatic authority over the current TAIJIFU-SITE design system.

## Migration rule

1. Do not ask the creator to resend knowledge before searching the registered sources.
2. Do not treat absence in `TAIJIFU-SITE` as absence from Taijifu.
3. Search `taijifu-platform`, SW-TAIJIFU, other registered repositories, Drive and project chats.
4. Preserve source path + revision for recovered material.
5. Separate knowledge authority from implementation maturity.
6. Never silently replace current Canon with an older implementation.
7. Migrate useful implementation/content into TAIJIFU-SITE or preserve it as an indexed legacy artifact/reference until migrated.

## Consolidation queue

- [x] Verify the historical instructional blocks N001–N128 against the current Canon nucleus sequence.
- [~] Inventory all `packages/content/data` belt slices and validate their Caminho/belt boundaries.
- [ ] Materialize the recovered N001–N128 `summary`/`practice` corpus inside TAIJIFU-SITE with provenance metadata.
- [ ] Inventory `packages/canon` and diff its entities against the current Canon snapshot.
- [ ] Recover Integral Method source/data and map it to public Método.
- [ ] Recover PFI source/data and map it to Método + training engine candidates.
- [ ] Recover Martial Science / Kinetic Arts taxonomy and map it to public knowledge routes.
- [ ] Recover Safety / Kids & Youth / Lifetime material.
- [ ] Recover references, glossary and Canon changelog material.
- [ ] Inventory Academy practice/evidence/traversal behavior for later app migration.
- [ ] Preserve useful tests and invariants when migrating implementation.

## Authority note

This file is an inventory and migration record. It does not, by itself, promote historical content to the current Canon. Promotion/reconciliation must remain explicit and traceable.
