import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'yaml';

describe('workspace manifest', () => {
  it('declares approved roots and root gates', () => {
    const root = process.cwd();
    const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
    const ws = yaml.parse(fs.readFileSync(path.join(root, 'pnpm-workspace.yaml'), 'utf8'));
    expect(ws.packages).toEqual(['apps/*', 'services/*', 'packages/*', 'platform/*']);
    for (const script of ['lint', 'typecheck', 'test', 'build', 'architecture:test']) {
      expect(pkg.scripts?.[script]).toBeTruthy();
    }
  });
});
