import type { TrainingExperienceState } from './training-experience.js';
import type { TrainingFeedback } from './training-feedback.js';

function adjustedIntensity(current: number, perceivedEffort: number): number {
  if (perceivedEffort >= 8) return Math.max(1, current - 1);
  if (perceivedEffort <= 3) return Math.min(10, current + 1);
  return current;
}

function isTrainingFeedback(value: unknown): value is TrainingFeedback {
  if (!value || typeof value !== 'object') return false;
  const effort = (value as { perceivedEffort?: unknown }).perceivedEffort;
  return typeof effort === 'number' && Number.isFinite(effort) && effort >= 1 && effort <= 10;
}

export function prepareNextTrainingCycle(state: TrainingExperienceState): TrainingExperienceState {
  if (state.stage !== 'feedback' || !state.profile || !isTrainingFeedback(state.feedback)) return state;

  return Object.freeze({
    stage: 'tai',
    revision: state.revision + 1,
    profile: Object.freeze({
      ...state.profile,
      desiredIntensity: adjustedIntensity(state.profile.desiredIntensity, state.feedback.perceivedEffort),
    }),
  });
}
