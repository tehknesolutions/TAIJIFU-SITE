import { describe, expect, it } from 'vitest';
import { buildWebV1RouteGraph } from './web-v1-route-graph.js';
import { renderSemanticRoute } from '../semantic-site.js';

const contentRouteIds = [
  'fundamentos',
  'tai',
  'ji',
  'fu',
  'metodo',
  'graduacao',
] as const;

describe('Web V1 CANON content reachability', () => {
  for (const locale of ['pt-BR', 'en', 'es'] as const) {
    it(`renders every CANON knowledge surface reachable from the ${locale} route graph`, () => {
      const graph = buildWebV1RouteGraph(locale);

      for (const id of contentRouteIds) {
        const route = graph.find((node) => node.id === id);
        expect(route, `missing ${id} in ${locale} route graph`).toBeDefined();

        const markup = renderSemanticRoute(route!.canonicalUrl);
        expect(markup, `missing semantic projection for ${id} in ${locale}`).not.toBeNull();
        expect(markup).toContain('class="content-page"');
        expect(markup).toContain('Fonte de autoridade:');
      }
    });
  }

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
