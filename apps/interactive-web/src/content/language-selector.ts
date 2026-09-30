import type { SupportedLocale } from './locale.js';
import { findLocalizedRoute } from './site-ia.js';

export const languageOptions: readonly Readonly<{ locale: SupportedLocale; label: string }>[] = Object.freeze([
  Object.freeze({ locale: 'pt-BR', label: 'Português (Brasil)' }),
  Object.freeze({ locale: 'en', label: 'English' }),
  Object.freeze({ locale: 'es', label: 'Español' }),
]);

export function equivalentLocaleUrl(routeId: string, targetLocale: SupportedLocale): string {
  return findLocalizedRoute(routeId, targetLocale)?.canonicalUrl ?? '/';
}
