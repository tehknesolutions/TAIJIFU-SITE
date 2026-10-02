import type { SupportedLocale } from './locale.js';
import { officialPageContent } from './official-page-content.js';

export type PageLocalizationStatus = 'approved' | 'pending';

const pageIds = Object.freeze(Object.keys(officialPageContent));

const statusByLocale: Readonly<Record<SupportedLocale, Readonly<Record<string, PageLocalizationStatus>>>> = Object.freeze({
  'pt-BR': Object.freeze(Object.fromEntries(pageIds.map((routeId) => [routeId, 'approved']))),
  en: Object.freeze(Object.fromEntries(pageIds.map((routeId) => [routeId, 'pending']))),
  es: Object.freeze(Object.fromEntries(pageIds.map((routeId) => [routeId, 'pending']))),
});

export function pageLocalizationStatus(routeId: string, locale: SupportedLocale): PageLocalizationStatus {
  return statusByLocale[locale][routeId] ?? 'pending';
}

export function isPageContentReleaseReady(routeId: string, locale: SupportedLocale): boolean {
  return pageLocalizationStatus(routeId, locale) === 'approved';
}
