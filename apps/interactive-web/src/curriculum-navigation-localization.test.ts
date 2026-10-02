import { describe, expect, it } from 'vitest';
import { renderSemanticRoute } from './semantic-site.js';

describe('curriculum navigation localization', () => {
  it('uses localized curriculum labels and canonical pt-BR routes', () => {
    const html = renderSemanticRoute('/pt-br/graduacao/') ?? '';
    expect(html).toContain('aria-label="Explorar currículo"');
    expect(html).toContain('>Ver Graduação</a>');
    expect(html).toContain('href="/pt-br/metodo/"');
  });

  it('does not leak Portuguese curriculum UI into English', () => {
    const html = renderSemanticRoute('/en/graduation/') ?? '';
    expect(html).not.toContain('Explorar currículo');
    expect(html).not.toContain('Ver Graduação');
    expect(html).not.toContain('Explorar Método e Núcleos');
  });
});
