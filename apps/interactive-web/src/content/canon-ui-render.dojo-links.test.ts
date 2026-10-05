import { describe, expect, it } from 'vitest';
import { renderCanonHierarchy } from './canon-ui-render.js';

describe('Canon curriculum navigation', () => {
  it('links all 128 nuclei to their stable Dojo pages', () => {
    const html = renderCanonHierarchy('pt-BR');
    expect((html.match(/class="canon-nucleus__link"/g) ?? []).length).toBe(128);
    expect(html).toContain('/pt-br/dojo/nucleos/nuc-n001-');
    expect(html).toContain('/pt-br/dojo/nucleos/nuc-n128-');
  });

  it('uses locale-specific Dojo paths', () => {
    expect(renderCanonHierarchy('en')).toContain('/en/dojo/nuclei/nuc-n001-');
    expect(renderCanonHierarchy('es')).toContain('/es/dojo/nucleos/nuc-n001-');
  });
});
