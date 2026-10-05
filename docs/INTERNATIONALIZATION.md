# TAIJIFU Internationalization Foundation

Status: ACTIVE FOUNDATION
Tracker: #203
Related: #33, #40

## Authority

`TAIJIFU-SITE` remains the sole TAIJIFU Source of Truth. Internationalization does not create a second Canon.

The model is: CANON → LOCALIZATION → ROUTE/UI → SEO/REGRESSION.

Canonical entities, doctrine and curriculum remain locale-independent. Localized strings, labels, page titles and route projections are language-specific projections.

## Official locales

| Locale | URL prefix | Status |
|---|---|---|
| pt-BR | `/pt-br/` | approved/release-ready where content is recovered |
| en | `/en/` | structural routing available; page bodies may remain pending |
| es | `/es/` | structural routing available; page bodies may remain pending |

Locale support must be explicit in `content/locale.ts`; new locales require an intentional change.

## Content contract

Localized content preserves a stable source identity: `contentKey + sourceAuthority + locale + status`.

A translation may change language, grammar and culturally appropriate phrasing, but MUST NOT silently change Canon meaning, entity identity, counts, relationships or authority.

Missing localization is represented as `pending`/unresolved and must not be replaced by invented copy.

## Routing contract

Every localized route projection has a stable route/entity id, locale, localized title and canonical localized URL.

The route id is the stable identity. Slugs are presentation/SEO projections and may differ by locale.

## Fallback contract

Fallback is allowed for non-Canon interface chrome only when explicitly declared.

Official Canon/product body content must not silently fall back from an unavailable locale to another language and present that content as localized. The renderer should expose an explicit pending state.

## SEO contract

Locale-aware routes must eventually emit locale-specific canonical URLs, `hreflang` alternates for available locales, locale-aware title/description, and `x-default` only where an intentional default experience exists.

SEO metadata must reference the same route identity used by the UI.

## Regression contract

Visual regression must cover language-dependent critical states where text length can change layout: desktop, mobile, reduced-motion, no-media, and pt-BR / en / es for approved or structurally active routes.

Regression evidence must identify locale and route.

## Acceptance for #203

1. Supported locales are centralized and typed.
2. Route identity is stable across locales.
3. Content localization status is explicit.
4. Missing translation is test-detectable.
5. Canon content cannot be silently rewritten by locale projection.
6. Architecture is ready for locale-aware SEO and visual regression.

This document records the foundation. It does not promote pending translations or historical material to Canon.