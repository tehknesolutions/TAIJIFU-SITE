import type { ExperienceNode, ExperienceShell } from './experience-shell.js';

export type RenderFrame = Readonly<{
  productKind: 'interactive-web-site';
  nodes: readonly ExperienceNode[];
  presentationMediaId?: string;
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
        ...(shell.presentationMediaId ? { presentationMediaId: shell.presentationMediaId } : {}),
      });
    },
  });
}
