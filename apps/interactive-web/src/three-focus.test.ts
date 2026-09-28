import { describe, expect, it } from 'vitest';
import { PerspectiveCamera, Object3D } from 'three';
import {
  applyProjectedFocus,
  describeProjectedFocus,
} from './three-focus.js';

describe('Three projected focus', () => {
  it('describes only canonical projected nodes', () => {
    const node = new Object3D();
    node.userData = {
      nodeId: 'tai',
      label: 'TAI',
      canonicalUrl: '/principios/tai/',
    };

    expect(describeProjectedFocus(node)).toEqual({
      nodeId: 'tai',
      label: 'TAI',
      canonicalUrl: '/principios/tai/',
    });
    expect(describeProjectedFocus(new Object3D())).toBeNull();
  });

  it('focuses one node and restores the graph without changing canonical metadata', () => {
    const camera = new PerspectiveCamera();
    camera.position.set(0, 0, 8.5);
    const tai = new Object3D();
    tai.position.set(3, 0, 0);
    tai.userData = {
      nodeId: 'tai',
      label: 'TAI',
      canonicalUrl: '/principios/tai/',
      baseZ: 0,
    };
    const manifesto = new Object3D();
    manifesto.position.set(-3, 0, 0);
    manifesto.userData = {
      nodeId: 'manifesto',
      label: 'Manifesto',
      canonicalUrl: '/manifesto/',
      baseZ: 0,
    };

    applyProjectedFocus([tai, manifesto], tai, camera);

    expect(tai.scale.x).toBeCloseTo(1.12);
    expect(tai.position.z).toBeCloseTo(0.28);
    expect(manifesto.scale.x).toBeCloseTo(0.94);
    expect(tai.userData.canonicalUrl).toBe('/principios/tai/');
    expect(camera.position.x).toBeGreaterThan(0);

    applyProjectedFocus([tai, manifesto], null, camera);

    expect(tai.scale.x).toBe(1);
    expect(tai.position.z).toBe(0);
    expect(manifesto.scale.x).toBe(1);
    expect(camera.position.x).toBe(0);
  });

  it('keeps the camera anchored when reduced motion is requested', () => {
    const camera = new PerspectiveCamera();
    camera.position.set(0, 0, 8.5);
    const node = new Object3D();
    node.position.set(3, 2, 0);
    node.userData.baseZ = 0;

    applyProjectedFocus([node], node, camera, true);

    expect(camera.position.x).toBe(0);
    expect(camera.position.y).toBe(0);
    expect(node.scale.x).toBeCloseTo(1.12);
  });
});
