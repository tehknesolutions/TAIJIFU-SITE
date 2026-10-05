# TAIJIFU — Knowledge Sources Registry

Status: active recovery registry  
Purpose: prevent repeated source handoff and make `TAIJIFU-SITE` the consolidation destination.

## Consolidation rule

`TAIJIFU-SITE` is the official consolidation repository. Historical material is preserved with provenance; it is not silently promoted over newer explicit canon. When sources conflict, retain both claims and resolve authority explicitly.

## Primary source set

### 1. Current official consolidation repository

- Repository: `tehknesolutions/TAIJIFU-SITE`
- Role: destination and current public product/canon implementation.
- Contains the current `TAIJIFU-CANON-1.0` snapshot, official page bodies, IA, interactive web, training engine work, migration records, issues and implementation history.

### 2. Historical full platform

- Repository: `Tehkne-Solutions/taijifu-platform`
- Pinned recovery baseline: `15c81fc99f0bf95560521098e70dec7a92915f24` (`main`, observed 2026-10-05).
- Historical role stated by its README: official Taijifu platform and source of information/documentation/knowledge plus App/Academy.
- Its declared Canon 1.0: 4 Bases, 10 belts, 32 Paths, 128 Nuclei; Black belt synthesizes C01–C32 / N001–N128.
- Product areas present in the repository include official site/canon explorer, Academy/App, Evidence, Dojo Workspace, AI, Community, belt/path/nucleus surfaces, practice/readiness/traversal APIs, validation tooling and production workflows.
- Important historical canon work visible in its commit history includes: master document compiler; graduation/degrees/Base progress; ten-stage Integral Method; PFI physical preparation system; Martial Science/Kinetic Arts taxonomy; influence/genealogy matrix.
- This repository MUST be treated as a first-class recovery source, not as an optional reference.

### 3. Historical SW corpus

- Repository: `tehknesolutions/SW-TAIJIFU`
- Role: historical SimpleWay/Taijifu documentation and training material.
- Recovery status is tracked in `docs/legacy/SW-TAIJIFU-MIGRATION-MATRIX.md` and issues #201/#202.
- Material remains provenance-aware (`legacy-candidate`) until reconciled with current authority.

### 4. Other historical Taijifu repositories

Known recovery sources include:

- `tehknesolutions/alakazam-strangeverse`
- earlier Taijifu repositories/branches referenced in project history
- HNK/SimpleWay repositories when they contain Taijifu genealogy, ontology, design-system or canonical dependencies.

These sources must be searched before concluding that Taijifu knowledge is absent.

### 5. Historical public site

- Public legacy site: `https://taijifu.page.gd/`
- User declaration: this site still contains the historical Taijifu material together.
- Role: visual/content recovery source and cross-check against repository history.
- Note: automated fetch may be blocked by the host (403). A fetch failure is NOT evidence that the content does not exist and MUST NOT be interpreted as absence.

### 6. Google Drive corpus

Google Drive is an explicit Taijifu/HNK recovery source. Accessible material includes historical project/chat documentation. One indexed source recovered during consolidation:

- `Histórico do chat para criação do GEM personalizado HNK-MIG`
- Drive document id: `18BdTCnHmeZSWTYSwEzofs-bOrA_smsrchmucVKxcf0k`

Drive must be searched alongside repositories before asking the creator to repeat historical Taijifu information.

### 7. ChatGPT project history

The conversations in the Taijifu project are an explicit source of decisions, canon declarations, product requirements, design decisions, corrections and provenance.

Known project decisions include:

- `TAIJIFU-SITE` is the single official Taijifu consolidation repository.
- Material from previous Taijifu repositories must be brought into the official repository rather than repeatedly requested from the creator.
- GitHub + GPT (GIP) is the preferred critical path; local/external/paid dependencies must not become blockers for the public site.
- The public site must become navigable and interactive with official content and official design.
- Historical statements explicitly confirmed by the creator in project chat must be preserved as project provenance and reconciled into the appropriate canonical/history surfaces.

## Recovery order

Before declaring information missing:

1. inspect current `TAIJIFU-SITE` canon/content;
2. inspect `taijifu-platform` at the pinned baseline and relevant history;
3. inspect `SW-TAIJIFU` and other Taijifu/HNK/SimpleWay repositories;
4. search the Taijifu Google Drive corpus;
5. inspect Taijifu project-chat decisions;
6. cross-check the historical public site when technically reachable;
7. only then mark an item `unavailable` or ask the creator for new information.

## Authority rule

Source availability and canonical authority are different concepts. Consolidation means preserving the knowledge in this repository with provenance. Promotion to current canon requires reconciliation when a newer source conflicts with an older one.

## Creator handoff rule

The creator should not need to resend these sources in future Taijifu work. This registry is the durable pointer set for recovery and consolidation.
