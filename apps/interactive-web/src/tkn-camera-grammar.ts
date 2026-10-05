export type TknCameraMode = 'standard' | 'reduced';

export type CameraVisualToken = Readonly<{
  fov: number;
  near: number;
  far: number;
  position: readonly [number, number, number];
  lookAt: readonly [number, number, number];
}>;

const STANDARD: CameraVisualToken = Object.freeze({
  fov: 68,
  near: 0.1,
  far: 100,
  position: Object.freeze([0, 1.65, 5]),
  lookAt: Object.freeze([0, 1.5, -1]),
});

const TOKENS: Readonly<Record<TknCameraMode, CameraVisualToken>> = Object.freeze({
  standard: STANDARD,
  reduced: STANDARD,
});

export function cameraVisualToken(mode: TknCameraMode): CameraVisualToken {
  return TOKENS[mode];
}
