import { describe, expect, it } from 'vitest';
import {
  findSiteRoute,
  primaryNavigation,
  resolveLegacyRedirect,
  siteRoutes,
} from './site-ia.js';

describe('TAIJIFU site information architecture', () => {
  it('materializes the current CANON_SYNC public destinations', () => {
    expect(siteRoutes.map((route) => route.canonicalUrl)).toEqual(
      expect.arrayContaining([
        '/manifesto/',
        '/fundamentos/',
        '/influencias/',
        '/metodo/',
        '/graduacao/',
        '/referencias/',
        '/historia/',
      ]),
    );
  });

  it('preserves every documented legacy redirect', () => {
    expect(resolveLegacyRedirect('/artes-base/')).toBe('/influencias/');
    expect(resolveLegacyRedirect('/trilhas/')).toBe('/metodo/');
    expect(resolveLegacyRedirect('/niveis-e-graduacao/')).toBe('/graduacao/');
    expect(resolveLegacyRedirect('/o-que-e/')).toBe('/manifesto/');
    expect(resolveLegacyRedirect('/filosofia/')).toBe('/fundamentos/');
    expect(resolveLegacyRedirect('/textos-oficiais/')).toBe('/referencias/');
    expect(resolveLegacyRedirect('/registro/')).toBe('/historia/');
  });

  it('keeps navigation IDs resolvable to canonical routes', () => {
    for (const id of primaryNavigation) {
      const route = siteRoutes.find((candidate) => candidate.id === id);
      expect(route?.canonicalUrl).toMatch(/^\/.+\/$/);
    }
  });

  it('resolves canonical and legacy URLs to the same route', () => {
    expect(findSiteRoute('/manifesto/')?.id).toBe('manifesto');
    expect(findSiteRoute('/o-que-e/')?.id).toBe('manifesto');
  });
});
