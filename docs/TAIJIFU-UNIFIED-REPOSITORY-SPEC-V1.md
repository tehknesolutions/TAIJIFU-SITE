# TAIJIFU Unified Repository Spec V1

Status: APPROVED DESIGN / SPEC FOR REVIEW
Date: 2026-09-24
Target: `tehknesolutions/TAIJIFU-SITE`

## Intent
Unify the three active bodies of TAIJIFU work into one authoritative repository without losing genealogy:

1. `TAIJIFU-SITE` — current CANON, visual system, WordPress theme/plugin work.
2. `Tehkne-Solutions/taijifu-platform` — existing application/platform code, packages, docs, release/tooling.
3. `taijifu_manual_ciclo1_full_html_v12_apostila_editorial` — Cycle 1 manual package supplied by the Creator.

After migration, `TAIJIFU-SITE` becomes the central source of truth and delivery repository. Source repositories/packages remain traceable as genealogy; migration must not silently rewrite their historical meaning.

## Authority order
When sources conflict, use this precedence:

1. **Current Creator-declared CANON** in TAIJIFU-SITE / current approved discovery.
2. **Current approved compatible material**.
3. **Platform implementation** where it does not contradict current CANON.
4. **Manual V12 historical material** where it does not contradict current CANON.
5. **Legacy/archive material**.

A lower-authority source may supply implementation, pedagogy, content, assets or history, but may not override a higher-authority semantic decision.

## Current semantic lock
The current CANON includes:
- TAIJIFU = Arte Marcial de se Adaptar.
- TAI = Essência / Permanência / Axis.
- JI = Discernimento / Adaptação / Nexus.
- FU = Manifestação / Fluxo / Flow.
- “Firme na essência. Livre na forma.”
- “Mudar sem deixar de ser.”
- HNK glyphs are HNK, not Japanese glyphs.
- Ω1 + Dojo Gate Visual System V1 are the approved visual direction.

Historical definitions that conflict with these remain genealogy, not current truth.

## Manual V12 inventory baseline
The supplied ZIP contains 166 files. Its root includes, among others:
- `apostila-ciclo-1.html`
- `sistema-taijifu.html`
- `jornada-90-dias.html`
- `sistema-xp.html`
- `codex-artes.html`
- `codex-tecnicas.html`
- `direcao-visual.html`
- `motion-bible.html`
- `storyboards-ciclo-1.html`
- `seguranca-editorial.html`
- `certificacao-faixa-branca.html`
- `prova-faixa-branca.html`
- modules `modulo-00.html` through `modulo-08.html`
- technique sheets `tecnica-tjf-c1-001.html` through `tecnica-tjf-c1-012.html`
- editorial/printing/video/prompt support files and visual assets.

The migration must inventory every file and classify it before promotion to current CANON-facing content.

## Target monorepo

```text
TAIJIFU-SITE/
├── canon/
│   ├── core/
│   ├── semantics/
│   ├── visual/
│   └── registry/
├── apps/
│   └── platform/
├── packages/
├── manual/
│   ├── ciclo-1/
│   │   ├── source-v12/
│   │   ├── normalized/
│   │   └── assets/
│   └── registry/
├── wordpress/
│   ├── plugins/taijifu-core/
│   └── themes/taijifu-canon/
├── brand/
├── docs/
│   ├── genealogy/
│   ├── migration/
│   ├── legacy/
│   └── superpowers/plans/
├── tooling/
├── tests/
└── release/
```

## Source preservation strategy
### Platform
Import platform code with provenance recorded at file/tree level or migration manifest level. Preserve meaningful history references (source repository, source branch, source commit). Do not overwrite WordPress directories merely because names overlap.

### Manual
Preserve the supplied V12 source package losslessly under `manual/ciclo-1/source-v12/` or an equivalent archive-backed location. Build normalized current content separately. Never edit the historical source in place to make it appear current.

### Site
Existing current CANON and WordPress work remain the destination authority. Any migration conflict is resolved explicitly and documented.

## Canon registry
Create a machine-readable registry for important concepts with at least:
- stable id;
- canonical name;
- status (`CANON`, `METHOD`, `LIBRARY`, `LAB`, `REJECTED`, `LEGACY`);
- authority source;
- source reference;
- supersedes / superseded-by when applicable;
- notes/reason for conflict resolution.

The registry must be usable by documentation and, where useful, by `taijifu-core` without making Git files the runtime database for WordPress content.

## Migration classification
Every imported conceptual/manual item receives one of:

