import { describe, expect, it } from 'vitest';
import { getPresentationMediaIdForRoute } from './presentation-media-map.js';

describe('presentation media route map', () => {
  it('maps the home surface to the governed P01 dojo gate', () => {
    expect(getPresentationMediaIdForRoute('home')).toBe('r01-dojo-environment');
  });

  it('maps the fundamentos surface to the governed P02 dojo interior', () => {
    expect(getPresentationMediaIdForRoute('fundamentos')).toBe('p02-dojo-interior');
  });

  it('does not invent a media association for routes without an explicit contract', () => {
    expect(getPresentationMediaIdForRoute('historia')).toBeUndefined();
    expect(getPresentationMediaIdForRoute('unknown-route')).toBeUndefined();
  });
});
