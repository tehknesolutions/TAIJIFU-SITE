import { describe, expect, it } from 'vitest';
import { createInteractiveWebExperience } from './experience.js';
import { createThreeRendererAdapter } from './three-renderer-adapter.js';
import { pickCanonicalNavigation } from './three-raycast-navigation.js';

describe('Three raycast navigation', () => {
  it('picks the projected node at the pointer and resolves its canonical URL', () => {
    const experience = createInteractiveWebExperience({
      nodes: [{ id: 'tai', label: 'TAI', canonicalUrl: '/principios/tai/' }],
    });
    const projection = createThreeRendererAdapter().render(experience.frame);
    projection.scene.updateMatrixWorld(true);
    projection.camera.updateMatrixWorld(true);

    expect(pickCanonicalNavigation({ x: 0, y: 0 }, projection.camera, projection.nodes)).toEqual({
      nodeId: 'tai',
      canonicalUrl: '/principios/tai/',
    });
  });

  it('returns null when the pointer misses every projected node', () => {
    const experience = createInteractiveWebExperience({
      nodes: [{ id: 'tai', label: 'TAI', canonicalUrl: '/principios/tai/' }],
    });
    const projection = createThreeRendererAdapter().render(experience.frame);
    projection.scene.updateMatrixWorld(true);
    projection.camera.updateMatrixWorld(true);

    expect(pickCanonicalNavigation({ x: 0.99, y: 0.99 }, projection.camera, projection.nodes)).toBeNull();
  });
});