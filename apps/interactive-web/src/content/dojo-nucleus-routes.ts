import { canonSnapshot } from './canon-snapshot.js';
import { getDojoNucleus } from './canon-dojo-projection.js';
import type { SupportedLocale } from './locale.js';

export type DojoNucleusRoute = Readonly<{ nucleusId: string; localized: Readonly<Record<SupportedLocale, Readonly<{ title: string; canonicalUrl: string }>>>; }>;

const slug = (value: string) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const dojoNucleusRoutes: readonly DojoNucleusRoute[] = Object.freeze(canonSnapshot.nuclei.map((nucleus) => {
  const suffix = nucleus.id.toLowerCase() + '-' + slug(nucleus.name);
  return Object.freeze({ nucleusId: nucleus.id, localized: Object.freeze({
    'pt-BR': Object.freeze({ title: nucleus.name, canonicalUrl: '/pt-br/dojo/nucleos/' + suffix + '/' }),
    en: Object.freeze({ title: nucleus.name, canonicalUrl: '/en/dojo/nuclei/' + suffix + '/' }),
    es: Object.freeze({ title: nucleus.name, canonicalUrl: '/es/dojo/nucleos/' + suffix + '/' }),
  }) });
}));

export function findDojoNucleusRoute(nucleusId: string, locale: SupportedLocale) { const route = dojoNucleusRoutes.find((candidate) => candidate.nucleusId === nucleusId); const projection = route?.localized[locale]; return route && projection ? Object.freeze({ ...projection, nucleusId: route.nucleusId }) : null; }
export function findDojoNucleusByPath(pathname: string): DojoNucleusRoute | null { return dojoNucleusRoutes.find((route) => Object.values(route.localized).some((projection) => projection.canonicalUrl === pathname)) ?? null; }
export function getDojoNucleusPage(nucleusId: string) { const projection = getDojoNucleus(nucleusId); return projection ? Object.freeze(projection) : null; }
