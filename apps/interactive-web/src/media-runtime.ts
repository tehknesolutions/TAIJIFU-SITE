import { DETERMINISTIC_PRESENTATION_FALLBACK, mediaRegistry } from './media-registry.js';

export type PresentationMediaResolution = Readonly<{
  state: 'asset' | 'fallback';
  url: string | null;
}>;

export function resolvePresentationMedia(id: string, base = '/'): PresentationMediaResolution {
  const asset = mediaRegistry.find((candidate) => candidate.id === id);
  if (!asset || asset.humanApproval !== 'approved') {
    return Object.freeze({ state: 'fallback' as const, url: publicMediaUrl(DETERMINISTIC_PRESENTATION_FALLBACK, base) });
  }

  return Object.freeze({
    state: 'asset' as const,
    url: publicMediaUrl(asset.sourcePath, base),
  });
}

function publicMediaUrl(sourcePath: string, base: string): string {
  const marker = '/public/';
  const publicIndex = sourcePath.indexOf(marker);
  if (publicIndex < 0) return sourcePath;
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}${sourcePath.slice(publicIndex + marker.length)}`;
}
