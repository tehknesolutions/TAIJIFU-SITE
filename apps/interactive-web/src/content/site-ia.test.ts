import { describe, expect, it } from 'vitest';
import {
  findSiteRoute,
  findLocalizedRoute,
  primaryNavigation,
  resolveLegacyRedirect,
  siteRoutes,
} from './site-ia.js';

describe('TAIJIFU site information architecture', () => {
  it('keeps stable route IDs while projecting localized URLs', () => {
    expect(findLocalizedRoute('fundamentos', 'pt-BR')).toMatchObject({
      id: 'fundamentos', title: 'Fundamentos', canonicalUrl: '/pt-br/fundamentos/',
    });
    expect(findLocalizedRoute('fundamentos', 'en')).toMatchObject({
      id: 'fundamentos', title: 'Foundations', canonicalUrl: '/en/foundations/',
    });
    expect(findLocalizedRoute('fundamentos', 'es')).toMatchObject({
      id: 'fundamentos', title: 'Fundamentos', canonicalUrl: '/es/fundamentos/',
    });
  });

  it('preserves every documented legacy redirect during migration', () => {
    expect(resolveLegacyRedirect('/artes-base/')).toBe('/pt-br/influencias/');
    expect(resolveLegacyRedirect('/trilhas/')).toBe('/pt-br/metodo/');
    expect(resolveLegacyRedirect('/niveis-e-graduacao/')).toBe('/pt-br/graduacao/');
    expect(resolveLegacyRedirect('/o-que-e/')).toBe('/pt-br/manifesto/');
    expect(resolveLegacyRedirect('/filosofia/')).toBe('/pt-br/fundamentos/');
    expect(resolveLegacyRedirect('/textos-oficiais/')).toBe('/pt-br/referencias/');
    expect(resolveLegacyRedirect('/registro/')).toBe('/pt-br/historia/');
    expect(resolveLegacyRedirect('/fundamentos/')).toBe('/pt-br/fundamentos/');
  });

  it('keeps navigation IDs resolvable in all supported locales', () => {
    for (const id of primaryNavigation) {
      expect(findLocalizedRoute(id, 'pt-BR')?.canonicalUrl).toMatch(/^\/pt-br\/.+\/$/);
      expect(findLocalizedRoute(id, 'en')?.canonicalUrl).toMatch(/^\/en\/.+\/$/);
      expect(findLocalizedRoute(id, 'es')?.canonicalUrl).toMatch(/^\/es\/.+\/$/);
    }
  });

  it('resolves localized and legacy URLs to the same stable route identity', () => {
    expect(findSiteRoute('/pt-br/manifesto/')?.id).toBe('manifesto');
    expect(findSiteRoute('/en/manifesto/')?.id).toBe('manifesto');
    expect(findSiteRoute('/es/manifesto/')?.id).toBe('manifesto');
    expect(findSiteRoute('/o-que-e/')?.id).toBe('manifesto');
  });

  it('keeps the international entry route distinct from localized content routes', () => {
    expect(siteRoutes.find((route) => route.id === 'home')?.localized).toBeUndefined();
    expect(findSiteRoute('/')?.id).toBe('home');
  });
});
