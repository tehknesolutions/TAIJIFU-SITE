import { describe, expect, it } from 'vitest';
import { renderSemanticRoute } from './semantic-site.js';

describe('curriculum detail locale shell', () => {
  it('localizes English UI labels without translating canonical entity data', () => {
    const html = renderSemanticRoute('/en/method/') ?? '';
    expect(html).toContain('aria-label="TAIJIFU curriculum"');
    expect(html).toContain('Nuclei');
    expect(html).not.toContain('aria-label="Currículo TAIJIFU"');
  });

  it('localizes Spanish UI labels without translating canonical entity data', () => {
    const html = renderSemanticRoute('/es/metodo/') ?? '';
    expect(html).toContain('aria-label="Currículo TAIJIFU"');
    expect(html).toContain('Núcleos');
    expect(html).not.toContain('Caminhos');
  });
});
