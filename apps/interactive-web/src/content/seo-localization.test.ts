import { describe, expect, it } from 'vitest';
import { siteRoutes } from './site-ia.js';

describe('TAIJIFU localized SEO route contract', () => {
  it('has one canonical projection per supported locale for every localized route', () => {
    for (const route of siteRoutes.filter((candidate) => candidate.localized)) {
      const projections = Object.values(route.localized!);
      expect(projections).toHaveLength(3);
      expect(new Set(projections.map((projection) => projection.canonicalUrl)).size).toBe(3);
    }
  });

  it('keeps locale URLs deterministic and isolated by language', () => {
    for (const route of siteRoutes.filter((candidate) => candidate.localized)) {
      expect(route.localized!['pt-BR'].canonicalUrl).toMatch(/^\/pt-br\//);
      expect(route.localized!.en.canonicalUrl).toMatch(/^\/en\//);
      expect(route.localized!.es.canonicalUrl).toMatch(/^\/es\//);
    }
  });

  it('preserves stable route identity across all locale projections', () => {
    expect(siteRoutes.filter((route) => route.localized).map((route) => route.id))
      .toContain('fundamentos');
    expect(siteRoutes.find((route) => route.id === 'fundamentos')?.localized?.en.title).toBe('Foundations');
  });
});
