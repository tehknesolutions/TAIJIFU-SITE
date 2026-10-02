import { describe, expect, it } from 'vitest';
import { renderSemanticRoute } from './semantic-site.js';

describe('Influências canonical surface', () => {
  it('materializes the four Canon Bases as identifiable editorial cards', () => {
    const html = renderSemanticRoute('/influencias/') ?? '';

    expect(html).toContain('id="canon-bases-title"');
    expect(html).toContain('data-base-id="BASE-TAI"');
    expect(html).toContain('data-base-id="BASE-JI"');
    expect(html).toContain('data-base-id="BASE-FU"');
    expect(html).toContain('data-base-id="BASE-INTEGRATION"');
    expect(html).toContain('Presença, alcance, mobilidade, longa distância e decisão');
    expect(html).toContain('Estrutura, proximidade, controle, solo e sobrevivência no contato');
    expect(html).toContain('Fluxo, coordenação, transição, ritmo e visão do todo');
    expect(html).toContain('Síntese contextual, adaptação, continuidade e saída segura');
  });

  it('does not invent a Base-to-Belt relationship on Influências', () => {
    const html = renderSemanticRoute('/influencias/') ?? '';

    expect(html).toContain('a release não define uma relação Base → Faixa');
    expect(html).not.toContain('data-belt-id=');
  });

  it('continues the editorial journey from Influências into Método', () => {
    const html = renderSemanticRoute('/influencias/') ?? '';

    expect(html).toContain('aria-label="Jornada TAIJIFU"');
    expect(html).toContain('href="/pt-br/metodo/" data-context-relation="next"');
  });
});
