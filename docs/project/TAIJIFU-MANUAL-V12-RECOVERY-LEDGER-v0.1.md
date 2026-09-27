# TAIJIFU Manual V12 Recovery Ledger — v0.1

Status: ACTIVE / SOURCE RECOVERY
TPT Gate: GAMEDESIGN GD1 AUTHORITY RECONCILIATION
Date: 2026-09-27

## Purpose
Recover Manual V12 without reconstructing its semantics from memory or filenames. This ledger separates evidence that the package existed from evidence of its actual contents and defines the lossless-ingestion gate required before GAMEDESIGN denominator closure.

## Evidence currently available

1. `docs/TAIJIFU-UNIFIED-REPOSITORY-SPEC-V1.md` inventories Manual V12 as a historical source package of 166 files and names representative artifacts including `sistema-xp.html`, `codex-tecnicas.html`, `jornada-90-dias.html`, certification/prova material, modules 00-08 and 12 technique sheets.
2. Issue #14 records Manual V12 / curriculum / XP / game-design genealogy as an explicit archaeology task and states that the expected `manual/` root is not represented on current `main`.
3. Current-main code search for `sistema-xp`, `codex-tecnicas`, `jornada-90-dias`, certification/exam/module terms returned no source artifacts.
4. Commit search for `Manual V12` in `tehknesolutions/TAIJIFU-SITE` returned no matching commit.
5. Repository search under the connected `tehknesolutions` account currently exposes only `TAIJIFU-SITE`; no second TAIJIFU repository containing the package was recovered through that surface.
6. Current Project uploaded-text search did not recover Manual V12 content under the known names.

## What this evidence proves

- Manual V12 existed in the project genealogy strongly enough to be inventoried by an approved unification specification.
- Its intended lossless ingestion was part of the repository-unification plan.
- The source payload is not currently recoverable from the searched `main`, commit text, connected TAIJIFU repository list, or currently indexed Project text sources.

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
- historical ZIP/export with file bytes intact.

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

The blocker is now narrower than “archaeology incomplete”: the authority inventory is known, searches have been exhausted across the currently connected/retrievable surfaces, and the missing object is the actual Manual V12 payload (or another provenance-equivalent source containing its semantics).

## Unblock event

The next valid transition is:

`SOURCE PAYLOAD FOUND -> LOSSLESS IMPORT -> HASH/COUNT MANIFEST -> SEMANTIC CLASSIFICATION -> GD1 DENOMINATOR RECONCILIATION -> 7/7 CLOSURE -> BASELINE v0.1`.

Until that event, TPT must continue work that does not depend on invented Manual semantics. The source gap is a blocker for GD1 closure, not a license to halt independent CODE/DEVOPS/DESIGN/UI/UX/SEO work.
