export type TknGeometryRole = 'origin' | 'principle';

export type GeometryVisualToken = Readonly<{
  shape: 'cylinder' | 'box';
  dimensions: readonly [number, number, number];
  segments: number;
  rotationX: number;
}>;

const TOKENS: Readonly<Record<TknGeometryRole, GeometryVisualToken>> = Object.freeze({
  origin: Object.freeze({ shape: 'cylinder', dimensions: Object.freeze([0.72, 0.84, 0.22]), segments: 48, rotationX: 0 }),
  principle: Object.freeze({ shape: 'box', dimensions: Object.freeze([1.35, 1.35, 0.18]), segments: 4, rotationX: -0.08 }),
});

export function geometryVisualToken(role: TknGeometryRole): GeometryVisualToken {
  return TOKENS[role];
}
