import type { ExperienceNode } from './experience-shell.js';
import { createExperienceShell } from './experience-shell.js';
import { createRendererAdapter, type RenderFrame } from './renderer-adapter.js';
import { createSpatialProjection, type SpatialProjection } from './spatial-projection.js';

export type InteractiveWebExperience = Readonly<{
  shell: ReturnType<typeof createExperienceShell>;
  projection: SpatialProjection;
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
  const renderer = createRendererAdapter();

  return Object.freeze({
    shell,
    projection,
    frame: renderer.render(shell, projection),
  });
}
