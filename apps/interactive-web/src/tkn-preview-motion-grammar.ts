export type TknPreviewMotionMode = 'standard' | 'reduced';

export type PreviewMotionVisualToken = Readonly<{
  cameraZ: number | null;
  lookAtInfluence: number;
  transitionDurationMs: number;
}>;

const TOKENS: Readonly<Record<TknPreviewMotionMode, PreviewMotionVisualToken>> = Object.freeze({
  standard: Object.freeze({ cameraZ: 7.35, lookAtInfluence: 0.32, transitionDurationMs: 220 }),
  reduced: Object.freeze({ cameraZ: null, lookAtInfluence: 0, transitionDurationMs: 0 }),
});

export function previewMotionToken(mode: TknPreviewMotionMode): PreviewMotionVisualToken {
  return TOKENS[mode];
}
