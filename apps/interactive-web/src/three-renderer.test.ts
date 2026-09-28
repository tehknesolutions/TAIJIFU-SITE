import { describe, expect, it } from 'vitest';
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
      nodeId: 'tai',
      label: 'TAI',
      canonicalUrl: '/principios/tai/',
    });
    expect(projection.scene.userData).not.toHaveProperty('health');
    expect(projection.scene.userData).not.toHaveProperty('score');
    expect(projection.scene.userData).not.toHaveProperty('inventory');
  });

  it('lays out larger site graphs in a centered grid instead of an off-screen line', () => {
    const nodes = Array.from({ length: 9 }, (_, index) => ({
      id: `node-${index}`,
      label: `Node ${index}`,
      canonicalUrl: `/node-${index}/`,
    }));
    const experience = createInteractiveWebExperience({ nodes });
    const projection = createThreeScene(experience.frame);

    const xs = projection.nodes.map((node) => node.position.x);
    const ys = projection.nodes.map((node) => node.position.y);

    expect(Math.max(...xs)).toBeLessThanOrEqual(2.1);
    expect(Math.min(...xs)).toBeGreaterThanOrEqual(-2.1);
    expect(Math.max(...ys)).toBeLessThanOrEqual(1.4);
    expect(Math.min(...ys)).toBeGreaterThanOrEqual(-1.4);
  });
});
