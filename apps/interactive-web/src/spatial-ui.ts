import type { ExperienceNode } from './experience-shell.js';

export type ExperienceHierarchyNode = Readonly<{
  id: string;
  label: string;
  canonicalUrl: string;
  children: readonly ExperienceHierarchyNode[];
}>;

export type ExperienceHierarchy = Readonly<{
  relationshipKind: 'experience-navigation';
  nodes: readonly ExperienceHierarchyNode[];
}>;

export function buildExperienceHierarchy(
  source: readonly ExperienceNode[],
): ExperienceHierarchy {
  const byId = new Map<string, ExperienceHierarchyNode>();
  const childrenByParent = new Map<string, ExperienceHierarchyNode[]>();

  for (const node of source) {
    byId.set(node.id, Object.freeze({
      id: node.id,
      label: node.label,
      canonicalUrl: node.canonicalUrl,
      children: [],
    }));
  }

  for (const node of source) {
    if (!node.parentId) continue;
    const child = byId.get(node.id);
    if (!child) continue;
    const children = childrenByParent.get(node.parentId) ?? [];
    children.push(child);
    childrenByParent.set(node.parentId, children);
  }

  const materialize = (node: ExperienceHierarchyNode): ExperienceHierarchyNode =>
    Object.freeze({
      ...node,
      children: Object.freeze(
        (childrenByParent.get(node.id) ?? [])
          .map(materialize)
          .sort((a, b) => a.label.localeCompare(b.label, 'pt-BR')),
      ),
    });

  return Object.freeze({
    relationshipKind: 'experience-navigation',
    nodes: Object.freeze(
      source
        .filter((node) => !node.parentId)
        .map((node) => byId.get(node.id))
        .filter((node): node is ExperienceHierarchyNode => Boolean(node))
        .map(materialize),
    ),
  });
}

export function visibleExperienceNodes(
  hierarchy: ExperienceHierarchy,
  focusId: string | null,
): readonly ExperienceHierarchyNode[] {
  if (!focusId) return flattenRoots(hierarchy.nodes);

  const focused = findNode(hierarchy.nodes, focusId);
  if (!focused) return flattenRoots(hierarchy.nodes);

  return Object.freeze([
    ...flattenRoots(hierarchy.nodes),
    focused,
    ...flattenRoots(focused.children),
  ].filter((node, index, nodes) => nodes.findIndex((candidate) => candidate.id === node.id) === index));
}

function flattenRoots(
  roots: readonly ExperienceHierarchyNode[],
): readonly ExperienceHierarchyNode[] {
  return Object.freeze(roots.flatMap((root) => [root, ...root.children]));
}

function findNode(
  nodes: readonly ExperienceHierarchyNode[],
  id: string,
): ExperienceHierarchyNode | undefined {
  for (const node of nodes) {
    if (node.id === id) return node;
    const nested = findNode(node.children, id);
    if (nested) return nested;
  }
  return undefined;
}
