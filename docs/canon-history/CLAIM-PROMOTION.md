# Historical Claim Promotion Contract

A claim advances through:

`candidate → verified → canonical`

or exits/pauses as:

`conflicted | unresolved | rejected`.

## Minimum promotion record

Every promoted historical claim must identify:

- stable claim ID;
- subject/entity;
- exact proposition;
- source ID from the Source Registry;
- source locator (file, issue/PR, document revision, conversation artifact, commit or equivalent);
- classification;
- conflict state;
- reviewable repository change that performs promotion.

## Evidence precedence

1. Current explicit Canon.
2. Materialized project decision.
3. Recovered primary source.
4. Repository/project evidence.
5. Legacy implementation.
6. External ecosystem pattern.
7. Inference.

Inference may guide archaeology but cannot itself become historical Canon.
