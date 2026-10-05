import type { SpatialProjection, SpatialStructure } from './spatial-projection.js';

export type ManifestationIntensity = 'signal' | 'artifact' | 'ritual';

export type ManifestationNode = Readonly<{
  nodeId: string;
  structure: SpatialStructure;
  intensity: ManifestationIntensity;
}>;

export type Manifestation = Readonly<{
  nodes: readonly ManifestationNode[];
}>;

export type ManifestationAdapter = Readonly<{
  manifest(projection: SpatialProjection): Manifestation;
}>;

export function createManifestationAdapter(): ManifestationAdapter {
  return Object.freeze({
    manifest(projection) {
      return Object.freeze({
        nodes: Object.freeze(
          projection.nodes.map((node) =>
            Object.freeze({
              nodeId: node.nodeId,
              structure: node.structure,
              intensity: 'signal' as const,
            }),
          ),
        ),
      });
    },
  });
}
