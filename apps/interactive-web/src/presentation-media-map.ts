export const presentationMediaByRouteId = Object.freeze<Record<string, string>>({
  home: 'r01-dojo-environment',
  fundamentos: 'p02-dojo-interior',
});

export function getPresentationMediaIdForRoute(routeId: string): string | undefined {
  return presentationMediaByRouteId[routeId];
}
