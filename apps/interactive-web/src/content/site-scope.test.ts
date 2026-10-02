import { describe, expect, it } from 'vitest';
import { officialPageContent } from './official-page-content.js';
import { primaryNavigation, siteRoutes } from './site-ia.js';

describe('TAIJIFU-SITE scope boundary', () => {
  it('does not publish SW-TAIJIFU product routes in the official site IA', () => {
    expect(siteRoutes.some((route) => route.source === 'personalized-training-spec')).toBe(false);
    expect(siteRoutes.some((route) => route.id === 'treino-personalizado')).toBe(false);
    expect(primaryNavigation).not.toContain('treino-personalizado');
  });

  it('does not treat SW-TAIJIFU product copy as official TAIJIFU-SITE page content', () => {
    expect(officialPageContent['treino-personalizado']).toBeUndefined();
  });
});
