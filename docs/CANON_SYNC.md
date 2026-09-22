# TAIJIFU-CANON-1.0 → WordPress Sync

Status: **v2.1.0 candidate**

## Authority

The public WordPress site is subordinate to the canonical source in:

- Repository: `Tehkne-Solutions/taijifu-platform`
- Canon package: `packages/canon`
- Source checkpoint inspected: `15c81fc99f0bf95560521098e70dec7a92915f24`
- Release: `TAIJIFU-CANON-1.0`
- Canon released: `2026-08-04`

## Snapshot invariant

The Core v2.1 package ships a versioned read-only Canon snapshot.

SHA-256: `a227927ebbfb92fe5bbbc0560e4a8d9e30a9208451c4fa6d61ec518db6b646eb`

Validated counts:

- 4 Bases
- 10 Faixas
- 32 Caminhos
- 128 Núcleos
- exactly 4 Núcleos per Caminho

## Public behavior

The public site no longer renders official curriculum from editable legacy CPTs. Those records are preserved in wp-admin as historical material, while official public pages come from the Canon snapshot.

Legacy route redirects:

- `/artes-base/` → `/influencias/`
- `/trilhas/` → `/metodo/`
- `/niveis-e-graduacao/` → `/graduacao/`
- `/o-que-e/` → `/manifesto/`
- `/filosofia/` → `/fundamentos/`
- `/textos-oficiais/` → `/referencias/`
- `/registro/` → `/historia/`

## Visual reset

v2.1 abandons the continuous dark legacy surface:

- warm paper is the dominant canvas;
- charcoal is reserved for authority/dojo surfaces;
- no gradients, glow, neon or faux material texture;
- mobile gutter is at least 24px;
- canonical colors are functional: Tai red, Ji blue, Fu yellow/gold, Integration green.
