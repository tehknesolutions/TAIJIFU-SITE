# taijifu-platform — preserved baseline

Source repository: `Tehkne-Solutions/taijifu-platform`  
Pinned source commit: `15c81fc99f0bf95560521098e70dec7a92915f24`  
Recovery purpose: preserve the historical platform contract inside the official consolidation repository.

## Historical platform contract

The source README defines Taijifu Platform as the official platform with two central responsibilities:

1. be the official source of Taijifu information, documentation and knowledge;
2. provide the App/Academy for study, guided training, practice, evidence and practitioner progression.

It explicitly separates games, parallel products and external experiences from real martial progression.

## Historical Source of Truth

The platform states that the Canon is the source of truth and that official Site, Academy/App, Dojo, Admin and AI consume the same versioned entities.

### Canon 1.0 invariants

- 4 Bases
- 10 belts
- 32 Paths
- 128 Nuclei
- Black belt synthesizes C01–C32 / N001–N128

## Historical product architecture

```text
CANON / KNOWLEDGE GRAPH
        │
        ├── OFFICIAL SITE
        │   └── information, manifesto, method, belts, Paths, Nuclei, science, history and references
        │
        └── APP / ACADEMY
            └── learn, practice, register, review, demonstrate, transfer and evolve
```

The official site is declared the highest-priority public reference surface. Its documented areas are:

- Manifesto and identity;
- history and provenance;
- four Bases;
- 12 Principles;
- ten belts;
- 32 Paths;
- 128 Nuclei;
- Martial Science;
- Kinetic Arts;
- PFI;
- Integral Method;
- Kids & Youth;
- Lifetime;
- Safety;
- training and governance;
- glossary, references and Canon changelog.

## Historical App / Academy progression

```text
Belt
→ Path
→ Nucleus
→ Lesson
→ Guided practice
→ Checkpoint
→ Evidence/reflection
→ Transfer
→ Crossing
→ Authorized evaluation
```

The historical contract explicitly states that XP, content completion or application usage do not automatically grant belt rank.

## Support layers

- Evidence: practice, reflection, evaluation and Crossings.
- Dojo Workspace: classes, sessions, attendance, Safety and in-person evaluation.
- Taijifu AI: explanation/retrieval subordinate to the current Canon.
- Community: complementary practitioner exchange; no martial authority.

## Explicitly outside the historical platform core

- games;
- game progress;
- external achievements;
- gamified XP integrations;
- independent commercial products;
- any bridge converting external experience into Taijifu graduation.

## Historical priorities

The source README records this priority order:

1. complete Official Site / Canon Explorer;
2. deepen the practice App beyond White Belt;
3. complete Evidence and Crossing experience;
4. consolidate search, glossary, references and version history;
5. improve mobile-first training UX;
6. only then expand complementary features.

## Important canonical implementation history at the pinned repository

The source commit history immediately preceding the pinned baseline records explicit canonical work for:

- single master document compiler (`82b1282` lineage);
- graduation, degrees and Base progress (`1510021` / PR #41);
- ten-stage Taijifu Integral Method (`8bed428` / PR #42);
- PFI physical preparation (`f3a8e07` / PR #43);
- Martial Science and Kinetic Arts taxonomy (`0197130` / PR #44);
- influence and genealogy matrix (`ad0e123` → `01748be` / PR #45).

These are first-class recovery targets for `TAIJIFU-SITE`; absence from the current implementation must not be treated as absence from Taijifu history.

## Consolidation note

This document preserves the platform-level contract in `TAIJIFU-SITE`. It does not silently overwrite newer explicit decisions. Detailed source files and canonical entities should be migrated with provenance and reconciled against current canon as implementation proceeds.
