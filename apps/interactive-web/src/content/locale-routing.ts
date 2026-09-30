import { parseLocalePrefix, type SupportedLocale } from './locale.js';
import { findSiteRoute, resolveLegacyRedirect } from './site-ia.js';

export type LocalizedPathResolution =
  | Readonly<{ kind: 'international-entry' }>
  | Readonly<{ kind: 'localized-route'; locale: SupportedLocale; routeId: string }>
  | Readonly<{ kind: 'not-found' }>;

export function resolveLocalizedPath(pathname: string): LocalizedPathResolution {
  if (pathname === '/') return Object.freeze({ kind: 'international-entry' });

  const locale = parseLocalePrefix(pathname);
  if (!locale) return Object.freeze({ kind: 'not-found' });

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
