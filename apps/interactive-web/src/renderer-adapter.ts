import type { ExperienceNode, ExperienceShell } from './experience-shell.js';
import type { SpatialProjection, SpatialProjectionNode } from './spatial-projection.js';

export type RenderFrame = Readonly<{
  productKind: 'interactive-web-site';
  nodes: readonly ExperienceNode[];
  spatialNodes: readonly SpatialProjectionNode[];
  presentationMediaId?: string;
}>;

export type RendererAdapter = Readonly<{
  render(shell: ExperienceShell, projection: SpatialProjection): RenderFrame;
}>;

export function createRendererAdapter(): RendererAdapter {
  return Object.freeze({
    render(shell, projection) {
      return Object.freeze({
        productKind: shell.productKind,
        nodes: Object.freeze([...shell.nodes]),
        spatialNodes: Object.freeze([...projection.nodes]),
        ...(shell.presentationMediaId ? { presentationMediaId: shell.presentationMediaId } : {}),
      });
    },
  });
}
