# EPIC-002 — Historical Source Inventory

| Source ID | Source family | Role | Current state |
|---|---|---|---|
| `repo:TAIJIFU-SITE` | Official repository/current Canon | authority | active |
| `repo:TAIJIFU-SITE-history` | commits, issues, PRs | decision/history evidence | active |
| `project:taijifu-history` | GPT Project TAIJIFU conversations | historical migration source | inventory |
| `project:uploaded-documents` | uploaded project documents | historical migration source | inventory |
| `source:legacy-repositories` | previous TAIJIFU repositories | legacy chronology/source | queued |
| `product:masters-legacy` | Masters/game history | product-history evidence | inventory |
| `ecosystem:*` | TEHKNÉ/HNK/SimpleWay repositories | contextual evidence | constrained |

## First-pass finding

The versioned `canon/TAIJIFU-CANON-1.0/` baseline contains the martial Canon dataset (`README`, bases, belts, paths, nuclei and release metadata) and is not by itself a complete historical biography/timeline source. Historical claims therefore require archaeology across the registered source families rather than silent extrapolation from the martial dataset.

## Extraction order

1. Current explicit Canon and repository-materialized decisions.
2. Project decisions and uploaded primary material.
3. Repository history and previous TAIJIFU implementations.
4. Ecosystem context.
5. Inference is never promoted as historical Canon.
