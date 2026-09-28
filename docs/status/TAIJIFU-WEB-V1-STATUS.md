# TAIJIFU Web v1 — Current Status

Date: 2026-09-28
Branch: `feat/interactive-web-v1-runtime`
Authority: GitHub repository state + reconciled CANON evidence.

## Implemented now
- Executable Vite browser vertical slice.
- Current Ω1 official master wired into the browser experience.
- Current Dojo Gate home copy and semantic design tokens.
- Canon Registry with provenance/reconciliation state.
- Current public IA from `CANON_SYNC.md`.
- Seven documented legacy redirects.
- Persistent semantic HTML navigation.
- Persistent Three.js navigation layer using the same confirmed canonical routes.
- Official recovered page content for Manifesto, Fundamentos, Influências (count-level), TAI, Método (count-level), Graduação (count-level), História and Treino Personalizado.
- Explicit recovery state for unsupported page bodies instead of fabricated copy.
- Canonical Three.js radial graph with TAIJIFU/Home as origin.
- Responsive/reduced-motion CSS baseline.

## Current content coverage
Recovered public body or verified public facts:
- Home / Dojo Gate
- Manifesto
- Fundamentos
- Influências: 4 Bases fact only
- Método: 4 Bases / 10 Faixas / 32 Caminhos / 128 Núcleos / 4 Núcleos por Caminho
- Graduação: 10 Faixas fact-level
- História: current authorship/genealogy statements
- TAI
- Treino Personalizado V1 specification

Route preserved but body still unsupported:
- Referências

Semantically confirmed but individual public URLs still unresolved:
- JI
- FU
- Integração

## External/source blocker
`CANON_SYNC.md` identifies the released canonical curriculum source as:
- repository: `Tehkne-Solutions/taijifu-platform`
- package: `packages/canon`
- checkpoint: `15c81fc99f0bf95560521098e70dec7a92915f24`
- release: `TAIJIFU-CANON-1.0`

That repository/package is not accessible through the current connected GitHub installation, and the historical local source SHA referenced by the v2.2 QA issue is also not resolvable in the current repository. Therefore the individual 4 Bases / 10 Faixas / 32 Caminhos / 128 Núcleos are not reconstructed from memory.

## Next highest-leverage work
1. Recover/mirror the official Canon snapshot into the canonical repository.
2. Materialize all 174 curriculum entities and relationships into the Web registry.
3. Recover References body and JI/FU/Integration public URL policy.
4. Elevate Three.js from functional radial graph to official motion/focus/hover treatment.
5. Finish page-level SEO/accessibility/performance/deployment verification.
