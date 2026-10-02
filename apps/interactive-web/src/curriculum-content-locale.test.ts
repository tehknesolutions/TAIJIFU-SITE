import { describe, expect, it } from 'vitest';
import { renderSemanticRoute } from './semantic-site.js';

describe('curriculum detail locale projection', () => {
  it('localizes the curriculum shell in English', () => {
    const html = renderSemanticRoute('/en/method/') ?? '';
    expect(html).toContain('TAIJIFU curriculum');
    expect(html).toContain('Nuclei');
    expect(html).not.toContain('Currículo TAIJIFU');
  });

  it('localizes the curriculum shell in Spanish', () => {
    const html = renderSemanticRoute('/es/metodo/') ?? '';
    expect(html).toContain('Currículo TAIJIFU');
    expect(html).toContain('Núcleos');
    expect(html).not.toContain('Caminhos');
  });
});
