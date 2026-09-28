import type { ExperienceNode } from './experience-shell.js';
import { createExperienceShell } from './experience-shell.js';
import { createRendererAdapter, type RenderFrame } from './renderer-adapter.js';

export type InteractiveWebExperience = Readonly<{
  shell: ReturnType<typeof createExperienceShell>;
  frame: RenderFrame;
}>;

export function createInteractiveWebExperience(input: {
  nodes: readonly ExperienceNode[];
}): InteractiveWebExperience {
  const shell = createExperienceShell({ nodes: input.nodes });
  const renderer = createRendererAdapter();

  return Object.freeze({
    shell,
    frame: renderer.render(shell),
  });
}