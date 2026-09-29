# TAIJIFU Consolidation Roadmap

## Goal

Make `TAIJIFU-SITE` self-contained as the sole official TAIJIFU repository while preserving all recoverable legacy/project knowledge with provenance.

## Phase 1 — Authority and inventory

- establish repository authority contract;
- correct README Source-of-Truth language;
- create source registry and archaeology baseline;
- inventory historical TAIJIFU repositories, project documents, GPT Project discussions, assets and specifications;
- classify each source as CANON / OFFICIAL_PRODUCT / SOURCE / EVIDENCE / LEGACY / EXPERIMENTAL / UNRESOLVED.

## Phase 2 — Canon consolidation

- verify the current Canon snapshot entities and invariants;
- migrate any missing Canon definitions supported by legacy primary sources;
- preserve provenance for every migrated body;
- explicitly record unresolved conflicts rather than choosing by inference;
- reconcile Canon semantic relationships independently from web navigation.

## Phase 3 — Content and identity consolidation

- reconcile all public routes against recovered official content;
- resolve `/referencias/` only when supported;
- consolidate identity specifications, logos, gestures and asset rules;
- preserve Identity v2.2 constraints as repository documentation/tests where practical.

## Phase 4 — Product/runtime legacy

- archive/import relevant Masters design and runtime history;
- retain modular fighter, asset pipeline and game concepts as legacy/experimental unless promoted;
- separate martial Canon from game mechanics;
- document reusable runtime patterns adopted from HNK/VERSE/other ecosystem projects.

## Phase 5 — Repository hygiene and governance

- remove accidental `.ignore-final` artifact;
- update stale external-repository references;
- document CI pre-step infrastructure classification;
- ensure issues/PRs link migration work to source evidence;
- ensure `main` alone is sufficient to understand current TAIJIFU authority.

## Phase 6 — Web v1 completion

- finish semantic/document navigation;
- finish interactive projection without inventing Canon hierarchy;
- validate responsive/accessibility behavior;
- verify all official content and Identity v2.2 presentation;
- publish a navigable interactive Web v1 from the consolidated repository.

## Definition of done

Consolidation is complete when a new contributor/agent can clone only `TAIJIFU-SITE`, identify the current Canon and official design/product rules, trace important legacy decisions to provenance, distinguish unresolved material from Canon, and build/test the official web experience without depending on another TAIJIFU repository.
