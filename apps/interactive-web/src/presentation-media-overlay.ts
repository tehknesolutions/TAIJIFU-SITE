import { getPresentationMediaUrl } from './media-registry.js';

export type PresentationMediaOverlayStatus = 'idle' | 'loading' | 'visible' | 'failed' | 'disposed';
export type PresentationMediaOverlaySnapshot = Readonly<{ status: PresentationMediaOverlayStatus; mediaId: string | undefined }>;
export type PresentationMediaOverlay = Readonly<{
  show(mediaId: string | undefined): void;
  getSnapshot(): PresentationMediaOverlaySnapshot;
  dispose(): void;
}>;

type PresentationMediaOverlayOptions = Readonly<{ createPreloadImage?: () => HTMLImageElement }>;

export function createPresentationMediaOverlay(image: HTMLImageElement, options: PresentationMediaOverlayOptions = {}): PresentationMediaOverlay {
  image.alt = '';
  image.setAttribute('aria-hidden', 'true');
  const createPreloadImage = options.createPreloadImage ?? (() => new Image());
  let requestVersion = 0;
  let disposed = false;
  let status: PresentationMediaOverlayStatus = 'idle';
  const activeMediaId = () => image.dataset.presentationMediaId || undefined;

  return Object.freeze({
    show(mediaId) {
      if (disposed) return;
      const version = ++requestVersion;
      if (!mediaId) {
        delete image.dataset.presentationMediaId;
        image.dataset.presentationMediaState = 'hidden';
        image.removeAttribute('src');
        image.hidden = true;
        status = 'idle';
        return;
      }

      const nextUrl = getPresentationMediaUrl(mediaId);
      if (image.getAttribute('src') === nextUrl) {
        image.dataset.presentationMediaId = mediaId;
        image.dataset.presentationMediaState = 'visible';
        image.hidden = false;
        status = 'visible';
        return;
      }

      if (!image.getAttribute('src') || image.hidden) {
        image.dataset.presentationMediaId = mediaId;
        image.dataset.presentationMediaState = 'visible';
        image.src = nextUrl;
        image.hidden = false;
        status = 'visible';
        return;
      }

      status = 'loading';
      const preload = createPreloadImage();
      preload.addEventListener('load', () => {
        if (disposed || version !== requestVersion) return;
        image.dataset.presentationMediaId = mediaId;
        image.dataset.presentationMediaState = 'visible';
        image.src = nextUrl;
        image.hidden = false;
        status = 'visible';
      }, { once: true });
      preload.addEventListener('error', () => {
        if (disposed || version !== requestVersion) return;
        image.dataset.presentationMediaState = 'visible';
        image.hidden = false;
        status = 'failed';
      }, { once: true });
      preload.src = nextUrl;
    },
    getSnapshot() {
      return Object.freeze({ status, mediaId: activeMediaId() });
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      requestVersion += 1;
      status = 'disposed';
    },
  });
}
