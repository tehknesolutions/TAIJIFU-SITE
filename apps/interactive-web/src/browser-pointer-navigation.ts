import type { Camera, Object3D } from 'three';
import { pickCanonicalNavigation } from './three-raycast-navigation.js';
import type { CanonicalNavigation } from './three-navigation.js';

export type PointerCoordinates = Readonly<{ clientX: number; clientY: number }>;
export type PointerBounds = Readonly<{ left: number; top: number; width: number; height: number }>;

export function handleCanonicalPointerNavigation(
  pointer: PointerCoordinates,
  bounds: PointerBounds,
  camera: Camera,
  nodes: readonly Object3D[],
  navigate: (canonicalUrl: string) => void,
): CanonicalNavigation | null {
  if (bounds.width <= 0 || bounds.height <= 0) return null;

  const navigation = pickCanonicalNavigation(
    {
      x: ((pointer.clientX - bounds.left) / bounds.width) * 2 - 1,
      y: -((pointer.clientY - bounds.top) / bounds.height) * 2 + 1,
    },
    camera,
    nodes,
  );

  if (navigation) navigate(navigation.canonicalUrl);
  return navigation;
}