import { describe, expect, it } from 'vitest';
import { renderDojoNucleusPage } from './dojo-nucleus-page.js';

describe('Dojo practice continuation', () => {
  it('offers the next Nucleus after practice when one exists', () => {
    const html = renderDojoNucleusPage('NUC-N001', 'pt-BR')!;
    expect(html).toContain('dojo-practice__continue');
    expect(html).toContain('Próximo Núcleo');
    expect(html).toContain('NUC-N002');
  });

  it('does not describe continuation as completion or unlocking', () => {
    const html = renderDojoNucleusPage('NUC-N001', 'pt-BR')!;
    expect(html).not.toContain('Concluir prática');
    expect(html).not.toContain('Desbloquear');
    expect(html).not.toContain('XP');
  });
});
