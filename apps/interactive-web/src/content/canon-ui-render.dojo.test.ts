import { describe, expect, it } from 'vitest';
import { renderCanonUI } from './canon-ui-render.js';

describe('Canon explorer instructional layer', () => {
  it('renders all 128 nuclei with recovered instruction without changing Canon hierarchy', () => {
    const html = renderCanonUI();
    expect((html.match(/data-nucleus-id=/g) ?? []).length).toBe(128);
    expect((html.match(/Conteúdo instrucional recuperado/g) ?? []).length).toBe(128);
    expect(html).toContain('N001');
    expect(html).toContain('Resumo');
    expect(html).toContain('Prática');
    expect(html).toContain('legacy-candidate');
  });
});
