import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();
const requiredDocs = [
  'docs/design-system/TAIJIFU-OFFICIAL-DESIGN-SYSTEM-V1.md',
  'docs/design-system/TAIJIFU-VISUAL-REFERENCE-MAP.md',
  'docs/prompts/TAIJIFU-VISUAL-PROMPT-LIBRARY.md',
  'docs/lab-ui-ux/TAIJIFU-OFFICIAL-LOGO-OMEGA1.md',
  'docs/lab-ui-ux/TAIJIFU-OMEGA1-ENGINEERING-SPEC.md',
] as const;

describe('official design-system authority', () => {
  it('keeps every authority document addressable from the repository', () => {
    for (const path of requiredDocs) expect(existsSync(resolve(root, path)), path).toBe(true);
  });

  it('publishes the canonical Omega1 production-family contract', () => {
    const contractPath = resolve(root, 'brand/omega1/asset-contract.json');
    expect(existsSync(contractPath)).toBe(true);
    const contract = JSON.parse(readFileSync(contractPath, 'utf8')) as {
      authority: string;
      approvedMasters: string[];
      requiredProductionFamily: string[];
    };
    expect(contract.authority).toBe('docs/lab-ui-ux/TAIJIFU-OMEGA1-ENGINEERING-SPEC.md');
    expect(contract.approvedMasters).toEqual([
      'brand/omega1/master/omega1-master.svg',
      'brand/omega1/master/omega1-micro-master.svg',
    ]);
    expect(contract.requiredProductionFamily).toEqual([
      'omega1-master.svg', 'omega1-accent.svg', 'omega1-reverse.svg', 'omega1-micro.svg',
      'taijifu-lockup-horizontal.svg', 'taijifu-lockup-vertical.svg', 'taijifu-hnk-signature.svg',
    ]);
  });
});
