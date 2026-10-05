import { describe, expect, it } from 'vitest';
import { visualRegressionMatrix } from './visual-regression-contract.js';

describe('Brand Book visual regression contract', () => {
  it('contains exactly 15 unique locale/state scenarios', () => {
    expect(visualRegressionMatrix).toHaveLength(15);

    const keys = visualRegressionMatrix.map(
      ({ locale, id }) => `${locale}:${id}`,
    );

    expect(new Set(keys).size).toBe(15);
    expect(keys).toEqual([
      'pt-BR:desktop',
      'pt-BR:tablet',
      'pt-BR:mobile',
      'pt-BR:reduced-motion',
      'pt-BR:no-media',
      'en:desktop',
      'en:tablet',
      'en:mobile',
      'en:reduced-motion',
      'en:no-media',
      'es:desktop',
      'es:tablet',
      'es:mobile',
      'es:reduced-motion',
      'es:no-media',
    ]);
  });

  it('keeps the approved/pending boundary explicit', () => {
    expect(visualRegressionMatrix.filter(({ baseline }) => baseline === 'approved')).toHaveLength(7);
    expect(visualRegressionMatrix.filter(({ baseline }) => baseline === 'pending')).toHaveLength(8);
  });

  it('requires explicit locale-prefixed routes for every captured scenario', () => {
    for (const scenario of visualRegressionMatrix) {
      expect(scenario.route).toMatch(/^\/(pt-br|en|es)\//);
      expect(['pt-BR', 'en', 'es']).toContain(scenario.locale);
    }
  });

  it('keeps viewport and environment state explicit for reproducible captures', () => {
    for (const scenario of visualRegressionMatrix) {
      expect(scenario.viewport.width).toBeGreaterThan(0);
      expect(scenario.viewport.height).toBeGreaterThan(0);
      expect(typeof scenario.reducedMotion).toBe('boolean');
      expect(['asset', 'fallback']).toContain(scenario.mediaState);
    }
  });

  it('keeps no-media and reduced-motion as independent regression axes', () => {
    const reducedMotion = visualRegressionMatrix.filter(({ id }) => id === 'reduced-motion');
    const noMedia = visualRegressionMatrix.filter(({ id }) => id === 'no-media');

    expect(reducedMotion).toHaveLength(3);
    expect(noMedia).toHaveLength(3);
    expect(reducedMotion.every(({ reducedMotion }) => reducedMotion)).toBe(true);
    expect(noMedia.every(({ reducedMotion }) => !reducedMotion)).toBe(true);
  });
});
