import { describe, expect, it } from 'vitest';
import { renderSemanticRoute } from './semantic-site.js';

describe('localized semantic route content', () => {
  it('renders the approved pt-BR body', () => {
    const html = renderSemanticRoute('/pt-br/manifesto/') ?? '';
    expect(html).toContain('TAIJIFU = Arte Marcial de se Adaptar.');
  });

  it.each(['/en/manifesto/', '/es/manifesto/'])('does not silently reuse the pt-BR body for %s', (path) => {
    const html = renderSemanticRoute(path) ?? '';
    expect(html).toContain('O corpo oficial desta seção está em reconciliação.');
    expect(html).not.toContain('TAIJIFU = Arte Marcial de se Adaptar.');
  });
});
