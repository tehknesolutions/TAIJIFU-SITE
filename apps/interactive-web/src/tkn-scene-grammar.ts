export type TknScene = 'dojo';

export type SceneVisualToken = Readonly<{
  background: number;
  ground: number;
  architecture: number;
  threshold: number;
  thresholdEmissive: number;
  connection: number;
  hemisphereSky: number;
  hemisphereGround: number;
  hemisphereIntensity: number;
  centralLight: number;
  centralLightIntensity: number;
  centralLightDistance: number;
  centralLightDecay: number;
}>;

const TOKENS: Readonly<Record<TknScene, SceneVisualToken>> = Object.freeze({
  dojo: Object.freeze({
    background: 0x060605,
    ground: 0x0b0b09,
    architecture: 0x131310,
    threshold: 0x7d632b,
    thresholdEmissive: 0x241b08,
    connection: 0x6f6b62,
    hemisphereSky: 0xddd4c4,
    hemisphereGround: 0x090908,
    hemisphereIntensity: 1.25,
    centralLight: 0xc89b3c,
    centralLightIntensity: 9,
    centralLightDistance: 12,
    centralLightDecay: 2,
  }),
});

export function sceneVisualToken(scene: TknScene): SceneVisualToken {
  return TOKENS[scene];
}
