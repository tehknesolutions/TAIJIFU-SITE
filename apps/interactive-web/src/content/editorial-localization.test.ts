import { describe, expect, it } from 'vitest';
import { editorialLocalizationFor, localizeEditorialField } from './editorial-localization.js';

describe('TAIJIFU editorial localization governance', () => {
  it('keeps authoritative pt-BR editorial fields approved', () => {
    const records = editorialLocalizationFor('pt-BR');
    expect(records.length).toBeGreaterThan(0);
    expect(records.every((record) => record.locale === 'pt-BR' && record.status === 'approved' && record.text.length > 0)).toBe(true);
  });

  it('keeps English and Spanish editorial fields explicitly pending', () => {
    for (const locale of ['en', 'es'] as const) {
      const records = editorialLocalizationFor(locale);
      expect(records.length).toBeGreaterThan(0);
      expect(records.every((record) => record.locale === locale && record.status === 'pending' && record.text === null)).toBe(true);
    }
  });

  it('never falls back silently to pt-BR for a pending locale', () => {
    expect(localizeEditorialField('navigation.explore-principle', 'en')).toEqual({
      kind: 'pending', fieldId: 'navigation.explore-principle', locale: 'en',
    });
    expect(localizeEditorialField('navigation.explore-principle', 'es')).toEqual({
      kind: 'pending', fieldId: 'navigation.explore-principle', locale: 'es',
    });
    expect(localizeEditorialField('navigation.explore-principle', 'pt-BR')).toEqual({
      kind: 'localized', fieldId: 'navigation.explore-principle', locale: 'pt-BR', text: 'Explorar princípio', status: 'approved',
    });
  });

  it('returns missing for fields outside the governed registry', () => {
    expect(localizeEditorialField('unknown.field', 'pt-BR')).toEqual({
      kind: 'missing', fieldId: 'unknown.field', locale: 'pt-BR',
    });
  });
});
