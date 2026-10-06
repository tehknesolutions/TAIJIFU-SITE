import { parseLocalePrefix, type SupportedLocale } from './locale.js';
import { findSiteRoute, resolveLegacyRedirect } from './site-ia.js';
import { findDojoNucleusByPath } from './dojo-nucleus-routes.js';

export type LocalizedPathResolution =
  | Readonly<{ kind: 'international-entry' }>
  | Readonly<{ kind: 'localized-route'; locale: SupportedLocale; routeId: string }>
  | Readonly<{ kind: 'dojo-entry'; locale: SupportedLocale }>
  | Readonly<{ kind: 'dojo-nucleus'; locale: SupportedLocale; nucleusId: string }>
  | Readonly<{ kind: 'not-found' }>;

export function resolveLocalizedPath(pathname: string): LocalizedPathResolution {
  if (pathname === '/') return Object.freeze({ kind: 'international-entry' });

  const locale = parseLocalePrefix(pathname);
  if (!locale) return Object.freeze({ kind: 'not-found' });

  const dojoEntryUrl = locale === 'pt-BR' ? '/pt-br/dojo/' : locale === 'en' ? '/en/dojo/' : '/es/dojo/';
  if (pathname === dojoEntryUrl) return Object.freeze({ kind: 'dojo-entry', locale });

  const dojoNucleus = findDojoNucleusByPath(pathname);
  if (dojoNucleus) return Object.freeze({ kind: 'dojo-nucleus', locale, nucleusId: dojoNucleus.nucleusId });

  const route = findSiteRoute(pathname);
  if (!route?.localized?.[locale] || route.localized[locale].canonicalUrl !== pathname) {
    return Object.freeze({ kind: 'not-found' });
  }

  return Object.freeze({ kind: 'localized-route', locale, routeId: route.id });
}

export function legacyRedirectFor(pathname: string): string | null {
  if (parseLocalePrefix(pathname) || pathname === '/') return null;
  return resolveLegacyRedirect(pathname);
}
