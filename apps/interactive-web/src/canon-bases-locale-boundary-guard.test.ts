import { describe, expect, it } from 'vitest';
import { renderSemanticRoute } from './semantic-site.js';

describe('Canon bases locale boundary guard', () => {
  it('keeps pt-BR Canon bases authoritative', () => {
    expect(renderSemanticRoute('/pt-br/metodo/') ?? '').toContain('class="canon-bases"');
  });
  it.each(['/en/method/', '/es/metodo/'])('keeps Canon bases out of pending %s', (path) => {
    const html = renderSemanticRoute(path) ?? '';
    expect(html).toContain('data-content-localization="pending"');
    expect(html).not.toContain('class="canon-bases"');
    expect(html).not.toContain('Bases canônicas');
  });
});
