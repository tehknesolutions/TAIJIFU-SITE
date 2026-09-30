import type { SupportedLocale } from './locale.js';
import { siteRoutes } from './site-ia.js';

export type LocaleLink = Readonly<{
  locale: SupportedLocale;
  href: string;
  rel: 'alternate';
  hreflang: string;
}>;

export type LocalizedSeoModel = Readonly<{
  canonical: string;
  alternates: readonly LocaleLink[];
}>;

export function localizedSeoFor(routeId: string, locale: SupportedLocale): LocalizedSeoModel | null {
  const route = siteRoutes.find((candidate) => candidate.id === routeId);
  const projection = route?.localized?.[locale];
  if (!route || !projection) return null;

  const alternates = Object.entries(route.localized ?? {})
    .filter(([entryLocale]) => entryLocale !== locale)
    .map(([entryLocale, value]) => Object.freeze({
      locale: entryLocale as SupportedLocale,
      href: value.canonicalUrl,
      rel: 'alternate' as const,
      hreflang: entryLocale === 'pt-BR' ? 'pt-BR' : entryLocale,
    }));

  return Object.freeze({ canonical: projection.canonicalUrl, alternates: Object.freeze(alternates) });
}

export function renderLocalizedSeoHead(routeId: string, locale: SupportedLocale): string {
  const model = localizedSeoFor(routeId, locale);
  if (!model) return '';
  return [
    `<link rel="canonical" href="${model.canonical}">`,
    ...model.alternates.map((link) => `<link rel="alternate" hreflang="${link.hreflang}" href="${link.href}">`),
    `<link rel="alternate" hreflang="x-default" href="/">`,
  ].join('');
}
