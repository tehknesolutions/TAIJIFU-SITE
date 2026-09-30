import { describe, expect, it } from 'vitest';
import { shellMessagesFor } from './localized-shell.js';
import { supportedLocales } from './locale.js';

describe('TAIJIFU localized shell', () => {
  it('defines the complete static shell vocabulary for every locale', () => {
    const ptKeys = Object.keys(shellMessagesFor('pt-BR')).sort();
    for (const locale of supportedLocales) expect(Object.keys(shellMessagesFor(locale)).sort()).toEqual(ptKeys);
  });

  it('keeps identity tokens stable while localizing surrounding UI', () => {
    expect(shellMessagesFor('pt-BR').brandName).toBe('TAIJIFU');
    expect(shellMessagesFor('en').brandName).toBe('TAIJIFU');
    expect(shellMessagesFor('es').brandName).toBe('TAIJIFU');
    expect(shellMessagesFor('en').skipLink).toBe('Skip to content');
    expect(shellMessagesFor('es').enterDojo).toBe('ENTRAR AL DOJO');
  });
});
