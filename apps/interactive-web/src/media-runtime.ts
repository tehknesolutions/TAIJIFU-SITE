import { mediaRegistry } from './media-registry.js';

export type PresentationMediaResolution = Readonly<{
  state: 'asset' | 'fallback';
  url: string | null;
}>;

export function resolvePresentationMedia(id: string): PresentationMediaResolution {
  const asset = mediaRegistry.find((candidate) => candidate.id === id);
  if (!asset || asset.humanApproval !== 'approved') {
    return Object.freeze({ state: 'fallback' as const, url: null });
  }

  return Object.freeze({
    state: 'asset' as const,
    url: publicMediaUrl(asset.sourcePath),
  });
}

function publicMediaUrl(sourcePath: string): string {
  const marker = '/public/';
  const publicIndex = sourcePath.indexOf(marker);
  return publicIndex >= 0 ? `/${sourcePath.slice(publicIndex + marker.length)}` : sourcePath;
}
