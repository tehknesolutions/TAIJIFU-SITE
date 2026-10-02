import { describe, expect, it } from 'vitest';
import { renderSemanticRoute } from './semantic-site.js';

describe('Canon bases locale boundary', () => {
  it('renders authoritative Canon bases on release-ready pt-BR routes', () => {
    const html = renderSemanticRoute('/pt-br/metodo/') ?? '';
    expect(html).toContain('class="canon-bases"');
    expect(html).toContain('Bases canônicas');
  });

  it.each(['/en/method/', '/es/metodo/'])('does not leak pt-BR Canon bases into pending route %s', (path) => {
    const html = renderSemanticRoute(path) ?? '';
    expect(html).toContain('data-content-localization="pending"');
    expect(html).not.toContain('class="canon-bases"');
    expect(html).not.toContain('Bases canônicas');
    expect(html).not.toContain('Elemento');
  });
});
