import { describe, expect, it } from 'vitest';
import { renderCanonUIForLocale } from './canon-ui-render.js';

describe('TAIJIFU localized Canon UI', () => {
  it('renders the authoritative Canon UI in pt-BR', () => {
    const html = renderCanonUIForLocale('pt-BR');
    expect(html).toContain('Canon curricular');
    expect(html).toContain('4 Bases');
    expect(html).toContain('10 Faixas · 32 Caminhos · 128 Núcleos');
    expect(html).not.toContain('tradução pendente');
  });

  it('does not silently fall back to Portuguese for pending English or Spanish Canon', () => {
    for (const locale of ['en', 'es'] as const) {
      const html = renderCanonUIForLocale(locale);
      expect(html).toContain('data-canon-localization="pending"');
      expect(html).toContain('TAIJIFU-CANON-1.0');
      expect(html).not.toContain('Canon curricular');
      expect(html).not.toContain('10 Faixas · 32 Caminhos · 128 Núcleos');
    }
  });
});
