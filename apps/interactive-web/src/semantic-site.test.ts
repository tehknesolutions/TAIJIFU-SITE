import { describe, expect, it } from 'vitest';
import {
  canonicalRedirectFor,
  renderPrimaryNavigation,
  renderSemanticRoute,
} from './semantic-site.js';

describe('semantic TAIJIFU site', () => {
  it('renders recovered official content on supported canonical routes', () => {
    const manifesto = renderSemanticRoute('/manifesto/');
    expect(manifesto).toContain('TAIJIFU = Arte Marcial de se Adaptar.');
    expect(manifesto).toContain('Firme na essência. Livre na forma.');

    const fundamentos = renderSemanticRoute('/fundamentos/');
    expect(fundamentos).toContain('O que deve permanecer?');
    expect(fundamentos).toContain('O que precisa mudar?');
    expect(fundamentos).toContain('Que forma deve existir agora?');
  });

  it('keeps an explicit reconciliation state where body copy is unsupported', () => {
    const html = renderSemanticRoute('/influencias/');
    expect(html).toContain('O corpo oficial desta seção está em reconciliação');
  });

  it('maps legacy paths to current canonical destinations', () => {
    expect(canonicalRedirectFor('/filosofia/')).toBe('/fundamentos/');
  });

  it('generates primary navigation from the canonical IA', () => {
    const navigation = renderPrimaryNavigation();
    expect(navigation).toContain('href="/manifesto/"');
    expect(navigation).toContain('href="/treino-personalizado/"');
  });

  it('leaves the homepage to the Dojo Gate document', () => {
    expect(renderSemanticRoute('/')).toBeNull();
  });
});
