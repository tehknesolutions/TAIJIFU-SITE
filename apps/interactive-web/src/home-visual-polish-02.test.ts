import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('./home-visual-parity.css', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

describe('home visual polish 02', () => {
  it('uses the repository R01 dojo environment as the hero media source', () => {
    expect(css).toContain("url('/media/r01-dojo-environment.svg')");
    expect(html).toContain('data-media-state="asset"');
  });

  it('keeps cinematic overlays and mobile framing around the approved asset', () => {
    expect(css).toContain('.dojo-gate__media::before');
    expect(css).toContain('.dojo-gate__media::after');
    expect(css).toContain('@media(max-width:48rem)');
  });
});
