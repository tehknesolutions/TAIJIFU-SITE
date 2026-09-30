import { describe, expect, it } from 'vitest';
import { shellLocalizationBindings } from './shell-localization.js';

const bySelector = (selector: string) => shellLocalizationBindings.find((binding) => binding.selector === selector);

describe('TAIJIFU DOM shell localization bindings', () => {
  it('classifies translatable shell separately from conceptual content', () => {
    expect(bySelector('.skip-link')?.messageId).toBe('skipLink');
    expect(bySelector('.site-header__dojo-link')?.messageId).toBe('enterDojo');
    expect(bySelector('.interactive-navigation__header .content-entry__type')?.messageId).toBe('interactiveNavigation');
    expect(shellLocalizationBindings.some((binding) => binding.selector === '.dojo-gate__maxim')).toBe(false);
    expect(shellLocalizationBindings.some((binding) => binding.selector === '.dojo-axis blockquote')).toBe(false);
  });

  it('localizes accessibility attributes through explicit bindings', () => {
    expect(bySelector('.site-brand')?.attribute).toBe('aria-label');
    expect(bySelector('#primary-navigation')?.attribute).toBe('aria-label');
    expect(bySelector('#taijifu-experience')?.attribute).toBe('aria-label');
    expect(bySelector('#interactive-node-links')?.attribute).toBe('aria-label');
  });
});
