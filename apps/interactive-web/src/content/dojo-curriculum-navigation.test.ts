import { describe, expect, it } from 'vitest';
import { renderDojoNucleusPage } from './dojo-nucleus-page.js';

describe('Dojo curriculum orientation', () => {
  it('keeps the localized curriculum map reachable from every Nucleus page', () => {
    expect(renderDojoNucleusPage('NUC-N001', 'pt-BR')).toContain('href="/pt-br/dojo/"');
    expect(renderDojoNucleusPage('NUC-N001', 'en')).toContain('href="/en/dojo/"');
    expect(renderDojoNucleusPage('NUC-N001', 'es')).toContain('href="/es/dojo/"');
  });

  it('labels the curriculum return as Mapa do Dojo without inventing progression state', () => {
    const html = renderDojoNucleusPage('NUC-N001', 'pt-BR')!;
    expect(html).toContain('Mapa do Dojo');
    expect(html).not.toContain('XP');
    expect(html).not.toContain('desbloqueado');
  });
});
