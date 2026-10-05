import type { ExperienceShell } from './experience-shell.js';

export type SpatialStructure = 'peer' | 'default';

export type SpatialProjectionNode = {
  nodeId: string;
  structure: SpatialStructure;
};

export type SpatialProjection = {
  nodes: SpatialProjectionNode[];
};

const TAIJIFU_PEER_IDS = new Set(['tai', 'ji', 'fu']);

export function createSpatialProjection(shell: ExperienceShell): SpatialProjection {
  return {
    nodes: shell.nodes.map((node) => ({
      nodeId: node.id,
      structure: TAIJIFU_PEER_IDS.has(node.id) ? 'peer' : 'default',
    })),
  };
}
