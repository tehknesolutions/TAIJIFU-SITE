# TAIJIFU Internationalization — Architecture Spec

## Goal

TAIJIFU is an international product with three first-class locales:

- `pt-BR` — Português do Brasil
- `en` — English
- `es` — Español

Internationalization is structural, not a late translation layer. It applies to navigation, official content projections, accessible UI, Spatial UI labels, SEO metadata, language selection, routing, and visual regression.

## Authority and translation boundary

TAIJIFU-CANON-1.0 remains the authoritative source release. The current Canon snapshot imports the official JSON source directly and validates its structural invariants. Localized content must not fork, silently edit, reinterpret, or replace those Canon entities.

Localized records are projections keyed to stable Canon/entity IDs. A translation may change human-readable language but not entity identity, hierarchy, ordering, canonical concept identifiers, or source provenance.

TAIJIFU, TAI, JI, FU, Ω1 and HNK are identity/proper-name tokens and remain invariant unless a future explicit Canon/brand decision says otherwise.

## Locale model

```ts
type SupportedLocale = 'pt-BR' | 'en' | 'es';
```

Every localizable record must be keyed by stable semantic/route IDs, never by translated strings. Missing translations must be detectable. A locale must not silently fall back to another language inside an otherwise localized page.

During migration, incomplete locale records are represented explicitly as missing/pending. The product may route a user to a complete locale or show a controlled unavailable state, but must not create a mixed-language page by accident.

## URL architecture

All three locales use explicit URL namespaces:

- `/pt-br/...`
- `/en/...`
- `/es/...`

Examples:

- `/pt-br/fundamentos/`
- `/en/foundations/`
- `/es/fundamentos/`

`/` is the international entry point. It may use an explicit prior user choice or browser language preference to propose/route a supported locale. Locale selection must always remain manually reversible and accessible.

Existing unprefixed Portuguese URLs become legacy redirects to their `/pt-br/` equivalents. Existing legacy aliases continue to resolve through the routing layer rather than being copied into renderers.

Route identity is locale-independent. A route such as `fundamentos` has one stable route ID and locale-specific path/title projections.

## Localized route contract

The current `siteRoutes` model stores Portuguese title and canonical URL directly. It will evolve toward a locale-independent route definition plus localized route projection, conceptually:

```ts
type LocalizedRoute = {
  routeId: string;
  locale: SupportedLocale;
  title: string;
  canonicalUrl: string;
};
```

Renderers, Three.js, navigation components and SEO consume resolved localized routes; they do not invent translated slugs.

## Canon localization

`canon-snapshot.ts` remains the structural Canon snapshot and integrity boundary. Localization sits above it.

Localized Canon content is keyed by stable Canon IDs (`base`, `belt`, `path`, `nucleus`, etc.). Translation records carry locale and source/review status so English and Spanish text remain traceable to the authoritative source.

No translation pipeline may alter Canon counts, IDs, parentage, path membership, nucleus membership, ordering or release identity.

Translation governance states should distinguish at minimum:

- `pending`
- `translated`
- `reviewed`
- `approved`

Only reviewed/approved translations should be treated as release-ready official localized content.

## UI and accessibility

UI strings must move out of presentation components into locale dictionaries keyed by stable message IDs. `lang` on the document reflects the active locale. Accessible labels, skip links, CTA text, navigation labels, status messages and non-Canon explanatory UI are localized through the same locale resolution.

Language selection must be keyboard accessible, expose the current language, and preserve the equivalent route when switching locales when that localized route exists.

## Spatial UI

Spatial hierarchy remains `experience-navigation`, not Canon semantics. Spatial nodes keep stable IDs, while their label and canonical URL are resolved for the active locale.

Three.js and the accessible DOM legend must continue to consume the same resolved localized experience projection, preserving the parity contract introduced in #38.

## SEO

Every localized public route must expose:

- locale-specific canonical URL;
- alternate links for available `pt-BR`, `en`, and `es` equivalents;
- `hreflang` values matching the supported locales;
- an `x-default` entry for the international `/` entry point where appropriate;
- localized title/description metadata without changing identity tokens.

A locale page must not canonicalize to a different language merely because its translation is derived from the same Canon entity.

## Locale selection

Resolution priority:

1. explicit locale in URL;
2. explicit saved user choice, if available;
3. supported browser language preference;
4. controlled default to `pt-BR`.

Automatic detection is a convenience, not a lock. The language selector remains available after resolution.

## Visual regression integration

The #40 regression architecture remains state-driven. Locale becomes an explicit scenario dimension, but the initial matrix must avoid unnecessary Cartesian explosion.

Minimum international release evidence must include all three locales in representative desktop coverage plus targeted mobile/reduced-motion/no-media coverage where layout or behavior differs. Long English/Spanish strings and translated navigation must be specifically exercised.

Screenshots remain `evidence-only`; they do not become translation or identity authority.

## Migration sequence

1. Add locale primitives and locale-independent route IDs.
2. Add localized route projections for `pt-BR`, `en`, `es`.
3. Redirect existing Portuguese URLs to `/pt-br/...`.
4. Extract UI strings into dictionaries.
5. Add Canon localization records keyed by stable IDs, initially preserving explicit pending states where translations have not been reviewed.
6. Localize accessible/Spatial UI projections.
7. Add language selector and equivalent-route switching.
8. Add canonical/hreflang metadata.
9. Extend visual regression evidence for international layouts.
10. Translate/review official content without inventing unsupported Canon meaning.

## Non-negotiable invariants

- Exactly three supported locales at this stage: `pt-BR`, `en`, `es`.
- Locale prefixes are explicit for all localized content.
- `/` remains the international entry point.
- Existing Portuguese routes remain recoverable through redirects.
- Canon structural identity is language-independent.
- Translation never changes Canon IDs or hierarchy.
- Missing translations are explicit, not silently replaced by mixed-language fallback.
- Renderers do not invent translated URLs.
- TAIJIFU / TAI / JI / FU / Ω1 / HNK remain invariant identity tokens.
- Language choice remains reversible by the user.
- SEO and accessibility are locale-aware from the same resolved locale state.
