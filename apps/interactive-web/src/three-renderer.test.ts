import { describe, expect, it } from 'vitest';
import { Line } from 'three';
import { createInteractiveWebExperience } from './experience.js';
import { createThreeScene } from './three-renderer.js';

describe('ThreeRenderer', () => {
  it('projects the website frame into a Three.js scene without changing canonical semantics', () => {
    const experience = createInteractiveWebExperience({
      nodes: [{ id: 'tai', label: 'TAI', canonicalUrl: '/principios/tai/' }],
    });
    const projection = createThreeScene(experience.frame);
    expect(projection.camera.isPerspectiveCamera).toBe(true);
    expect(projection.scene.userData.productKind).toBe('interactive-web-site');
    expect(projection.nodes).toHaveLength(1);
    expect(projection.nodes[0].userData).toEqual({
      nodeId: 'tai', label: 'TAI', canonicalUrl: '/principios/tai/', parentId: undefined,
      visualRole: 'axis', baseZ: 0,
    });
  });

  it('uses a centered grid when no canonical home root exists', () => {
    const nodes = Array.from({ length: 9 }, (_, index) => ({
      id: `node-${index}`, label: `Node ${index}`, canonicalUrl: `/node-${index}/`,
    }));
    const projection = createThreeScene(createInteractiveWebExperience({ nodes }).frame);
    expect(projection.scene.userData.layoutKind).toBe('fallback-grid');
    const xs = projection.nodes.map((node) => node.position.x);
    expect(Math.max(...xs)).toBeLessThanOrEqual(2.1);
    expect(Math.min(...xs)).toBeGreaterThanOrEqual(-2.1);
  });

  it('uses parent depth for canonical layout and parent-child edges', () => {
    const nodes = [
      { id: 'home', label: 'TAIJIFU', canonicalUrl: '/' },
      { id: 'influencias', label: 'Influências', canonicalUrl: '/influencias/', parentId: 'home' },
      { id: 'metodo', label: 'Método', canonicalUrl: '/metodo/', parentId: 'influencias' },
      { id: 'graduacao', label: 'Graduação', canonicalUrl: '/graduacao/', parentId: 'metodo' },
    ];
    const projection = createThreeScene(createInteractiveWebExperience({ nodes }).frame);
    const radius = (id: string) => {
      const node = projection.nodes.find((candidate) => candidate.userData.nodeId === id)!;
      return Math.hypot(node.position.x, node.position.y);
    };

    expect(projection.scene.userData.layoutKind).toBe('canonical-hierarchy');
    expect(radius('metodo')).toBeGreaterThan(radius('influencias'));
    expect(radius('graduacao')).toBeGreaterThan(radius('metodo'));
    expect(projection.scene.userData.connectionCount).toBe(3);

    const edges = projection.scene.children
      .filter((child): child is Line => child instanceof Line)
      .map((edge) => edge.userData);
    expect(edges).toEqual(expect.arrayContaining([
      { parentId: 'home', childId: 'influencias' },
      { parentId: 'influencias', childId: 'metodo' },
      { parentId: 'metodo', childId: 'graduacao' },
    ]));
  });
});
