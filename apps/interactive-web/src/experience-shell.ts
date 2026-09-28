export type ExperienceNode = Readonly<{
  id: string;
  label: string;
  canonicalUrl: string;
  parentId?: string;
}>;

export type ExperienceShell = Readonly<{
  productKind: 'interactive-web-site';
  nodes: readonly ExperienceNode[];
}>;

export function createExperienceShell(input: {
  nodes: readonly ExperienceNode[];
}): ExperienceShell {
  return Object.freeze({
    productKind: 'interactive-web-site' as const,
    nodes: Object.freeze([...input.nodes]),
  });
}
