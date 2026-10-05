import { describe, expect, it } from 'vitest';
import type { SpatialProjection } from './spatial-projection.js';
import { createRuntimeManifestation } from './runtime-manifestation.js';

const projection: SpatialProjection = {
  nodes: [
    { nodeId: 'tai', structure: 'peer' },
    { nodeId: 'ji', structure: 'peer' },
    { nodeId: 'fu', structure: 'peer' },
  ],
};

describe('RuntimeManifestation', () => {
  it('updates focus and active intensity over one stable projection', () => {
    const runtime = createRuntimeManifestation(projection, { activeNodeId: 'fu' });

    expect(runtime.current().nodes).toEqual([
      { nodeId: 'tai', structure: 'peer', intensity: 'signal' },
      { nodeId: 'ji', structure: 'peer', intensity: 'signal' },
      { nodeId: 'fu', structure: 'peer', intensity: 'ritual' },
    ]);

    const focused = runtime.update({ focusedNodeId: 'ji', activeNodeId: 'fu' });
    expect(focused.nodes).toEqual([
      { nodeId: 'tai', structure: 'peer', intensity: 'signal' },
      { nodeId: 'ji', structure: 'peer', intensity: 'artifact' },
      { nodeId: 'fu', structure: 'peer', intensity: 'ritual' },
    ]);

    expect(runtime.projection).toBe(projection);
  });
});
