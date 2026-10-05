import type { ExperienceNode, ExperienceShell } from './experience-shell.js';
import type { Manifestation, ManifestationNode } from './manifestation-adapter.js';
import type { SpatialProjection, SpatialProjectionNode } from './spatial-projection.js';

export type RenderFrame = Readonly<{
  productKind: 'interactive-web-site';
  nodes: readonly ExperienceNode[];
  spatialNodes: readonly SpatialProjectionNode[];
  manifestationNodes: readonly ManifestationNode[];
  presentationMediaId?: string;
}>;

export type RendererAdapter = Readonly<{
  render(shell: ExperienceShell, projection: SpatialProjection, manifestation: Manifestation): RenderFrame;
}>;

export function createRendererAdapter(): RendererAdapter {
  return Object.freeze({
    render(shell, projection, manifestation) {
      return Object.freeze({
        productKind: shell.productKind,
        nodes: Object.freeze([...shell.nodes]),
        spatialNodes: Object.freeze([...projection.nodes]),
        manifestationNodes: Object.freeze([...manifestation.nodes]),
        ...(shell.presentationMediaId ? { presentationMediaId: shell.presentationMediaId } : {}),
      });
    },
  });
}
