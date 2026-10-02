import {
  canonCurriculumEntities,
  canonSnapshot,
  type CanonCurriculumEntity,
} from '../content/canon-snapshot.js';

export type TrainingCandidate = Readonly<{
  canonId: string;
  label: string;
  kind: CanonCurriculumEntity['kind'];
  parentCanonId?: string;
  order: number;
  exercise?: never;
  dosage?: never;
  rest?: never;
  equipment?: never;
  goals?: never;
  safetyRestrictions?: never;
}>;

export type TrainingCatalogCapabilities = Readonly<{
  exerciseSelection: false;
  dosage: false;
  rest: false;
  equipmentFiltering: false;
  goalScoring: false;
  safetyFiltering: false;
}>;

export type TrainingCatalog = Readonly<{
  releaseId: string;
  candidates: readonly TrainingCandidate[];
  capabilities: TrainingCatalogCapabilities;
}>;

const unavailableCapabilities: TrainingCatalogCapabilities = Object.freeze({
  exerciseSelection: false,
  dosage: false,
  rest: false,
  equipmentFiltering: false,
  goalScoring: false,
  safetyFiltering: false,
});

export function buildTrainingCatalog(): TrainingCatalog {
  const candidates = canonCurriculumEntities.map((entity) =>
    Object.freeze({
      canonId: entity.id,
      label: entity.label,
      kind: entity.kind,
      parentCanonId: entity.parentId,
      order: entity.order,
    }),
  );

  return Object.freeze({
    releaseId: canonSnapshot.release.id,
    candidates: Object.freeze(candidates),
    capabilities: unavailableCapabilities,
  });
}
