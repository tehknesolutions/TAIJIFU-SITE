import { describe, expect, it } from 'vitest';
import { dojoEntryUrl } from './dojo-entry-link.js';

describe('public Dojo entry URL', () => {
  it('resolves the curriculum entry for every supported locale', () => {
    expect(dojoEntryUrl('pt-BR')).toBe('/pt-br/dojo/');
    expect(dojoEntryUrl('en')).toBe('/en/dojo/');
    expect(dojoEntryUrl('es')).toBe('/es/dojo/');
  });
});
