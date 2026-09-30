import { describe, expect, it } from 'vitest';
import { buildWebV1RouteGraph } from './web-v1-route-graph.js';

describe('TAIJIFU Web V1 canonical route graph', () => {
  it('projects the complete localized journey from Home through knowledge and training', () => {
    const graph = buildWebV1RouteGraph('pt-BR');

    expect(graph[0]).toEqual({ id: 'home', canonicalUrl: '/', parentId: undefined });
    expect(graph).toContainEqual({ id: 'fundamentos', canonicalUrl: '/pt-br/fundamentos/', parentId: 'home' });
    expect(graph).toContainEqual({ id: 'tai', canonicalUrl: '/pt-br/principios/tai/', parentId: 'fundamentos' });
    expect(graph).toContainEqual({ id: 'ji', canonicalUrl: '/pt-br/principios/ji/', parentId: 'fundamentos' });
    expect(graph).toContainEqual({ id: 'fu', canonicalUrl: '/pt-br/principios/fu/', parentId: 'fundamentos' });
    expect(graph).toContainEqual({ id: 'treino-personalizado', canonicalUrl: '/pt-br/treino-personalizado/', parentId: 'home' });
  });

  it('keeps the same stable identities in every supported locale', () => {
    const pt = buildWebV1RouteGraph('pt-BR');
    const en = buildWebV1RouteGraph('en');
    const es = buildWebV1RouteGraph('es');

    expect(en.map(({ id }) => id)).toEqual(pt.map(({ id }) => id));
    expect(es.map(({ id }) => id)).toEqual(pt.map(({ id }) => id));
    expect(en.find(({ id }) => id === 'tai')?.canonicalUrl).toBe('/en/principles/tai/');
    expect(es.find(({ id }) => id === 'tai')?.canonicalUrl).toBe('/es/principios/tai/');
  });

  it('contains no orphan node', () => {
    const graph = buildWebV1RouteGraph('pt-BR');
    const ids = new Set(graph.map(({ id }) => id));

    for (const node of graph) {
      if (node.parentId) expect(ids.has(node.parentId)).toBe(true);
    }
  });
});
