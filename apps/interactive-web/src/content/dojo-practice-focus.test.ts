import { describe, expect, it } from 'vitest';
import { toggleDojoPracticeFocus, wireDojoPracticeFocus } from './dojo-practice-focus.js';

describe('Dojo practice focus', () => {
  it('enters and exits focus without creating progress state', () => {
    document.body.innerHTML = '<article class="dojo-nucleus-page"><section class="dojo-practice"><button data-dojo-practice-focus aria-pressed="false">PRATICAR ESTE NÚCLEO</button></section></article>';
    const root = document.querySelector<HTMLElement>('.dojo-nucleus-page')!;
    const button = document.querySelector<HTMLButtonElement>('[data-dojo-practice-focus]')!;
    toggleDojoPracticeFocus(root, button);
    expect(root.dataset.practiceFocus).toBe('true');
    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(button.textContent).toBe('SAIR DO MODO PRÁTICA');
    expect(root.dataset.practiceComplete).toBeUndefined();
    toggleDojoPracticeFocus(root, button);
    expect(root.dataset.practiceFocus).toBeUndefined();
    expect(button.getAttribute('aria-pressed')).toBe('false');
    expect(button.textContent).toBe('PRATICAR ESTE NÚCLEO');
  });

  it('exits practice focus with Escape and returns focus to the action', () => {
    document.body.innerHTML = '<article class="dojo-nucleus-page"><section class="dojo-practice"><button data-dojo-practice-focus aria-pressed="false">PRATICAR ESTE NÚCLEO</button></section></article>';
    const root = document.querySelector<HTMLElement>('.dojo-nucleus-page')!;
    const button = document.querySelector<HTMLButtonElement>('[data-dojo-practice-focus]')!;
    wireDojoPracticeFocus(document);
    button.click();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(root.dataset.practiceFocus).toBeUndefined();
    expect(button.getAttribute('aria-pressed')).toBe('false');
    expect(button.textContent).toBe('PRATICAR ESTE NÚCLEO');
    expect(document.activeElement).toBe(button);
  });
});
