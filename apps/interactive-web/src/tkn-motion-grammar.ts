export type TknMotionMode = 'standard' | 'reduced';

export type MotionVisualToken = Readonly<{
  cameraPositionInfluence: number;
  cameraLookAtInfluence: number;
  transitionDurationMs: number;
}>;

const TOKENS: Readonly<Record<TknMotionMode, MotionVisualToken>> = Object.freeze({
  standard: Object.freeze({
    cameraPositionInfluence: 0.08,
    cameraLookAtInfluence: 0.18,
    transitionDurationMs: 220,
  }),
  reduced: Object.freeze({
    cameraPositionInfluence: 0,
    cameraLookAtInfluence: 0,
    transitionDurationMs: 0,
  }),
});

export function motionVisualToken(mode: TknMotionMode): MotionVisualToken {
  return TOKENS[mode];
}
