import { describe, expect, it } from 'vitest';
import { toggleDojoPracticeFocus } from './dojo-practice-focus.js';

describe('Dojo practice focus is ephemeral', () => {
  it('changes only presentation state and leaves no learning-progress fields behind', () => {
    document.body.innerHTML = '<article class="dojo-nucleus-page"><section class="dojo-practice"><button data-dojo-practice-focus aria-pressed="false">Entrar no modo prática</button></section></article>';
    const root = document.querySelector<HTMLElement>('.dojo-nucleus-page')!;
    const button = document.querySelector<HTMLButtonElement>('[data-dojo-practice-focus]')!;

    toggleDojoPracticeFocus(root, button);
    expect(root.dataset.practiceFocus).toBe('true');
    expect(button.getAttribute('aria-pressed')).toBe('true');

    for (const forbidden of ['practiceComplete', 'practiceCompleted', 'progress', 'mastery', 'xp', 'streak']) {
      expect(root.dataset[forbidden]).toBeUndefined();
    }

    toggleDojoPracticeFocus(root, button);
    expect(root.dataset.practiceFocus).toBeUndefined();
    expect(button.getAttribute('aria-pressed')).toBe('false');
  });
});
