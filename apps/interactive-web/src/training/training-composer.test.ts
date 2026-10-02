import { describe, expect, it } from 'vitest';
import type { TrainingCatalog, TrainingCandidate } from './training-catalog.js';
import { buildTrainingCatalog } from './training-catalog.js';
import type { TrainingProfile } from './training-profile.js';
import { composeTraining } from './training-composer.js';

const profile: TrainingProfile = {
  primaryGoal: 'mobility',
  secondaryGoals: [],
  preferredPractices: [],
  rejectedMovements: [],
  targetCapacities: [],
  equipment: [],
  durationMinutes: 30,
  desiredIntensity: 5,
  declaredRestrictions: [],
};

function catalogWith(candidates: readonly TrainingCandidate[], capabilities: TrainingCatalog['capabilities']): TrainingCatalog {
  return Object.freeze({ releaseId: 'TEST-CANON', candidates, capabilities });
}

describe('composeTraining', () => {
  it('returns insufficient-metadata for the current official CANON instead of inventing a workout', () => {
    const result = composeTraining(profile, buildTrainingCatalog());

    expect(result).toEqual({
      status: 'insufficient-metadata',
      missingCapabilities: [
        'exerciseSelection',
        'dosage',
        'rest',
        'goalScoring',
      ],
    });
  });

  it('filters an explicit safety conflict when catalog metadata supports safety filtering', () => {
    const safe = {
      canonId: 'EX-A', label: 'A', kind: 'nucleus', order: 1,
      goals: ['mobility'], safetyRestrictions: [], dosage: '5 min', rest: '30 sec', exercise: 'A',
    } as unknown as TrainingCandidate;
    const conflict = {
      canonId: 'EX-B', label: 'B', kind: 'nucleus', order: 2,
      goals: ['mobility'], safetyRestrictions: ['no-impact'], dosage: '5 min', rest: '30 sec', exercise: 'B',
    } as unknown as TrainingCandidate;
    const supported = {
      exerciseSelection: true, dosage: true, rest: true,
      equipmentFiltering: false, goalScoring: true, safetyFiltering: true,
    } as unknown as TrainingCatalog['capabilities'];

    const result = composeTraining({ ...profile, declaredRestrictions: ['no-impact'] }, catalogWith([conflict, safe], supported));

    expect(result.status).toBe('composed');
    if (result.status !== 'composed') return;
    expect(result.items.map((item) => item.canonId)).toEqual(['EX-A']);
  });

  it('uses stable canonical IDs to break equal scores and remains deterministic', () => {
    const candidateB = {
      canonId: 'EX-B', label: 'B', kind: 'nucleus', order: 1,
      goals: ['mobility'], dosage: '5 min', rest: '30 sec', exercise: 'B',
    } as unknown as TrainingCandidate;
    const candidateA = {
      canonId: 'EX-A', label: 'A', kind: 'nucleus', order: 2,
      goals: ['mobility'], dosage: '5 min', rest: '30 sec', exercise: 'A',
    } as unknown as TrainingCandidate;
    const supported = {
      exerciseSelection: true, dosage: true, rest: true,
      equipmentFiltering: false, goalScoring: true, safetyFiltering: false,
    } as unknown as TrainingCatalog['capabilities'];
    const catalog = catalogWith([candidateB, candidateA], supported);

    const first = composeTraining(profile, catalog);
    const second = composeTraining(profile, catalog);

    expect(first).toEqual(second);
    expect(first.status).toBe('composed');
    if (first.status !== 'composed') return;
    expect(first.items.map((item) => item.canonId)).toEqual(['EX-A', 'EX-B']);
  });

  it('returns no-compatible-candidates when supported filtering removes every candidate', () => {
    const conflict = {
      canonId: 'EX-A', label: 'A', kind: 'nucleus', order: 1,
      goals: ['mobility'], safetyRestrictions: ['no-impact'], dosage: '5 min', rest: '30 sec', exercise: 'A',
    } as unknown as TrainingCandidate;
    const supported = {
      exerciseSelection: true, dosage: true, rest: true,
      equipmentFiltering: false, goalScoring: true, safetyFiltering: true,
    } as unknown as TrainingCatalog['capabilities'];

    expect(composeTraining({ ...profile, declaredRestrictions: ['no-impact'] }, catalogWith([conflict], supported))).toEqual({
      status: 'no-compatible-candidates',
    });
  });
});
