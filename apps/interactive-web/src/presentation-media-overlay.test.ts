import { describe, expect, it } from 'vitest';
import { createPresentationMediaOverlay } from './presentation-media-overlay.js';

describe('presentation media overlay', () => {
  it('renders governed fallback URL for pending media as an ambient layer', () => {
    const image = document.createElement('img');
    const overlay = createPresentationMediaOverlay(image);

    overlay.show('p02-dojo-interior');

    expect(image.dataset.presentationMediaId).toBe('p02-dojo-interior');
    expect(image.dataset.presentationMediaState).toBe('visible');
    expect(image.getAttribute('src')).toBe('/media/p08-brand-book-background.svg');
    expect(image.hidden).toBe(false);
  });

  it('hides and clears the overlay when no route media is governed', () => {
    const image = document.createElement('img');
    const overlay = createPresentationMediaOverlay(image);
    overlay.show('p02-dojo-interior');

    overlay.show(undefined);

    expect(image.dataset.presentationMediaId).toBeUndefined();
    expect(image.dataset.presentationMediaState).toBe('hidden');
    expect(image.hasAttribute('src')).toBe(false);
    expect(image.hidden).toBe(true);
  });

  it('marks repeated governed media as stable instead of reloading the image', () => {
    const image = document.createElement('img');
    const overlay = createPresentationMediaOverlay(image);
    overlay.show('p02-dojo-interior');
    const src = image.getAttribute('src');

    overlay.show('p02-dojo-interior');

    expect(image.getAttribute('src')).toBe(src);
    expect(image.dataset.presentationMediaState).toBe('visible');
  });
});
