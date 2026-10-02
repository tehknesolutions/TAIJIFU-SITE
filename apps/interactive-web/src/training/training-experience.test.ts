import { describe, expect, it } from 'vitest';
import type { CompositionResult } from './training-composer.js';
import type { TrainingProfile } from './training-profile.js';
import {
  advanceTrainingExperience,
  createTrainingExperience,
  reviseTaiState,
  retreatTrainingExperience,
  setCompositionResult,
} from './training-experience.js';

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

const composed: CompositionResult = {
  status: 'composed',
  items: [{ canonId: 'EX-A', label: 'A', score: 1, rationale: ['goal:mobility'] }],
};

describe('TAI → JI → FU → Feedback experience state', () => {
  it('moves forward and backward through the canonical stages', () => {
    const intro = createTrainingExperience();
    const tai = advanceTrainingExperience(intro);
    const ji = advanceTrainingExperience(reviseTaiState(tai, profile));

    expect(intro.stage).toBe('intro');
    expect(tai.stage).toBe('tai');
    expect(ji.stage).toBe('ji');
    expect(retreatTrainingExperience(ji).stage).toBe('tai');
  });

  it('does not enter FU until JI has a successful composition', () => {
    const tai = advanceTrainingExperience(createTrainingExperience());
    const ji = advanceTrainingExperience(reviseTaiState(tai, profile));

    expect(advanceTrainingExperience(ji).stage).toBe('ji');

    const withFailure = setCompositionResult(ji, {
      status: 'insufficient-metadata',
      missingCapabilities: ['exerciseSelection'],
    });
    expect(advanceTrainingExperience(withFailure).stage).toBe('ji');

    const withSession = setCompositionResult(ji, composed);
    expect(advanceTrainingExperience(withSession).stage).toBe('fu');
  });

  it('invalidates downstream JI/FU state whenever TAI input changes', () => {
    const tai = advanceTrainingExperience(createTrainingExperience());
    const ji = advanceTrainingExperience(reviseTaiState(tai, profile));
    const fu = advanceTrainingExperience(setCompositionResult(ji, composed));

    expect(fu.stage).toBe('fu');
    expect(fu.composition?.status).toBe('composed');

    const revised = reviseTaiState(fu, { ...profile, durationMinutes: 45 });

    expect(revised.stage).toBe('tai');
    expect(revised.revision).toBe(fu.revision + 1);
    expect(revised.profile?.durationMinutes).toBe(45);
    expect(revised.composition).toBeUndefined();
    expect(revised.feedback).toBeUndefined();
  });

  it('moves from FU to feedback only after a composed session exists', () => {
    const tai = advanceTrainingExperience(createTrainingExperience());
    const ji = advanceTrainingExperience(reviseTaiState(tai, profile));
    const fu = advanceTrainingExperience(setCompositionResult(ji, composed));

    expect(advanceTrainingExperience(fu).stage).toBe('feedback');
    expect(retreatTrainingExperience(advanceTrainingExperience(fu)).stage).toBe('fu');
  });
});
