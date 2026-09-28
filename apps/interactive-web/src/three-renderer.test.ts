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
      parentId: undefined,
      visualRole: 'axis',
    });
    expect(projection.scene.userData).not.toHaveProperty('health');
    expect(projection.scene.userData).not.toHaveProperty('score');
    expect(projection.scene.userData).not.toHaveProperty('inventory');
  });

  it('uses a centered grid when no canonical home root exists', () => {
    const nodes = Array.from({ length: 9 }, (_, index) => ({
      id: `node-${index}`,
      label: `Node ${index}`,
      canonicalUrl: `/node-${index}/`,
    }));
    const experience = createInteractiveWebExperience({ nodes });
    const projection = createThreeScene(experience.frame);

    expect(projection.scene.userData.layoutKind).toBe('fallback-grid');
    const xs = projection.nodes.map((node) => node.position.x);
    expect(Math.max(...xs)).toBeLessThanOrEqual(2.1);
    expect(Math.min(...xs)).toBeGreaterThanOrEqual(-2.1);
  });

  it('projects canonical site content around the home origin', () => {
    const experience = createInteractiveWebExperience({
      nodes: [
        { id: 'home', label: 'TAIJIFU', canonicalUrl: '/' },
        { id: 'manifesto', label: 'Manifesto', canonicalUrl: '/manifesto/', parentId: 'home' },
        { id: 'tai', label: 'TAI', canonicalUrl: '/principios/tai/', parentId: 'home' },
      ],
    });
    const projection = createThreeScene(experience.frame);
    const home = projection.nodes.find((node) => node.userData.nodeId === 'home');

    expect(projection.scene.userData.layoutKind).toBe('canonical-radial');
    expect(home?.position.x).toBe(0);
    expect(home?.position.y).toBe(0);
    expect(home?.userData.visualRole).toBe('origin');
    expect(
      projection.nodes
        .filter((node) => node.userData.nodeId !== 'home')
        .every((node) => Math.hypot(node.position.x, node.position.y) > 2.5),
    ).toBe(true);
  });
});
