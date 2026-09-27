import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const forbidden = [
  '@supabase/supabase-js',
  'firebase/',
  'firebase-admin',
  '@aws-sdk/',
  '@azure/',
  '@google-cloud/',
];

function sourceFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === 'dist') return [];
    if (entry.isDirectory()) return sourceFiles(absolute);
    return /\.(?:ts|tsx|js|jsx|mjs|cjs)$/.test(entry.name) ? [absolute] : [];
  });
}

describe('frontend provider boundaries', () => {
  it('keeps apps provider-agnostic', () => {
    const violations = sourceFiles(path.join(root, 'apps')).flatMap((file) => {
      const source = fs.readFileSync(file, 'utf8');
      return forbidden
        .filter((provider) => source.includes(provider))
        .map((provider) => `${path.relative(root, file).replaceAll('\\', '/')}: ${provider}`);
    });
    expect(violations, violations.join('\n')).toEqual([]);
  });
});
