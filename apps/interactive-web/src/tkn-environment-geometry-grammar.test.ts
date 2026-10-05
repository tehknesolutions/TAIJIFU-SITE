import { describe, expect, it } from 'vitest';
import { environmentGeometryToken } from './tkn-environment-geometry-grammar.js';

describe('TKN environment geometry grammar', () => {
  it('governs dojo floor, walls and threshold geometry outside the renderer', () => {
    expect(environmentGeometryToken('floor')).toEqual({ shape: 'plane', dimensions: [18, 18], rotationY: 0, rotationX: -Math.PI / 2, position: [0, 0, 0] });
    expect(environmentGeometryToken('back-wall')).toEqual({ shape: 'plane', dimensions: [18, 7], rotationY: 0, rotationX: 0, position: [0, 3.5, -3.2] });
    expect(environmentGeometryToken('side-wall')).toEqual({ shape: 'plane', dimensions: [18, 7], rotationY: Math.PI / 2, rotationX: 0, position: [-8, 3.5, 2] });
    expect(environmentGeometryToken('threshold')).toEqual({ shape: 'box', dimensions: [8.5, 0.08, 0.7], rotationY: 0, rotationX: 0, position: [0, 0.05, -2.65] });
  });

  it('keeps environment geometry independent from node geometry and semantic identity', () => {
    const token = environmentGeometryToken('threshold');
    expect(token).not.toHaveProperty('semanticRank');
    expect(token).not.toHaveProperty('manifestationIntensity');
    expect(token).not.toHaveProperty('focusState');
  });
});
