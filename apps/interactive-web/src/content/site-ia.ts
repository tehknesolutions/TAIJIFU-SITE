import type { SupportedLocale } from './locale.js';

export type LocalizedRouteProjection = Readonly<{
  title: string;
  canonicalUrl: string;
}>;

export type SiteRoute = Readonly<{
  id: string;
  localized?: Readonly<Record<SupportedLocale, LocalizedRouteProjection>>;
  legacyUrls?: readonly string[];
  source: 'canon-sync' | 'interactive-web-contract' | 'personalized-training-spec';
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
  route('manifesto', 'Manifesto', 'manifesto', 'Manifesto', 'manifesto', 'Manifesto', 'manifesto', ['/o-que-e/']),
  route('fundamentos', 'Fundamentos', 'fundamentos', 'Foundations', 'foundations', 'Fundamentos', 'fundamentos', ['/filosofia/']),
  route('influencias', 'Influências', 'influencias', 'Influences', 'influences', 'Influencias', 'influencias', ['/artes-base/']),
  route('metodo', 'Método', 'metodo', 'Method', 'method', 'Método', 'metodo', ['/trilhas/']),
  route('graduacao', 'Graduação', 'graduacao', 'Graduation', 'graduation', 'Graduación', 'graduacion', ['/niveis-e-graduacao/']),
  route('referencias', 'Referências', 'referencias', 'References', 'references', 'Referencias', 'referencias', ['/textos-oficiais/'], 'official-route-body-pending'),
  route('historia', 'História', 'historia', 'History', 'history', 'Historia', 'historia', ['/registro/']),
  route('tai', 'TAI', 'principios/tai', 'TAI', 'principles/tai', 'TAI', 'principios/tai', [], 'official-body-recovered', 'interactive-web-contract'),
  route('ji', 'JI', 'principios/ji', 'JI', 'principles/ji', 'JI', 'principios/ji', [], 'official-body-recovered', 'interactive-web-contract'),
  route('fu', 'FU', 'principios/fu', 'FU', 'principles/fu', 'FU', 'principios/fu', [], 'official-body-recovered', 'interactive-web-contract'),
  route('treino-personalizado', 'Treino Personalizado', 'treino-personalizado', 'Personalized Training', 'personalized-training', 'Entrenamiento Personalizado', 'entrenamiento-personalizado', [], 'official-body-recovered', 'personalized-training-spec'),
]);

export const primaryNavigation = Object.freeze([
  'manifesto', 'fundamentos', 'influencias', 'metodo', 'graduacao', 'referencias', 'historia', 'treino-personalizado',
]);

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
