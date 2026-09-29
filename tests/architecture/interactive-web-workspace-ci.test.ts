import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('interactive web CI workspace contract', () => {
  it('does not isolate an app that consumes workspace protocol dependencies', () => {
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
    const workspaceDependencies = Object.entries(dependencies).filter(
      ([, version]) => typeof version === 'string' && version.startsWith('workspace:'),
    );

    expect(workspaceDependencies).toContainEqual([
      '@taijifu/design-tokens',
      'workspace:*',
    ]);
    expect(workflow).not.toContain('Isolate interactive-web package from workspace discovery');
    expect(workflow).not.toContain('--workspaces=false');
    expect(workflow).toContain('pnpm install --frozen-lockfile');
    expect(workflow).toContain('pnpm --filter @taijifu/interactive-web typecheck');
    expect(workflow).toContain('pnpm --filter @taijifu/interactive-web test');
    expect(workflow).toContain('pnpm --filter @taijifu/interactive-web build');
  });
});
