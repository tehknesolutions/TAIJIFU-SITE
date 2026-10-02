import { describe, expect, it } from 'vitest';
import { isCanonContentReleaseReady } from './canon-ui-readiness.js';

describe('Canon UI release readiness', () => {
  it('keeps pt-BR release-ready', () => {
    expect(isCanonContentReleaseReady('pt-BR')).toBe(true);
  });

  it.each(['en', 'es'] as const)('keeps %s pending until every Canon entity is translated and approved', (locale) => {
    expect(isCanonContentReleaseReady(locale)).toBe(false);
  });
});
