import { describe, expect, it } from 'vitest';
import { BoxGeometry, Mesh, MeshStandardMaterial, Object3D, PerspectiveCamera } from 'three';
import { applyProjectedFocus, describeProjectedFocus } from './three-focus.js';

function materialNode(id: string, x: number): Mesh {
  const material = new MeshStandardMaterial({ color: 0xe9e0cf, emissive: 0xe9e0cf, emissiveIntensity: 0.05, opacity: 1, transparent: true });
  const node = new Mesh(new BoxGeometry(1, 1, 1), material);
  node.position.set(x, 0, 0);
  node.userData = { nodeId: id, label: id.toUpperCase(), canonicalUrl: `/${id}/`, baseZ: 0, baseEmissiveIntensity: 0.05, baseOpacity: 1 };
  return node;
}

describe('Three projected focus', () => {
  it('describes only canonical projected nodes', () => {
    const node = new Object3D(); node.userData = { nodeId: 'tai', label: 'TAI', canonicalUrl: '/principios/tai/' };
    expect(describeProjectedFocus(node)).toEqual({ nodeId: 'tai', label: 'TAI', canonicalUrl: '/principios/tai/' }); expect(describeProjectedFocus(new Object3D())).toBeNull();
  });
  it('focuses one node with strong hierarchy and restores geometry and material without changing canonical metadata', () => {
    const camera = new PerspectiveCamera(); camera.position.set(0, 0, 8.5); const tai = materialNode('tai', 3); tai.userData.canonicalUrl='/principios/tai/'; const manifesto = materialNode('manifesto', -3); manifesto.userData.canonicalUrl='/manifesto/';
    applyProjectedFocus([tai, manifesto], tai, camera);
    expect(tai.scale.x).toBeCloseTo(1.18); expect(tai.position.z).toBeCloseTo(0.36); expect(tai.userData.focusState).toBe('focused'); expect(manifesto.scale.x).toBeCloseTo(0.88); expect(manifesto.userData.focusState).toBe('receded'); expect(tai.userData.canonicalUrl).toBe('/principios/tai/'); expect(camera.position.x).toBeGreaterThan(0);
    const taiMaterial=tai.material as MeshStandardMaterial; const manifestoMaterial=manifesto.material as MeshStandardMaterial;
    expect(taiMaterial.emissiveIntensity).toBeCloseTo(0.28); expect(taiMaterial.opacity).toBe(1); expect(manifestoMaterial.emissiveIntensity).toBeCloseTo(0.02); expect(manifestoMaterial.opacity).toBeCloseTo(0.42);
    applyProjectedFocus([tai, manifesto], null, camera);
    expect(tai.scale.x).toBe(1); expect(tai.position.z).toBe(0); expect(tai.userData.focusState).toBe('neutral'); expect(manifesto.scale.x).toBe(1); expect(manifesto.userData.focusState).toBe('neutral'); expect(camera.position.x).toBe(0); expect(taiMaterial.emissiveIntensity).toBeCloseTo(0.05); expect(taiMaterial.opacity).toBe(1); expect(manifestoMaterial.emissiveIntensity).toBeCloseTo(0.05); expect(manifestoMaterial.opacity).toBe(1);
  });
  it('keeps the camera anchored when reduced motion is requested while retaining material hierarchy', () => {
    const camera=new PerspectiveCamera(); camera.position.set(0,0,8.5); const node=materialNode('tai',3); node.position.y=2; applyProjectedFocus([node],node,camera,true); expect(camera.position.x).toBe(0); expect(camera.position.y).toBe(0); expect(node.scale.x).toBeCloseTo(1.18); expect(node.userData.focusState).toBe('focused'); expect((node.material as MeshStandardMaterial).emissiveIntensity).toBeCloseTo(0.28);
  });
});
