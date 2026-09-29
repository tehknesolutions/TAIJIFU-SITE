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

  it('renders a canonical journey overview before graduation detail', () => {
    const graduation = renderSemanticRoute('/graduacao/') ?? '';
    expect(graduation).toContain('id="curriculum-overview-title"');
    expect(graduation).toContain('Percurso canônico');
    expect(graduation).toContain('data-belt-id="BELT-WHITE"');
    expect(graduation).toContain('data-belt-id="BELT-BLACK"');
    expect(graduation).toContain('3 Caminhos · 12 Núcleos');
    expect(graduation).toContain('0 Caminhos · 0 Núcleos');
    expect(graduation).toContain('href="/metodo/"');
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
    expect(legend).toContain('href="/principios/ji/"');
    expect(legend).toContain('href="/principios/fu/"');
  });

  it('renders all three canonical principle routes with official triad content', () => {
    expect(renderSemanticRoute('/principios/tai/')).toContain('TAI — Essência / Permanência — Axis');
    expect(renderSemanticRoute('/principios/ji/')).toContain('JI — Discernimento / Adaptação — Nexus');
    expect(renderSemanticRoute('/principios/fu/')).toContain('FU — Manifestação / Fluxo — Flow');
  });

  it('leaves the homepage to the Dojo Gate document', () => {
    expect(renderSemanticRoute('/')).toBeNull();
  });
});


describe('contextual principle navigation', () => {
  it('keeps TAI, JI and FU inside Fundamentos and exposes adjacent canonical paths', () => {
    const tai = renderSemanticRoute('/principios/tai/') ?? '';
    const ji = renderSemanticRoute('/principios/ji/') ?? '';
    const fu = renderSemanticRoute('/principios/fu/') ?? '';
    expect(tai).toContain('href="/fundamentos/"');
    expect(tai).toContain('href="/principios/ji/" rel="next"');
    expect(ji).toContain('href="/principios/tai/" rel="prev"');
    expect(ji).toContain('href="/principios/fu/" rel="next"');
    expect(fu).toContain('href="/principios/ji/" rel="prev"');
    expect(fu).not.toContain('rel="next"');
  });
});


describe('fundamentos principle links', () => {
  it('exposes the three canonical principle paths from Fundamentos', () => {
    const page = renderSemanticRoute('/fundamentos/') ?? '';
    expect(page).toContain('aria-label="Princípios TAIJIFU"');
    expect(page).toContain('href="/principios/tai/"');
    expect(page).toContain('href="/principios/ji/"');
    expect(page).toContain('href="/principios/fu/"');
  });
});
