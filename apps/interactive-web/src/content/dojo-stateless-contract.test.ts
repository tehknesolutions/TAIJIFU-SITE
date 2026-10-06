import { describe, expect, it } from 'vitest';
import { dojoNucleusRoutes, getDojoNucleusPage } from './dojo-nucleus-routes.js';
import { getDojoNucleusNavigation } from './dojo-nucleus-navigation.js';
import { renderDojoNucleusPage } from './dojo-nucleus-page.js';

describe('Dojo stateless contract', () => {
  it('preserves authority and stateless rendering for the complete N001-N128 corpus', () => {
    const ptRoutes = dojoNucleusRoutes.filter(({ locale }) => locale === 'pt-BR');
    expect(ptRoutes).toHaveLength(128);
    expect(new Set(ptRoutes.map(({ nucleusId }) => nucleusId)).size).toBe(128);

    for (const route of ptRoutes) {
      const page = getDojoNucleusPage(route.nucleusId);
      const navigation = getDojoNucleusNavigation(route.nucleusId, 'pt-BR');
      const html = renderDojoNucleusPage(route.nucleusId, 'pt-BR');

      expect(page?.nucleus.id).toBe(route.nucleusId);
      expect(page?.instructional.source.layer).toBe('legacy-candidate');
      expect(navigation?.nucleusId).toBe(route.nucleusId);
      expect(html).toContain(`data-nucleus-id="${route.nucleusId}"`);
      expect(html).toContain('data-practice-authority="legacy-candidate"');
      expect(html).not.toMatch(/data-(practice-)?(complete|completed|progress|mastery|xp|streak)=/i);
    }
  });
});
