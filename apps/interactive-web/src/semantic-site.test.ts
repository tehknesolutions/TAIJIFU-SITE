import { describe, expect, it } from 'vitest';
import {
  canonicalRedirectFor,
  renderInteractiveLegend,
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

  it('renders recovered Canon Bases instead of reconciliation copy', () => {
    const html = renderSemanticRoute('/influencias/');
    expect(html).toContain('Bases canônicas');
    expect(html).toContain('Integração/Sobrevivência');
    expect(html).not.toContain('ainda não recuperado');
  });

  it('renders curriculum as progressive disclosure instead of 174 top-level cards', () => {
    const method = renderSemanticRoute('/metodo/');
    const graduation = renderSemanticRoute('/graduacao/');

    expect(method).toContain('<details');
    expect(method).toContain('C01 · Presença e Segurança');
    expect(method).toContain('Presença Corporal');
    expect(method).toContain('Etiqueta, Parceiro e Espaço Seguro');
    expect(graduation).toContain('Branca · Entrar');
    expect(graduation).toContain('Preta · Sintetizar');
    expect(graduation).not.toContain('ainda não recuperado');
  });

  it('maps legacy paths to current canonical destinations', () => {
    expect(canonicalRedirectFor('/filosofia/')).toBe('/fundamentos/');
  });

  it('generates primary navigation from the canonical IA', () => {
    const navigation = renderPrimaryNavigation();
    expect(navigation).toContain('href="/manifesto/"');
    expect(navigation).toContain('href="/treino-personalizado/"');
  });

  it('renders a visible legend from the same canonical graph as Three.js', () => {
    const legend = renderInteractiveLegend();
    expect(legend).toContain('data-node-id="home"');
    expect(legend).toContain('data-node-id="tai"');
    expect(legend).toContain('href="/principios/tai/"');
  });

  it('leaves the homepage to the Dojo Gate document', () => {
    expect(renderSemanticRoute('/')).toBeNull();
  });
});
