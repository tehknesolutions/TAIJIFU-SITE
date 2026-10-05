export type TknInteractionState = 'neutral' | 'peer' | 'current' | 'focused' | 'receded';

export type InteractionVisualToken = Readonly<{
  scale: number;
  zOffset: number;
  emissiveFloor: number | null;
  emissiveCeiling: number | null;
  opacityCeiling: number | null;
}>;

const PASSIVE = Object.freeze({ scale: 1, zOffset: 0, emissiveFloor: null, emissiveCeiling: null, opacityCeiling: null });

const TOKENS: Readonly<Record<TknInteractionState, InteractionVisualToken>> = Object.freeze({
  neutral: PASSIVE,
  peer: PASSIVE,
  current: PASSIVE,
  focused: Object.freeze({ scale: 1.18, zOffset: 0.36, emissiveFloor: 0.28, emissiveCeiling: null, opacityCeiling: null }),
  receded: Object.freeze({ scale: 0.88, zOffset: 0, emissiveFloor: null, emissiveCeiling: 0.02, opacityCeiling: 0.42 }),
});

export function interactionVisualToken(state: TknInteractionState): InteractionVisualToken {
  return TOKENS[state];
}
