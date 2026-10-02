import { describe, expect, it } from 'vitest';
import { isPageContentReleaseReady, pageLocalizationStatus } from './page-localization-status.js';
import { officialPageContent } from './official-page-content.js';

describe('page localization status', () => {
  it('treats the authoritative pt-BR page bodies as approved', () => {
    expect(pageLocalizationStatus('manifesto', 'pt-BR')).toBe('approved');
    expect(isPageContentReleaseReady('historia', 'pt-BR')).toBe(true);
  });

  it.each(['en', 'es'] as const)('keeps %s official page bodies pending until translated content is approved', (locale) => {
    expect(pageLocalizationStatus('manifesto', locale)).toBe('pending');
    expect(isPageContentReleaseReady('manifesto', locale)).toBe(false);
  });

  it('does not invent readiness for unknown routes', () => {
    expect(pageLocalizationStatus('unknown-route', 'pt-BR')).toBe('pending');
    expect(isPageContentReleaseReady('unknown-route', 'pt-BR')).toBe(false);
  });
});


describe('page localization status coverage', () => {
  it('marks every currently published official page as approved only in pt-BR', () => {
    for (const routeId of Object.keys(officialPageContent)) {
      expect(pageLocalizationStatus(routeId, 'pt-BR')).toBe('approved');
      expect(isPageContentReleaseReady(routeId, 'pt-BR')).toBe(true);
      expect(pageLocalizationStatus(routeId, 'en')).toBe('pending');
      expect(pageLocalizationStatus(routeId, 'es')).toBe('pending');
    }
  });
});
