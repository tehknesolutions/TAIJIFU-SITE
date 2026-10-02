import type { SupportedLocale } from './locale.js';
import { primaryNavigationDefinitions } from './primary-navigation.js';

export type LocalizedRouteProjection = Readonly<{
  title: string;
  canonicalUrl: string;
}>;

export type SiteRoute = Readonly<{
  id: string;
  localized?: Readonly<Record<SupportedLocale, LocalizedRouteProjection>>;
  legacyUrls?: readonly string[];
  source: 'canon-sync' | 'interactive-web-contract';
  contentState: 'official-body-recovered' | 'official-route-body-pending';
}>;

export type ResolvedSiteRoute = SiteRoute & LocalizedRouteProjection;

const localized = (
  ptBR: LocalizedRouteProjection,
  en: LocalizedRouteProjection,
  es: LocalizedRouteProjection,
): Readonly<Record<SupportedLocale, LocalizedRouteProjection>> =>
  Object.freeze({ 'pt-BR': Object.freeze(ptBR), en: Object.freeze(en), es: Object.freeze(es) });

export const siteRoutes: readonly SiteRoute[] = Object.freeze([
  Object.freeze({ id: 'home', source: 'canon-sync', contentState: 'official-body-recovered' }),
  ...primaryNavigationDefinitions.map((entry) => route(
    entry.id,
    entry.ptBR.label, entry.ptBR.slug,
    entry.en.label, entry.en.slug,
    entry.es.label, entry.es.slug,
    entry.legacyUrls,
    entry.id === 'referencias' ? 'official-route-body-pending' : 'official-body-recovered',
  )),
  route('tai', 'TAI', 'principios/tai', 'TAI', 'principles/tai', 'TAI', 'principios/tai', [], 'official-body-recovered', 'interactive-web-contract'),
  route('ji', 'JI', 'principios/ji', 'JI', 'principles/ji', 'JI', 'principios/ji', [], 'official-body-recovered', 'interactive-web-contract'),
  route('fu', 'FU', 'principios/fu', 'FU', 'principles/fu', 'FU', 'principios/fu', [], 'official-body-recovered', 'interactive-web-contract'),
]);

export const primaryNavigation = primaryNavigationDefinitions.map((entry) => entry.id);

export function findLocalizedRoute(id: string, locale: SupportedLocale): ResolvedSiteRoute | null {
  const route = siteRoutes.find((candidate) => candidate.id === id);
  const projection = route?.localized?.[locale];
  return route && projection ? Object.freeze({ ...route, ...projection }) : null;
}

export function findSiteRoute(pathname: string): SiteRoute | null {
  if (pathname === '/') return siteRoutes.find((route) => route.id === 'home') ?? null;
  return siteRoutes.find((route) =>
    Object.values(route.localized ?? {}).some((projection) => projection.canonicalUrl === pathname) ||
    route.legacyUrls?.includes(pathname) ||
    route.localized?.['pt-BR']?.canonicalUrl.replace('/pt-br/', '/') === pathname,
  ) ?? null;
}

export function resolveLegacyRedirect(pathname: string): string | null {
  const route = siteRoutes.find((candidate) =>
    candidate.legacyUrls?.includes(pathname) ||
    candidate.localized?.['pt-BR']?.canonicalUrl.replace('/pt-br/', '/') === pathname,
  );
  return route?.localized?.['pt-BR']?.canonicalUrl ?? null;
}

function route(
  id: string,
  ptTitle: string, ptSlug: string,
  enTitle: string, enSlug: string,
  esTitle: string, esSlug: string,
  legacyUrls: readonly string[] = [],
  contentState: SiteRoute['contentState'] = 'official-body-recovered',
  source: SiteRoute['source'] = 'canon-sync',
): SiteRoute {
  return Object.freeze({
    id,
    localized: localized(
      { title: ptTitle, canonicalUrl: `/pt-br/${ptSlug}/` },
      { title: enTitle, canonicalUrl: `/en/${enSlug}/` },
      { title: esTitle, canonicalUrl: `/es/${esSlug}/` },
    ),
    legacyUrls: Object.freeze([...legacyUrls]), source, contentState,
  });
}
