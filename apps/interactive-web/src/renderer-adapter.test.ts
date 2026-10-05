import { describe, expect, it } from 'vitest';
import { createExperienceShell } from './experience-shell.js';
import { createRendererAdapter } from './renderer-adapter.js';
import { createSpatialProjection } from './spatial-projection.js';

describe('RendererAdapter', () => {
  it('renders website experience nodes through a spatial projection without introducing game-state concepts', () => {
    const shell = createExperienceShell({
      nodes: [
        { id: 'tai', label: 'Tai', canonicalUrl: '/principios/tai/' },
      ],
    });
    const projection = createSpatialProjection(shell);

    const adapter = createRendererAdapter();
    const frame = adapter.render(shell, projection);

    expect(frame.productKind).toBe('interactive-web-site');
    expect(frame.nodes).toEqual([
      { id: 'tai', label: 'Tai', canonicalUrl: '/principios/tai/' },
    ]);
    expect(frame.spatialNodes).toEqual([
      { nodeId: 'tai', structure: 'peer' },
    ]);
    expect(frame).not.toHaveProperty('health');
    expect(frame).not.toHaveProperty('score');
    expect(frame).not.toHaveProperty('inventory');
  });
});
