import { describe, expect, it } from 'vitest';
import { mountTrainingFeedback } from './training-feedback-browser.js';
import type { TrainingExperienceState } from './training-experience.js';

const fuState: TrainingExperienceState = {
  stage: 'fu', revision: 1,
  profile: { primaryGoal: 'mobility', secondaryGoals: [], preferredPractices: [], rejectedMovements: [], targetCapacities: [], equipment: [], durationMinutes: 30, desiredIntensity: 5, declaredRestrictions: [] },
  composition: { status: 'composed', items: [{ canonId: 'EX-A', label: 'A', score: 1, rationale: ['goal:mobility'] }] },
};

function root(): HTMLElement {
  const element = document.createElement('section');
  element.innerHTML = `<form data-training-feedback-form><input name="perceivedEffort" value="7"><textarea name="note"> fluido </textarea><button>Registrar</button></form><p data-training-feedback-status aria-live="polite"></p>`;
  return element;
}

describe('mountTrainingFeedback', () => {
  it('captures local feedback after FU and returns feedback state', () => {
    const element = root();
    const mounted = mountTrainingFeedback(element, () => fuState);
    element.querySelector('form')?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(mounted.getState().stage).toBe('feedback');
    expect(mounted.getState().feedback).toEqual({ perceivedEffort: 7, note: 'fluido' });
    expect(element.querySelector('[data-training-feedback-status]')?.textContent).toContain('registrado');
  });

  it('keeps FU unchanged when feedback is invalid', () => {
    const element = root();
    (element.querySelector('[name="perceivedEffort"]') as HTMLInputElement).value = '11';
    const mounted = mountTrainingFeedback(element, () => fuState);
    element.querySelector('form')?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(mounted.getState()).toBe(fuState);
    expect(element.querySelector('[data-training-feedback-status]')?.textContent).toContain('1 a 10');
  });

  it('removes its listener on dispose', () => {
    const element = root();
    const mounted = mountTrainingFeedback(element, () => fuState);
    mounted.dispose();
    element.querySelector('form')?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(mounted.getState()).toBe(fuState);
  });
});
