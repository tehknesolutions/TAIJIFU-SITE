import { describe, expect, it } from 'vitest';
import { missingLocalizationLocales, assertStableSourceKey, type LocalizationEntry } from './localization-contract.js';

const entry: LocalizationEntry = {
  sourceKey: 'ui.navigation.explore',
  values: {
    'pt-BR': { sourceKey: 'ui.navigation.explore', locale: 'pt-BR', value: 'Explorar', status: 'approved' },
    en: { sourceKey: 'ui.navigation.explore', locale: 'en', value: 'Explore', status: 'approved' },
    es: { sourceKey: 'ui.navigation.explore', locale: 'es', value: 'Explorar', status: 'approved' },
  },
};

describe('localization contract', () => {
  it('requires the same stable source key across locales', () => {
    expect(() => assertStableSourceKey(entry)).not.toThrow();
  });

  it('detects missing approved localizations without inventing fallback content', () => {
    const pending: LocalizationEntry = {
      ...entry,
      values: {
        ...entry.values,
        es: { ...entry.values.es, value: '', status: 'pending' },
      },
    };

    expect(missingLocalizationLocales(pending)).toEqual(['es']);
  });

  it('rejects source-key drift', () => {
    const invalid: LocalizationEntry = {
      ...entry,
      values: {
        ...entry.values,
        en: { ...entry.values.en, sourceKey: 'other.key' },
      },
    };

    expect(() => assertStableSourceKey(invalid)).toThrow(/sourceKey mismatch/);
  });
});