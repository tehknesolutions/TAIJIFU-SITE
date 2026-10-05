export type TknEnvironmentGeometry = 'floor' | 'back-wall' | 'side-wall' | 'threshold';

export type EnvironmentGeometryToken = Readonly<{
  shape: 'plane' | 'box';
  dimensions: readonly number[];
  rotationY: number;
  rotationX: number;
  position: readonly [number, number, number];
}>;

const TOKENS: Readonly<Record<TknEnvironmentGeometry, EnvironmentGeometryToken>> = Object.freeze({
  floor: Object.freeze({ shape: 'plane', dimensions: Object.freeze([18, 18]), rotationY: 0, rotationX: -Math.PI / 2, position: Object.freeze([0, 0, 0]) }),
  'back-wall': Object.freeze({ shape: 'plane', dimensions: Object.freeze([18, 7]), rotationY: 0, rotationX: 0, position: Object.freeze([0, 3.5, -3.2]) }),
  'side-wall': Object.freeze({ shape: 'plane', dimensions: Object.freeze([18, 7]), rotationY: Math.PI / 2, rotationX: 0, position: Object.freeze([-8, 3.5, 2]) }),
  threshold: Object.freeze({ shape: 'box', dimensions: Object.freeze([8.5, 0.08, 0.7]), rotationY: 0, rotationX: 0, position: Object.freeze([0, 0.05, -2.65]) }),
});

export function environmentGeometryToken(geometry: TknEnvironmentGeometry): EnvironmentGeometryToken {
  return TOKENS[geometry];
}
