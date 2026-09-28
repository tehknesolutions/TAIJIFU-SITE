import { describe, expect, it } from 'vitest';
import { createInteractiveWebExperience } from './experience.js';
import { renderExperienceDocument } from './site-document.js';

describe('Site identity', () => {
  it('keeps the document identity aligned with the interactive web product contract', () => {
    const experience = createInteractiveWebExperience({
      nodes: [{ id: 'tai', label: 'TAI', canonicalUrl: '/principios/tai/' }],
    });
    const html = renderExperienceDocument(experience.frame, { title: 'TAIJIFU' });
    expect(html).toContain('data-product-kind="interactive-web-site"');
    expect(html).toContain('<title>TAIJIFU</title>');
    expect(html).toContain('href="/principios/tai/"');
    expect(html).not.toContain('health');
    expect(html).not.toContain('score');
    expect(html).not.toContain('inventory');
  });
});