import type { ManifestationIntensity } from './manifestation-adapter.js';

export type TknEnergy = 'quiet' | 'present' | 'ceremonial';

export type ManifestationVisualToken = Readonly<{
  energy: TknEnergy;
  emissiveIntensity: number;
}>;

const TOKENS: Readonly<Record<ManifestationIntensity, ManifestationVisualToken>> = Object.freeze({
  signal: Object.freeze({ energy: 'quiet', emissiveIntensity: 0.05 }),
  artifact: Object.freeze({ energy: 'present', emissiveIntensity: 0.18 }),
  ritual: Object.freeze({ energy: 'ceremonial', emissiveIntensity: 0.32 }),
});

export function manifestationVisualToken(intensity: ManifestationIntensity): ManifestationVisualToken {
  return TOKENS[intensity];
}
