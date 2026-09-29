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

  it('keeps interactive-web CI inside the workspace when workspace dependencies are used', () => {
    const root = process.cwd();
    const interactiveWebPackage = JSON.parse(
      fs.readFileSync(path.join(root, 'apps/interactive-web/package.json'), 'utf8'),
    );
    const workflow = fs.readFileSync(
      path.join(root, '.github/workflows/interactive-web.yml'),
      'utf8',
    );
    const dependencies = {
      ...(interactiveWebPackage.dependencies ?? {}),
      ...(interactiveWebPackage.devDependencies ?? {}),
    };
    const usesWorkspaceProtocol = Object.values(dependencies).some(
      (version) => typeof version === 'string' && version.startsWith('workspace:'),
    );

    expect(usesWorkspaceProtocol).toBe(true);
    expect(workflow).not.toContain("printf 'packages: []\\n' > pnpm-workspace.yaml");
    expect(workflow).not.toContain('npm install --no-package-lock --ignore-scripts --workspaces=false');
    expect(workflow).toContain('pnpm install --frozen-lockfile');
    expect(workflow).toContain('pnpm --filter @taijifu/interactive-web typecheck');
    expect(workflow).toContain('pnpm --filter @taijifu/interactive-web test');
    expect(workflow).toContain('pnpm --filter @taijifu/interactive-web build');
  });
});
