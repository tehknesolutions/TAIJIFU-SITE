import { describe, expect, it } from 'vitest';
import type { TrainingExperienceState } from './training-experience.js';
import {
  applyTrainingFeedback,
  normalizeTrainingFeedback,
  type TrainingFeedback,
} from './training-feedback.js';

const fuState: TrainingExperienceState = {
  stage: 'fu',
  revision: 2,
  profile: {
    primaryGoal: 'mobility',
    secondaryGoals: [],
    preferredPractices: [],
    rejectedMovements: [],
    targetCapacities: [],
    equipment: [],
    durationMinutes: 30,
    desiredIntensity: 5,
    declaredRestrictions: [],
  },
  composition: {
    status: 'composed',
    items: [{ canonId: 'EX-A', label: 'A', score: 1, rationale: ['goal:mobility'] }],
  },
};

describe('training feedback', () => {
  it('normalizes bounded perceived effort and optional note', () => {
    expect(normalizeTrainingFeedback({ perceivedEffort: 7, note: '  fluido  ' })).toEqual({
      valid: true,
      feedback: { perceivedEffort: 7, note: 'fluido' },
    });
  });

  it('rejects effort outside the 1–10 scale', () => {
    expect(normalizeTrainingFeedback({ perceivedEffort: 11 })).toEqual({
      valid: false,
      errors: [{ field: 'perceivedEffort', code: 'out-of-range' }],
    });
  });

  it('accepts feedback only after FU and advances to feedback stage', () => {
    const feedback: TrainingFeedback = { perceivedEffort: 8, note: 'intenso' };
    const next = applyTrainingFeedback(fuState, feedback);

    expect(next.stage).toBe('feedback');
    expect(next.feedback).toEqual(feedback);
    expect(next.revision).toBe(fuState.revision);
  });

  it('does not mutate a state that has not reached FU', () => {
    const jiState: TrainingExperienceState = { ...fuState, stage: 'ji' };
    expect(applyTrainingFeedback(jiState, { perceivedEffort: 5 })).toBe(jiState);
  });

  it('keeps feedback local and serializable without account or network identity', () => {
    const next = applyTrainingFeedback(fuState, { perceivedEffort: 6, note: 'ok' });
    const serialized = JSON.stringify(next.feedback);

    expect(serialized).toContain('perceivedEffort');
    expect(serialized).not.toContain('userId');
    expect(serialized).not.toContain('email');
    expect(serialized).not.toContain('account');
  });
});
