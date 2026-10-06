import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { designTokens } from './index.js';

const css = readFileSync(resolve(import.meta.dirname, 'tokens.css'), 'utf8');

function expectCssVariables(value: unknown): void {
  if (typeof value === 'string' && value.startsWith('--tj-')) {
    expect(css).toContain(`${value}:`);
    return;
  }
  if (value && typeof value === 'object') {
    for (const nested of Object.values(value)) expectCssVariables(nested);
  }
}

describe('TAIJIFU semantic design tokens', () => {
  it('exposes semantic color roles without treating raster hex values as canon', () => {
    expect(designTokens.color).toEqual({
      ink: '--tj-color-ink', paper: '--tj-color-paper', metal: '--tj-color-metal',
      tai: '--tj-color-tai', ji: '--tj-color-ji', fu: '--tj-color-fu', integration: '--tj-color-integration',
    });
    expect(css).not.toMatch(/#[0-9a-f]{3,8}\b/i);
    for (const role of Object.keys(designTokens.color)) {
      expect(css).toContain(`--tj-color-${role}: var(--tj-calibration-${role});`);
    }
  });

  it('exposes complete typography roles and reusable metrics', () => {
    expect(designTokens.type).toEqual(expect.objectContaining({
      display: '--tj-font-display',
      heading: '--tj-font-heading',
      body: '--tj-font-body',
      meta: '--tj-font-meta',
      size: expect.objectContaining({ display: '--tj-type-size-display', heading: '--tj-type-size-heading', body: '--tj-type-size-body', meta: '--tj-type-size-meta' }),
      lineHeight: expect.objectContaining({ tight: '--tj-type-line-tight', body: '--tj-type-line-body' }),
      letterSpacing: expect.objectContaining({ display: '--tj-type-tracking-display', meta: '--tj-type-tracking-meta' }),
    }));
  });

  it('exposes spacing, motion duration/easing and mark clear-space/sizing roles', () => {
    expect(designTokens.space).toEqual(expect.objectContaining({ xs: '--tj-space-xs', sm: '--tj-space-sm', md: '--tj-space-md', lg: '--tj-space-lg', xl: '--tj-space-xl' }));
    expect(designTokens.motion).toEqual(expect.objectContaining({
      duration: expect.objectContaining({ fast: '--tj-motion-duration-fast', standard: '--tj-motion-duration-standard', deliberate: '--tj-motion-duration-deliberate' }),
      easing: expect.objectContaining({ standard: '--tj-motion-easing-standard', emphasized: '--tj-motion-easing-emphasized' }),
    }));
    expect(designTokens.mark).toEqual(expect.objectContaining({
      clearSpace: '--tj-mark-clear-space',
      size: expect.objectContaining({ sm: '--tj-mark-size-sm', md: '--tj-mark-size-md', lg: '--tj-mark-size-lg' }),
    }));
  });

  it('exposes living-identity intensity, surface, depth, energy and semantic motion roles', () => {
    expect(designTokens.intensity).toEqual(expect.objectContaining({
      signal: '--tj-intensity-signal',
      artifact: '--tj-intensity-artifact',
      ritual: '--tj-intensity-ritual',
    }));
    expect(designTokens.surface).toEqual(expect.objectContaining({
      void: '--tj-surface-void',
      elevated: '--tj-surface-elevated',
      deep: '--tj-surface-deep',
      metal: '--tj-surface-metal',
    }));
    expect(designTokens.depth).toEqual(expect.objectContaining({
      signal: '--tj-depth-signal',
      artifact: '--tj-depth-artifact',
      ritual: '--tj-depth-ritual',
    }));
    expect(designTokens.energy).toEqual(expect.objectContaining({
      signal: '--tj-energy-signal',
      artifact: '--tj-energy-artifact',
      ritual: '--tj-energy-ritual',
    }));
    expect(designTokens.motion.semantic).toEqual(expect.objectContaining({
      tai: '--tj-motion-tai',
      ji: '--tj-motion-ji',
      fu: '--tj-motion-fu',
    }));
    expect(css).not.toMatch(/#[0-9a-f]{3,8}\\b/i);
  });

  it('keeps TypeScript and CSS token surfaces synchronized', () => {
    expectCssVariables(designTokens);
  });

  it('zeros motion durations for reduced-motion users', () => {
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
    expect(css).toContain('--tj-motion-duration-fast: 0ms;');
    expect(css).toContain('--tj-motion-duration-standard: 0ms;');
    expect(css).toContain('--tj-motion-duration-deliberate: 0ms;');
    expect(css).toContain('--tj-motion-tai: 0ms;');
    expect(css).toContain('--tj-motion-ji: 0ms;');
    expect(css).toContain('--tj-motion-fu: 0ms;');
  });
});
