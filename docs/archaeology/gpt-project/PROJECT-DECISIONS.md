# TAIJIFU GPT Project — Recovered Decisions

Status: governance / project decision log
Tracker: #62

This log records decisions that are explicit in the current shared Project context. It intentionally separates user decisions from assistant proposals.

## D-001 — Single official repository

Decision owner: project owner/user
Status: ACTIVE

`TAIJIFU-SITE` is the official and sole TAIJIFU repository.

Consequences:

- Canon authority lives in this repository;
- old references to another TAIJIFU repo as Source of Truth are obsolete;
- future TAIJIFU documentation, code, identity, assets, archaeology and product history converge here;
- shared ecosystem repositories may provide reusable protocols/patterns but do not define TAIJIFU content.

Normative document: `docs/CANON-AUTHORITY.md`.

## D-002 — Consolidate all prior TAIJIFU material

Decision owner: project owner/user
Status: ACTIVE

Everything that previously belonged to TAIJIFU is to be brought into the new official repository as documentation, issues, PRs, code/assets where appropriate, and archaeological evidence.

Consolidation preserves provenance and classification. Migration does not imply automatic Canon promotion.

## D-003 — GitHub + GPT operating model

Decision owner: project owner/user
Status: ACTIVE

The project should operate through GitHub and GPT without requiring local-only, external or paid tooling as a prerequisite for the canonical development workflow. External services may exist, but the repository must remain reconstructible and governable without making them the authority.

## D-004 — Shared Project history is legitimate archaeology

Decision owner: recovered project context
Status: ACTIVE FOR ARCHAEOLOGY

Historical chats already present in the shared TAIJIFU GPT Project are part of project history. They must be reconciled rather than ignored. They are not copied wholesale into Canon; decisions, evidence, proposals, rejected approaches and implementation records are classified separately.

## D-005 — Do not invent missing official content

Decision owner: established project rule
Status: ACTIVE

Missing content is marked pending/UNRESOLVED. UI completeness is not justification to fabricate official TAIJIFU content.

## D-006 — Navigation hierarchy is not automatically Canon hierarchy

Decision owner: current architectural review
Status: ACTIVE / REVIEW REQUIRED

A UX or Three.js parent-child graph may encode navigation/context without proving a semantic Canon relationship. Changes introduced around PRs #59/#60 require review under this distinction.

## D-007 — CI pre-step infrastructure failures are not code-test failures

Decision owner: current project review, informed by ecosystem governance
Status: ACTIVE

When a GitHub Actions job terminates before any workflow step executes and provides no test execution evidence, project reporting must not describe it as a failing code test. Infrastructure status and code verification status remain separate.

## Historical proposals kept outside this decision log

The modular fighter architecture recovered from `Desenvolvimento e Atualização PR.txt` is preserved separately because the source language is proposal/recommendation rather than an explicit acceptance record.
