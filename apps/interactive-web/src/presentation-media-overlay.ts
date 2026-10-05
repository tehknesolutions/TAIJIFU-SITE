import { getPresentationMediaUrl } from './media-registry.js';

export type PresentationMediaOverlay = Readonly<{
  show(mediaId: string | undefined): void;
}>;

export function createPresentationMediaOverlay(image: HTMLImageElement): PresentationMediaOverlay {
  image.alt = '';
  image.setAttribute('aria-hidden', 'true');

  return Object.freeze({
    show(mediaId) {
      if (!mediaId) {
        delete image.dataset.presentationMediaId;
        image.dataset.presentationMediaState = 'hidden';
        image.removeAttribute('src');
        image.hidden = true;
        return;
      }

      const nextUrl = getPresentationMediaUrl(mediaId);
      image.dataset.presentationMediaId = mediaId;
      image.dataset.presentationMediaState = 'visible';
      if (image.getAttribute('src') !== nextUrl) image.src = nextUrl;
      image.hidden = false;
    },
  });
}
