# TAIJIFU Web v1 — Canon Coverage

This document records the measurable content-coverage state represented by `apps/interactive-web/src/content`.

## Current baseline

- Canon registry items: 13
- Reconciled canonical routes: 10
- Official route bodies recovered: 1 (`home`)
- Official route bodies pending: 9 (`manifesto`, `fundamentos`, `influencias`, `metodo`, `graduacao`, `referencias`, `historia`, `tai`, `treino-personalizado`)
- Unreconciled semantic items: 3 (`ji`, `fu`, `integration`)

## Semantics

A reconciled route means its canonical public URL is known and may be used for semantic and interactive navigation. It does **not** mean the complete official body for that route has been recovered.

`official-body-recovered` means supported official body content has been recovered for the route.

`official-route-body-pending` keeps a known canonical route visible while explicitly recording that its official body still needs recovery/integration.

`needs-reconciliation` means the registry has evidence for the semantic entity, but not enough reconciled evidence to publish it as a canonical navigation target. Such items must not be silently assigned URLs or projected into the interactive graph.

## Release implication

Web v1 content coverage is not complete until supported official material has been reconciled against this inventory, pending route bodies have been integrated where evidence exists, and unresolved gaps remain explicitly visible rather than being invented or silently merged.
