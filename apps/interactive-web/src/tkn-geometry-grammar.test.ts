import { describe, expect, it } from 'vitest';
import { geometryVisualToken } from './tkn-geometry-grammar.js';

describe('TKN geometry grammar', () => {
  it('governs canonical and node geometry outside the Three renderer', () => {
    expect(geometryVisualToken('origin')).toEqual({ shape: 'cylinder', dimensions: [0.72, 0.84, 0.22], segments: 48, rotationX: 0 });
    expect(geometryVisualToken('principle')).toEqual({ shape: 'box', dimensions: [1.35, 1.35, 0.18], segments: 4, rotationX: -0.08 });
  });

  it('keeps geometry independent from spatial rank and manifestation state', () => {
    const token = geometryVisualToken('principle');
    expect(token).not.toHaveProperty('rank');
    expect(token).not.toHaveProperty('energy');
    expect(token).not.toHaveProperty('focusState');
    expect(token).not.toHaveProperty('manifestationIntensity');
  });
});
