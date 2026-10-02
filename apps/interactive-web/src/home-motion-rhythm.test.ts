import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('./home-motion-rhythm.css', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

describe('home motion and rhythm', () => {
  it('loads the editorial motion layer after the visual layers', () => {
    expect(html).toContain('/src/home-motion-rhythm.css');
    expect(html.indexOf('/src/home-motion-rhythm.css')).toBeGreaterThan(html.indexOf('/src/home-reference-sections.css'));
  });

  it('provides ambient hero motion and section transitions without JS', () => {
    expect(css).toContain('@keyframes dojo-breathe');
    expect(css).toContain('@keyframes threshold-glow');
    expect(css).toContain('.reference-section::after');
  });

  it('fully respects reduced motion', () => {
    expect(css).toContain('@media(prefers-reduced-motion:reduce)');
    expect(css).toContain('animation:none');
  });
});
