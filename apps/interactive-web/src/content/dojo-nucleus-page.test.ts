import { describe, expect, it } from 'vitest';
import { renderDojoNucleusPage } from './dojo-nucleus-page.js';

describe('Dojo nucleus page', () => {
  it('renders a canonical Portuguese nucleus page with recovered instruction', () => {
    const html = renderDojoNucleusPage('NUC-N001', 'pt-BR');
    expect(html).toContain('NUC-N001');
    expect(html).toContain('Resumo');
    expect(html).toContain('Prática');
    expect(html).toContain('legacy-candidate');
    expect(html).toContain('Núcleo');
    expect(html).toContain('N002');
    expect(html).toContain('Núcleo 1/4');
    expect(html).toContain('N004');
  });

  it('renders a focusable practice surface without inventing practice metadata', () => {
    const html = renderDojoNucleusPage('NUC-N001', 'pt-BR')!;
    expect(html).toContain('class="dojo-practice"');
    expect(html).toContain('data-practice-authority="legacy-candidate"');
    expect(html).toContain('PRATICAR ESTE NÚCLEO');
    expect(html).toContain('data-practice-exit-label="SAIR DO MODO PRÁTICA"');
    expect(html).toContain('Núcleo 1/4');
    expect(html).not.toContain('Entrar no modo prática');
    expect(html).not.toContain('repetições');
    expect(html).not.toContain('duração');
    expect(html).not.toContain('concluído');
  });

  it('does not invent an EN or ES translation', () => {
    expect(renderDojoNucleusPage('NUC-N001', 'en')).toContain('Tradução oficial');
    expect(renderDojoNucleusPage('NUC-N001', 'es')).toContain('Tradução oficial');
  });

  it('returns null for an unknown nucleus', () => {
    expect(renderDojoNucleusPage('NUC-N999', 'pt-BR')).toBeNull();
  });
});
