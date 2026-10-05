import { describe, expect, it, vi } from 'vitest';
import { wireLegendFocus } from './legend-focus-wiring.js';

describe('legend focus wiring', () => {
  it('projects keyboard focus into the same runtime focus path as pointer interaction', () => {
    const root = document.createElement('nav');
    root.innerHTML = '<a href="/pt-br/principios/tai/" data-node-id="tai">TAI</a>';
    const link = root.querySelector('a')!;
    const focusNode = vi.fn();

    wireLegendFocus(root, focusNode);
    link.dispatchEvent(new FocusEvent('focus'));
    link.dispatchEvent(new PointerEvent('pointerenter'));

    expect(focusNode).toHaveBeenNthCalledWith(1, 'tai');
    expect(focusNode).toHaveBeenNthCalledWith(2, 'tai');
    expect(link.getAttribute('href')).toBe('/pt-br/principios/tai/');
  });

  it('returns the runtime to neutral when keyboard or pointer focus leaves', () => {
    const root = document.createElement('nav');
    root.innerHTML = '<a href="/pt-br/principios/fu/" data-node-id="fu">FU</a>';
    const link = root.querySelector('a')!;
    const focusNode = vi.fn();

    wireLegendFocus(root, focusNode);
    link.dispatchEvent(new FocusEvent('blur'));
    link.dispatchEvent(new PointerEvent('pointerleave'));

    expect(focusNode).toHaveBeenNthCalledWith(1, null);
    expect(focusNode).toHaveBeenNthCalledWith(2, null);
  });

  it('does not intercept activation, preserving native Enter navigation', () => {
    const root = document.createElement('nav');
    root.innerHTML = '<a href="/pt-br/fundamentos/" data-node-id="fundamentos">Fundamentos</a>';
    const link = root.querySelector('a')!;
    const focusNode = vi.fn();
    wireLegendFocus(root, focusNode);

    const keydown = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
    const notCancelled = link.dispatchEvent(keydown);

    expect(notCancelled).toBe(true);
    expect(keydown.defaultPrevented).toBe(false);
    expect(link.getAttribute('href')).toBe('/pt-br/fundamentos/');
  });
});
