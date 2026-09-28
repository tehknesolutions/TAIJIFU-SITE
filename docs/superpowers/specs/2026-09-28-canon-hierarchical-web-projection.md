# Canon Hierarchical Web Projection Spec

## Authority

This feature is subordinate to `canon/TAIJIFU-CANON-1.0/` and `docs/CANON_SYNC.md`.

The mirrored Canon snapshot is read-only and contains exactly:

- 4 Bases
- 10 Faixas
- 32 Caminhos
- 128 Núcleos
- exactly 4 Núcleos per Caminho
- Faixa Preta as synthesis state with no additional Caminhos

Canon data must not be reconstructed, renamed, corrected, or duplicated manually. Public URLs remain governed by `site-ia.ts`; curriculum entities do not receive invented canonical URLs.

## Goal

Make the interactive web runtime consume the recovered TAIJIFU-CANON-1.0 snapshot as its curriculum authority and expose the full curriculum through progressive semantic and spatial projections without flattening 174 curriculum entities into one scene.

## Required behavior

1. Add a typed Canon snapshot adapter in the interactive web app. It must derive stable identities and relationships from the mirrored JSON blobs. Núcleo IDs are derived by their canonical ordinal (`NUC-N001` through `NUC-N128`) because the snapshot stores Núcleos as an ordered string array.
2. Preserve the existing public IA and legacy redirects. Curriculum entities without an approved public URL remain non-navigable semantic entities.
3. Replace stale “snapshot not recovered” copy on Influências, Método and Graduação with content generated from the recovered snapshot.
4. Render curriculum progressively: Bases as a compact list; Faixas as ordered stages; Caminhos with their four Núcleos under disclosure controls. Do not render all 174 curriculum entities as simultaneous top-level cards.
5. Provide a hierarchical experience projection API that can expose a context slice (roots/children) from the 174 curriculum entities. The initial public-route scene remains stable; curriculum projection is a separate context source until a dedicated drill-down interaction is wired.
6. Tests must prove counts, unique identities, belt→path integrity, path→nucleus integrity, no orphan references, Black belt synthesis behavior, semantic page rendering, and bounded context projection.

## Non-goals

- No ad-hoc edits to `canon/TAIJIFU-CANON-1.0/*.json`.
- No invented per-entity public routes.
- No redesign of the existing visual identity.
- No replacement of the existing route graph with 174 simultaneous Three.js nodes.
