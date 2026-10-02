import { buildTrainingCatalog } from './training-catalog.js';
import { composeTraining } from './training-composer.js';
import {
  advanceTrainingExperience,
  createTrainingExperience,
  reviseTaiState,
  setCompositionResult,
  type TrainingExperienceState,
} from './training-experience.js';
import { normalizeTrainingProfile, type TrainingProfileInput } from './training-profile.js';

function readNumber(form: HTMLFormElement, name: string): number | undefined {
  const field = form.elements.namedItem(name);
  if (!(field instanceof HTMLInputElement)) return undefined;
  const value = Number(field.value);
  return Number.isFinite(value) ? value : undefined;
}

function readText(form: HTMLFormElement, name: string): string | undefined {
  const field = form.elements.namedItem(name);
  if (!(field instanceof HTMLInputElement)) return undefined;
  return field.value;
}

function readTaiInput(form: HTMLFormElement): TrainingProfileInput {
  return {
    primaryGoal: readText(form, 'primaryGoal'),
    durationMinutes: readNumber(form, 'durationMinutes'),
    desiredIntensity: readNumber(form, 'desiredIntensity'),
  };
}

function statusMessage(state: TrainingExperienceState): string {
  if (state.composition?.status === 'insufficient-metadata') {
    return 'O CANON atual ainda não possui metadados suficientes para manifestar uma sessão concreta sem inventar conteúdo.';
  }
  if (state.composition?.status === 'no-compatible-candidates') {
    return 'Nenhuma prática compatível foi encontrada para este estado TAI.';
  }
  if (state.composition?.status === 'composed') {
    return 'FU manifestado a partir dos dados canônicos disponíveis.';
  }
  return 'Revise o estado TAI antes de continuar.';
}

export function mountTrainingExperience(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>('[data-training-form]');
  const status = root.querySelector<HTMLElement>('[data-training-status]');
  let state = advanceTrainingExperience(createTrainingExperience());

  const onSubmit = (event: Event) => {
    event.preventDefault();
    if (!form) return;

    const normalized = normalizeTrainingProfile(readTaiInput(form));
    if (!normalized.valid) {
      state = { ...state, stage: 'tai', composition: undefined };
      if (status) status.textContent = normalized.errors.some((error) => error.field === 'primaryGoal')
        ? 'Informe um objetivo principal para definir o estado TAI.'
        : 'Revise os valores do estado TAI antes de continuar.';
      return;
    }

    state = reviseTaiState(state, normalized.profile);
    state = advanceTrainingExperience(state);
    const composition = composeTraining(normalized.profile, buildTrainingCatalog());
    state = setCompositionResult(state, composition);
    if (status) status.textContent = statusMessage(state);
  };

  form?.addEventListener('submit', onSubmit);

  return Object.freeze({
    getState: () => state,
    dispose: () => form?.removeEventListener('submit', onSubmit),
  });
}
