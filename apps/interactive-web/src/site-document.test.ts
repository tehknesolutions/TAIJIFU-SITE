import { describe, expect, it } from 'vitest';
import { createInteractiveWebExperience } from './experience.js';
import { renderExperienceDocument } from './site-document.js';

describe('SiteDocument', () => {
  it('wraps the rendered experience in a complete website document', () => {
    const experience = createInteractiveWebExperience({
      nodes: [{ id: 'tai', label: 'TAI', canonicalUrl: '/principios/tai/' }],
    });

    expect(renderExperienceDocument(experience.frame, { title: 'TAIJIFU' })).toBe(
      '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>TAIJIFU</title></head><body><nav data-product-kind="interactive-web-site"><a data-node-id="tai" href="/principios/tai/">TAI</a></nav></body></html>',
    );
  });
});