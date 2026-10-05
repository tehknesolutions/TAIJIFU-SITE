import { describe, expect, it } from 'vitest';
import { cameraVisualToken } from './tkn-camera-grammar.js';

describe('TKN camera grammar', () => {
  it('governs the base dojo camera outside the Three renderer', () => {
    expect(cameraVisualToken('standard')).toEqual({
      fov: 68,
      near: 0.1,
      far: 100,
      position: [0, 1.65, 5],
      lookAt: [0, 1.5, -1],
    });
  });

  it('provides an explicit reduced-motion camera mode without changing canon', () => {
    expect(cameraVisualToken('reduced')).toEqual({
      fov: 68,
      near: 0.1,
      far: 100,
      position: [0, 1.65, 5],
      lookAt: [0, 1.5, -1],
    });
  });

  it('keeps camera framing independent from structure, energy and interaction', () => {
    const token = cameraVisualToken('standard');
    expect(token).not.toHaveProperty('structure');
    expect(token).not.toHaveProperty('energy');
    expect(token).not.toHaveProperty('focusState');
    expect(token).not.toHaveProperty('manifestationIntensity');
  });
});
