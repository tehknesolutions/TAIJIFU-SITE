import { describe, expect, it } from 'vitest';
import { resolveWebBase } from './web-base.js';

describe('interactive web deployment base', () => {
  it('keeps root hosting as the default canonical deployment shape', () => {
    expect(resolveWebBase()).toBe('/');
  });

  it('supports the GitHub Pages repository subpath for preview builds', () => {
    expect(resolveWebBase('github-pages')).toBe('/TAIJIFU-SITE/');
  });
});
