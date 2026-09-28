import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('official UI primitive CSS contract', () => {
  const css = readFileSync(resolve(process.cwd(), 'packages/ui/src/primitives.css'), 'utf8');

  it('consumes design tokens without embedding raster palette values', () => {
    expect(css).toContain("@import '@taijifu/design-tokens/tokens.css';");
    expect(css).not.toMatch(/#[0-9a-f]{3,8}\b/i);
  });

  it('keeps keyboard focus visibly represented', () => {
    expect(css).toContain('.tj-button:focus-visible');
    expect(css).toContain('.tj-text-link:focus-visible');
    expect(css).toMatch(/outline:\s*2px solid currentColor/);
    expect(css).toMatch(/outline-offset:\s*3px/);
  });
});