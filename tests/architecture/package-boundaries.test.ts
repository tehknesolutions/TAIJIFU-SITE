import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourceExtensions = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']);
const ignored = new Set(['node_modules', '.git', '.next', 'dist', 'wordpress']);

function walk(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (ignored.has(entry.name)) return [];
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : sourceExtensions.has(path.extname(entry.name)) ? [absolute] : [];
  });
}

describe('package boundaries', () => {
  it('forbids deep imports into @taijifu packages', () => {
    const violations = walk(root).flatMap((file) => {
      const relative = path.relative(root, file).replaceAll('\\', '/');
      if (relative.startsWith('packages/')) return [];
      const source = fs.readFileSync(file, 'utf8');
      const matches = [...source.matchAll(/(?:from\s+|import\s*\()['"](@taijifu\/[^'"]+\/[^'"]+)['"]/g)];
      return matches.map((match) => `${relative}: ${match[1]}`);
    });
    expect(violations, violations.join('\n')).toEqual([]);
  });
});
