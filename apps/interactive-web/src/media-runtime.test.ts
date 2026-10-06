import { describe, expect, it } from 'vitest';
import { resolvePresentationMedia } from './media-runtime.js';

describe('presentation media runtime', () => {
  it('keeps pending media on the deterministic fallback', () => {
    expect(resolvePresentationMedia('r01-dojo-environment')).toEqual({
      state: 'fallback',
      url: '/media/p08-brand-book-background.svg',
    });
  });

  it('falls back safely when the requested media is unknown', () => {
    expect(resolvePresentationMedia('missing-media')).toEqual({
      state: 'fallback',
      url: null,
    });
  });
});
