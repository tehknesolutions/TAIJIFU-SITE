import { describe, expect, it } from 'vitest';
import { dojoNucleusRoutes, getDojoNucleusPage } from './dojo-nucleus-routes.js';
import { renderDojoNucleusPage } from './dojo-nucleus-page.js';

describe('Dojo recovered-instruction localization safety', () => {
  it('preserves source instruction verbatim across PT-BR, EN and ES routes', () => {
    const nucleusIds = [...new Set(dojoNucleusRoutes.map(({ nucleusId }) => nucleusId))];
    expect(nucleusIds).toHaveLength(128);

    for (const nucleusId of nucleusIds) {
      const page = getDojoNucleusPage(nucleusId);
      expect(page).not.toBeNull();

      const pt = renderDojoNucleusPage(nucleusId, 'pt-BR')!;
      const en = renderDojoNucleusPage(nucleusId, 'en')!;
      const es = renderDojoNucleusPage(nucleusId, 'es')!;

      for (const html of [pt, en, es]) {
        expect(html).toContain(page!.instructional.summary);
        expect(html).toContain(page!.instructional.practice);
        expect(html).toContain('legacy-candidate');
      }

      expect(en).toContain('Tradução oficial para este locale ainda não está aprovada.');
      expect(es).toContain('Tradução oficial para este locale ainda não está aprovada.');
    }
  });
});
