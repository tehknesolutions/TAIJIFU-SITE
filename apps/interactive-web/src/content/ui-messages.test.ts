import { describe, expect, it } from 'vitest';
import { messagesFor, uiMessageIds } from './ui-messages.js';
import { supportedLocales } from './locale.js';

describe('TAIJIFU UI messages', () => {
  it('keeps the same message IDs in every locale', () => {
    for (const locale of supportedLocales) {
      expect(Object.keys(messagesFor(locale)).sort()).toEqual([...uiMessageIds].sort());
    }
  });

  it('localizes navigation UI without translating identity tokens', () => {
    expect(messagesFor('pt-BR').explorePrinciple).toBe('Explorar princípio');
    expect(messagesFor('en').explorePrinciple).toBe('Explore principle');
    expect(messagesFor('es').explorePrinciple).toBe('Explorar principio');
    for (const locale of supportedLocales) expect(messagesFor(locale).brandName).toBe('TAIJIFU');
  });
});
