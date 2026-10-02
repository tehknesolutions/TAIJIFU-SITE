import { describe, expect, it } from 'vitest';
import { canonCurriculumEntities, getCanonEntity } from '../content/canon-snapshot.js';
import { buildTrainingCatalog } from './training-catalog.js';

describe('buildTrainingCatalog', () => {
  it('exposes only candidates backed by stable canonical repository IDs', () => {
    const catalog = buildTrainingCatalog();

    expect(catalog.releaseId).toBe('TAIJIFU-CANON-1.0');
    expect(catalog.candidates).toHaveLength(canonCurriculumEntities.length);

    for (const candidate of catalog.candidates) {
      expect(candidate.canonId).toBeTruthy();
      expect(getCanonEntity(candidate.canonId)).not.toBeNull();
    }
  });

  it('preserves canonical kind, label and parent provenance', () => {
    const catalog = buildTrainingCatalog();
    const path = catalog.candidates.find((candidate) => candidate.kind === 'path');

    expect(path).toBeDefined();
    expect(path?.label).toContain('·');
    expect(path?.parentCanonId).toMatch(/^BELT-/);
  });

  it('does not synthesize exercise, dosage, rest, equipment, goal or safety metadata absent from CANON', () => {
    const catalog = buildTrainingCatalog();

    for (const candidate of catalog.candidates) {
      expect(candidate.exercise).toBeUndefined();
      expect(candidate.dosage).toBeUndefined();
      expect(candidate.rest).toBeUndefined();
      expect(candidate.equipment).toBeUndefined();
      expect(candidate.goals).toBeUndefined();
      expect(candidate.safetyRestrictions).toBeUndefined();
    }
  });

  it('marks composition metadata as unavailable when the snapshot cannot support it', () => {
    const catalog = buildTrainingCatalog();

    expect(catalog.capabilities).toEqual({
      exerciseSelection: false,
      dosage: false,
      rest: false,
      equipmentFiltering: false,
      goalScoring: false,
      safetyFiltering: false,
    });
  });
});
