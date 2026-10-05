import { describe, expect, it } from 'vitest';
import type { SpatialProjection } from './spatial-projection.js';
import { createManifestationAdapter } from './manifestation-adapter.js';

const projection: SpatialProjection = {
  nodes: [
    { nodeId: 'tai', structure: 'peer' },
    { nodeId: 'ji', structure: 'peer' },
    { nodeId: 'fu', structure: 'peer' },
    { nodeId: 'historia', structure: 'default' },
  ],
};

describe('ManifestationAdapter', () => {
  it('defaults every node to signal without changing structural rank', () => {
    const manifestation = createManifestationAdapter().manifest(projection);

    expect(manifestation.nodes).toEqual([
      { nodeId: 'tai', structure: 'peer', intensity: 'signal' },
      { nodeId: 'ji', structure: 'peer', intensity: 'signal' },
      { nodeId: 'fu', structure: 'peer', intensity: 'signal' },
      { nodeId: 'historia', structure: 'default', intensity: 'signal' },
    ]);
  });

  it('promotes only explicit attention and active state, never peer structure itself', () => {
    const manifestation = createManifestationAdapter().manifest(projection, {
      focusedNodeId: 'ji',
      activeNodeId: 'historia',
    });

    expect(manifestation.nodes).toEqual([
      { nodeId: 'tai', structure: 'peer', intensity: 'signal' },
      { nodeId: 'ji', structure: 'peer', intensity: 'artifact' },
      { nodeId: 'fu', structure: 'peer', intensity: 'signal' },
      { nodeId: 'historia', structure: 'default', intensity: 'ritual' },
    ]);
  });
});
