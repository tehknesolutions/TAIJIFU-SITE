import { describe, expect, it } from 'vitest';
import {
  canonicalRedirectFor,
  renderSemanticRoute,
} from './semantic-site.js';

describe('semantic TAIJIFU site', () => {
  it('renders a canonical route without inventing unrecovered body copy', () => {
    const html = renderSemanticRoute('/manifesto/');

    expect(html).toContain('<h1 id="page-title">Manifesto</h1>');
    expect(html).toContain('O corpo oficial desta seção está em reconciliação');
    expect(html).toContain('href="/fundamentos/"');
  });

  it('maps legacy paths to current canonical destinations', () => {
    expect(canonicalRedirectFor('/filosofia/')).toBe('/fundamentos/');
  });

  it('leaves the homepage to the Dojo Gate document', () => {
    expect(renderSemanticRoute('/')).toBeNull();
  });
});
