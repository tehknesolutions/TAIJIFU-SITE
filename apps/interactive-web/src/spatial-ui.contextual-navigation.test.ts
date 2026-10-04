import { describe, expect, it } from 'vitest';
import { buildExperienceHierarchy, contextualNavigationNodes } from './spatial-ui.js';
import type { ExperienceNode } from './experience-shell.js';

const nodes: readonly ExperienceNode[] = [
  { id: 'home', label: 'TAIJIFU', canonicalUrl: '/' },
  { id: 'tai', label: 'TAI', canonicalUrl: '/tai', parentId: 'home' },
  { id: 'ji', label: 'JI', canonicalUrl: '/ji', parentId: 'home' },
  { id: 'fu', label: 'FU', canonicalUrl: '/fu', parentId: 'home' },
  { id: 'tai-path', label: 'Caminho TAI', canonicalUrl: '/tai/caminho', parentId: 'tai' },
];

describe('contextualNavigationNodes', () => {
  it('projects roots and first-level destinations without flattening the whole canon', () => {
    const hierarchy = buildExperienceHierarchy(nodes);
    expect(contextualNavigationNodes(hierarchy, null).map((node) => node.id)).toEqual(['home', 'fu', 'ji', 'tai']);
  });

  it('expands children of the focused destination while preserving canonical URLs', () => {
    const hierarchy = buildExperienceHierarchy(nodes);
    const projected = contextualNavigationNodes(hierarchy, 'tai');
    const path = projected.find((node) => node.id === 'tai-path');
    expect(path).toMatchObject({ canonicalUrl: '/tai/caminho', relation: 'focus-child', depth: 2 });
  });
});
