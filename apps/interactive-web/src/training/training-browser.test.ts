import { describe, expect, it, vi } from 'vitest';
import { mountTrainingExperience } from './training-browser.js';

function createRoot(): HTMLElement {
  const root = document.createElement('section');
  root.setAttribute('data-training-root', '');
  root.innerHTML = `
    <form data-training-form>
      <input name="primaryGoal" value="mobility">
      <input name="durationMinutes" value="30">
      <input name="desiredIntensity" value="5">
      <button type="submit">Compor</button>
    </form>
    <p data-training-status aria-live="polite"></p>
    <form data-training-feedback-form>
      <input name="perceivedEffort" value="7">
      <textarea name="note">fluido</textarea>
      <button type="submit">Registrar</button>
    </form>
    <p data-training-feedback-status aria-live="polite"></p>`;
  return root;
}

describe('mountTrainingExperience', () => {
  it('collects TAI values and reports the current CANON metadata limitation through JI', () => {
    const root = createRoot();
    const mounted = mountTrainingExperience(root);
    root.querySelector<HTMLFormElement>('[data-training-form]')?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(mounted.getState().stage).toBe('ji');
    expect(mounted.getState().profile?.primaryGoal).toBe('mobility');
    expect(mounted.getState().composition?.status).toBe('insufficient-metadata');
    expect(root.querySelector('[data-training-status]')?.textContent).toContain('CANON');
  });

  it('shares the current training state with feedback and disposes both lifecycles', () => {
    const root = createRoot();
    const feedbackDispose = vi.fn();
    const feedbackGetState = vi.fn();
    const mountFeedback = vi.fn((_root, getState) => {
      expect(getState()).toBeDefined();
      return { getState: feedbackGetState, dispose: feedbackDispose };
    });
    const mounted = mountTrainingExperience(root, { mountFeedback });
    expect(mountFeedback).toHaveBeenCalledOnce();
    mounted.dispose();
    expect(feedbackDispose).toHaveBeenCalledOnce();
  });

  it('does not require fetch or any network request to compose', () => {
    const root = createRoot();
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const mounted = mountTrainingExperience(root);
    root.querySelector<HTMLFormElement>('[data-training-form]')?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(fetchSpy).not.toHaveBeenCalled();
    mounted.dispose();
    fetchSpy.mockRestore();
  });

  it('keeps invalid TAI input in TAI and exposes a validation status', () => {
    const root = createRoot();
    (root.querySelector('[name="primaryGoal"]') as HTMLInputElement).value = '   ';
    const mounted = mountTrainingExperience(root);
    root.querySelector<HTMLFormElement>('[data-training-form]')?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(mounted.getState().stage).toBe('tai');
    expect(mounted.getState().composition).toBeUndefined();
    expect(root.querySelector('[data-training-status]')?.textContent).toContain('objetivo');
  });

  it('removes its event listener on dispose', () => {
    const root = createRoot();
    const mounted = mountTrainingExperience(root);
    mounted.dispose();
    root.querySelector<HTMLFormElement>('[data-training-form]')?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(mounted.getState().stage).toBe('tai');
  });
});
