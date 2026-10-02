import type { TrainingExperienceState } from './training-experience.js';

export type TrainingFeedbackInput = Readonly<{
  perceivedEffort?: number;
  note?: string;
}>;

export type TrainingFeedback = Readonly<{
  perceivedEffort: number;
  note?: string;
}>;

export type TrainingFeedbackError = Readonly<{
  field: 'perceivedEffort';
  code: 'out-of-range';
}>;

export type TrainingFeedbackValidation =
  | Readonly<{ valid: true; feedback: TrainingFeedback }>
  | Readonly<{ valid: false; errors: readonly TrainingFeedbackError[] }>;

export function normalizeTrainingFeedback(input: TrainingFeedbackInput): TrainingFeedbackValidation {
  if (
    !Number.isFinite(input.perceivedEffort) ||
    (input.perceivedEffort ?? 0) < 1 ||
    (input.perceivedEffort ?? 0) > 10
  ) {
    return Object.freeze({
      valid: false,
      errors: Object.freeze([{ field: 'perceivedEffort', code: 'out-of-range' }]),
    });
  }

  const note = input.note?.trim();
  return Object.freeze({
    valid: true,
    feedback: Object.freeze({
      perceivedEffort: input.perceivedEffort!,
      ...(note ? { note } : {}),
    }),
  });
}

export function applyTrainingFeedback(
  state: TrainingExperienceState,
  feedback: TrainingFeedback,
): TrainingExperienceState {
  if (state.stage !== 'fu' || state.composition?.status !== 'composed') return state;

  return Object.freeze({
    ...state,
    stage: 'feedback',
    feedback,
  });
}
