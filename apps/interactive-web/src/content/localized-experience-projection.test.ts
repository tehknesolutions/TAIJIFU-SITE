import { describe, expect, it } from 'vitest';
import { projectLocalizedPrimaryNavigation } from './localized-experience-projection.js';

describe('projectLocalizedPrimaryNavigation', () => {
  it('projects the complete primary navigation in canonical order for pt-BR', () => {
    const items = projectLocalizedPrimaryNavigation('pt-BR');

    expect(items.map((item) => item.id)).toEqual([
      'manifesto',
      'fundamentos',
      'influencias',
      'metodo',
      'graduacao',
      'referencias',
      'historia',
    ]);
    expect(items.every((item) => item.localization.kind === 'localized')).toBe(true);
  });

  it.each(['en', 'es'] as const)('keeps %s navigation explicitly pending', (locale) => {
    const items = projectLocalizedPrimaryNavigation(locale);

    expect(items).toHaveLength(7);
    expect(items.every((item) => item.localization.kind === 'pending')).toBe(true);
  });
});
