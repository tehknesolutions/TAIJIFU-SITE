# TAIJIFU Legacy Consolidation Ledger

Status: ACTIVE
Authority: TAIJIFU-SITE
Tracker: #61

## Purpose

This ledger records the migration of historical TAIJIFU knowledge into the single official repository without silently promoting legacy material to current Canon.

## Authority rule

- `canon/TAIJIFU-CANON-1.0/` is the current versioned Canon.
- `TAIJIFU-SITE` is the sole TAIJIFU repository and Source of Truth.
- Historical sources are evidence until reconciled.
- Product/UX decisions are not Canon unless explicitly represented in the canonical release.
- Game/simulation material is preserved as legacy/product evidence and does not define martial curriculum by implication.

## Source classes

| Class | Meaning | Promotion rule |
|---|---|---|
| CANON | Current authoritative semantic/curricular data | Directly consumable |
| OFFICIAL PRODUCT | Current approved site/product/identity behavior | Implementable; does not redefine Canon |
| LEGACY | Historical TAIJIFU material | Preserve with provenance; reconcile before reuse |
| EVIDENCE | Source supporting a decision/history claim | Cite and classify |
| EXPERIMENTAL | Proposal, prototype, research or unratified design | Never silently promote |
| UNRESOLVED | Missing/conflicting provenance or meaning | Keep explicit until reconciled |

## Consolidation inventory

### Current official repository

- `canon/TAIJIFU-CANON-1.0/` — CANON.
- `apps/interactive-web/` — OFFICIAL PRODUCT projection/consumer.
- `packages/domain`, `application`, `contracts`, `design-tokens`, `ui` — product architecture/shared implementation.
- `docs/` — governance, archaeology, provenance and decisions.

### GPT Project historical sources available to this project

The project workspace exposes historical text sources under the following titles:

- `Análise Taijifu Masters.txt`
- `Desenvolvimento e Atualização PR.txt`
- `Relatório Taijifu Masters.txt`
- `SITE TAIJIFU.txt`

These titles have appeared in multiple uploaded revisions. They are historical sources, not automatic Canon. Their content must be imported/reconciled in traceable batches. Existing archaeology work is tracked by #62 and the GPT-project archaeology docs.

### Recovered themes from project history

The project history has already established the following categories for preservation:

1. TAIJIFU site evolution, information architecture and official-content recovery.
2. Identity/design decisions and visual implementation history.
3. TAIJIFU Masters game/simulation history.
4. Character and asset pipeline work, including VM01-A1 and PACK 04 references recorded in archaeology.
5. Modular Fighter proposal and loadout architecture as legacy/experimental product-design evidence.
6. GitHub + GPT development process decisions.
7. CI incidents where jobs terminated before steps executed; these must not be mislabeled as code-test failures.
8. Canon/UX separation decisions, including the rule that editorial/Three.js hierarchy is not automatically Canon semantics.

## Cross-repository context

Other TEHKNÉ/HNK repositories may provide reusable governance, language/runtime patterns, provenance practices or product examples. They do not override TAIJIFU Canon. Relevant contextual repositories reviewed in this project include:

- `tehkne-os`
- `codex-hnk`
- `HNK-KODE`
- `HNK-VERSE`
- `alakazam-strangeverse`
- `SIMPLEWAY-ONE`
- `SW-ENGLISH`
- `simpleway-hnk`
- `simpleway-math`

## Open reconciliation work

- #62 — continue GPT Project archaeology/import.
- #63 — audit/reconcile Canon.
- #64 — official content, identity and assets.
- #65 — preserve TAIJIFU Masters/game legacy.
- #66 — repository/CI governance and hygiene.
- #69 — validate and protect canonical consumption.
- #70 — Canon semantics vs experience hierarchy (implementation merged via #72; tracker should be closed/reconciled when verified).
- #71 — resolve official `/referencias/` body or preserve the gap as unresolved.

## Migration protocol

For each legacy batch:

1. Identify source and revision where possible.
2. Preserve original terminology and claims.
3. Extract decisions separately from proposals and observations.
4. Classify every recovered element.
5. Record conflicts rather than resolving them by invention.
6. Link the batch to an issue and PR.
7. Promote to current product or Canon only through an explicit reviewed change.

## Definition of complete consolidation

Consolidation is complete only when every known TAIJIFU historical source is either:

- preserved in the repository or represented by a provenance record;
- classified;
- reconciled or explicitly marked unresolved;
- linked to the current Canon/product when applicable;
- discoverable from repository documentation.
