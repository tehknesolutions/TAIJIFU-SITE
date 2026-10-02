import { describe, expect, it } from 'vitest';
import type { TrainingExperienceState } from './training-experience.js';
import { prepareNextTrainingCycle } from './training-adaptation.js';

const feedbackState: TrainingExperienceState = {
  stage: 'feedback',
  revision: 3,
  profile: {
    primaryGoal: 'mobility',
    secondaryGoals: [],
    preferredPractices: [],
    rejectedMovements: [],
    targetCapacities: [],
    equipment: [],
    durationMinutes: 30,
    desiredIntensity: 7,
    declaredRestrictions: [],
  },
  composition: {
    status: 'composed',
    items: [{ canonId: 'EX-A', label: 'A', score: 1, rationale: ['goal:mobility'] }],
  },
  feedback: { perceivedEffort: 9, note: 'intenso' },
};

describe('prepareNextTrainingCycle', () => {
  it('returns to TAI with a conservative intensity adjustment after high effort', () => {
    const next = prepareNextTrainingCycle(feedbackState);
    expect(next.stage).toBe('tai');
    expect(next.revision).toBe(4);
    expect(next.profile?.desiredIntensity).toBe(6);
    expect(next.composition).toBeUndefined();
    expect(next.feedback).toBeUndefined();
  });

  it('raises desired intensity by one after clearly low effort', () => {
    const next = prepareNextTrainingCycle({
      ...feedbackState,
      profile: { ...feedbackState.profile!, desiredIntensity: 4 },
      feedback: { perceivedEffort: 2 },
    });
    expect(next.profile?.desiredIntensity).toBe(5);
  });

  it('keeps desired intensity stable for moderate effort', () => {
    const next = prepareNextTrainingCycle({
      ...feedbackState,
      feedback: { perceivedEffort: 6 },
    });
    expect(next.profile?.desiredIntensity).toBe(7);
  });

  it('does nothing before feedback exists', () => {
    const fu = { ...feedbackState, stage: 'fu', feedback: undefined } as TrainingExperienceState;
    expect(prepareNextTrainingCycle(fu)).toBe(fu);
  });
});
