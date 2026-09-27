import type { ExperienceNode, ExperienceShell } from './experience-shell';

export type RenderFrame = Readonly<{
  productKind: 'interactive-web-site';
  nodes: readonly ExperienceNode[];
}>;

export type RendererAdapter = Readonly<{
  render(shell: ExperienceShell): RenderFrame;
}>;

export function createRendererAdapter(): RendererAdapter {
  return Object.freeze({
    render(shell) {
      return Object.freeze({
        productKind: shell.productKind,
        nodes: Object.freeze([...shell.nodes]),
      });
    },
  });
}
