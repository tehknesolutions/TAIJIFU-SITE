import { describe, expect, it } from 'vitest';
import { motionVisualToken } from './tkn-motion-grammar.js';

describe('TKN motion grammar', () => {
  it('governs camera response and transition timing outside the renderer', () => {
    expect(motionVisualToken('standard')).toEqual({
      cameraPositionInfluence: 0.08,
      cameraLookAtInfluence: 0.18,
      transitionDurationMs: 220,
    });
  });

  it('collapses temporal motion when reduced motion is requested', () => {
    expect(motionVisualToken('reduced')).toEqual({
      cameraPositionInfluence: 0,
      cameraLookAtInfluence: 0,
      transitionDurationMs: 0,
    });
  });

  it('keeps motion independent from energy and interaction rank', () => {
    expect(motionVisualToken('standard')).not.toHaveProperty('energy');
    expect(motionVisualToken('standard')).not.toHaveProperty('scale');
    expect(motionVisualToken('standard')).not.toHaveProperty('structure');
  });
});
