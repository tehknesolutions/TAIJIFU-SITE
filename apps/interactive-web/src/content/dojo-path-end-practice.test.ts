import { describe, expect, it } from 'vitest';
import { renderDojoNucleusPage } from './dojo-nucleus-page.js';

describe('Dojo practice continuation at Path boundary', () => {
  it('offers the next Path from practice when the current Nucleus ends its Path', () => {
    const html = renderDojoNucleusPage('NUC-N004', 'pt-BR')!;
    expect(html).toContain('dojo-practice__continue');
    expect(html).toContain('Próximo Caminho');
    expect(html).toContain('NUC-N005');
  });

  it('keeps the boundary structural rather than progress-based', () => {
    const html = renderDojoNucleusPage('NUC-N004', 'pt-BR')!;
    expect(html).not.toContain('Caminho concluído');
    expect(html).not.toContain('Desbloquear');
    expect(html).not.toContain('XP');
  });
});
