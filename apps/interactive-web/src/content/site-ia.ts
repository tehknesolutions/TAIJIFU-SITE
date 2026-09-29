export type SiteRoute = Readonly<{
  id: string;
  title: string;
  canonicalUrl: string;
  legacyUrls?: readonly string[];
  source:
    | 'canon-sync'
    | 'interactive-web-contract'
    | 'personalized-training-spec';
  contentState: 'official-body-recovered' | 'official-route-body-pending';
}>;

export const siteRoutes: readonly SiteRoute[] = Object.freeze([
  Object.freeze({
    id: 'home',
    title: 'TAIJIFU',
    canonicalUrl: '/',
    source: 'canon-sync',
    contentState: 'official-body-recovered',
  }),
  Object.freeze({
    id: 'manifesto',
    title: 'Manifesto',
    canonicalUrl: '/manifesto/',
    legacyUrls: Object.freeze(['/o-que-e/']),
    source: 'canon-sync',
    contentState: 'official-body-recovered',
  }),
  Object.freeze({
    id: 'fundamentos',
    title: 'Fundamentos',
    canonicalUrl: '/fundamentos/',
    legacyUrls: Object.freeze(['/filosofia/']),
    source: 'canon-sync',
    contentState: 'official-body-recovered',
  }),
  Object.freeze({
    id: 'influencias',
    title: 'Influências',
    canonicalUrl: '/influencias/',
    legacyUrls: Object.freeze(['/artes-base/']),
    source: 'canon-sync',
    contentState: 'official-body-recovered',
  }),
  Object.freeze({
    id: 'metodo',
    title: 'Método',
    canonicalUrl: '/metodo/',
    legacyUrls: Object.freeze(['/trilhas/']),
    source: 'canon-sync',
    contentState: 'official-body-recovered',
  }),
  Object.freeze({
    id: 'graduacao',
    title: 'Graduação',
    canonicalUrl: '/graduacao/',
    legacyUrls: Object.freeze(['/niveis-e-graduacao/']),
    source: 'canon-sync',
    contentState: 'official-body-recovered',
  }),
  Object.freeze({
    id: 'referencias',
    title: 'Referências',
    canonicalUrl: '/referencias/',
    legacyUrls: Object.freeze(['/textos-oficiais/']),
    source: 'canon-sync',
    contentState: 'official-route-body-pending',
  }),
  Object.freeze({
    id: 'historia',
    title: 'História',
    canonicalUrl: '/historia/',
    legacyUrls: Object.freeze(['/registro/']),
    source: 'canon-sync',
    contentState: 'official-body-recovered',
  }),
  Object.freeze({
    id: 'tai',
    title: 'TAI',
    canonicalUrl: '/principios/tai/',
    source: 'interactive-web-contract',
    contentState: 'official-body-recovered',
  }),
  Object.freeze({
    id: 'ji',
    title: 'JI',
    canonicalUrl: '/principios/ji/',
    source: 'interactive-web-contract',
    contentState: 'official-body-recovered',
  }),
  Object.freeze({
    id: 'fu',
    title: 'FU',
    canonicalUrl: '/principios/fu/',
    source: 'interactive-web-contract',
    contentState: 'official-body-recovered',
  }),
  Object.freeze({
    id: 'treino-personalizado',
    title: 'Treino Personalizado',
    canonicalUrl: '/treino-personalizado/',
    source: 'personalized-training-spec',
    contentState: 'official-body-recovered',
  }),
]);

export const primaryNavigation = Object.freeze([
  'manifesto',
  'fundamentos',
  'influencias',
  'metodo',
  'graduacao',
  'referencias',
  'historia',
  'treino-personalizado',
]);

export function findSiteRoute(pathname: string): SiteRoute | null {
  return (
    siteRoutes.find(
      (route) =>
        route.canonicalUrl === pathname ||
        route.legacyUrls?.includes(pathname),
    ) ?? null
  );
}

export function resolveLegacyRedirect(pathname: string): string | null {
  const route = siteRoutes.find((candidate) =>
    candidate.legacyUrls?.includes(pathname),
  );
  return route?.canonicalUrl ?? null;
}
