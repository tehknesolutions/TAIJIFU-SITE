import { describe, expect, it } from 'vitest';
import { buildLocalizedExperienceNodes } from './content/canon-registry.js';
import { buildExperienceHierarchy, visibleExperienceNodes } from './spatial-ui.js';

describe('localized Spatial UI parity', () => {
  it('preserves stable node IDs while resolving labels and URLs per locale', () => {
    const pt = buildLocalizedExperienceNodes('pt-BR');
    const en = buildLocalizedExperienceNodes('en');
    const es = buildLocalizedExperienceNodes('es');

    expect(pt.map((node) => node.id)).toEqual(en.map((node) => node.id));
    expect(pt.map((node) => node.id)).toEqual(es.map((node) => node.id));
    expect(pt.find((node) => node.id === 'fundamentos')).toMatchObject({
      label: 'Fundamentos', canonicalUrl: '/pt-br/fundamentos/',
    });
    expect(en.find((node) => node.id === 'fundamentos')).toMatchObject({
      label: 'Foundations', canonicalUrl: '/en/foundations/',
    });
    expect(es.find((node) => node.id === 'fundamentos')).toMatchObject({
      label: 'Fundamentos', canonicalUrl: '/es/fundamentos/',
    });
  });

  it('keeps the same visible node IDs for Three and DOM projections in every locale', () => {
    for (const locale of ['pt-BR', 'en', 'es'] as const) {
      const hierarchy = buildExperienceHierarchy(buildLocalizedExperienceNodes(locale));
      for (const focusId of [null, 'fundamentos', 'tai', 'ji', 'fu']) {
        expect(visibleExperienceNodes(hierarchy, focusId).map((node) => node.id))
          .toEqual(visibleExperienceNodes(hierarchy, focusId).map((node) => node.id));
      }
    }
  });
});
