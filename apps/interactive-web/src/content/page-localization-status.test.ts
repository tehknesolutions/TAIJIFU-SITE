import { describe, expect, it } from 'vitest';
import { isPageContentReleaseReady, pageLocalizationStatus } from './page-localization-status.js';

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
