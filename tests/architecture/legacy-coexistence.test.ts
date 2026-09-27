import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'yaml';

const root = process.cwd();

describe('legacy and canon coexistence', () => {
  it.each(['wordpress', 'brand', 'docs', 'bin'])('preserves %s/', (directory) => {
    expect(fs.statSync(path.join(root, directory)).isDirectory()).toBe(true);
  });

  it('preserves the WordPress core contract workflow scope', () => {
    const workflowPath = path.join(root, '.github', 'workflows', 'taijifu-core-contracts.yml');
    expect(fs.existsSync(workflowPath)).toBe(true);
    const workflow = fs.readFileSync(workflowPath, 'utf8');
    expect(workflow).toContain("wordpress/plugins/taijifu-core/**");
    expect(workflow).toContain('phpunit --bootstrap wordpress/plugins/taijifu-core/tests/bootstrap.php wordpress/plugins/taijifu-core/tests');
  });

  it('keeps WordPress outside the Node workspace roots', () => {
    const workspace = yaml.parse(fs.readFileSync(path.join(root, 'pnpm-workspace.yaml'), 'utf8'));
    expect(workspace.packages).toEqual(['apps/*', 'services/*', 'packages/*', 'platform/*']);
    expect(workspace.packages.some((entry: string) => entry.includes('wordpress'))).toBe(false);
  });
});
