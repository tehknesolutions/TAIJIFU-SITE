import { describe, expect, it } from 'vitest';
import { visualRegressionMatrix } from './visual-regression-contract.js';

describe('Brand Book visual regression contract', () => {
  it('pins representative desktop review coverage for all supported locales', () => {
    expect(visualRegressionMatrix.filter((scenario) => scenario.id === 'desktop').map((scenario) => scenario.locale))
      .toEqual(['pt-BR', 'en', 'es']);
  });

  it('keeps targeted responsive and accessibility axes without a 3x5 matrix explosion', () => {
    expect(visualRegressionMatrix.map((scenario) => scenario.id)).toEqual([
      'desktop', 'desktop', 'desktop', 'tablet', 'mobile', 'reduced-motion', 'no-media',
    ]);
    expect(visualRegressionMatrix.filter((scenario) => scenario.id !== 'desktop')).toHaveLength(4);
  });

  it('requires explicit locale-prefixed routes for captured scenarios', () => {
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

  it('keeps no-media and reduced-motion independent regression axes', () => {
    const reducedMotion = visualRegressionMatrix.find((scenario) => scenario.id === 'reduced-motion');
    const noMedia = visualRegressionMatrix.find((scenario) => scenario.id === 'no-media');

    expect(reducedMotion).toMatchObject({ reducedMotion: true, mediaState: 'fallback' });
    expect(noMedia).toMatchObject({ reducedMotion: false, mediaState: 'fallback' });
  });
});
