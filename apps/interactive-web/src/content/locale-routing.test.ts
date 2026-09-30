import { describe, expect, it } from 'vitest';
import { legacyRedirectFor, resolveLocalizedPath } from './locale-routing.js';

describe('TAIJIFU locale routing', () => {
  it('resolves explicit locale paths to stable route identity', () => {
    expect(resolveLocalizedPath('/pt-br/fundamentos/')).toMatchObject({ locale: 'pt-BR', routeId: 'fundamentos' });
    expect(resolveLocalizedPath('/en/foundations/')).toMatchObject({ locale: 'en', routeId: 'fundamentos' });
    expect(resolveLocalizedPath('/es/fundamentos/')).toMatchObject({ locale: 'es', routeId: 'fundamentos' });
  });

  it('preserves the root as international entry rather than localized content', () => {
    expect(resolveLocalizedPath('/')).toEqual({ kind: 'international-entry' });
  });

  it('rejects unsupported locale prefixes instead of masquerading as supported', () => {
    expect(resolveLocalizedPath('/fr/fondations/')).toEqual({ kind: 'not-found' });
  });

  it('redirects legacy Portuguese routes exactly once', () => {
    expect(legacyRedirectFor('/fundamentos/')).toBe('/pt-br/fundamentos/');
    expect(legacyRedirectFor('/filosofia/')).toBe('/pt-br/fundamentos/');
    expect(legacyRedirectFor('/pt-br/fundamentos/')).toBeNull();
    expect(legacyRedirectFor('/en/foundations/')).toBeNull();
  });
});
