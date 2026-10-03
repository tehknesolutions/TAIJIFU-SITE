# TAIJIFU Migration Ledger

Status: ACTIVE — EPIC-001 / Sprint 001
Authority: `tehknesolutions/TAIJIFU-SITE`

This ledger tracks knowledge moving toward the official Canon without silently promoting historical or product material.

| ID | Source | Destination | Class | State | Evidence / ruling |
|---|---|---|---|---|---|
| MIG-001 | Existing `TAIJIFU-SITE` Canon/docs | Canon Foundation | CANON / GOVERNANCE | reconciled | `CANON-AUTHORITY.md`, `SOURCE-REGISTRY.md`, `PROJECT-ARCHAEOLOGY.md`, `LEGACY-CONSOLIDATION-LEDGER.md` reviewed against EPIC-001. Existing authority preserved. |
| MIG-002 | GPT Project TAIJIFU chats | Canon/product candidates | SOURCE | inventory | Project history is legitimate evidence; assistant proposals are not auto-promoted. |
| MIG-003 | Project uploaded TAIJIFU documents | Archaeology + candidates | SOURCE | inventory | Known families: `SITE TAIJIFU.txt`, `Análise Taijifu Masters.txt`, `Relatório Taijifu Masters.txt`, `Desenvolvimento e Atualização PR.txt`; revisions require provenance. |
| MIG-004 | Previous TAIJIFU repositories | Canon/product candidates | LEGACY | queued | Preserve provenance and conflict history before promotion. |
| MIG-005 | TAIJIFU Masters/game material | Masters product archaeology | LEGACY / EXPERIMENTAL | inventory | Asset pipeline and Modular Fighter material retained without redefining martial Canon. |
| MIG-006 | TEHKNÉ/HNK/SimpleWay ecosystem repos | Governance/runtime context | EVIDENCE | reconciled | Context only; cannot override TAIJIFU Canon. |

## States

`queued → inventory → reconciled → verified → promoted`

A migration may also end as `deprecated`, `rejected` or `unresolved`.

## Classification contract

`CANON | OFFICIAL_PRODUCT | SOURCE | EVIDENCE | LEGACY | EXPERIMENTAL | UNRESOLVED`

## Reconciliation rulings

1. `TAIJIFU-SITE` remains the sole authority; EPIC-001 structures governance but does not replace existing Canon authority documents.
2. Current versioned baseline remains `canon/TAIJIFU-CANON-1.0/` until an explicit reviewed Canon release supersedes it.
3. Canon semantic hierarchy and Platform/Experience navigation hierarchy remain separate concerns.
4. GPT Project history is a valid source class, but no assistant-generated proposal becomes Canon solely because it appears in project history.
5. Masters/game history remains product evidence unless explicitly promoted by a reviewed repository change.
6. Unsupported gaps remain unresolved rather than filled by inference.

## Open reconciliation queue

- Continue GPT Project archaeology/import (#62).
- Audit/reconcile Canon (#63).
- Official content, identity and assets (#64).
- Preserve Masters/game legacy (#65).
- Repository/CI governance and hygiene (#66).
- Validate/protect canonical consumption (#69).
- Reconcile semantics vs experience hierarchy (#70/#72 history).
- Resolve `/referencias/` only from supported sources (#71).

## Promotion gate

A source-derived item can be promoted only when provenance, classification, conflict state, destination and reviewable repository change are all explicit.
