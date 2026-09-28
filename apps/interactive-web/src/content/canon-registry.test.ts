import { describe, expect, it } from 'vitest';
import { canonRegistry, canonToExperienceNodes } from './canon-registry.js';

describe('TAIJIFU canon registry', () => {
  it('keeps confirmed canonical identities and URLs unique', () => {
    const confirmed = canonRegistry.filter((item) => item.status === 'confirmed');
    const ids = confirmed.map((item) => item.id);
    const urls = confirmed.flatMap((item) =>
      item.canonicalUrl ? [item.canonicalUrl] : [],
    );

    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(urls).size).toBe(urls.length);
    expect(canonRegistry).toContainEqual(
      expect.objectContaining({
        id: 'tai',
        title: 'TAI',
        canonicalUrl: '/principios/tai/',
        status: 'confirmed',
      }),
    );
  });

  it('projects confirmed public routes into interactive nodes', () => {
    const nodes = canonToExperienceNodes();

    expect(nodes).toContainEqual({
      id: 'tai',
      label: 'TAI',
      canonicalUrl: '/principios/tai/',
    });
    expect(nodes).toContainEqual({
      id: 'manifesto',
      label: 'Manifesto',
      canonicalUrl: '/manifesto/',
    });
    expect(nodes).toContainEqual({
      id: 'treino-personalizado',
      label: 'Treino Personalizado',
      canonicalUrl: '/treino-personalizado/',
    });
  });

  it('does not expose semantic principles without reconciled public URLs', () => {
    const ids = canonToExperienceNodes().map((node) => node.id);
    expect(ids).not.toContain('ji');
    expect(ids).not.toContain('fu');
    expect(ids).not.toContain('integration');
  });
});
