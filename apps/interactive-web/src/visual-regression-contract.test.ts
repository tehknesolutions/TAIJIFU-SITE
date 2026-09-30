import { describe, expect, it } from 'vitest';
import { visualRegressionMatrix } from './visual-regression-contract.js';

describe('Brand Book visual regression contract', () => {
  it('pins every required deterministic review mode from #40', () => {
    expect(visualRegressionMatrix.map((scenario) => scenario.id)).toEqual([
      'desktop',
      'tablet',
      'mobile',
      'reduced-motion',
      'no-media',
    ]);
  });

  it('keeps viewport and environment state explicit for reproducible captures', () => {
    for (const scenario of visualRegressionMatrix) {
      expect(scenario.viewport.width).toBeGreaterThan(0);
      expect(scenario.viewport.height).toBeGreaterThan(0);
      expect(typeof scenario.reducedMotion).toBe('boolean');
      expect(['asset', 'fallback']).toContain(scenario.mediaState);
      expect(scenario.route).toBe('/');
    }
  });

  it('makes no-media and reduced-motion independent regression axes', () => {
    const reducedMotion = visualRegressionMatrix.find((scenario) => scenario.id === 'reduced-motion');
    const noMedia = visualRegressionMatrix.find((scenario) => scenario.id === 'no-media');

    expect(reducedMotion).toMatchObject({ reducedMotion: true, mediaState: 'fallback' });
    expect(noMedia).toMatchObject({ reducedMotion: false, mediaState: 'fallback' });
  });
});
