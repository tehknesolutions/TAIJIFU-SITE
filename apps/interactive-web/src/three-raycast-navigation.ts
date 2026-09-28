import { Raycaster, Vector2, type Camera, type Object3D } from 'three';
import { resolveCanonicalNavigation, type CanonicalNavigation } from './three-navigation.js';

export type NormalizedPointer = Readonly<{ x: number; y: number }>;

export function pickProjectedNode(
  pointer: NormalizedPointer,
  camera: Camera,
  nodes: readonly Object3D[],
): Object3D | null {
  const raycaster = new Raycaster();
  raycaster.setFromCamera(new Vector2(pointer.x, pointer.y), camera);
  const [hit] = raycaster.intersectObjects([...nodes], false);

  return hit?.object ?? null;
}

export function pickCanonicalNavigation(
  pointer: NormalizedPointer,
  camera: Camera,
  nodes: readonly Object3D[],
): CanonicalNavigation | null {
  const selected = pickProjectedNode(pointer, camera, nodes);
  return selected ? resolveCanonicalNavigation(selected) : null;
}
