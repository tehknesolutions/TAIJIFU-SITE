import { describe, expect, it } from 'vitest';
import { navigationViewModel } from './navigation-view-model.js';

describe('navigationViewModel', () => {
  it('exposes renderable pt-BR navigation without UI-owned editorial copy', () => {
    const items = navigationViewModel('pt-BR');

    expect(items).toHaveLength(7);
    expect(items[0]).toEqual({
      id: 'manifesto',
      href: '/manifesto',
      label: 'Manifesto',
      availability: 'ready',
    });
    expect(items.every((item) => item.label !== null && item.availability === 'ready')).toBe(true);
  });

  it.each(['en', 'es'] as const)('does not silently fall back for %s', (locale) => {
    const items = navigationViewModel(locale);

    expect(items).toHaveLength(7);
    expect(items.every((item) => item.label === null && item.availability === 'pending')).toBe(true);
  });
});
