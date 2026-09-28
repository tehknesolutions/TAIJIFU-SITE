import { describe, expect, it } from 'vitest';
import { canonRegistry, canonToExperienceNodes } from './canon-registry.js';

describe('TAIJIFU canon registry', () => {
  it('keeps confirmed canonical identities and URLs unique', () => {
    const ids = canonRegistry.map((item) => item.id);
    const urls = canonRegistry.map((item) => item.canonicalUrl);

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

  it('projects only confirmed canon items into interactive nodes', () => {
    expect(canonToExperienceNodes()).toEqual([
      { id: 'tai', label: 'TAI', canonicalUrl: '/principios/tai/' },
    ]);
  });
});
