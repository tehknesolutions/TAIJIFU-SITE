# TAIJIFU Web v1 — Current Status

Date: 2026-09-28
Canonical source: `main`
Development branch: `feat/interactive-web-v1-runtime`
Authority: GitHub repository state + released CANON snapshot.

## Implemented now
- Executable Vite browser vertical slice.
- Current Ω1 official master wired into the browser experience.
- Current Dojo Gate home copy and semantic design tokens.
- Canon Registry with provenance/reconciliation state.
- Current public IA from `CANON_SYNC.md`.
- Seven documented legacy redirects.
- Persistent semantic HTML navigation.
- Persistent Three.js navigation layer using the same confirmed canonical routes.
- Official recovered page content for Manifesto, Fundamentos, Influências, TAI, Método, Graduação, História and Treino Personalizado at the currently integrated depth.
- Explicit recovery state for unsupported page bodies instead of fabricated copy.
- Canonical Three.js radial graph with TAIJIFU/Home as origin.
- Ω1 official asset visually anchored over the graph origin.
- Hover/focus spatial treatment synchronized with a visible semantic legend.
- Keyboard/touch-safe canonical navigation through the same registry used by Three.js.
- Hybrid Dojo navigation selected for Web v1: origin/map → focus → short camera approach → canonical URL.
- `prefers-reduced-motion` path that commits navigation without the cinematic camera approach.
- Responsive/reduced-motion CSS baseline.
- Exact `TAIJIFU-CANON-1.0` curriculum data mirrored into this repository under `canon/TAIJIFU-CANON-1.0/`.

## Canon snapshot recovered
The previously external curriculum checkpoint is now accessible and mirrored locally.

Source:
- repository: `Tehkne-Solutions/taijifu-platform`
- package: `packages/canon/data`
- checkpoint: `15c81fc99f0bf95560521098e70dec7a92915f24`
- release: `TAIJIFU-CANON-1.0`
- release date: `2026-08-04`
- source document: `TAIJIFU_CANON_MASTER_1.0-FINAL`

Mirrored Git blobs match the source checkpoint exactly:
- `release.json`: `5c8f76cd6768ce30555ecec72be1eb1b5d0df27e`
- `bases.json`: `84fd939c3e181706f5f8883b92481ee1d6d5b904`
- `belts.json`: `49400d7c938aab3c95a4fcf1b38b0fbe7ee37bfd`
- `paths.json`: `ad5948d657c2424fcc07c65066c0c85c6f4cf4a3`
- `nuclei.json`: `1de98a864d319bd3253dbb1abc8bfbf9b3ceceff`

The snapshot supplies the complete named curriculum inventory: 4 Bases, 10 Faixas, 32 Caminhos and 128 Núcleos. The 32 Caminhos each reference four Núcleos. Faixa Preta is the synthesis state and carries no additional Caminho IDs in this release.

## Current content coverage
Recovered public body or verified public facts:
- Home / Dojo Gate
- Manifesto
- Fundamentos
- Influências
- Método
- Graduação
- História
- TAI
- Treino Personalizado V1 specification
- complete released names/relationships for Bases, Faixas, Caminhos and Núcleos in the local Canon snapshot

Route preserved but page body still requires integration from recovered source:
- Referências

Semantically confirmed but individual public URLs still unresolved in the current Web IA:
- JI
- FU
- Integração

## Verification state
- PR #24 merged the Interactive Web v1 runtime into `main` on 2026-09-28.
- The Interactive Web workflow previously contained invalid YAML because a shell command with `packages: []` was encoded as a plain YAML scalar. The workflow syntax has been corrected and now includes `typecheck`, `test`, and `build` gates.
- GitHub Actions creates jobs, but repository jobs currently terminate before any step starts; the same pre-step failure is visible in other repository workflows. This remains an Actions/runner infrastructure blocker rather than green or red test evidence.
- Independent local verification from this ChatGPT environment remains blocked because the execution environment cannot resolve `github.com` to clone the repository.
- The Canon mirror itself was verified by comparing the Git blob SHAs in `TAIJIFU-SITE` with the released source checkpoint; all five mirrored JSON blobs match exactly.
- No green `typecheck + test + build` claim is recorded yet.

## Next highest-leverage work
1. Materialize the recovered 174 curriculum entities and relationships into the Web registry/routes without duplicating Canon authority.
2. Integrate the recovered References source and resolve JI/FU/Integration public URL policy from canonical evidence.
3. Restore executable CI/runner verification and obtain a fresh green `typecheck + test + build` run.
4. Continue visual refinement behind verified interaction contracts: transition easing/continuity, spatial hierarchy and Dojo presentation.
5. Finish page-level SEO/accessibility/performance/deployment verification.
