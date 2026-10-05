import { describe, expect, it } from 'vitest';
import { connectionVisualToken } from './tkn-connection-grammar.js';

describe('TKN connection grammar', () => {
  it('governs canonical connection appearance outside the renderer', () => {
    expect(connectionVisualToken('canonical')).toEqual({
      color: 0x6f6b62,
      opacity: 0.38,
      transparent: true,
      width: 1,
    });
  });

  it('keeps connection identity independent from hierarchy and interaction', () => {
    const token = connectionVisualToken('canonical');
    expect(token).not.toHaveProperty('rank');
    expect(token).not.toHaveProperty('focusState');
    expect(token).not.toHaveProperty('energy');
    expect(token).not.toHaveProperty('manifestationIntensity');
  });
});
