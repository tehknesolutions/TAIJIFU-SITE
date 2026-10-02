import { describe, expect, it } from 'vitest';
import { renderCanonUIForLocale } from './canon-ui-render.js';

describe('canon UI locale contract', () => {
  it('renders the authoritative Canon UI in pt-BR', () => {
    const html = renderCanonUIForLocale('pt-BR');
    expect(html).toContain('TAI · JI · FU');
    expect(html).toContain('4 Bases');
    expect(html).toContain('10 Faixas · 32 Caminhos · 128 Núcleos');
    expect(html).not.toContain('canon-ui--pending');
  });

  it('keeps EN pending instead of exposing untranslated canonical content', () => {
    const html = renderCanonUIForLocale('en');
    expect(html).toContain('Canon content translation pending');
    expect(html).toContain('data-canon-localization="pending"');
    expect(html).not.toContain('10 Faixas · 32 Caminhos · 128 Núcleos');
  });

  it('keeps ES pending instead of exposing untranslated canonical content', () => {
    const html = renderCanonUIForLocale('es');
    expect(html).toContain('Traducción del contenido del Canon pendiente');
    expect(html).toContain('data-canon-localization="pending"');
    expect(html).not.toContain('10 Faixas · 32 Caminhos · 128 Núcleos');
  });
});
