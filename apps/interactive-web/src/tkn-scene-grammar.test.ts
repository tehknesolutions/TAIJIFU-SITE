import { describe, expect, it } from 'vitest';
import { sceneVisualToken } from './tkn-scene-grammar.js';

describe('TKN scene grammar', () => {
  it('governs environment palette and lighting outside the Three renderer', () => {
    expect(sceneVisualToken('dojo')).toEqual({
      background: 0x060605,
      ground: 0x0b0b09,
      architecture: 0x131310,
      threshold: 0x7d632b,
      thresholdEmissive: 0x241b08,
      connection: 0x6f6b62,
      hemisphereSky: 0xddd4c4,
      hemisphereGround: 0x090908,
      hemisphereIntensity: 1.25,
      centralLight: 0xc89b3c,
      centralLightIntensity: 9,
      centralLightDistance: 12,
      centralLightDecay: 2,
    });
  });

  it('keeps environment identity independent from canon structure and interaction state', () => {
    const token = sceneVisualToken('dojo');
    expect(token).not.toHaveProperty('structure');
    expect(token).not.toHaveProperty('focusState');
    expect(token).not.toHaveProperty('energy');
  });
});
