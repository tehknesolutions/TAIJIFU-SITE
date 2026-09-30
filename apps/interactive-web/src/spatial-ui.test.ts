import { describe, expect, it } from 'vitest';
import {
  buildExperienceHierarchy,
  visibleExperienceNodes,
  type ExperienceHierarchy,
} from './spatial-ui.js';
import { canonToExperienceNodes, experienceParentByRouteId } from './content/canon-registry.js';

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
    const projected = hierarchy.nodes.flatMap((node) => [node, ...node.children]);

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

  it('has a deterministic fallback for unknown focus', () => {
    const hierarchy: ExperienceHierarchy = buildExperienceHierarchy(canonToExperienceNodes());
    expect(visibleExperienceNodes(hierarchy, 'missing-node')).toEqual(
      visibleExperienceNodes(hierarchy, null),
    );
  });
});
