import { describe, expect, it } from 'vitest';
import {
  mediaRegistry,
  getMediaAsset,
  isApprovedPresentationMedia,
  type MediaAsset,
} from './media-registry.js';

describe('presentation media registry', () => {
  it('registers P01 with provenance and presentation-only status', () => {
    const asset = getMediaAsset('r01-dojo-environment');
    expect(asset.promptId).toBe('P01');
    expect(asset.references).toEqual(['R01', 'R02']);
    expect(asset.layer).toBe('presentation');
    expect(asset.deterministicBrandAssetsComposited).toBe(false);
    expect(asset.humanApproval).toBe('pending');
  });

  it('never treats presentation media as canonical brand masters', () => {
    expect(mediaRegistry.every((asset) => asset.layer === 'presentation')).toBe(true);
    expect(mediaRegistry.every((asset) => !asset.isCanonicalMaster)).toBe(true);
    expect(isApprovedPresentationMedia('r01-dojo-environment')).toBe(false);
  });

  it('requires deterministic metadata fields even when values are unavailable', () => {
    const asset: MediaAsset = getMediaAsset('r01-dojo-environment');
    expect(asset).toHaveProperty('generator');
    expect(asset).toHaveProperty('seed');
    expect(asset).toHaveProperty('aspectRatio');
    expect(asset).toHaveProperty('createdAt');
    expect(asset).toHaveProperty('humanApproval');
    expect(asset).toHaveProperty('deterministicBrandAssetsComposited');
  });
});
