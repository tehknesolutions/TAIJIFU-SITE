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

  it('projects the canonical home and confirmed public routes into interactive nodes', () => {
    const nodes = canonToExperienceNodes();

    expect(nodes[0]).toEqual(
      expect.objectContaining({
        id: 'home',
        label: 'TAIJIFU',
        canonicalUrl: '/',
      }),
    );
    expect(nodes).toContainEqual(
      expect.objectContaining({
        id: 'manifesto',
        label: 'Manifesto',
        canonicalUrl: '/manifesto/',
        parentId: 'home',
      }),
    );
    expect(nodes).toContainEqual(
      expect.objectContaining({
        id: 'tai',
        label: 'TAI',
        canonicalUrl: '/principios/tai/',
        parentId: 'home',
      }),
    );
  });

  it('does not expose semantic principles without reconciled public URLs', () => {
    const ids = canonToExperienceNodes().map((node) => node.id);
    expect(ids).not.toContain('ji');
    expect(ids).not.toContain('fu');
    expect(ids).not.toContain('integration');
  });
});
