# TAIJIFU Web v1 Experience Architecture

Status: APPROVED DESIGN DIRECTION
Date: 2026-09-30

## Intent

Define the next product evolution of `apps/interactive-web` as the official TAIJIFU web experience.

## Authority

- `TAIJIFU-SITE` is the single source of truth.
- GIP operational model: ChatGPT + GitHub.
- External hosting, CI runners and paid services are not architectural requirements.
- Historical platforms remain genealogy unless explicitly promoted.

## Decision

`apps/interactive-web` becomes the primary navigable web experience.

The application evolves existing foundations instead of creating a parallel platform.

## Product Flow

1. Entry / Home
2. Dojo Gate
3. Semantic navigation
4. TAI / JI / FU knowledge spaces
5. Training and interactive experiences
6. Progressive enhancement layers

## Technical Principles

- Semantic HTML remains the base experience.
- Interactive and spatial layers enhance, never replace, navigation.
- Localized routes remain canonical.
- Content authority comes from approved TAIJIFU sources.
- Tests describe contracts, not external infrastructure.

## Migration Boundary

WordPress-era material is preserved as historical genealogy and migration source where compatible. It is not a competing runtime authority.

## Success Criteria

- Browser navigable Web v1.
- Canonical design system applied.
- Content surfaces connected.
- Accessibility and responsive behavior preserved.
- Reproducible through repository state alone.
