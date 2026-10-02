import { describe, expect, it } from 'vitest';
import { normalizeTrainingProfile } from './training-profile.js';

describe('normalizeTrainingProfile', () => {
  const validInput = {
    ageRange: 'adult',
    experience: 'beginner',
    primaryGoal: '  mobility  ',
    secondaryGoals: ['strength', ' strength ', ''],
    preferredPractices: ['solo', ' solo '],
    rejectedMovements: ['jumping', ' jumping '],
    targetCapacities: ['balance'],
    equipment: ['mat'],
    space: 'small',
    durationMinutes: 30,
    frequencyPerWeek: 3,
    desiredIntensity: 5,
    declaredRestrictions: ['no impact'],
    readiness: 4,
  };

  it('normalizes text collections and preserves canonical session fields', () => {
    const result = normalizeTrainingProfile(validInput);

    expect(result.valid).toBe(true);
    if (!result.valid) return;

    expect(result.profile.primaryGoal).toBe('mobility');
    expect(result.profile.secondaryGoals).toEqual(['strength']);
    expect(result.profile.preferredPractices).toEqual(['solo']);
    expect(result.profile.rejectedMovements).toEqual(['jumping']);
    expect(result.profile.durationMinutes).toBe(30);
    expect(result.profile.desiredIntensity).toBe(5);
    expect(result.profile.readiness).toBe(4);
  });

  it('allows readiness to remain optional', () => {
    const { readiness: _readiness, ...input } = validInput;
    const result = normalizeTrainingProfile(input);

    expect(result.valid).toBe(true);
    if (!result.valid) return;
    expect(result.profile.readiness).toBeUndefined();
  });

  it('rejects a blank primary session intent', () => {
    const result = normalizeTrainingProfile({ ...validInput, primaryGoal: '   ' });

    expect(result).toEqual({
      valid: false,
      errors: [{ field: 'primaryGoal', code: 'required' }],
    });
  });

  it('rejects duration and intensity outside supported bounds', () => {
    const result = normalizeTrainingProfile({
      ...validInput,
      durationMinutes: 0,
      desiredIntensity: 11,
    });

    expect(result).toEqual({
      valid: false,
      errors: [
        { field: 'durationMinutes', code: 'out-of-range' },
        { field: 'desiredIntensity', code: 'out-of-range' },
      ],
    });
  });
});
