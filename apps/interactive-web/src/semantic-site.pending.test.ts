import { describe, expect, it } from 'vitest';
import { renderSemanticRoute } from './semantic-site.js';

describe('pending localized page state', () => {
  it('renders the Portuguese reconciliation message for pt-BR only when content is unavailable', () => {
    const html = renderSemanticRoute('/pt-br/manifesto/') ?? '';
    expect(html).toContain('TAIJIFU = Arte Marcial de se Adaptar.');
  });

  it('renders English pending copy without Portuguese leakage', () => {
    const html = renderSemanticRoute('/en/manifesto/') ?? '';
    expect(html).toContain('The official body for this section is pending translation.');
    expect(html).not.toContain('O corpo oficial desta seção');
  });

  it('renders Spanish pending copy without Portuguese leakage', () => {
    const html = renderSemanticRoute('/es/manifesto/') ?? '';
    expect(html).toContain('El contenido oficial de esta sección está pendiente de traducción.');
    expect(html).not.toContain('O corpo oficial desta seção');
  });
});
