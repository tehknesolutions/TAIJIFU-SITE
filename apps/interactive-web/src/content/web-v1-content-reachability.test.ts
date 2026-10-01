import { describe, expect, it } from 'vitest';
import { buildWebV1RouteGraph } from './web-v1-route-graph.js';
import { siteRoutes } from './site-ia.js';
import { renderSemanticRoute } from '../semantic-site.js';

const recoveredContentRouteIds = siteRoutes
  .filter((route) => route.id !== 'home' && route.contentState === 'official-body-recovered')
  .map((route) => route.id);

describe('Web V1 CANON content reachability', () => {
  for (const locale of ['pt-BR', 'en', 'es'] as const) {
    it(`renders every recovered CANON knowledge surface reachable from the ${locale} route graph`, () => {
      const graph = buildWebV1RouteGraph(locale);

      for (const id of recoveredContentRouteIds) {
        const route = graph.find((node) => node.id === id);
        expect(route, `missing ${id} in ${locale} route graph`).toBeDefined();

        const markup = renderSemanticRoute(route!.canonicalUrl);
        expect(markup, `missing semantic projection for ${id} in ${locale}`).not.toBeNull();
        expect(markup).toContain('class="content-page"');
        expect(markup).toContain('Fonte de autoridade:');
      }
    });
  }

  it('keeps pending official bodies outside the recovered-content contract', () => {
    const pendingIds = siteRoutes
      .filter((route) => route.contentState === 'official-route-body-pending')
      .map((route) => route.id);

    expect(pendingIds).toContain('referencias');
    expect(recoveredContentRouteIds).not.toContain('referencias');
  });

  it('exposes the CANON curriculum from Graduation and Method routes', () => {
    const graduation = renderSemanticRoute('/pt-br/graduacao/');
    const method = renderSemanticRoute('/pt-br/metodo/');

    expect(graduation).toContain('Percurso canônico');
    expect(graduation).toContain('class="canon-curriculum"');
    expect(method).toContain('Bases canônicas');
    expect(method).toContain('class="canon-curriculum"');
    expect(method).toContain('data-nucleus-index=');
  });
});
