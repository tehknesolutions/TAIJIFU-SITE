import { describe, expect, it } from 'vitest';
import { renderDojoNucleusPage } from './dojo-nucleus-page.js';

describe('internal Dojo map visual contract', () => {
  it('exposes hierarchy hooks for belt, path and nucleus navigation', () => {
    const html = renderDojoNucleusPage('NUC-N001', 'pt-BR')!;

    expect(html).toContain('class="dojo-map"');
    expect(html).toContain('class="dojo-map__belts"');
    expect(html).toContain('class="dojo-map__paths"');
    expect(html).toContain('class="dojo-map__nuclei"');
    expect(html).toContain('class="dojo-map__return"');
    expect(html).toContain('is-current');
  });
});
