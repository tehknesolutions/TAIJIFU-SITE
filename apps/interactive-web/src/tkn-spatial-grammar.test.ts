import { describe, expect, it } from 'vitest';
import { spatialLayoutToken } from './tkn-spatial-grammar.js';

describe('TKN spatial grammar', () => {
  it('governs canonical dojo layout without encoding hierarchy into TAI JI FU', () => {
    expect(spatialLayoutToken('home')).toEqual({ x: 0, y: 1.55, z: -0.5 });
    expect(spatialLayoutToken('tai')).toEqual({ x: -2.6, y: 1.55, z: -0.3 });
    expect(spatialLayoutToken('ji')).toEqual({ x: 0, y: 1.55, z: -0.1 });
    expect(spatialLayoutToken('fu')).toEqual({ x: 2.6, y: 1.55, z: -0.3 });
  });

  it('keeps the three principles on the same structural rank', () => {
    expect(spatialLayoutToken('tai').rank).toBe('peer');
    expect(spatialLayoutToken('ji').rank).toBe('peer');
    expect(spatialLayoutToken('fu').rank).toBe('peer');
  });

  it('provides governed radial and grid parameters for non-canonical layouts', () => {
    expect(spatialLayoutToken('layout')).toEqual({
      canonicalRadius: 2.45,
      depthRadiusStep: 1.35,
      depthYStep: 0.15,
      gridColumnGap: 2.05,
      gridRowGap: 1.35,
    });
  });

  it('keeps spatial layout independent from energy and interaction', () => {
    const token = spatialLayoutToken('tai');
    expect(token).not.toHaveProperty('energy');
    expect(token).not.toHaveProperty('focusState');
    expect(token).not.toHaveProperty('manifestationIntensity');
  });
});
