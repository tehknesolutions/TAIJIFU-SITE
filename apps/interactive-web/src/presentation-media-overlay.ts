import { getPresentationMediaUrl } from './media-registry.js';

export type PresentationMediaOverlay = Readonly<{
  show(mediaId: string | undefined): void;
}>;

type PresentationMediaOverlayOptions = Readonly<{
  createPreloadImage?: () => HTMLImageElement;
}>;

export function createPresentationMediaOverlay(
  image: HTMLImageElement,
  options: PresentationMediaOverlayOptions = {},
): PresentationMediaOverlay {
  image.alt = '';
  image.setAttribute('aria-hidden', 'true');
  const createPreloadImage = options.createPreloadImage ?? (() => new Image());
  let requestVersion = 0;

  return Object.freeze({
    show(mediaId) {
      const version = ++requestVersion;
      if (!mediaId) {
        delete image.dataset.presentationMediaId;
        image.dataset.presentationMediaState = 'hidden';
        image.removeAttribute('src');
        image.hidden = true;
        return;
      }

      const nextUrl = getPresentationMediaUrl(mediaId);
      if (image.getAttribute('src') === nextUrl) {
        image.dataset.presentationMediaId = mediaId;
        image.dataset.presentationMediaState = 'visible';
        image.hidden = false;
        return;
      }

      if (!image.getAttribute('src') || image.hidden) {
        image.dataset.presentationMediaId = mediaId;
        image.dataset.presentationMediaState = 'visible';
        image.src = nextUrl;
        image.hidden = false;
        return;
      }

      const preload = createPreloadImage();
      preload.addEventListener('load', () => {
        if (version !== requestVersion) return;
        image.dataset.presentationMediaId = mediaId;
        image.dataset.presentationMediaState = 'visible';
        image.src = nextUrl;
        image.hidden = false;
      }, { once: true });
      preload.addEventListener('error', () => {
        if (version !== requestVersion) return;
        image.dataset.presentationMediaState = 'visible';
        image.hidden = false;
      }, { once: true });
      preload.src = nextUrl;
    },
  });
}
