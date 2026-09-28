import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();
const read = (path: string) => readFileSync(resolve(root, path), 'utf8');
const paths = (svg: string) => [...svg.matchAll(/<path\b[^>]*\bd="([^"]+)"/g)].map((match) => match[1].replace(/\s+/g, ' ').trim());
const circles = (svg: string) => [...svg.matchAll(/<circle\b([^>]*)\/?>(?:<\/circle>)?/g)].map(([, attrs]) => {
  const pick = (name: string) => attrs.match(new RegExp(`\\b${name}="([^"]+)"`))?.[1] ?? '';
  return [pick('cx'), pick('cy'), pick('r')];
});
const forbidden = /<(?:text|image|filter|linearGradient|radialGradient)\b/i;

describe('canonical TAIJIFU brand family', () => {
  it('promotes the optically refined V2 wordmark without changing its vector geometry', () => {
    const masterPath = 'brand/wordmark/master/taijifu-wordmark.svg';
    expect(existsSync(resolve(root, masterPath))).toBe(true);
    const candidate = read('brand/wordmark/construction/taijifu-wordmark-v2.svg');
    const master = read(masterPath);
    expect(paths(master)).toEqual(paths(candidate));
    expect(master).toContain('id="TAI"');
    expect(master).toContain('id="JI"');
    expect(master).toContain('id="FU"');
    expect(master).not.toMatch(forbidden);
  });

  it('publishes deterministic master, accent, reverse and micro assets', () => {
    const master = read('brand/omega1/master/omega1-master.svg');
    const microMaster = read('brand/omega1/master/omega1-micro-master.svg');
    const accent = read('brand/omega1/variants/omega1-accent.svg');
    const reverse = read('brand/omega1/variants/omega1-reverse.svg');
    const micro = read('brand/omega1/variants/omega1-micro.svg');
    expect(paths(accent)).toEqual(paths(master));
    expect(circles(accent)).toEqual(circles(master));
    expect(paths(reverse)).toEqual(paths(master));
    expect(circles(reverse)).toEqual(circles(master));
    expect(paths(micro)).toEqual(paths(microMaster));
    for (const token of ['tai', 'ji', 'fu', 'integration']) expect(accent).toContain(`var(--tj-color-${token})`);
    expect(accent).not.toMatch(/#[0-9a-f]{3,8}\b|\brgb\(|\bhsl\(/i);
    for (const svg of [accent, reverse, micro]) expect(svg).not.toMatch(forbidden);
  });

  it('builds lockups from promoted masters and the exact HNK signature order', () => {
    const horizontal = read('brand/omega1/lockups/taijifu-lockup-horizontal.svg');
    const vertical = read('brand/omega1/lockups/taijifu-lockup-vertical.svg');
    const signature = read('brand/omega1/lockups/taijifu-hnk-signature.svg');
    for (const lockup of [horizontal, vertical]) {
      expect(lockup).toContain('data-source="omega1-master"');
      expect(lockup).toContain('data-source="taijifu-wordmark"');
      expect(lockup).not.toMatch(forbidden);
    }
    expect([...signature.matchAll(/data-glyph="([A-Z0-9]+)"/g)].map((match) => match[1])).toEqual([
      'G22', 'G01', 'G03', 'G36', 'G03', 'G25', 'G05',
    ]);
    expect(signature).not.toMatch(forbidden);
  });

  it('records canonical production paths in the asset contract', () => {
    const contract = JSON.parse(read('brand/omega1/asset-contract.json')) as { productionAssets?: Record<string, string> };
    expect(contract.productionAssets).toEqual({
      master: 'brand/omega1/master/omega1-master.svg', accent: 'brand/omega1/variants/omega1-accent.svg',
      reverse: 'brand/omega1/variants/omega1-reverse.svg', micro: 'brand/omega1/variants/omega1-micro.svg',
      horizontalLockup: 'brand/omega1/lockups/taijifu-lockup-horizontal.svg', verticalLockup: 'brand/omega1/lockups/taijifu-lockup-vertical.svg',
      hnkSignature: 'brand/omega1/lockups/taijifu-hnk-signature.svg',
    });
  });
});
