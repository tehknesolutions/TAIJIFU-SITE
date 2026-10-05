import { describe, expect, it } from 'vitest';
import { createExperienceShell } from './experience-shell.js';
import { createManifestationAdapter } from './manifestation-adapter.js';
import { createRendererAdapter } from './renderer-adapter.js';
import { createSpatialProjection } from './spatial-projection.js';

describe('RendererAdapter', () => {
  it('renders canonical, spatial and manifestation data without introducing game-state concepts', () => {
    const shell = createExperienceShell({
      nodes: [
        { id: 'tai', label: 'Tai', canonicalUrl: '/principios/tai/' },
      ],
    });
    const projection = createSpatialProjection(shell);
    const manifestation = createManifestationAdapter().manifest(projection);

    const adapter = createRendererAdapter();
    const frame = adapter.render(shell, projection, manifestation);

    expect(frame.productKind).toBe('interactive-web-site');
    expect(frame.nodes).toEqual([
      { id: 'tai', label: 'Tai', canonicalUrl: '/principios/tai/' },
    ]);
    expect(frame.spatialNodes).toEqual([
      { nodeId: 'tai', structure: 'peer' },
    ]);
    expect(frame.manifestationNodes).toEqual([
      { nodeId: 'tai', structure: 'peer', intensity: 'signal' },
    ]);
    expect(frame).not.toHaveProperty('health');
    expect(frame).not.toHaveProperty('score');
    expect(frame).not.toHaveProperty('inventory');
  });
});
