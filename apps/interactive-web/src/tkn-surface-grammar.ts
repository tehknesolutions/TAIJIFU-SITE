export type TknSurface = 'dojo' | 'architecture' | 'ground';

export type SurfaceVisualToken = Readonly<{
  roughness: number;
  metalness: number;
  opacity: number;
  transparent: boolean;
}>;

const TOKENS: Readonly<Record<TknSurface, SurfaceVisualToken>> = Object.freeze({
  dojo: Object.freeze({ roughness: 0.58, metalness: 0.16, opacity: 1, transparent: true }),
  architecture: Object.freeze({ roughness: 0.9, metalness: 0.04, opacity: 1, transparent: false }),
  ground: Object.freeze({ roughness: 0.88, metalness: 0.08, opacity: 1, transparent: false }),
});

export function surfaceVisualToken(surface: TknSurface): SurfaceVisualToken {
  return TOKENS[surface];
}
