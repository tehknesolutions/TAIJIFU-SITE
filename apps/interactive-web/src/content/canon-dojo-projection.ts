import { canonSnapshot, type CanonNucleus } from './canon-snapshot.js';
import {
  getLegacyInstructionalProjection,
  type LegacyInstructionalItem,
} from './legacy-instructional-corpus.js';

export type CanonDojoNucleus = Readonly<{
  nucleus: CanonNucleus;
  instructional: LegacyInstructionalItem;
  authority: 'canon-entity-plus-legacy-candidate-instruction';
}>;

export function getDojoNucleus(nucleusId: string): CanonDojoNucleus | null {
  const projection = getLegacyInstructionalProjection(nucleusId);
  if (!projection) return null;

  return Object.freeze({
    nucleus: projection.nucleus,
    instructional: projection.instructional,
    authority: 'canon-entity-plus-legacy-candidate-instruction',
  });
}

export function getDojoNuclei(): readonly CanonDojoNucleus[] {
  return Object.freeze(
    canonSnapshot.nuclei.map((nucleus) => getDojoNucleus(nucleus.id)!),
  );
}

export function getDojoNucleiByPath(pathId: string): readonly CanonDojoNucleus[] {
  const path = canonSnapshot.paths.find((candidate) => candidate.id === pathId);
  if (!path) return Object.freeze([]);

  return Object.freeze(path.nucleusIds.map((id) => getDojoNucleus(id)!));
}
