import { describe, expect, it } from 'vitest';
import { renderSemanticRoute } from '../semantic-site.js';

describe('personalized training semantic surface', () => {
  it('renders a dedicated progressively enhanced training surface', () => {
    const html = renderSemanticRoute('/pt-br/treino-personalizado/');

    expect(html).not.toBeNull();
    expect(html).toContain('content-page--training');
    expect(html).toContain('data-surface="personalized-training"');
    expect(html).toContain('data-training-root');
  });

  it('exposes the canonical TAI JI FU journey and accessible native form structure', () => {
    const html = renderSemanticRoute('/pt-br/treino-personalizado/') ?? '';

    expect(html).toContain('TAI');
    expect(html).toContain('JI');
    expect(html).toContain('FU');
    expect(html).toContain('<fieldset');
    expect(html).toContain('<legend');
    expect(html).toContain('aria-live="polite"');
  });

  it('preserves canonical explanatory content and the non-medical boundary without JavaScript', () => {
    const html = renderSemanticRoute('/pt-br/treino-personalizado/') ?? '';

    expect(html).toContain('Fonte de autoridade:');
    expect(html.toLowerCase()).toContain('diagnóstico médico');
    expect(html).toContain('TAI / Estado');
    expect(html).toContain('JI / Adaptação');
    expect(html).toContain('FU / Manifestação');
  });
});
