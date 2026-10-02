import { describe, expect, it } from 'vitest';
import { renderSemanticRoute } from './semantic-site.js';

describe('primary navigation accessibility localization', () => {
  it('uses the English navigation label on English routes', () => {
    const html = renderSemanticRoute('/en/manifesto/') ?? '';
    expect(html).toContain('aria-label="TAIJIFU navigation"');
    expect(html).not.toContain('aria-label="Navegação TAIJIFU"');
  });

  it('uses the Spanish navigation label on Spanish routes', () => {
    const html = renderSemanticRoute('/es/manifesto/') ?? '';
    expect(html).toContain('aria-label="Navegación TAIJIFU"');
    expect(html).not.toContain('aria-label="Navegação TAIJIFU"');
  });
});
