# Canon Policy

## Source of truth

The canonical authority for TAIJIFU is the `TAIJIFU-SITE` repository.

## Layers

- **Canon:** official knowledge and identity.
- **Platform:** exposes and indexes Canon.
- **Experience:** presents and makes Canon interactive.
- **Products:** SW, Academy, Masters and future products consume Canon.

## States

Every migrated knowledge item should be classifiable as one of:

- `candidate` — discovered, not yet promoted.
- `verified` — provenance checked, awaiting Canon decision where needed.
- `canonical` — official Canon.
- `deprecated` — retained for history but no longer current.
- `rejected` — explicitly excluded from Canon.

## Provenance

Canonical claims must retain a traceable source. Conflicts are recorded rather than silently overwritten.

## Languages

The canonical content architecture supports `pt-BR`, `en` and `es`. Translation does not create a new independent Canon: localized forms remain linked to the canonical entity and version.

## Change discipline

Canon changes are versioned, reviewable and recorded. Downstream products should consume stable identifiers rather than duplicate authoritative definitions.