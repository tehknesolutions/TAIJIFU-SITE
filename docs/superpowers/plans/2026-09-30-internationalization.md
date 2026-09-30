# TAIJIFU Internationalization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `pt-BR`, `en`, and `es` first-class TAIJIFU locales with explicit locale URLs, stable route identity, traceable Canon localization, accessible language switching, locale-aware Spatial UI/SEO, and international visual-regression coverage.

**Architecture:** Canon and route identity remain language-independent. Locale-specific titles, paths, UI messages and translated Canon text are projections keyed by stable IDs; renderers consume resolved locale state rather than inventing translations. `/` remains the international entry point and legacy Portuguese URLs redirect to `/pt-br/...`.

**Tech Stack:** TypeScript, Vite, Vitest, Three.js, DOM APIs; Playwright integration follows the #40 visual-regression capture plan.

**Spec:** `docs/superpowers/specs/2026-09-30-internationalization.md`

## Global Constraints

- Exactly three supported locales: `pt-BR`, `en`, `es`.
- Localized URL namespaces are `/pt-br/`, `/en/`, `/es/`.
- `/` is the international entry point.
- Existing unprefixed Portuguese URLs remain recoverable through redirects.
- TAIJIFU, TAI, JI, FU, Ω1 and HNK remain invariant identity tokens.
- Canon IDs, hierarchy, ordering, membership and release identity never change through translation.
- Missing translations are explicit; mixed-language fallback inside a localized page is forbidden.
- Renderers, Three.js and media code do not invent translated URLs.
- Locale choice is manually reversible and accessibility/SEO use the same resolved locale.
- Translation release states are `pending`, `translated`, `reviewed`, `approved`.

## Review Focus

- Unsupported/invalid locale prefix: resolver rejects it or routes through the international entry behavior; it must not silently masquerade as a supported locale.
- Locale switch where an equivalent route is missing: selector exposes a controlled unavailable/entry destination rather than fabricating a slug.
- Missing translated Canon/UI string: localized page does not silently mix another language into the content.
- Legacy Portuguese URL: exactly one canonical redirect lands on the `/pt-br/` equivalent without a loop.
- Spatial/DOM parity under non-Portuguese locale: both surfaces expose the same localized labels and canonical URLs.

---

### Task 1: Locale primitives and stable route identity

**Files:**
- Create: `apps/interactive-web/src/content/locale.ts`
- Create: `apps/interactive-web/src/content/locale.test.ts`
- Modify: `apps/interactive-web/src/content/site-ia.ts`
- Modify/Test: existing `site-ia` tests if present.

**Interfaces:**
- Produces: `SupportedLocale = 'pt-BR' | 'en' | 'es'`, `supportedLocales`, `localePrefix(locale)`, `parseLocalePrefix(pathname)`.
- Produces: locale-independent route IDs plus locale-specific route projection lookup.

- [ ] **Step 1: Write failing locale primitive tests**

Assert exactly `['pt-BR', 'en', 'es']`; prefixes are `pt-br`, `en`, `es`; invalid prefixes return no supported locale.

- [ ] **Step 2: Run focused tests and verify RED**

Run: `npm --prefix apps/interactive-web test -- src/content/locale.test.ts`
Expected: FAIL because locale primitives do not exist.

- [ ] **Step 3: Implement minimal locale primitives**

Implement `localePrefix(locale: SupportedLocale): string` and `parseLocalePrefix(pathname: string): SupportedLocale | null` without browser globals.

- [ ] **Step 4: Extend route tests before changing `site-ia.ts`**

Pin stable route IDs independently from localized titles/paths. Assert `fundamentos` resolves to `/pt-br/fundamentos/`, `/en/foundations/`, `/es/fundamentos/` through route projection data rather than string translation logic.

- [ ] **Step 5: Refactor `site-ia.ts` minimally to satisfy the route tests**

Keep one stable route identity and explicit localized projections. Do not change renderer behavior yet.

- [ ] **Step 6: Run locale + IA tests and verify GREEN**

Run: `npm --prefix apps/interactive-web test -- src/content/locale.test.ts src/content/site-ia.test.ts`
Expected: PASS (adjust exact existing test filename only if repository naming differs).

- [ ] **Step 7: Commit**

Commit message: `feat(i18n): add locale primitives and localized route projections`.

### Task 2: Locale routing and legacy redirects

**Files:**
- Create: `apps/interactive-web/src/content/locale-routing.ts`
- Create: `apps/interactive-web/src/content/locale-routing.test.ts`
- Modify: `apps/interactive-web/src/semantic-site.ts`
- Modify: `apps/interactive-web/src/main.ts`

**Interfaces:**
- Consumes: Task 1 locale primitives and localized route projections.
- Produces: `resolveLocalizedPath(pathname)`, `legacyRedirectFor(pathname)`, and locale-aware canonical route resolution.

