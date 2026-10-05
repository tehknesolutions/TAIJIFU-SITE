import { describe, expect, it } from 'vitest';
import { surfaceVisualToken } from './tkn-surface-grammar.js';

describe('TKN surface grammar', () => {
  it('governs material character outside the Three renderer', () => {
    expect(surfaceVisualToken('dojo')).toEqual({
      roughness: 0.58,
      metalness: 0.16,
      opacity: 1,
      transparent: true,
    });
    expect(surfaceVisualToken('architecture')).toEqual({
      roughness: 0.9,
      metalness: 0.04,
      opacity: 1,
      transparent: false,
    });
    expect(surfaceVisualToken('ground')).toEqual({
      roughness: 0.88,
      metalness: 0.08,
      opacity: 1,
      transparent: false,
    });
  });

  it('keeps surface independent from energy interaction motion and structure', () => {
    const token = surfaceVisualToken('dojo');
    expect(token).not.toHaveProperty('energy');
    expect(token).not.toHaveProperty('scale');
    expect(token).not.toHaveProperty('transitionDurationMs');
    expect(token).not.toHaveProperty('structure');
  });
});
