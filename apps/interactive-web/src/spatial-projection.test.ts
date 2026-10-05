import { describe, expect, it } from 'vitest';
import { createExperienceShell } from './experience-shell.js';
import { createSpatialProjection } from './spatial-projection.js';

describe('SpatialProjection', () => {
  it('derives presentation data without mutating canonical nodes', () => {
    const shell = createExperienceShell({
      nodes: [
        { id: 'tai', label: 'TAI', canonicalUrl: '/principios/tai/' },
        { id: 'ji', label: 'JI', canonicalUrl: '/principios/ji/' },
        { id: 'fu', label: 'FU', canonicalUrl: '/principios/fu/' },
      ],
    });

    const projection = createSpatialProjection(shell);

    expect(projection.nodes).toEqual([
      { nodeId: 'tai', structure: 'peer' },
      { nodeId: 'ji', structure: 'peer' },
      { nodeId: 'fu', structure: 'peer' },
    ]);
    expect(shell.nodes).toEqual([
      { id: 'tai', label: 'TAI', canonicalUrl: '/principios/tai/' },
      { id: 'ji', label: 'JI', canonicalUrl: '/principios/ji/' },
      { id: 'fu', label: 'FU', canonicalUrl: '/principios/fu/' },
    ]);
  });

  it('does not promote unrelated nodes into the TAI JI FU peer triad', () => {
    const shell = createExperienceShell({
      nodes: [
        { id: 'tai', label: 'TAI', canonicalUrl: '/principios/tai/' },
        { id: 'historia', label: 'História', canonicalUrl: '/historia/' },
      ],
    });

    expect(createSpatialProjection(shell).nodes).toEqual([
      { nodeId: 'tai', structure: 'peer' },
      { nodeId: 'historia', structure: 'default' },
    ]);
  });
});
