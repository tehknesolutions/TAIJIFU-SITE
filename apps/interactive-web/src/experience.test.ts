import { describe, expect, it } from 'vitest';
import { createInteractiveWebExperience } from './experience.js';

describe('InteractiveWebExperience composition', () => {
  it('composes shell, spatial projection, manifestation and renderer adapter', () => {
    const experience = createInteractiveWebExperience({
      nodes: [
        { id: 'tai', label: 'TAI', canonicalUrl: '/principios/tai/' },
      ],
    });

    expect(experience.shell.productKind).toBe('interactive-web-site');
    expect(experience.projection.nodes).toEqual([
      { nodeId: 'tai', structure: 'peer' },
    ]);
    expect(experience.manifestation.nodes).toEqual([
      { nodeId: 'tai', structure: 'peer', intensity: 'signal' },
    ]);
    expect(experience.frame.manifestationNodes).toEqual(experience.manifestation.nodes);
  });

  it('passes explicit focus and active state into manifestation without changing structure', () => {
    const experience = createInteractiveWebExperience({
      nodes: [
        { id: 'tai', label: 'TAI', canonicalUrl: '/principios/tai/' },
        { id: 'ji', label: 'JI', canonicalUrl: '/principios/ji/' },
        { id: 'fu', label: 'FU', canonicalUrl: '/principios/fu/' },
      ],
      manifestationState: { focusedNodeId: 'ji', activeNodeId: 'fu' },
    });

    expect(experience.manifestation.nodes).toEqual([
      { nodeId: 'tai', structure: 'peer', intensity: 'signal' },
      { nodeId: 'ji', structure: 'peer', intensity: 'artifact' },
      { nodeId: 'fu', structure: 'peer', intensity: 'ritual' },
    ]);
    expect(experience.frame.manifestationNodes).toEqual(experience.manifestation.nodes);
  });
});