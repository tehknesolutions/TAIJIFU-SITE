export type MediaHumanApproval = 'pending' | 'approved' | 'rejected';

export type MediaAsset = Readonly<{
  id: string;
  promptId: string;
  references: readonly string[];
  layer: 'presentation';
  sourcePath: string;
  generator: string | null;
  seed: string | number | null;
  aspectRatio: string;
  createdAt: string;
  humanApproval: MediaHumanApproval;
  deterministicBrandAssetsComposited: boolean;
  isCanonicalMaster: false;
}>;

export const mediaRegistry: readonly MediaAsset[] = Object.freeze([
  Object.freeze({
    id: 'r01-dojo-environment', promptId: 'P01', references: Object.freeze(['R01', 'R02']), layer: 'presentation' as const,
    sourcePath: 'apps/interactive-web/public/media/r01-dojo-environment.svg', generator: 'authored-svg-presentation-plate', seed: null, aspectRatio: '16:9', createdAt: '2026-09-28', humanApproval: 'pending' as const, deterministicBrandAssetsComposited: false, isCanonicalMaster: false as const,
  }),
  Object.freeze({
    id: 'p02-dojo-interior', promptId: 'P02', references: Object.freeze(['R02']), layer: 'presentation' as const,
    sourcePath: 'apps/interactive-web/public/media/p02-dojo-interior.svg', generator: 'deterministic-svg-dojo-interior', seed: null, aspectRatio: '16:9', createdAt: '2026-10-04', humanApproval: 'pending' as const, deterministicBrandAssetsComposited: false, isCanonicalMaster: false as const,
  }),
  Object.freeze({
    id: 'p03-martial-landscape', promptId: 'P03', references: Object.freeze(['R04', 'R05', 'R07', 'R08']), layer: 'presentation' as const,
    sourcePath: 'apps/interactive-web/public/media/p03-martial-landscape.svg', generator: 'deterministic-svg-martial-landscape', seed: null, aspectRatio: '16:9', createdAt: '2026-10-04', humanApproval: 'pending' as const, deterministicBrandAssetsComposited: false, isCanonicalMaster: false as const,
  }),
  Object.freeze({
    id: 'p08-brand-book-background', promptId: 'P08', references: Object.freeze([]), layer: 'presentation' as const,
    sourcePath: 'apps/interactive-web/public/media/p08-brand-book-background.svg', generator: 'deterministic-svg-mineral-texture', seed: '20261004', aspectRatio: '16:9', createdAt: '2026-10-04', humanApproval: 'pending' as const, deterministicBrandAssetsComposited: false, isCanonicalMaster: false as const,
  }),
]);

export function getMediaAsset(id: string): MediaAsset {
  const asset = mediaRegistry.find((candidate) => candidate.id === id);
  if (!asset) throw new Error('Unknown presentation media asset: ' + id);
  return asset;
}

export function isApprovedPresentationMedia(id: string): boolean {
  const asset = mediaRegistry.find((candidate) => candidate.id === id);
  return asset?.layer === 'presentation' && asset.humanApproval === 'approved';
}
