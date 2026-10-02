import type { TrainingExperienceState } from './training-experience.js';
import { applyTrainingFeedback, normalizeTrainingFeedback } from './training-feedback.js';

export function mountTrainingFeedback(
  root: HTMLElement,
  getTrainingState: () => TrainingExperienceState,
) {
  const form = root.querySelector<HTMLFormElement>('[data-training-feedback-form]');
  const status = root.querySelector<HTMLElement>('[data-training-feedback-status]');
  let state = getTrainingState();

  const onSubmit = (event: Event) => {
    event.preventDefault();
    if (!form) return;

    state = getTrainingState();
    const effortField = form.elements.namedItem('perceivedEffort');
    const noteField = form.elements.namedItem('note');
    const perceivedEffort = effortField instanceof HTMLInputElement ? Number(effortField.value) : undefined;
    const note = noteField instanceof HTMLTextAreaElement ? noteField.value : undefined;
    const normalized = normalizeTrainingFeedback({ perceivedEffort, note });

    if (!normalized.valid) {
      if (status) status.textContent = 'Informe um esforço percebido de 1 a 10.';
      return;
    }

    const next = applyTrainingFeedback(state, normalized.feedback);
    if (next === state) {
      if (status) status.textContent = 'O feedback fica disponível depois de uma manifestação FU válida.';
      return;
    }

    state = next;
    if (status) status.textContent = 'Feedback registrado localmente para orientar a próxima adaptação.';
  };

  form?.addEventListener('submit', onSubmit);

  return Object.freeze({
    getState: () => state,
    dispose: () => form?.removeEventListener('submit', onSubmit),
  });
}
