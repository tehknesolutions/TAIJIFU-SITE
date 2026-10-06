import { describe, expect, it } from 'vitest';
import { wireDojoEntryLinks } from './home-dojo-wiring.js';

describe('public Dojo CTA wiring', () => {
  it('points every Dojo entry CTA at the localized curriculum map', () => {
    const anchors = [
      { dataset: { dojoEntry: '' }, href: '#interactive-experience' },
      { dataset: { dojoEntry: '' }, href: '#interactive-experience' },
      { dataset: { dojoEntry: '' }, href: '#interactive-experience' },
    ];

    wireDojoEntryLinks(anchors, 'pt-BR');
    expect(anchors.map(({ href }) => href)).toEqual(['/pt-br/dojo/', '/pt-br/dojo/', '/pt-br/dojo/']);
  });
});
