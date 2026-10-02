import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('./home-reference-sections.css', import.meta.url), 'utf8');

describe('home visual polish', () => {
  it('gives each reference surface a distinct cinematic treatment', () => {
    for (const selector of ['.reference-core::before', '.reference-split::before', '.reference-canon::before', '.reference-genealogy::before']) {
      expect(css).toContain(selector);
    }
  });

  it('preserves a dedicated responsive composition for small screens', () => {
    expect(css).toContain('@media(max-width:48rem)');
    expect(css).toContain('.reference-core h2');
    expect(css).toContain('.engine-diagram');
  });
});
