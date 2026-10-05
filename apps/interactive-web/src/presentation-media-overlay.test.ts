import { describe, expect, it } from 'vitest';
import { createPresentationMediaOverlay } from './presentation-media-overlay.js';

describe('presentation media overlay', () => {
  it('renders governed fallback URL for pending media', () => {
    const image = document.createElement('img');
    const overlay = createPresentationMediaOverlay(image);

    overlay.show('p02-dojo-interior');

    expect(image.dataset.presentationMediaId).toBe('p02-dojo-interior');
    expect(image.getAttribute('src')).toBe('/media/p08-brand-book-background.svg');
    expect(image.hidden).toBe(false);
  });

  it('hides and clears the overlay when no route media is governed', () => {
    const image = document.createElement('img');
    const overlay = createPresentationMediaOverlay(image);
    overlay.show('p02-dojo-interior');

    overlay.show(undefined);

    expect(image.dataset.presentationMediaId).toBeUndefined();
    expect(image.hasAttribute('src')).toBe(false);
    expect(image.hidden).toBe(true);
  });
});
