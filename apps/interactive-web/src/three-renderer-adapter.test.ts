import { describe, expect, it } from 'vitest';
import { createInteractiveWebExperience } from './experience.js';
import { createThreeRendererAdapter } from './three-renderer-adapter.js';

describe('ThreeRendererAdapter', () => {
  it('connects the website render frame to the Three.js projection', () => {
    const experience = createInteractiveWebExperience({
      nodes: [{ id: 'tai', label: 'TAI', canonicalUrl: '/principios/tai/' }],
    });

    const projection = createThreeRendererAdapter().render(experience.frame);

    expect(projection.camera.isPerspectiveCamera).toBe(true);
    expect(projection.nodes[0].userData.canonicalUrl).toBe('/principios/tai/');
  });
});