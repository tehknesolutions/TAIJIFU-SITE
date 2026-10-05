import type { SpatialProjection, SpatialStructure } from './spatial-projection.js';

export type ManifestationIntensity = 'signal' | 'artifact' | 'ritual';

export type ManifestationState = Readonly<{
  focusedNodeId?: string | null;
  activeNodeId?: string | null;
}>;

export type ManifestationNode = Readonly<{
  nodeId: string;
  structure: SpatialStructure;
  intensity: ManifestationIntensity;
}>;

export type Manifestation = Readonly<{
  nodes: readonly ManifestationNode[];
}>;

export type ManifestationAdapter = Readonly<{
  manifest(projection: SpatialProjection, state?: ManifestationState): Manifestation;
}>;

function intensityFor(nodeId: string, state?: ManifestationState): ManifestationIntensity {
  if (state?.activeNodeId === nodeId) return 'ritual';
  if (state?.focusedNodeId === nodeId) return 'artifact';
  return 'signal';
}

export function createManifestationAdapter(): ManifestationAdapter {
  return Object.freeze({
    manifest(projection, state) {
      return Object.freeze({
        nodes: Object.freeze(
          projection.nodes.map((node) =>
            Object.freeze({
              nodeId: node.nodeId,
              structure: node.structure,
              intensity: intensityFor(node.nodeId, state),
            }),
          ),
        ),
      });
    },
  });
}
