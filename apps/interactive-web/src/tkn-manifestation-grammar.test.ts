import { describe, expect, it } from 'vitest';
import { manifestationVisualToken } from './tkn-manifestation-grammar.js';

describe('TKN manifestation grammar', () => {
  it('defines visual energy as governed tokens instead of renderer magic numbers', () => {
    expect(manifestationVisualToken('signal')).toEqual({
      energy: 'quiet',
      emissiveIntensity: 0.05,
    });
    expect(manifestationVisualToken('artifact')).toEqual({
      energy: 'present',
      emissiveIntensity: 0.18,
    });
    expect(manifestationVisualToken('ritual')).toEqual({
      energy: 'ceremonial',
      emissiveIntensity: 0.32,
    });
  });

  it('keeps energy vocabulary independent from structural rank', () => {
    expect(manifestationVisualToken('signal').energy).toBe('quiet');
    expect(manifestationVisualToken('artifact').energy).toBe('present');
    expect(manifestationVisualToken('ritual').energy).toBe('ceremonial');
  });
});
