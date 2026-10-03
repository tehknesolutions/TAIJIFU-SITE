# Canon Versioning

TAIJIFU Canon uses semantic versioning as a governance signal.

- **MAJOR:** incompatible change to canonical meaning, identifiers or foundational structure.
- **MINOR:** additive canonical knowledge or domains that preserve compatibility.
- **PATCH:** corrections, provenance improvements, localization fixes and non-semantic maintenance.

## Drafts

Foundation artifacts may use `-draft` until their Sprint acceptance criteria are satisfied.

## Stability

Canonical entity IDs are intended to remain stable across versions. Renaming a display label does not require changing its identifier.

## Localization

`pt-BR`, `en` and `es` representations share the same canonical identity/version. Translation revisions that do not alter canonical meaning are PATCH-level changes.

## Downstream consumption

Platform, Experience, Academy, Masters and ecosystem products should record the Canon version they consume whenever a release boundary requires reproducibility.