- [ ] **Step 1: Write failing routing tests**

Pin `/pt-br/fundamentos/`, `/en/foundations/`, `/es/fundamentos/`; pin `/fundamentos/ → /pt-br/fundamentos/`; pin no redirect loop for already-prefixed routes; pin unsupported prefix behavior.

- [ ] **Step 2: Run focused routing tests and verify RED**

Run: `npm --prefix apps/interactive-web test -- src/content/locale-routing.test.ts`
Expected: FAIL because locale routing does not exist.

- [ ] **Step 3: Implement pure routing functions**

No `window` usage in the routing module. Resolve route ID + locale from path and produce redirects only from explicit legacy mappings.

- [ ] **Step 4: Integrate routing into `semantic-site.ts` and `main.ts`**

Replace assumptions that canonical routes are unprefixed Portuguese. Preserve `/` as international entry rather than forcing it through a content route.

- [ ] **Step 5: Run routing and semantic-site tests**

Run the focused routing tests plus existing semantic-site tests; expected PASS.

- [ ] **Step 6: Commit**

Commit message: `feat(i18n): route explicit locales and preserve legacy URLs`.

### Task 3: UI dictionaries and international entry/language selector

**Files:**
- Create: `apps/interactive-web/src/content/ui-messages.ts`
- Create: `apps/interactive-web/src/content/ui-messages.test.ts`
- Create: `apps/interactive-web/src/content/language-selector.ts`
- Create: `apps/interactive-web/src/content/language-selector.test.ts`
- Modify: `apps/interactive-web/index.html`
- Modify: `apps/interactive-web/src/main.ts`
- Modify: `apps/interactive-web/src/semantic-site.ts`

**Interfaces:**
- Produces: stable message IDs and `messagesFor(locale)` with complete per-locale dictionaries.
- Produces: `equivalentLocaleUrl(routeId, targetLocale)` returning a known localized URL or controlled unavailable result.

- [ ] **Step 1: Write failing dictionary completeness tests**

Assert all three dictionaries expose the same message-ID set and identity tokens are not translated through dictionary values.

- [ ] **Step 2: Write failing language-selector tests**

Assert route-equivalent switching, controlled missing-equivalent behavior, current-locale state, and three accessible language labels.

- [ ] **Step 3: Implement dictionaries and selector domain functions**

Keep UI copy separate from Canon translations. Do not put Canon curriculum text into UI dictionaries.

- [ ] **Step 4: Integrate document `lang`, international `/` entry, and accessible selector**

URL locale has priority. Selector remains keyboard accessible and manually reversible.

- [ ] **Step 5: Run focused tests and existing semantic navigation tests**

Expected: PASS without mixed-language UI fallback.

- [ ] **Step 6: Commit**

Commit message: `feat(i18n): localize UI and add accessible language selection`.

### Task 4: Traceable Canon localization layer

**Files:**
- Create: `apps/interactive-web/src/content/canon-localization.ts`
- Create: `apps/interactive-web/src/content/canon-localization.test.ts`
- Create: `apps/interactive-web/src/content/locales/pt-BR.ts`
- Create: `apps/interactive-web/src/content/locales/en.ts`
- Create: `apps/interactive-web/src/content/locales/es.ts`
- Modify: `apps/interactive-web/src/content/canon-ui.ts`
- Modify: `apps/interactive-web/src/content/canon-ui-render.ts`

**Interfaces:**
- Consumes: stable IDs from `canon-snapshot.ts` and active locale.
- Produces: localized Canon projection with translation status and explicit missing state.

- [ ] **Step 1: Write failing localization integrity tests**

Assert localization cannot change source entity IDs/count/order/parentage; records carry locale + status; missing records are explicit; only reviewed/approved records are release-ready.

- [ ] **Step 2: Implement localization schema and PT-BR projection**

Use the authoritative Portuguese Canon text as the traceable source projection; do not reinterpret content.

- [ ] **Step 3: Add EN/ES translation records only for text actually reviewed for this project**

Where reviewed translation is not yet available, encode `pending` rather than inventing official wording.

- [ ] **Step 4: Make Canon UI consume the localized projection**

A localized page with pending required content must expose controlled unavailable/pending behavior rather than silently falling back to Portuguese inside the page.

- [ ] **Step 5: Run Canon snapshot, localization and Canon UI tests**

Expected: structural Canon invariants remain unchanged and localization tests PASS.

- [ ] **Step 6: Commit**

Commit message: `feat(i18n): add traceable Canon localization projections`.

### Task 5: Localized Spatial UI parity

**Files:**
- Modify: `apps/interactive-web/src/content/canon-registry.ts`
- Modify: `apps/interactive-web/src/spatial-ui.ts`
- Modify: `apps/interactive-web/src/semantic-site.ts`
- Modify: `apps/interactive-web/src/spatial-ui-parity.test.ts`

