export type ExperienceNode = Readonly<{
  id: string;
  label: string;
  canonicalUrl: string;
  parentId?: string;
}>;

export type ExperienceShell = Readonly<{
  productKind: 'interactive-web-site';
  nodes: readonly ExperienceNode[];
  presentationMediaId?: string;
}>;

export function createExperienceShell(input: {
  nodes: readonly ExperienceNode[];
  presentationMediaId?: string;
}): ExperienceShell {
  return Object.freeze({
    productKind: 'interactive-web-site' as const,
    nodes: Object.freeze([...input.nodes]),
    ...(input.presentationMediaId ? { presentationMediaId: input.presentationMediaId } : {}),
  });
}
