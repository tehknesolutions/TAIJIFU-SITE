import { getEditorialScope } from './content/editorial-scope.js';

export function editorialSurfaceClass(routeId: string): string | null {
  const scope = getEditorialScope(routeId);
  if (!scope) return null;
  return `editorial-surface editorial-surface--${scope.state}`;
}
