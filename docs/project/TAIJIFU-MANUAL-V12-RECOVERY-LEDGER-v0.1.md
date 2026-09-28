# TAIJIFU Manual V12 Recovery Ledger — v0.1

Status: ACTIVE / SOURCE RECOVERY
TPT Gate: GAMEDESIGN GD1 AUTHORITY RECONCILIATION
Date: 2026-09-27
Updated: 2026-09-28 — expanded GitHub organization/history + local-drive recovery search

## Purpose
Recover Manual V12 without reconstructing its semantics from memory or filenames. This ledger separates evidence that the package existed from evidence of its actual contents and defines the lossless-ingestion gate required before GAMEDESIGN denominator closure.

## Evidence currently available

1. `docs/TAIJIFU-UNIFIED-REPOSITORY-SPEC-V1.md` inventories Manual V12 as a historical source package of 166 files and names representative artifacts including `sistema-xp.html`, `codex-tecnicas.html`, `jornada-90-dias.html`, certification/prova material, modules 00-08 and 12 technique sheets.
2. Issue #14 records Manual V12 / curriculum / XP / game-design genealogy as an explicit archaeology task and states that the expected `manual/` root is not represented on current `main`.
3. Current-main code search for `sistema-xp`, `codex-tecnicas`, `jornada-90-dias`, certification/exam/module terms returned no source artifacts.
4. Commit search for `Manual V12` in `tehknesolutions/TAIJIFU-SITE` returned no matching source commit; the only later matching documentation commit establishes this recovery ledger.
5. The connected repository surface initially exposed only `TAIJIFU-SITE`, but authenticated GitHub CLI inspection on 2026-09-28 recovered the wider `Tehkne-Solutions` organization inventory, including `taijifu-platform`, `taijifu-masters`, `taijifu-masters-assets` and `taijifu-legacy`.
6. Organization-wide GitHub code searches for the representative exact names `sistema-xp.html`, `codex-tecnicas.html`, `jornada-90-dias.html` and their basename variants returned no matches across `Tehkne-Solutions`.
7. A full remote-ref/history filename search in `TAIJIFU-SITE` found no `manual/` payload or representative Manual V12 filenames across the currently reachable branches/refs, not only `main`.
8. `Tehkne-Solutions/taijifu-platform` was cloned with all reachable remote refs. Its branch/history filename search found no `manual/` payload or representative Manual V12 filenames. Current and feature trees contain the versioned Canon package and master-document tooling, but not the historical 166-file Manual payload.
9. Current trees for `taijifu-masters`, `taijifu-masters-assets` and `taijifu-legacy` were inspected for Manual/XP/journey/certification-style paths; no Manual V12 payload was recovered. `taijifu-masters` has an assets release, not the Manual V12 source package.
10. The authorized workstation was searched for the exact representative filenames in common user locations, known local TAIJIFU directories, and additional mounted drives `D:` and `E:`. No exact source file or archive named for Manual V12 was recovered from those searched surfaces.
11. Current Project uploaded-text search did not recover Manual V12 content under the known names.

## Search boundary / limitations

The expanded search materially reduces the probability that Manual V12 is merely hidden on an active TAIJIFU Git branch or obvious local project directory. It does **not** prove that no copy exists in deleted/unreferenced Git objects, an unlisted external repository, cloud storage not mounted locally, old machine backups, messaging attachments, email attachments, offline media or a differently named archive.

Those surfaces remain valid recovery targets. Absence from the searched surfaces is not permission to reconstruct semantics.

## What this evidence proves

- Manual V12 existed in the project genealogy strongly enough to be inventoried by an approved unification specification.
- Its intended lossless ingestion was part of the repository-unification plan.
- The source payload is not currently recoverable from searched `TAIJIFU-SITE` refs/history, the identified `Tehkne-Solutions` TAIJIFU repositories, organization code search, currently indexed Project text sources, or the inspected local workstation project/drives.
- The blocker is now specifically recovery of a provenance-equivalent payload from an unsearched/archival surface, not uncertainty about which active repository branch to inspect.

## What this evidence does NOT prove

- the actual XP formula;
- rank thresholds;
- certification rules;
- technique definitions or prerequisites;
- curriculum ordering;
- challenge/reward/economy rules;
- fighter/loadout semantics;
- balancing constants;
- anti-exploit rules.

Those semantics MUST NOT be reconstructed from filenames, historical summaries, or model memory.

## Recovery targets

Priority A — exact source payload:
- original Manual V12 directory/archive;
- original repository/branch/tag containing the 166-file package;
- historical ZIP/export with file bytes intact;
- old machine/cloud/offline backup or attachment containing the package under another archive name.

Priority B — provenance metadata:
- original path tree;
- file count;
- byte sizes;
- hashes if available;
- source repository/commit/tag/date;
- known release/version marker.

Priority C — semantic classification after ingestion:
- curriculum ontology;
- technique ontology;
- progression/XP;
- ranks/certification;
- journeys/challenges/training loops;
- Personalized Training compatibility;
- fighter system;
- combat loadout;
- visual loadout;
- rewards/economy;
- balancing/telemetry;
- anti-exploit/integrity.

## Lossless ingestion gate

GD1 authority reconciliation may begin only after source recovery satisfies:

1. source bytes are preserved before normalization;
2. original relative paths are preserved in a provenance manifest;
3. recovered file count is recorded and compared with the expected 166-file inventory;
4. hashes are generated for recovered files;
5. no source file is silently rewritten during import;
6. duplicate/conflicting artifacts are retained and classified rather than overwritten;
7. semantic promotion is separate from archival ingestion;
8. every promoted GAMEDESIGN rule cites its source artifact/provenance.

## Reconciliation statuses

Every recovered artifact must receive one of:
`CANON | ACTIVE | EXPERIMENTAL | SUPERSEDED | REJECTED | ARCHIVED | NEEDS_REVIEW`.

Importing a file never automatically makes it CANON.

## GD1 state

`GAMEDESIGN GD1: BLOCKED BY SOURCE PAYLOAD RECOVERY`.

The blocker is now narrower than “archaeology incomplete”: the authority inventory is known, active Git repositories/refs and obvious local project surfaces have been searched, and the missing object is the actual Manual V12 payload (or another provenance-equivalent source containing its semantics).

## Unblock event

The next valid transition is:

`SOURCE PAYLOAD FOUND -> LOSSLESS IMPORT -> HASH/COUNT MANIFEST -> SEMANTIC CLASSIFICATION -> GD1 DENOMINATOR RECONCILIATION -> 7/7 CLOSURE -> BASELINE v0.1`.

Until that event, TPT must continue work that does not depend on invented Manual semantics. The source gap is a blocker for GD1 closure, not a license to halt independent CODE/DEVOPS/DESIGN/UI/UX/SEO work.
