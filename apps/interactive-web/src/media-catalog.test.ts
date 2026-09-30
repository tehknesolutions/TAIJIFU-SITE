import { describe, expect, it } from 'vitest';
import { mediaPromptCatalog } from './media-catalog.js';

describe('TAIJIFU presentation media prompt catalog', () => {
  it('covers the official prompt families without pretending unproduced media are assets', () => {
    expect(mediaPromptCatalog.map((prompt) => prompt.id)).toEqual([
      'P01', 'P02', 'P03', 'P04', 'P05', 'P06', 'P07', 'P08',
    ]);
    expect(mediaPromptCatalog.every((prompt) => prompt.layer === 'presentation')).toBe(true);
  });

  it('keeps deterministic brand identity outside generated presentation media', () => {
    expect(mediaPromptCatalog.every((prompt) => prompt.generatedBrandIdentityAllowed === false)).toBe(true);
    expect(mediaPromptCatalog.find((prompt) => prompt.id === 'P05')?.family).toBe('material-application');
    expect(mediaPromptCatalog.find((prompt) => prompt.id === 'P03')?.family).toBe('martial-landscape');
    expect(mediaPromptCatalog.find((prompt) => prompt.id === 'P01')?.family).toBe('dojo-environment');
  });
});
