# TAIJIFU Masters — Modular Fighter Proposal

Status: LEGACY / EXPERIMENTAL / PRODUCT-DESIGN EVIDENCE
Source basis: `Desenvolvimento e Atualização PR.txt`
Tracker: #65

## Provenance warning

The recovered source is written primarily as an assistant recommendation (`A melhor arquitetura seria`, `Eu estruturaria`, `Minha recomendação`). Therefore this document preserves the proposal accurately but does **not** claim it became official TAIJIFU Canon or an implemented architecture.

## Proposed architecture recovered from the source

The proposal replaces repeated monolithic character production with a modular fighter system built around a shared base.

### Three conceptual layers

| Layer | Proposed responsibility |
|---|---|
| Base Fighter | body, proportions, rig, hitbox and shared animations |
| Visual Loadout | hair, clothing, accessories, weapons and colors |
| Combat Loadout | techniques, element, attributes, weapon and style |

The proposed `Character Base Rig` would provide canonical production proportions, pivots, skeleton/rig, hitboxes and shared animation. Character identity would then be composed from independent modules.

### Proposed visual slots

Recovered examples:

- `hair_front`
- `hair_back`
- `torso_inner`
- `torso_outer`
- `arms`
- `hands`
- `waist`
- `legs`
- `feet`
- `weapon_main`
- `weapon_back`
- `accessory_head`
- `accessory_back`

The proposal calls for rigid visual contracts/pivots so arbitrary equipment combinations do not destroy art quality.

### Production mannequin

The proposal explicitly avoids a literal nude base. It suggests a neutral production mannequin with anatomical inner clothing to simplify rigging/composition and support gi, armor, jackets, belts, tunics and other overlays.

### Presets and creator direction

Lian Wu and Training Rival are proposed as presets of the same modular infrastructure. The same system could potentially support NPCs, rivals and a player character creator.

### Proposed pack decomposition

- BASE-00 — Fighter Body & Rig
- BASE-01 — Faces & Skin
- BASE-02 — Hair
- BASE-03 — Martial Arts Uniforms
- BASE-04 — Armor & Accessories
- BASE-05 — Weapons
- PRESET-01 — Lian Wu
- PRESET-02 — Training Rival

## Reconciliation status

UNRESOLVED whether this proposal was subsequently accepted, implemented, superseded or abandoned. Until explicit evidence is recovered, it remains a preserved design proposal rather than current product architecture.
