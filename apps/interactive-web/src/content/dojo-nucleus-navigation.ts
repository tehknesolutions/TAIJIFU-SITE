import { canonSnapshot } from './canon-snapshot.js';
import { findDojoNucleusRoute } from './dojo-nucleus-routes.js';
import type { SupportedLocale } from './locale.js';

export type DojoNucleusNavigation = Readonly<{
  nucleusId: string;
  belt: Readonly<{ id: string; name: string }>;
  path: Readonly<{ id: string; code: string; name: string }>;
  previous: Readonly<{ id: string; name: string; url: string }> | null;
  next: Readonly<{ id: string; name: string; url: string }> | null;
}>;

export function getDojoNucleusNavigation(nucleusId: string, locale: SupportedLocale): DojoNucleusNavigation | null {
  const nucleusIndex = canonSnapshot.nuclei.findIndex(({ id }) => id === nucleusId);
  if (nucleusIndex < 0) return null;
  const path = canonSnapshot.paths.find(({ nucleusIds }) => nucleusIds.includes(nucleusId));
  const belt = path ? canonSnapshot.belts.find(({ id }) => id === path.beltId) : null;
  if (!path || !belt) return null;

  const routeFor = (id: string) => {
    const nucleus = canonSnapshot.nuclei.find(({ id: candidate }) => candidate === id);
    const route = findDojoNucleusRoute(id, locale);
    return nucleus && route ? Object.freeze({ id, name: nucleus.name, url: route.canonicalUrl }) : null;
  };

  return Object.freeze({
    nucleusId,
    belt: Object.freeze({ id: belt.id, name: belt.name }),
    path: Object.freeze({ id: path.id, code: path.code, name: path.name }),
    previous: nucleusIndex > 0 ? routeFor(canonSnapshot.nuclei[nucleusIndex - 1].id) : null,
    next: nucleusIndex < canonSnapshot.nuclei.length - 1 ? routeFor(canonSnapshot.nuclei[nucleusIndex + 1].id) : null,
  });
}
