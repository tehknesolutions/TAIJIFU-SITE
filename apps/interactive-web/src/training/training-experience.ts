import type { CompositionResult } from './training-composer.js';
import type { TrainingProfile } from './training-profile.js';

export type TrainingStage = 'intro' | 'tai' | 'ji' | 'fu' | 'feedback';

export type TrainingExperienceState = Readonly<{
  stage: TrainingStage;
  revision: number;
  profile?: TrainingProfile;
  composition?: CompositionResult;
  feedback?: unknown;
}>;

export function createTrainingExperience(): TrainingExperienceState {
  return Object.freeze({ stage: 'intro', revision: 0 });
}

export function reviseTaiState(
  state: TrainingExperienceState,
  profile: TrainingProfile,
): TrainingExperienceState {
  return Object.freeze({
    stage: 'tai',
    revision: state.revision + 1,
    profile,
  });
}

export function setCompositionResult(
  state: TrainingExperienceState,
  composition: CompositionResult,
): TrainingExperienceState {
  if (state.stage !== 'ji' || !state.profile) return state;

  return Object.freeze({
    stage: 'ji',
    revision: state.revision,
    profile: state.profile,
    composition,
  });
}

export function advanceTrainingExperience(state: TrainingExperienceState): TrainingExperienceState {
  if (state.stage === 'intro') {
    return Object.freeze({ ...state, stage: 'tai' });
  }

  if (state.stage === 'tai' && state.profile) {
    return Object.freeze({ ...state, stage: 'ji' });
  }

  if (state.stage === 'ji' && state.composition?.status === 'composed') {
    return Object.freeze({ ...state, stage: 'fu' });
  }

  if (state.stage === 'fu' && state.composition?.status === 'composed') {
    return Object.freeze({ ...state, stage: 'feedback' });
  }

  return state;
}

export function retreatTrainingExperience(state: TrainingExperienceState): TrainingExperienceState {
  if (state.stage === 'feedback') return Object.freeze({ ...state, stage: 'fu' });
  if (state.stage === 'fu') return Object.freeze({ ...state, stage: 'ji' });
  if (state.stage === 'ji') return Object.freeze({ ...state, stage: 'tai' });
  if (state.stage === 'tai') return Object.freeze({ ...state, stage: 'intro' });
  return state;
}
