import { describe, expect, it } from 'vitest';
import { renderDojoNucleusPage } from './dojo-nucleus-page.js';

describe('Dojo practice action localization', () => {
  it('renders English practice chrome on English routes', () => {
    const html = renderDojoNucleusPage('NUC-N001', 'en')!;
    expect(html).toContain('PRACTICE THIS NUCLEUS');
    expect(html).toContain('data-practice-exit-label="EXIT PRACTICE MODE"');
    expect(html).toContain('Next Nucleus');
    expect(html).not.toContain('PRATICAR ESTE NÚCLEO');
  });

  it('renders Spanish practice chrome on Spanish routes', () => {
    const html = renderDojoNucleusPage('NUC-N001', 'es')!;
    expect(html).toContain('PRACTICAR ESTE NÚCLEO');
    expect(html).toContain('data-practice-exit-label="SALIR DEL MODO PRÁCTICA"');
    expect(html).toContain('Siguiente Núcleo');
    expect(html).not.toContain('PRATICAR ESTE NÚCLEO');
  });

  it('renders Portuguese practice exit chrome on Portuguese routes', () => {
    const html = renderDojoNucleusPage('NUC-N001', 'pt-BR')!;
    expect(html).toContain('data-practice-exit-label="SAIR DO MODO PRÁTICA"');
  });

  it('localizes the final curriculum return label', () => {
    expect(renderDojoNucleusPage('NUC-N128', 'en')).toContain('Dojo Map');
    expect(renderDojoNucleusPage('NUC-N128', 'es')).toContain('Mapa del Dojo');
  });
});
