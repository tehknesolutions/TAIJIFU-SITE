# TAIJIFU Official Home Fidelity Spec

## Intent
Rebuild the interactive-web Home so the official supplied TAIJIFU cinematic dojo artwork is the primary visual reference. The current long dark editorial page is not an approved visual baseline and must not be treated as the official Home composition.

## Success criteria
- First viewport reads as the official cinematic dojo experience, not an editorial landing page.
- Composition preserves the official hierarchy: brand/header, dojo environment, dominant central TAIJIFU mark, title/subtitle, TAI/JI/FU triad, primary Dojo CTA, authorship/HNK details.
- TAI/JI/FU retain their red/blue/gold identities.
- Existing canonical text/content is not silently rewritten to fit the visual design.
- Existing useful editorial content may remain below the fold or move to appropriate routes, but cannot replace the official hero.
- Desktop implementation is compared against the supplied official reference; responsive layouts preserve hierarchy rather than cropping essential meaning.
- No paid/external runtime dependency is introduced. Repository remains canonical source.

## Visual structure
1. Full-viewport cinematic hero using official repository assets where available.
2. Header: TAIJIFU identity, O TAIJIFU, PRINCÍPIOS, CAMINHO, DOJO, BIBLIOTECA, HNK, search affordance, ENTRAR NO DOJO.
3. Side doctrine banners integrated into the scene where feasible from available assets/content.
4. Center: dominant TAIJIFU symbol, TAIJIFU wordmark and “ARTE MARCIAL DE SE ADAPTAR”.
5. Triad: TAI / ESSÊNCIA / “O que deve permanecer?”, JI / ADAPTAÇÃO / “O que precisa mudar?”, FU / MANIFESTAÇÃO / “Que forma deve existir agora?”.
6. Primary ENTRAR NO DOJO action.
7. Authorship / provenance and HNK mark as secondary visual information.

## Implementation constraints
- Inspect and reuse existing official assets before creating substitutes.
- Do not flatten the hero into cards.
- Do not use the current black/beige editorial composition as fidelity target.
- Keep semantic navigation and keyboard-accessible controls.
- Preserve locale architecture and canonical Dojo routes.
- Prefer CSS/layout overlays over baking navigation/copy into raster artwork.

## Acceptance
A build is not called visually validated merely because it renders. Visual acceptance requires side-by-side comparison with the supplied official reference and explicit approval from the project owner.
