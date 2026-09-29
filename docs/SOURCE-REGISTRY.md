# TAIJIFU — Source Registry

This registry prevents source authority from being inferred implicitly.

| Source | Role | Authority for TAIJIFU Canon | Treatment |
|---|---|---:|---|
| `TAIJIFU-SITE/main` | Official repository | YES | Canon + official product authority |
| `TAIJIFU-SITE` history/PRs/issues | Repository history | Contextual | Evidence of decisions; merged state wins |
| GPT Project TAIJIFU chats | Project history | Contextual | Preserve decisions/proposals; do not auto-promote assistant proposals |
| Project uploaded TAIJIFU documents | Primary project sources | Contextual | Import/preserve with provenance; reconcile conflicts |
| Previous TAIJIFU repositories | Legacy sources | NO after consolidation | Migrate recoverable material; classify before promotion |
| TAIJIFU Masters material | Game/product legacy | NO for martial Canon | Preserve as legacy/experimental product archaeology |
| `tehkne-os` | Ecosystem provenance/governance | NO | Shared process and archaeology reference |
| `codex-hnk` | HNK root contracts | NO | Shared HNK governance/runtime rules where adopted |
| `HNK-KODE` | HNK language/domain | NO | Shared language/runtime technology |
| `HNK-VERSE` | Manifestation/runtime patterns | NO | Projection/runtime architecture reference |
| SimpleWay repositories | Consumer/product references | NO | Patterns, cases and evidence only |
| `alakazam-strangeverse` | Game/runtime reference | NO | Asset/runtime pipeline patterns only |

## Conflict precedence

For TAIJIFU-specific truth, use this order unless an explicit Canon change says otherwise:

1. current explicit Canon material merged into `TAIJIFU-SITE/main`;
2. current explicit project decision subsequently materialized in this repository;
3. recovered primary TAIJIFU source with provenance;
4. repository/project historical evidence;
5. legacy implementations;
6. external ecosystem patterns;
7. inference.

Inference never silently resolves a conflict.