**Interfaces:**
- Consumes: active locale + localized route/UI projections.
- Produces: localized experience nodes preserving stable node IDs and Three/DOM parity.

- [ ] **Step 1: Extend parity tests for all three locales**

For `pt-BR`, `en`, `es`, assert Three projection and DOM legend expose identical visible node IDs, labels and canonical URLs for each focus state.

- [ ] **Step 2: Run parity tests and verify RED**

Expected: current Portuguese-only projections fail non-Portuguese cases.

- [ ] **Step 3: Implement locale-aware experience projection**

Keep hierarchy/node IDs stable; resolve only presentation labels and canonical localized URLs.

- [ ] **Step 4: Run parity tests and verify GREEN**

Expected: all locales PASS.

- [ ] **Step 5: Commit**

Commit message: `feat(i18n): localize spatial and accessible navigation in parity`.

### Task 6: Locale-aware SEO metadata

**Files:**
- Create: `apps/interactive-web/src/content/locale-seo.ts`
- Create: `apps/interactive-web/src/content/locale-seo.test.ts`
- Modify: `apps/interactive-web/src/main.ts` or the existing metadata owner if one exists.

**Interfaces:**
- Produces: canonical URL + alternates for available localized route equivalents and `x-default` `/`.

- [ ] **Step 1: Write failing SEO tests**

For a route with all three equivalents, assert one same-language canonical plus `pt-BR`, `en`, `es` alternates and `x-default`. Assert a locale page never canonicalizes to another language.

- [ ] **Step 2: Implement pure SEO metadata projection**

Only emit alternates that correspond to explicit route projections; never synthesize slugs.

- [ ] **Step 3: Integrate metadata into document head**

Use active locale and resolved route from the same routing state used by UI/navigation.

- [ ] **Step 4: Run SEO + routing tests**

Expected: PASS.

- [ ] **Step 5: Commit**

Commit message: `feat(i18n): add locale canonical and hreflang metadata`.

### Task 7: International visual-regression contract

**Files:**
- Modify: `apps/interactive-web/src/visual-regression-contract.ts`
- Modify: `apps/interactive-web/src/visual-regression-contract.test.ts`
- Modify: `apps/interactive-web/src/visual-regression-evidence.ts`
- Modify: `apps/interactive-web/src/visual-regression-evidence.test.ts`
- Coordinate with: `docs/superpowers/plans/2026-09-30-visual-regression-capture.md`

**Interfaces:**
- Consumes: supported locales and locale routes.
- Produces: representative international regression scenarios without a blind 3×5 Cartesian expansion.

- [ ] **Step 1: Write failing international regression tests**

Require desktop representative evidence for `pt-BR`, `en`, `es`; retain targeted mobile, reduced-motion and no-media coverage; assert each localized scenario has an explicit locale-prefixed route.

- [ ] **Step 2: Extend scenario/evidence contracts minimally**

Add locale as explicit scenario state. Reuse existing invariants and evidence-only governance.

- [ ] **Step 3: Run visual contract/evidence tests**

Expected: PASS with no fabricated PNGs; new evidence remains `pending-capture` until Playwright produces real captures.

- [ ] **Step 4: Update the #40 Playwright plan if runner interfaces changed**

Keep browser capture consuming the scenario contract rather than duplicating locale state.

- [ ] **Step 5: Commit**

Commit message: `test(i18n): extend Brand Book regression contract across locales`.

### Task 8: Full verification and migration audit

**Files:**
- Modify: `docs/brand/BRAND-BOOK-V1.md`
- Modify: internationalization spec only if implementation discovered an approved architectural correction.

**Interfaces:**
- Consumes all prior tasks.
- Produces release documentation and verification evidence.

- [ ] **Step 1: Audit hard-coded Portuguese UI strings and unprefixed canonical URLs**

Search `apps/interactive-web/src` and `index.html`; classify remaining Portuguese text as Canon source, localized content, historical evidence, or defect. Do not mass-replace identity/proper-name tokens.

- [ ] **Step 2: Run complete executable verification**

Run: `npm --prefix apps/interactive-web run typecheck && npm --prefix apps/interactive-web test && npm --prefix apps/interactive-web run build`
Expected: PASS locally where executable infrastructure is available.

- [ ] **Step 3: Run visual runner after its #40 implementation exists**

Run: `npm --prefix apps/interactive-web run test:visual`
Expected: comparison PASS against reviewed evidence, or explicit pending-baseline failure; never silent baseline rewrite.

- [ ] **Step 4: Update Brand Book internationalization authority map**

Document locale architecture, translation status governance, route authority, selector behavior, SEO and visual-regression relationship.

- [ ] **Step 5: Commit**

Commit message: `docs(i18n): record international release governance`.
