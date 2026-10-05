import { describe, expect, it } from 'vitest';
import { semanticColorToken } from './tkn-semantic-palette.js';

describe('TKN semantic palette', () => {
  it('gives TAI JI FU distinct identities at equal semantic rank', () => {
    expect(semanticColorToken('tai')).toEqual({ color: 0xb43a32, rank: 'peer' });
    expect(semanticColorToken('ji')).toEqual({ color: 0x4b82d8, rank: 'peer' });
    expect(semanticColorToken('fu')).toEqual({ color: 0xd2ad55, rank: 'peer' });
  });

  it('provides a neutral fallback without promoting unknown nodes', () => {
    expect(semanticColorToken('unknown')).toEqual({ color: 0xe9e0cf, rank: 'default' });
  });

  it('keeps color identity independent from interaction and manifestation', () => {
    const tai = semanticColorToken('tai');
    expect(tai).not.toHaveProperty('focusState');
    expect(tai).not.toHaveProperty('energy');
    expect(tai).not.toHaveProperty('manifestationIntensity');
  });
});
