import { describe, expect, it } from 'vitest';
import { createInteractiveWebExperience } from './experience.js';
import { createThreeRendererAdapter } from './three-renderer-adapter.js';
import { resolveCanonicalNavigation } from './three-navigation.js';

describe('Three canonical navigation', () => {
  it('resolves a selected projected node to its canonical website URL', () => {
    const experience = createInteractiveWebExperience({
      nodes: [{ id: 'tai', label: 'TAI', canonicalUrl: '/principios/tai/' }],
    });
    const projection = createThreeRendererAdapter().render(experience.frame);

    expect(resolveCanonicalNavigation(projection.nodes[0])).toEqual({
      nodeId: 'tai',
      canonicalUrl: '/principios/tai/',
    });
  });

  it('does not invent navigation for non-node Three.js objects', () => {
    const experience = createInteractiveWebExperience({ nodes: [] });
    const projection = createThreeRendererAdapter().render(experience.frame);

    expect(resolveCanonicalNavigation(projection.scene)).toBeNull();
  });
});