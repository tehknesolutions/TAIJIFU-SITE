import { describe, expect, it } from 'vitest';
import { renderDojoNucleusPage } from './dojo-nucleus-page.js';

describe('Nucleus Summary to Practice flow', () => {
  it('presents Summary as orientation and Practice as the primary action', () => {
    const html = renderDojoNucleusPage('NUC-N001', 'pt-BR')!;

    expect(html).toContain('dojo-nucleus-page__summary');
    expect(html).toContain('dojo-practice');
    expect(html).toContain('data-dojo-practice-focus');
    expect(html).toContain('PRATICAR ESTE NÚCLEO');
  });

  it('keeps recovered instructional authority visible in the practice surface', () => {
    const html = renderDojoNucleusPage('NUC-N001', 'pt-BR')!;
    expect(html).toContain('data-practice-authority=');
    expect(html).toContain('Conteúdo instrucional recuperado');
  });
});
