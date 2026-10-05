import { describe, expect, it } from 'vitest';
import type { SpatialProjection } from './spatial-projection.js';
import { createManifestationAdapter } from './manifestation-adapter.js';

describe('ManifestationAdapter', () => {
  it('maps spatial structure to presentation intensity without changing structural rank', () => {
    const projection: SpatialProjection = {
      nodes: [
        { nodeId: 'tai', structure: 'peer' },
        { nodeId: 'ji', structure: 'peer' },
        { nodeId: 'fu', structure: 'peer' },
        { nodeId: 'historia', structure: 'default' },
      ],
    };

    const manifestation = createManifestationAdapter().manifest(projection);

    expect(manifestation.nodes).toEqual([
      { nodeId: 'tai', structure: 'peer', intensity: 'signal' },
      { nodeId: 'ji', structure: 'peer', intensity: 'signal' },
      { nodeId: 'fu', structure: 'peer', intensity: 'signal' },
      { nodeId: 'historia', structure: 'default', intensity: 'signal' },
    ]);
  });
});
