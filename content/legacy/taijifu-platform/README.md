# Recovered N001–N128 instructional corpus

Status: `legacy-candidate` / read-only recovery
Source repository: `Tehkne-Solutions/taijifu-platform`
Pinned source revision: `15c81fc99f0bf95560521098e70dec7a92915f24`
Destination: `tehknesolutions/TAIJIFU-SITE`

## Authority boundary

These files preserve the historical `summary` and `practice` fields exactly as recovered from the pinned source tree.

They are **not Canon 1.0 entities** and do not alter:

- Canon nucleus IDs;
- Canon nucleus names;
- belt/path relationships;
- release metadata;
- canonical counts or structure.

Current Canon remains sourced from `canon/TAIJIFU-CANON-1.0/`.

The instructional layer is therefore modeled as:

`Canon entity (authority) ← instructional projection (legacy-candidate)`

## Corpus coverage

| Belt | IDs | Source file |
| --- | --- | --- |
| Branca | N001–N012 | `white-belt-content.json` |
| Amarela | N013–N024 | `yellow-belt-content.json` |
| Laranja | N025–N036 | `orange-belt-content.json` |
| Vermelha | N037–N048 | `red-belt-content.json` |
| Verde | N049–N064 | `green-belt-content.json` |
| Ciano | N065–N080 | `cyan-belt-content.json` |
| Azul | N081–N096 | `blue-belt-content.json` |
| Violeta | N097–N112 | `violet-belt-content.json` |
| Marrom | N113–N128 | `brown-belt-content.json` |

Faixa Preta has no additional Nuclei in Canon 1.0 and therefore has no instructional corpus file in this recovery set.

## Preservation rule

The JSON objects retain `id`, `summary` and `practice` from the historical source. No rewriting, enrichment or translation is performed in this migration.

## Promotion rule

Promotion to public/Academy official instructional content requires an explicit record containing:

1. source repository and pinned revision;
2. source file;
3. Nucleus ID;
4. comparison against current Canon entity;
5. accepted/rejected fields;
6. target product surface;
7. authority decision.

Until that record exists, these files are provenance-bearing recovery material only.

## Source inventory

`docs/legacy/TAIJIFU-PLATFORM-CONTENT-INVENTORY.md` records the historical verification that these instructional blocks align to the current N001–N128 Canon sequence while remaining a distinct content layer.
