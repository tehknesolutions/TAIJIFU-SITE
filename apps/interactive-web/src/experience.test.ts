import { describe, expect, it } from 'vitest';
import { createInteractiveWebExperience } from './experience.js';

describe('InteractiveWebExperience composition', () => {
  it('composes the website shell through spatial projection and renderer adapter', () => {
    const experience = createInteractiveWebExperience({
      nodes: [
        { id: 'tai', label: 'TAI', canonicalUrl: '/principios/tai/' },
      ],
    });

    expect(experience.shell.productKind).toBe('interactive-web-site');
    expect(experience.projection.nodes).toEqual([
      { nodeId: 'tai', structure: 'peer' },
    ]);
    expect(experience.frame.productKind).toBe('interactive-web-site');
    expect(experience.frame.nodes).toEqual([
      { id: 'tai', label: 'TAI', canonicalUrl: '/principios/tai/' },
    ]);
    expect(experience.frame.spatialNodes).toEqual(experience.projection.nodes);
    expect(experience.frame).not.toHaveProperty('health');
    expect(experience.frame).not.toHaveProperty('score');
    expect(experience.frame).not.toHaveProperty('inventory');
  });
});