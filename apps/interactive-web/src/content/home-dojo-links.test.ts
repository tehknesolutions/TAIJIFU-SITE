import { describe, expect, it } from 'vitest';
import { buildHomeDojoLinks } from './home-dojo-links.js';

describe('Web V1 Home / Dojo Gate canonical links', () => {
  it('projects the TAI JI FU threshold links from the canonical route graph', () => {
    expect(buildHomeDojoLinks('pt-BR')).toEqual([
      { id: 'tai', canonicalUrl: '/pt-br/principios/tai/' },
      { id: 'ji', canonicalUrl: '/pt-br/principios/ji/' },
      { id: 'fu', canonicalUrl: '/pt-br/principios/fu/' },
    ]);
  });

  it('localizes URLs without changing stable route identities', () => {
    expect(buildHomeDojoLinks('en')).toEqual([
      { id: 'tai', canonicalUrl: '/en/principles/tai/' },
      { id: 'ji', canonicalUrl: '/en/principles/ji/' },
      { id: 'fu', canonicalUrl: '/en/principles/fu/' },
    ]);

    expect(buildHomeDojoLinks('es')).toEqual([
      { id: 'tai', canonicalUrl: '/es/principios/tai/' },
      { id: 'ji', canonicalUrl: '/es/principios/ji/' },
      { id: 'fu', canonicalUrl: '/es/principios/fu/' },
    ]);
  });
});
