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
        image.removeAttribute('src');
        image.hidden = true;
        return;
      }

      image.dataset.presentationMediaId = mediaId;
      image.src = getPresentationMediaUrl(mediaId);
      image.hidden = false;
    },
  });
}
