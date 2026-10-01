import { describe, expect, it } from 'vitest';
import { wireHomeDojoLinks } from './home-dojo-wiring.js';

describe('Web V1 Home Dojo runtime wiring', () => {
  it('rewrites every TAI JI FU anchor from the canonical localized projection', () => {
    const anchors = [
      { dataset: { routeId: 'tai' }, href: '/stale/tai/' },
      { dataset: { routeId: 'ji' }, href: '/stale/ji/' },
      { dataset: { routeId: 'fu' }, href: '/stale/fu/' },
      { dataset: { routeId: 'tai' }, href: '/duplicate/stale/tai/' },
    ];

    wireHomeDojoLinks(anchors, 'en');

    expect(anchors.map(({ href }) => href)).toEqual([
      '/en/principles/tai/',
      '/en/principles/ji/',
      '/en/principles/fu/',
      '/en/principles/tai/',
    ]);
  });

  it('ignores non-dojo route anchors', () => {
    const anchors = [{ dataset: { routeId: 'fundamentos' }, href: '/keep-me/' }];
    wireHomeDojoLinks(anchors, 'pt-BR');
    expect(anchors[0]?.href).toBe('/keep-me/');
  });
});
