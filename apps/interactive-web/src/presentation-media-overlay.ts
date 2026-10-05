import { getPresentationMediaUrl } from './media-registry.js';

export type PresentationMediaOverlayStatus = 'idle' | 'loading' | 'visible' | 'failed' | 'disposed';
export type PresentationMediaOverlaySnapshot = Readonly<{ status: PresentationMediaOverlayStatus; mediaId: string | undefined }>;
export type PresentationMediaOverlay = Readonly<{ show(mediaId: string | undefined): void; getSnapshot(): PresentationMediaOverlaySnapshot; dispose(): void }>;
type PresentationMediaOverlayOptions = Readonly<{ createPreloadImage?: () => HTMLImageElement; onStateChange?: (snapshot: PresentationMediaOverlaySnapshot) => void }>;

export function createPresentationMediaOverlay(image: HTMLImageElement, options: PresentationMediaOverlayOptions = {}): PresentationMediaOverlay {
  image.alt=''; image.setAttribute('aria-hidden','true');
  const createPreloadImage=options.createPreloadImage ?? (()=>new Image()); let requestVersion=0; let disposed=false; let status:PresentationMediaOverlayStatus='idle';
  const activeMediaId=()=>image.dataset.presentationMediaId || undefined;
  const snapshot=():PresentationMediaOverlaySnapshot=>Object.freeze({status,mediaId:activeMediaId()});
  let lastNotified=JSON.stringify(snapshot());
  const notify=()=>{ const next=snapshot(); const key=JSON.stringify(next); if(key===lastNotified)return; lastNotified=key; options.onStateChange?.(next); };

  return Object.freeze({
    show(mediaId) {
      if(disposed)return; const version=++requestVersion;
      if(!mediaId){ delete image.dataset.presentationMediaId; image.dataset.presentationMediaState='hidden'; image.removeAttribute('src'); image.hidden=true; status='idle'; notify(); return; }
      const nextUrl=getPresentationMediaUrl(mediaId);
      if(image.getAttribute('src')===nextUrl){ image.dataset.presentationMediaId=mediaId; image.dataset.presentationMediaState='visible'; image.hidden=false; status='visible'; notify(); return; }
      if(!image.getAttribute('src')||image.hidden){ image.dataset.presentationMediaId=mediaId; image.dataset.presentationMediaState='visible'; image.src=nextUrl; image.hidden=false; status='visible'; notify(); return; }
      status='loading'; notify();
      const preload=createPreloadImage();
      preload.addEventListener('load',()=>{ if(disposed||version!==requestVersion)return; image.dataset.presentationMediaId=mediaId; image.dataset.presentationMediaState='visible'; image.src=nextUrl; image.hidden=false; status='visible'; notify(); },{once:true});
      preload.addEventListener('error',()=>{ if(disposed||version!==requestVersion)return; image.dataset.presentationMediaState='visible'; image.hidden=false; status='failed'; notify(); },{once:true});
      preload.src=nextUrl;
    },
    getSnapshot:snapshot,
    dispose(){ if(disposed)return; disposed=true; requestVersion+=1; status='disposed'; notify(); },
  });
}
