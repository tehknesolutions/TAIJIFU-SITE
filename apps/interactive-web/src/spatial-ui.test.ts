import { describe, expect, it } from 'vitest';
import {
  buildExperienceHierarchy,
  contextualNavigationNodes,
  visibleExperienceNodes,
  type ExperienceHierarchy,
  type ExperienceHierarchyNode,
} from './spatial-ui.js';
import type { ExperienceNode } from './experience-shell.js';
import { canonToExperienceNodes, experienceParentByRouteId } from './content/canon-registry.js';

const flatten = (nodes: readonly ExperienceHierarchyNode[]): ExperienceHierarchyNode[] => nodes.flatMap((node) => [node, ...flatten(node.children)]);

describe('Spatial UI experience hierarchy', () => {
  it('labels parent relationships as experience navigation, not Canon semantics', () => {
    expect(experienceParentByRouteId.tai).toBe('fundamentos');
    expect(experienceParentByRouteId.ji).toBe('fundamentos');
    expect(experienceParentByRouteId.fu).toBe('fundamentos');

    const hierarchy = buildExperienceHierarchy(canonToExperienceNodes());
    expect(hierarchy.relationshipKind).toBe('experience-navigation');
    expect(hierarchy.relationshipKind).not.toContain('canon');
  });

  it('preserves canonical URLs while projecting the experience tree', () => {
    const source = canonToExperienceNodes();
    const hierarchy = buildExperienceHierarchy(source);
    const projected = flatten(hierarchy.nodes);

    for (const node of source) {
      const match = projected.find((candidate) => candidate.id === node.id);
      expect(match?.canonicalUrl).toBe(node.canonicalUrl);
    }
  });

  it('progressively reveals root children and the focused branch', () => {
    const hierarchy = buildExperienceHierarchy(canonToExperienceNodes());
    const initial = visibleExperienceNodes(hierarchy, null);
    const focused = visibleExperienceNodes(hierarchy, 'fundamentos');

    expect(initial.some((node) => node.id === 'home')).toBe(true);
    expect(initial.some((node) => node.id === 'tai')).toBe(false);
    expect(focused.some((node) => node.id === 'tai')).toBe(true);
    expect(focused.some((node) => node.id === 'ji')).toBe(true);
    expect(focused.some((node) => node.id === 'fu')).toBe(true);
  });

  it('projects a contextual legend from the same visible hierarchy and canonical URLs', () => {
    const source: readonly ExperienceNode[] = [
      { id: 'home', label: 'TAIJIFU', canonicalUrl: '/' },
      { id: 'section', label: 'Section', canonicalUrl: '/section', parentId: 'home' },
      { id: 'detail', label: 'Detail', canonicalUrl: '/section/detail', parentId: 'section' },
    ];
    const hierarchy = buildExperienceHierarchy(source);
    const initialVisible = visibleExperienceNodes(hierarchy, null);
    const initialLegend = contextualNavigationNodes(hierarchy, null);
    const focusedVisible = visibleExperienceNodes(hierarchy, 'section');
    const focusedLegend = contextualNavigationNodes(hierarchy, 'section');

    expect(initialLegend.map((node) => node.id)).toEqual(initialVisible.map((node) => node.id));
    expect(focusedLegend.map((node) => node.id)).toEqual(focusedVisible.map((node) => node.id));
    expect(focusedLegend.find((node) => node.id === 'section')?.relation).toBe('focus');
    expect(focusedLegend.find((node) => node.id === 'detail')).toMatchObject({ relation: 'focus-child', canonicalUrl: '/section/detail', depth: 2 });
  });

  it('has a deterministic fallback for unknown focus', () => {
    const hierarchy: ExperienceHierarchy = buildExperienceHierarchy(canonToExperienceNodes());
    expect(visibleExperienceNodes(hierarchy, 'missing-node')).toEqual(
      visibleExperienceNodes(hierarchy, null),
    );
  });
});
