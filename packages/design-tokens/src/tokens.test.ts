import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { designTokens } from './index.js';

describe('TAIJIFU semantic design tokens', () => {
  it('exposes semantic color roles without treating raster hex values as canon', () => {
    expect(designTokens.color).toEqual({
      ink: '--tj-color-ink', paper: '--tj-color-paper', metal: '--tj-color-metal',
      tai: '--tj-color-tai', ji: '--tj-color-ji', fu: '--tj-color-fu', integration: '--tj-color-integration',
    });
    const css = readFileSync(resolve(import.meta.dirname, 'tokens.css'), 'utf8');
    expect(css).not.toMatch(/#[0-9a-f]{3,8}\b/i);
    for (const role of Object.keys(designTokens.color)) {
      expect(css).toContain(`--tj-color-${role}: var(--tj-calibration-${role});`);
    }
  });

  it('exposes spacing, typography, motion and mark-space roles', () => {
    expect(designTokens.space).toEqual(expect.objectContaining({ xs: '--tj-space-xs', sm: '--tj-space-sm', md: '--tj-space-md', lg: '--tj-space-lg', xl: '--tj-space-xl' }));
    expect(designTokens.type).toEqual({ display: '--tj-font-display', body: '--tj-font-body', meta: '--tj-font-meta' });
    expect(designTokens.motion).toEqual({ fast: '--tj-motion-fast', standard: '--tj-motion-standard', deliberate: '--tj-motion-deliberate' });
    expect(designTokens.markSpace).toBe('--tj-mark-space');
  });
});
