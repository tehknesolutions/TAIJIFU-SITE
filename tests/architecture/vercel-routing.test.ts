import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('Vercel routing contract', () => {
  const configPath = resolve(
    process.cwd(),
    'apps/interactive-web/vercel.json',
  );

  it('serves canonical SPA routes and preserves legacy redirects', () => {
    const config = JSON.parse(readFileSync(configPath, 'utf8'));

    expect(config.redirects).toEqual(
      expect.arrayContaining([
        { source: '/filosofia/', destination: '/fundamentos/', permanent: true },
        { source: '/o-que-e/', destination: '/manifesto/', permanent: true },
        { source: '/artes-base/', destination: '/influencias/', permanent: true },
        { source: '/trilhas/', destination: '/metodo/', permanent: true },
        { source: '/niveis-e-graduacao/', destination: '/graduacao/', permanent: true },
        { source: '/textos-oficiais/', destination: '/referencias/', permanent: true },
        { source: '/registro/', destination: '/historia/', permanent: true },
      ]),
    );
    expect(config.rewrites).toContainEqual({
      source: '/(.*)',
      destination: '/index.html',
    });
  });
});
