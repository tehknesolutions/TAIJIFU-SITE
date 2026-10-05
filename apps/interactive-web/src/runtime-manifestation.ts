import {
  createManifestationAdapter,
  type Manifestation,
  type ManifestationState,
} from './manifestation-adapter.js';
import type { SpatialProjection } from './spatial-projection.js';

export type RuntimeManifestation = Readonly<{
  projection: SpatialProjection;
  current(): Manifestation;
  update(state: ManifestationState): Manifestation;
}>;

export function createRuntimeManifestation(
  projection: SpatialProjection,
  initialState?: ManifestationState,
): RuntimeManifestation {
  const adapter = createManifestationAdapter();
  let manifestation = adapter.manifest(projection, initialState);

  return Object.freeze({
    projection,
    current() {
      return manifestation;
    },
    update(state) {
      manifestation = adapter.manifest(projection, state);
      return manifestation;
    },
  });
}
