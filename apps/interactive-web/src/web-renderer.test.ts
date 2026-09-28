import { describe, expect, it } from 'vitest';
import { createInteractiveWebExperience } from './experience.js';
import { renderFrameToHtml } from './web-renderer.js';

describe('WebRenderer', () => {
  it('renders experience nodes as canonical website links', () => {
    const experience = createInteractiveWebExperience({
      nodes: [
        { id: 'tai', label: 'TAI', canonicalUrl: '/principios/tai/' },
      ],
    });

    expect(renderFrameToHtml(experience.frame)).toBe(
      '<nav data-product-kind="interactive-web-site"><a data-node-id="tai" href="/principios/tai/">TAI</a></nav>',
    );
  });

  it('escapes labels and URLs instead of interpreting them as markup', () => {
    const experience = createInteractiveWebExperience({
      nodes: [
        { id: 'tai&', label: '<TAI>', canonicalUrl: '/principios/tai/?x=1&y=2' },
      ],
    });

    expect(renderFrameToHtml(experience.frame)).toBe(
      '<nav data-product-kind="interactive-web-site"><a data-node-id="tai&amp;" href="/principios/tai/?x=1&amp;y=2">&lt;TAI&gt;</a></nav>',
    );
  });
});