- **KEEP** — compatible and reusable unchanged in meaning.
- **ADAPT** — useful but wording/structure must be updated to current CANON.
- **LEGACY** — historically important but not current truth.
- **REJECT** — unsuitable for current system; reason retained.
- **DUPLICATE** — represented by a higher-authority/current artifact.
- **OPEN** — insufficient evidence/decision; do not silently canonize.

## Key conflict rule
Example: if Manual V12 contains an older expansion/meaning for `TAI`, `JI` or `FU`, it is classified as `LEGACY` or `ADAPT` according to use. It must not overwrite the current TAI/JI/FU semantic lock.

The same rule applies to ranks, elements, animals, bases, technique naming, visual symbols, pedagogy, cosmology and HNK relations: compare first, then classify.

## Platform integration boundary
`apps/platform/` represents the application/platform runtime imported from `taijifu-platform`.

Reusable libraries may live under top-level `packages/` when shared by Platform, tooling or future clients. Do not force WordPress PHP runtime to depend on Node workspace packages.

WordPress remains independently deployable:
- `wordpress/plugins/taijifu-core/` = domain/content behavior.
- `wordpress/themes/taijifu-canon/` = CANON presentation.

Platform and WordPress may share generated/static canonical data contracts, but must not require each other to boot.

## Manual integration boundary
Manual V12 serves three roles:
1. historical source/genealogy;
2. content reservoir for the current Manual/Cycle curriculum;
3. asset reservoir subject to provenance and CANON review.

Normalized Manual content should be structured so it can later feed:
- WordPress pages/CPTs;
- Platform curriculum views;
- printable/exported manual releases;
- future learning/certification systems.

HTML source is not itself the final domain model.

## Asset policy
- Deduplicate by content hash where practical.
- Preserve original filenames in provenance manifests.
- Separate source/master assets from web-optimized derivatives.
- Do not relabel Japanese or other external symbols as HNK glyphs.
- Current approved Ω1/wordmark/HNK glyph assets outrank older conflicting visual assets.

## Migration phases
### M0 — Freeze and inventory
Record source repository refs/commits, ZIP hash, file counts and destination branch. No semantic rewriting.

### M1 — Import Platform
Bring platform tree into `apps/platform/` plus shared packages/tooling as mapped. Produce provenance manifest.

### M2 — Import Manual V12 source
Preserve all 166 files and assets losslessly. Produce hash/file manifest.

### M3 — Semantic diff
Compare Platform + Manual against current CANON. Produce KEEP/ADAPT/LEGACY/REJECT/DUPLICATE/OPEN ledger.

### M4 — Canon registry
Materialize stable canonical IDs/status/provenance/supersession relationships.

### M5 — Normalize Manual
Transform approved Manual content into structured current content without mutating historical source.

### M6 — Integrate WordPress Core
Map normalized Principles, Paths, Library/Lab and levels/status into `taijifu-core` interfaces/importers as appropriate.

### M7 — Integrate visual system
Ensure Dojo Gate/Ω1/current HNK identity governs presentation; classify older visuals.

### M8 — Platform adaptation
Update imported Platform to consume current canonical contracts where appropriate while preserving independent boot/deploy.

### M9 — Validation
Run file/hash integrity, semantic conflict checks, platform tests, WordPress tests, responsive/accessibility/visual gates.

### M10 — Release
Produce unified repository release notes, WordPress ZIPs, platform build artifacts where applicable, and migration/genealogy report.

## Non-destructive requirements
- Do not delete or rewrite source repositories as part of initial unification.
- Do not mutate Manual V12 historical source to make it look current.
- Do not silently choose between conflicting definitions.
- Do not copy secrets or `.env` values from Platform.
- Do not make WordPress dependent on Node tooling to run in production.
- Do not treat imported code/content as CANON merely because it existed first.

## Acceptance gates
1. All three sources are represented in `TAIJIFU-SITE` with provenance.
2. Manual V12 source is losslessly accounted for by manifest/hash.
3. Platform source ref is recorded and imported without secrets.
4. Current CANON semantics remain authoritative after import.
5. Every known semantic conflict has an explicit classification.
6. Historical material remains discoverable as genealogy/legacy.
7. WordPress theme/plugin still install independently.
8. Platform can still build/test independently after relocation/adaptation.
9. No HNK glyph identity is replaced by Japanese glyph identity.
10. A new contributor can identify current truth, historical truth and experimental material without guessing.

## Success state
`TAIJIFU-SITE` becomes the unified TAIJIFU monorepo and source of truth: CANON + Platform + Manual + WordPress + Brand + Genealogy, with explicit authority, provenance and non-destructive historical preservation.
