import { canonSnapshot } from './canon-snapshot.js';
import { findDojoNucleusRoute } from './dojo-nucleus-routes.js';
import type { SupportedLocale } from './locale.js';

type DojoPathTransition = Readonly<{
  id: string;
  code: string;
  name: string;
  entryNucleusId: string;
  url: string;
}>;

export type DojoNucleusNavigation = Readonly<{
  nucleusId: string;
  belt: Readonly<{ id: string; name: string }>;
  path: Readonly<{ id: string; code: string; name: string }>;
  previous: Readonly<{ id: string; name: string; url: string }> | null;
  next: Readonly<{ id: string; name: string; url: string }> | null;
  previousPath: DojoPathTransition | null;
  nextPath: DojoPathTransition | null;
  beltPathPosition: number;
  beltPathCount: number;
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
  const beltPathIndex = belt.pathIds.indexOf(path.code);
  const canonPathIndex = canonSnapshot.paths.findIndex(({ id }) => id === path.id);
  const routeFor = (id: string) => {
    const nucleus = canonSnapshot.nuclei.find(({ id: candidate }) => candidate === id);
    const route = findDojoNucleusRoute(id, locale);
    return nucleus && route ? Object.freeze({ id, name: nucleus.name, url: route.canonicalUrl }) : null;
  };
  const transitionFor = (candidate: (typeof canonSnapshot.paths)[number] | undefined, edge: 'first' | 'last'): DojoPathTransition | null => {
    if (!candidate) return null;
    const entryNucleusId = edge === 'first' ? candidate.nucleusIds[0] : candidate.nucleusIds[candidate.nucleusIds.length - 1];
    const route = findDojoNucleusRoute(entryNucleusId, locale);
    return route ? Object.freeze({ id: candidate.id, code: candidate.code, name: candidate.name, entryNucleusId, url: route.canonicalUrl }) : null;
  };

  const pathNuclei = Object.freeze(path.nucleusIds.map(routeFor).filter((item): item is Readonly<{ id: string; name: string; url: string }> => item !== null));

  return Object.freeze({
    nucleusId,
    belt: Object.freeze({ id: belt.id, name: belt.name }),
    path: Object.freeze({ id: path.id, code: path.code, name: path.name }),
    previous: pathIndex > 0 ? routeFor(path.nucleusIds[pathIndex - 1]) : null,
    next: pathIndex < path.nucleusIds.length - 1 ? routeFor(path.nucleusIds[pathIndex + 1]) : null,
    previousPath: pathIndex === 0 ? transitionFor(canonSnapshot.paths[canonPathIndex - 1], 'last') : null,
    nextPath: pathIndex === path.nucleusIds.length - 1 ? transitionFor(canonSnapshot.paths[canonPathIndex + 1], 'first') : null,
    beltPathPosition: beltPathIndex + 1,
    beltPathCount: belt.pathIds.length,
    pathPosition: pathIndex + 1,
    pathSize: path.nucleusIds.length,
    pathNuclei,
  });
}
