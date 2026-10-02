import { getOfficialPageContent } from './official-page-content.js';
import { siteRoutes } from './site-ia.js';

export type EditorialScope = Readonly<{
  routeId: string;
  state: 'official' | 'pending';
  sourceAuthority: string | null;
}>;

export function getEditorialScope(routeId: string): EditorialScope | null {
  const route = siteRoutes.find((candidate) => candidate.id === routeId);
  if (!route) return null;
  const content = getOfficialPageContent(route.id);
  return Object.freeze({
    routeId: route.id,
    state: route.contentState === 'official-route-body-pending' || !content ? 'pending' : 'official',
    sourceAuthority: content?.sourceAuthority ?? null,
  });
}
