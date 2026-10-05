import type { ExperienceNode } from './experience-shell.js';
import { createExperienceShell } from './experience-shell.js';
import { createManifestationAdapter, type Manifestation } from './manifestation-adapter.js';
import { createRendererAdapter, type RenderFrame } from './renderer-adapter.js';
import { createSpatialProjection, type SpatialProjection } from './spatial-projection.js';

export type InteractiveWebExperience = Readonly<{
  shell: ReturnType<typeof createExperienceShell>;
  projection: SpatialProjection;
  manifestation: Manifestation;
  frame: RenderFrame;
}>;

export function createInteractiveWebExperience(input: {
  nodes: readonly ExperienceNode[];
  presentationMediaId?: string;
}): InteractiveWebExperience {
  const shell = createExperienceShell({
    nodes: input.nodes,
    presentationMediaId: input.presentationMediaId,
  });
  const projection = createSpatialProjection(shell);
  const manifestation = createManifestationAdapter().manifest(projection);
  const renderer = createRendererAdapter();

  return Object.freeze({
    shell,
    projection,
    manifestation,
    frame: renderer.render(shell, projection, manifestation),
  });
}
