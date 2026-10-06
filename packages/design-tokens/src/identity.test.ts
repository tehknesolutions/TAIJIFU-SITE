import { describe, expect, it } from 'vitest';
import {
  assertIdentityAxisMapping,
  assertManifestationIntensity,
  manifestationAdaptations,
  protectedIdentityDimensions,
  taijifuIdentityGrammar,
} from './identity.js';

describe('TAIJIFU Living Identity invariants', () => {
  it('keeps the TAI/JI/FU semantic grammar explicit', () => {
    expect(taijifuIdentityGrammar).toEqual({
      tai: { role: 'essence', question: 'O que deve permanecer?' },
      ji: { role: 'adaptation', question: 'O que precisa mudar?' },
      fu: { role: 'manifestation', question: 'Que forma deve existir agora?' },
    });
  });

  it('permits presentation adaptation without granting canonical mutation', () => {
    expect(manifestationAdaptations).toEqual([
      'scale', 'material', 'depth', 'illumination', 'motion', 'responsive-composition',
    ]);
    expect(protectedIdentityDimensions).toEqual([
      'semantic-roles', 'provenance', 'canonical-hierarchy', 'protected-mark-topology',
    ]);
  });

  it('fails closed for unsupported manifestation intensity', () => {
    expect(assertManifestationIntensity('ritual')).toBe('ritual');
    expect(() => assertManifestationIntensity('spectacle')).toThrow(
      'UNSUPPORTED_MANIFESTATION_INTENSITY:spectacle',
    );
  });

  it('rejects remapping a protected TAI/JI/FU semantic role', () => {
    expect(() => assertIdentityAxisMapping('tai', 'adaptation')).toThrow(
      'PROTECTED_IDENTITY_ROLE_REMAP:tai:adaptation',
    );
    expect(() => assertIdentityAxisMapping('ji', 'manifestation')).toThrow();
    expect(() => assertIdentityAxisMapping('fu', 'essence')).toThrow();
    expect(() => assertIdentityAxisMapping('tai', 'essence')).not.toThrow();
  });
});
