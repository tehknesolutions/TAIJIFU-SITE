import { describe, expect, it } from 'vitest';
import { canonToExperienceNodes } from './content/canon-registry.js';
import { buildExperienceHierarchy, visibleExperienceNodes } from './spatial-ui.js';
import { renderInteractiveLegend } from './semantic-site.js';

describe('Spatial UI Three/DOM parity', () => {
  it('uses the same progressive-disclosure set for spatial and accessible navigation', () => {
    const hierarchy = buildExperienceHierarchy(canonToExperienceNodes());
    const legend = renderInteractiveLegend();

    for (const focusId of [null, 'fundamentos', 'tai', 'ji', 'fu']) {
      const visibleIds = new Set(
        visibleExperienceNodes(hierarchy, focusId).map((node) => node.id),
      );

      const legendIds = [...legend.matchAll(/data-node-id="([^"]+)"/g)]
        .map((match) => match[1])
        .filter((id) => visibleIds.has(id));

      expect(new Set(legendIds)).toEqual(visibleIds);
    }
  });

  it('keeps canonical destinations identical across the projected hierarchy', () => {
    const source = canonToExperienceNodes();
    const hierarchy = buildExperienceHierarchy(source);
    const projected = new Map(
      visibleExperienceNodes(hierarchy, 'fundamentos').map((node) => [
        node.id,
        node.canonicalUrl,
      ]),
    );

    for (const node of source.filter((candidate) => projected.has(candidate.id))) {
      expect(projected.get(node.id)).toBe(node.canonicalUrl);
    }
  });
});
