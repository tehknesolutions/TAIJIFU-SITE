import type { SupportedLocale } from './locale.js';
import { buildWebV1RouteGraph } from './web-v1-route-graph.js';

const DOJO_ROUTE_IDS = ['tai', 'ji', 'fu'] as const;

type DojoRouteId = (typeof DOJO_ROUTE_IDS)[number];

export type HomeDojoLink = Readonly<{
  id: DojoRouteId;
  canonicalUrl: string;
}>;

export function buildHomeDojoLinks(locale: SupportedLocale): readonly HomeDojoLink[] {
  const graph = buildWebV1RouteGraph(locale);

  return Object.freeze(DOJO_ROUTE_IDS.map((id) => {
    const route = graph.find((node) => node.id === id);
    if (!route) throw new Error(`Missing canonical Dojo route: ${id}`);

    return Object.freeze({ id, canonicalUrl: route.canonicalUrl });
  }));
}
