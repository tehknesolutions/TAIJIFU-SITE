import { describe, expect, it } from 'vitest';
import { previewMotionToken } from './tkn-preview-motion-grammar.js';

describe('TKN preview motion grammar', () => {
  it('governs selected-node preview framing outside the web surface', () => {
    expect(previewMotionToken('standard')).toEqual({
      cameraZ: 7.35,
      lookAtInfluence: 0.32,
      transitionDurationMs: 220,
    });
  });

  it('disables preview transition when reduced motion is requested', () => {
    expect(previewMotionToken('reduced')).toEqual({
      cameraZ: null,
      lookAtInfluence: 0,
      transitionDurationMs: 0,
    });
  });

  it('keeps preview motion independent from manifestation and interaction tokens', () => {
    const token = previewMotionToken('standard');
    expect(token).not.toHaveProperty('energy');
    expect(token).not.toHaveProperty('scale');
    expect(token).not.toHaveProperty('manifestationIntensity');
  });
});
