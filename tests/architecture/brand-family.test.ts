import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();
const read = (path: string) => readFileSync(resolve(root, path), 'utf8');
const geometry = (svg: string) => [...svg.matchAll(/<(?:path|circle|polygon|rect)\b[^>]*\/?>(?:<\/(?:path|circle|polygon|rect)>)?/g)].map(([node]) => node.replace(/\s+/g, ' ').trim());

describe('canonical TAIJIFU brand family', () => {
  it('promotes the optically refined V2 wordmark without changing its vector geometry', () => {
    const masterPath = 'brand/wordmark/master/taijifu-wordmark.svg';
    expect(existsSync(resolve(root, masterPath))).toBe(true);
    const candidate = read('brand/wordmark/construction/taijifu-wordmark-v2.svg');
    const master = read(masterPath);
    expect(geometry(master)).toEqual(geometry(candidate));
    expect(master).toContain('id="TAI"');
    expect(master).toContain('id="JI"');
    expect(master).toContain('id="FU"');
    expect(master).not.toMatch(/<(?:text|image|filter|linearGradient|radialGradient)\b/i);
  });
});
