import { describe, expect, it } from 'vitest';
import { renderSemanticRoute } from './semantic-site.js';

describe('semantic navigation localization', () => {
  it('localizes principle navigation in English', () => {
    const html = renderSemanticRoute('/en/foundations/') ?? '';
    expect(html).toContain('aria-label="TAIJIFU principles"');
    expect(html).toContain('>Explore principle</span>');
    expect(html).not.toContain('Explorar princípio');
  });

  it('localizes principle navigation in Spanish', () => {
    const html = renderSemanticRoute('/es/fundamentos/') ?? '';
    expect(html).toContain('aria-label="Principios TAIJIFU"');
    expect(html).toContain('>Explorar principio</span>');
    expect(html).not.toContain('Explorar princípio');
  });
});
