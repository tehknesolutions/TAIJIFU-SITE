import { describe, expect, it } from 'vitest';
import { renderDojoNucleusPage } from './dojo-nucleus-page.js';

describe('Dojo final practice boundary', () => {
  it('returns to the Dojo map when the final Nucleus has no further curriculum destination', () => {
    const html = renderDojoNucleusPage('NUC-N128', 'pt-BR')!;
    expect(html).toContain('dojo-practice__continue');
    expect(html).toContain('Mapa do Dojo');
    expect(html).toContain('href="/pt-br/dojo/"');
  });

  it('does not turn the curriculum boundary into a completion claim', () => {
    const html = renderDojoNucleusPage('NUC-N128', 'pt-BR')!;
    expect(html).not.toContain('Currículo concluído');
    expect(html).not.toContain('Mestre');
    expect(html).not.toContain('XP');
  });
});
