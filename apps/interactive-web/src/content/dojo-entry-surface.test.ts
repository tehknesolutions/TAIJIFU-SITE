import { describe, expect, it } from 'vitest';
import { renderDojoEntryMap } from './dojo-entry-map.js';

describe('Dojo curriculum entry surface', () => {
  it('exposes a ceremonial entry hierarchy around the canonical map', () => {
    const html = renderDojoEntryMap('pt-BR');

    expect(html).toContain('dojo-entry-map__hero');
    expect(html).toContain('TAIJIFU Dojo');
    expect(html).toContain('10 Faixas');
    expect(html).toContain('32 Caminhos');
    expect(html).toContain('128 Núcleos');
    expect(html).toContain('dojo-entry-map__belts');
  });

  it('keeps curriculum orientation explicitly separate from personal progression', () => {
    const html = renderDojoEntryMap('pt-BR');
    expect(html).toContain('estrutura curricular');
    expect(html).toContain('não progresso pessoal');
  });
});
