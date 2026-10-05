import { describe, expect, it } from 'vitest';
import { dojoNucleusRoutes, findDojoNucleusByPath, findDojoNucleusRoute, getDojoNucleusPage } from './dojo-nucleus-routes.js';

describe('Dojo nucleus routes', () => {
  it('creates one stable localized route for each Canon nucleus', () => { expect(dojoNucleusRoutes).toHaveLength(128); expect(new Set(dojoNucleusRoutes.map((route) => route.nucleusId)).size).toBe(128); });
  it('resolves the same nucleus in all supported locales', () => {
    expect(findDojoNucleusRoute('NUC-N001', 'pt-BR')?.canonicalUrl).toMatch(/^\/pt-br\/dojo\/nucleos\/nuc-n001-/);
    expect(findDojoNucleusRoute('NUC-N001', 'en')?.canonicalUrl).toMatch(/^\/en\/dojo\/nuclei\/nuc-n001-/);
    expect(findDojoNucleusRoute('NUC-N001', 'es')?.canonicalUrl).toMatch(/^\/es\/dojo\/nucleos\/nuc-n001-/);
  });
  it('resolves canonical URLs back to the nucleus', () => { const route = findDojoNucleusRoute('NUC-N128', 'pt-BR'); expect(route).not.toBeNull(); expect(findDojoNucleusByPath(route!.canonicalUrl)?.nucleusId).toBe('NUC-N128'); });
  it('keeps the page bound to the read-only projection', () => { expect(getDojoNucleusPage('NUC-N001')?.authority).toBe('canon-entity-plus-legacy-candidate-instruction'); expect(getDojoNucleusPage('NUC-N001')?.instructional.source.layer).toBe('legacy-candidate'); });
});
