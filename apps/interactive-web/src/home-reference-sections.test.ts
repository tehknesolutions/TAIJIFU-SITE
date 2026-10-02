import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

describe('home visual reference sections', () => {
  it('publishes the four approved post-hero surfaces in reference order', () => {
    const ids = ['taijifu-core', 'adaptive-engine', 'living-canon', 'hnk-genealogy'];
    const offsets = ids.map((id) => html.indexOf(`id="${id}"`));
    expect(offsets.every((offset) => offset >= 0)).toBe(true);
    expect(offsets).toEqual([...offsets].sort((a, b) => a - b));
  });

  it('keeps the interactive experience after the reference surfaces', () => {
    expect(html.indexOf('id="interactive-experience"')).toBeGreaterThan(html.indexOf('id="hnk-genealogy"'));
  });
});
