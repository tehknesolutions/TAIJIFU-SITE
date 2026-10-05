import { describe, expect, it } from 'vitest';
import { interactionVisualToken } from './tkn-interaction-grammar.js';

describe('TKN interaction grammar', () => {
  it('defines focus geometry and material response outside the renderer', () => {
    expect(interactionVisualToken('neutral')).toEqual({ scale: 1, zOffset: 0, emissiveFloor: null, emissiveCeiling: null, opacityCeiling: null });
    expect(interactionVisualToken('peer')).toEqual({ scale: 1, zOffset: 0, emissiveFloor: null, emissiveCeiling: null, opacityCeiling: null });
    expect(interactionVisualToken('current')).toEqual({ scale: 1, zOffset: 0, emissiveFloor: null, emissiveCeiling: null, opacityCeiling: null });
    expect(interactionVisualToken('focused')).toEqual({ scale: 1.18, zOffset: 0.36, emissiveFloor: 0.28, emissiveCeiling: null, opacityCeiling: null });
    expect(interactionVisualToken('receded')).toEqual({ scale: 0.88, zOffset: 0, emissiveFloor: null, emissiveCeiling: 0.02, opacityCeiling: 0.42 });
  });

  it('keeps interaction vocabulary separate from manifestation energy', () => {
    expect(interactionVisualToken('focused')).not.toHaveProperty('energy');
    expect(interactionVisualToken('receded')).not.toHaveProperty('manifestationIntensity');
  });
});
