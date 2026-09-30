import { describe, expect, it } from 'vitest';
import { localePrefix, parseLocalePrefix, supportedLocales } from './locale.js';

describe('TAIJIFU locale primitives', () => {
  it('supports exactly the three international locales', () => {
    expect(supportedLocales).toEqual(['pt-BR', 'en', 'es']);
  });

  it('maps supported locales to explicit URL prefixes', () => {
    expect(localePrefix('pt-BR')).toBe('pt-br');
    expect(localePrefix('en')).toBe('en');
    expect(localePrefix('es')).toBe('es');
  });

  it('parses only supported locale prefixes', () => {
    expect(parseLocalePrefix('/pt-br/fundamentos/')).toBe('pt-BR');
    expect(parseLocalePrefix('/en/foundations/')).toBe('en');
    expect(parseLocalePrefix('/es/fundamentos/')).toBe('es');
    expect(parseLocalePrefix('/fr/fondations/')).toBeNull();
    expect(parseLocalePrefix('/fundamentos/')).toBeNull();
  });
});
