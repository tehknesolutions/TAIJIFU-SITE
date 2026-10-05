import { canonSnapshot } from './canon-snapshot.js';
import { findDojoNucleusRoute } from './dojo-nucleus-routes.js';
import type { SupportedLocale } from './locale.js';

export type DojoNucleusNavigation = Readonly<{
  nucleusId: string;
  belt: Readonly<{ id: string; name: string }>;
  path: Readonly<{ id: string; code: string; name: string }>;
  previous: Readonly<{ id: string; name: string; url: string }> | null;
  next: Readonly<{ id: string; name: string; url: string }> | null;
  pathPosition: number;
  pathSize: number;
  pathNuclei: readonly Readonly<{ id: string; name: string; url: string }>[];
}>;

export function getDojoNucleusNavigation(nucleusId: string, locale: SupportedLocale): DojoNucleusNavigation | null {
  const nucleusIndex = canonSnapshot.nuclei.findIndex(({ id }) => id === nucleusId);
  if (nucleusIndex < 0) return null;
  const path = canonSnapshot.paths.find(({ nucleusIds }) => nucleusIds.includes(nucleusId));
  const belt = path ? canonSnapshot.belts.find(({ id }) => id === path.beltId) : null;
  if (!path || !belt) return null;

  const pathIndex = path.nucleusIds.indexOf(nucleusId);
  const routeFor = (id: string) => {
    const nucleus = canonSnapshot.nuclei.find(({ id: candidate }) => candidate === id);
    const route = findDojoNucleusRoute(id, locale);
    return nucleus && route ? Object.freeze({ id, name: nucleus.name, url: route.canonicalUrl }) : null;
  };

  const pathNuclei = Object.freeze(path.nucleusIds.map(routeFor).filter((item): item is Readonly<{ id: string; name: string; url: string }> => item !== null));

  return Object.freeze({
    nucleusId,
    belt: Object.freeze({ id: belt.id, name: belt.name }),
    path: Object.freeze({ id: path.id, code: path.code, name: path.name }),
    previous: pathIndex > 0 ? routeFor(path.nucleusIds[pathIndex - 1]) : null,
    next: pathIndex < path.nucleusIds.length - 1 ? routeFor(path.nucleusIds[pathIndex + 1]) : null,
    pathPosition: pathIndex + 1,
    pathSize: path.nucleusIds.length,
    pathNuclei,
  });
}
