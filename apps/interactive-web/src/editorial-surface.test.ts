import { describe, expect, it } from 'vitest';
import { editorialSurfaceClass } from './editorial-surface.js';

describe('editorial surface hierarchy', () => {
  it('gives History an official editorial surface', () => {
    expect(editorialSurfaceClass('historia')).toBe('editorial-surface editorial-surface--official');
  });

  it('gives References a visible reconciliation surface', () => {
    expect(editorialSurfaceClass('referencias')).toBe('editorial-surface editorial-surface--pending');
  });

  it('does not classify unknown or SW routes', () => {
    expect(editorialSurfaceClass('treino-personalizado')).toBeNull();
  });
});


describe('semantic editorial rendering contract', () => {
  it('keeps References explicit when the official body is pending', async () => {
    const { renderSemanticRoute } = await import('./semantic-site.js');
    const html = renderSemanticRoute('/pt-br/referencias/');
    expect(html).toContain('O corpo oficial desta seção está em reconciliação.');
    expect(html).not.toContain('treino-personalizado');
  });

  it('keeps History on the official renderer path', async () => {
    const { renderSemanticRoute } = await import('./semantic-site.js');
    const html = renderSemanticRoute('/pt-br/historia/');
    expect(html).not.toContain('O corpo oficial desta seção está em reconciliação.');
    expect(html).toContain('content-page--historia');
  });

  it('does not render the excluded SW route', async () => {
    const { renderSemanticRoute } = await import('./semantic-site.js');
    expect(renderSemanticRoute('/pt-br/treino-personalizado/')).toBeNull();
  });
});
