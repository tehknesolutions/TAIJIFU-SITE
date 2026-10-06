import { describe, expect, it } from 'vitest';
import { renderDojoNucleusPage } from './dojo-nucleus-page.js';

describe('Dojo nucleus structural localization', () => {
  it('localizes English structural chrome without translating recovered instruction', () => {
    const html = renderDojoNucleusPage('NUC-N004', 'en')!;
    expect(html).toContain('View full map');
    expect(html).toContain('Belts');
    expect(html).toContain('Paths');
    expect(html).toContain('Summary');
    expect(html).toContain('End of this Path');
    expect(html).toContain('Next Path');
    expect(html).toContain('Source:');
    expect(html).toContain('Revision:');
    expect(html).not.toContain('Ver mapa completo');
    expect(html).not.toContain('Fim deste Caminho');
  });

  it('localizes Spanish structural chrome without translating recovered instruction', () => {
    const html = renderDojoNucleusPage('NUC-N004', 'es')!;
    expect(html).toContain('Ver mapa completo');
    expect(html).toContain('Cinturones');
    expect(html).toContain('Caminos');
    expect(html).toContain('Resumen');
    expect(html).toContain('Fin de este Camino');
    expect(html).toContain('Siguiente Camino');
    expect(html).toContain('Fuente:');
    expect(html).toContain('Revisión:');
    expect(html).not.toContain('Fim deste Caminho');
  });
});
