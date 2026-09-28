import type { Object3D } from 'three';

export type CanonicalNavigation = Readonly<{
  nodeId: string;
  canonicalUrl: string;
}>;

export function resolveCanonicalNavigation(
  selected: Object3D,
): CanonicalNavigation | null {
  const { nodeId, canonicalUrl } = selected.userData;

  if (typeof nodeId !== 'string' || typeof canonicalUrl !== 'string') {
    return null;
  }

  return Object.freeze({ nodeId, canonicalUrl });
}