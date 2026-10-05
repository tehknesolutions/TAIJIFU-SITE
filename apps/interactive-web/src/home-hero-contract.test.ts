import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('TAIJIFU home hero contract', () => {
  it('declares TAI JI FU as three equal-rank hero principles', () => {
    const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8');
    const heroes = [...html.matchAll(/data-tkn-role="hero-principle"[^>]*data-tkn-rank="([^"]+)"/g)];
    expect(heroes).toHaveLength(3);
    expect(heroes.map((match) => match[1])).toEqual(['peer', 'peer', 'peer']);
    expect(html).toContain('data-route-id="tai"');
    expect(html).toContain('data-route-id="ji"');
    expect(html).toContain('data-route-id="fu"');
  });
});
