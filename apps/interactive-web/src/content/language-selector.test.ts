import { describe, expect, it } from 'vitest';
import { languageOptions, equivalentLocaleUrl } from './language-selector.js';

describe('TAIJIFU language selector domain', () => {
  it('exposes all three accessible language options', () => {
    expect(languageOptions).toEqual([
      { locale: 'pt-BR', label: 'Português (Brasil)' },
      { locale: 'en', label: 'English' },
      { locale: 'es', label: 'Español' },
    ]);
  });

  it('switches language by stable route identity', () => {
    expect(equivalentLocaleUrl('fundamentos', 'pt-BR')).toBe('/pt-br/fundamentos/');
    expect(equivalentLocaleUrl('fundamentos', 'en')).toBe('/en/foundations/');
    expect(equivalentLocaleUrl('fundamentos', 'es')).toBe('/es/fundamentos/');
  });

  it('returns the international entry when a localized equivalent does not exist', () => {
    expect(equivalentLocaleUrl('home', 'en')).toBe('/');
    expect(equivalentLocaleUrl('unknown', 'es')).toBe('/');
  });
});
