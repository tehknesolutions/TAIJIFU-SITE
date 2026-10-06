export const manifestationIntensities = ['signal', 'artifact', 'ritual'] as const;
export type ManifestationIntensity = (typeof manifestationIntensities)[number];

export const taijifuIdentityGrammar = Object.freeze({
  tai: Object.freeze({ role: 'essence', question: 'O que deve permanecer?' }),
  ji: Object.freeze({ role: 'adaptation', question: 'O que precisa mudar?' }),
  fu: Object.freeze({ role: 'manifestation', question: 'Que forma deve existir agora?' }),
});

export const manifestationAdaptations = Object.freeze([
  'scale',
  'material',
  'depth',
  'illumination',
  'motion',
  'responsive-composition',
] as const);

export const protectedIdentityDimensions = Object.freeze([
  'semantic-roles',
  'provenance',
  'canonical-hierarchy',
  'protected-mark-topology',
] as const);

export function isManifestationIntensity(value: string): value is ManifestationIntensity {
  return (manifestationIntensities as readonly string[]).includes(value);
}

export function assertManifestationIntensity(value: string): ManifestationIntensity {
  if (!isManifestationIntensity(value)) {
    throw new Error(`UNSUPPORTED_MANIFESTATION_INTENSITY:${value}`);
  }
  return value;
}

export type IdentityAxis = keyof typeof taijifuIdentityGrammar;

export function assertIdentityAxisMapping(axis: IdentityAxis, role: string): void {
  if (taijifuIdentityGrammar[axis].role !== role) {
    throw new Error(`PROTECTED_IDENTITY_ROLE_REMAP:${axis}:${role}`);
  }
}
