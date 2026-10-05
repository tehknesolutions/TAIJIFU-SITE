import { describe, expect, it, vi } from 'vitest';
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

  it('keeps the current image visible until a different governed URL is loaded', () => {
    const image = document.createElement('img');
    image.src = '/media/current.svg';
    image.dataset.presentationMediaId = 'current';
    image.dataset.presentationMediaState = 'visible';
    image.hidden = false;
    const preload = document.createElement('img');
    const createPreloadImage = vi.fn(() => preload);
    const overlay = createPresentationMediaOverlay(image, { createPreloadImage });

    overlay.show('p02-dojo-interior');

    expect(createPreloadImage).toHaveBeenCalledOnce();
    expect(preload.getAttribute('src')).toBe('/media/p08-brand-book-background.svg');
    expect(image.getAttribute('src')).toBe('/media/current.svg');
    expect(image.dataset.presentationMediaState).toBe('visible');

    preload.dispatchEvent(new Event('load'));

    expect(image.getAttribute('src')).toBe('/media/p08-brand-book-background.svg');
    expect(image.dataset.presentationMediaId).toBe('p02-dojo-interior');
    expect(image.dataset.presentationMediaState).toBe('visible');
  });

  it('ignores a stale preload when a newer media request wins', () => {
    const image = document.createElement('img');
    image.src = '/media/current.svg';
    image.hidden = false;
    const first = document.createElement('img');
    const second = document.createElement('img');
    const queue = [first, second];
    const overlay = createPresentationMediaOverlay(image, { createPreloadImage: () => queue.shift()! });

    overlay.show('p02-dojo-interior');
    overlay.show('p03-martial-landscape');
    first.dispatchEvent(new Event('load'));

    expect(image.getAttribute('src')).toBe('/media/current.svg');

    second.dispatchEvent(new Event('load'));
    expect(image.dataset.presentationMediaId).toBe('p03-martial-landscape');
  });
});
