import { describe, expect, it } from 'vitest';
import { canonicalRedirectFor, renderInteractiveLegend, renderPrimaryNavigation, renderSemanticRoute } from './semantic-site.js';

describe('semantic TAIJIFU site', () => {
  it('renders recovered official content on supported canonical routes', () => { const manifesto = renderSemanticRoute('/manifesto/'); expect(manifesto).toContain('TAIJIFU = Arte Marcial de se Adaptar.'); expect(manifesto).toContain('Firme na essência. Livre na forma.'); const fundamentos = renderSemanticRoute('/fundamentos/'); expect(fundamentos).toContain('O que deve permanecer?'); expect(fundamentos).toContain('O que precisa mudar?'); expect(fundamentos).toContain('Que forma deve existir agora?'); });
  it('marks Manifesto as the canonical declaration surface', () => {
    const manifesto = renderSemanticRoute('/manifesto/') ?? '';
    expect(manifesto).toContain('class="content-page content-page--manifesto"');
    expect(manifesto).toContain('data-surface="manifesto"');
    expect(manifesto).toContain('TAIJIFU = Arte Marcial de se Adaptar.');
    expect(manifesto).toContain('Firme na essência. Livre na forma.');
    expect(manifesto).toContain('Mudar sem deixar de ser.');
  });
  it('renders recovered Canon Bases instead of reconciliation copy', () => { const html = renderSemanticRoute('/influencias/'); expect(html).toContain('Bases canônicas'); expect(html).toContain('Integração/Sobrevivência'); expect(html).not.toContain('ainda não recuperado'); });
  it('materializes the four canonical Bases without inventing Base-to-Belt relationships', () => { const method = renderSemanticRoute('/metodo/') ?? ''; expect(method).toContain('id="canon-bases-title"'); expect(method).toContain('data-base-id="BASE-TAI"'); expect(method).toContain('data-base-id="BASE-JI"'); expect(method).toContain('data-base-id="BASE-FU"'); expect(method).toContain('data-base-id="BASE-INTEGRATION"'); expect(method).toContain('a release não define uma relação Base → Faixa'); });
  it('renders curriculum as progressive disclosure instead of 174 top-level cards', () => { const method = renderSemanticRoute('/metodo/'); const graduation = renderSemanticRoute('/graduacao/'); expect(method).toContain('<details'); expect(method).toContain('C01 · Presença e Segurança'); expect(method).toContain('Presença Corporal'); expect(method).toContain('Etiqueta, Parceiro e Espaço Seguro'); expect(graduation).toContain('Branca · Entrar'); expect(graduation).toContain('Preta · Sintetizar'); expect(graduation).not.toContain('ainda não recuperado'); });
  it('exposes the complete canonical release count and stable entity IDs', () => { const method = renderSemanticRoute('/metodo/') ?? ''; expect(method).toContain('174 entidades nesta release: 4 Bases, 10 Faixas, 32 Caminhos e 128 Núcleos.'); expect(method).toContain('data-belt-id="BELT-WHITE"'); expect(method).toContain('data-path-id="PATH-C01"'); expect(method).toContain('data-nucleus-index="1"'); });
  it('keeps canonical nucleus counts on Graduação without disclosing nucleus names', () => { const graduation = renderSemanticRoute('/graduacao/') ?? ''; expect(graduation).toContain('C01 · Presença e Segurança · 4 Núcleos'); expect(graduation).not.toContain('Presença Corporal'); });
  it('renders a canonical journey overview before graduation detail', () => { const graduation = renderSemanticRoute('/graduacao/') ?? ''; expect(graduation).toContain('id="curriculum-overview-title"'); expect(graduation).toContain('Percurso canônico'); expect(graduation).toContain('data-belt-id="BELT-WHITE"'); expect(graduation).toContain('data-belt-id="BELT-BLACK"'); expect(graduation).toContain('3 Caminhos · 12 Núcleos'); expect(graduation).toContain('0 Caminhos · 0 Núcleos'); expect(graduation).toContain('href="/metodo/"'); });
  it('maps legacy paths to current canonical destinations', () => { expect(canonicalRedirectFor('/filosofia/')).toBe('/pt-br/fundamentos/'); });
  it('generates primary navigation from the canonical IA', () => { const navigation = renderPrimaryNavigation(); expect(navigation).toContain('href="/pt-br/manifesto/"'); expect(navigation).toContain('>Manifesto</a>'); expect(navigation).toContain('>História</a>'); expect(navigation).not.toContain('treino-personalizado'); });
  it('uses governed editorial labels for the primary navigation', () => { const navigation = renderPrimaryNavigation('pt-BR'); expect(navigation).toContain('>Manifesto</a>'); expect(navigation).toContain('>Fundamentos</a>'); expect(navigation).toContain('>Influências</a>'); expect(navigation).toContain('>Método</a>'); expect(navigation).toContain('>Graduação</a>'); expect(navigation).toContain('>Referências</a>'); expect(navigation).toContain('>História</a>'); });
  it.each(['en', 'es'] as const)('does not silently fall back for %s primary navigation', (locale) => { expect(renderPrimaryNavigation(locale)).toBe(''); });
  it('renders the primary navigation against the active localized route set', () => { const navigation = renderPrimaryNavigation('pt-BR'); expect(navigation).toContain('href="/pt-br/manifesto/"'); expect(navigation).toContain('href="/pt-br/historia/"'); });
  it('renders a visible legend from the same canonical graph as Three.js', () => { const legend = renderInteractiveLegend(); expect(legend).toContain('data-node-id="manifesto"'); expect(legend).toContain('data-node-id="tai"'); expect(legend).toContain('href="/pt-br/principios/tai/"'); expect(legend).toContain('href="/pt-br/principios/ji/"'); expect(legend).toContain('href="/pt-br/principios/fu/"'); });
  it('renders all three canonical principle routes with official triad content', () => { expect(renderSemanticRoute('/principios/tai/')).toContain('TAI — Essência / Permanência — Axis'); expect(renderSemanticRoute('/principios/ji/')).toContain('JI — Discernimento / Adaptação — Nexus'); expect(renderSemanticRoute('/principios/fu/')).toContain('FU — Manifestação / Fluxo — Flow'); });
  it('marks TAI, JI and FU as principle-specific semantic surfaces', () => {
    const tai = renderSemanticRoute('/principios/tai/') ?? '';
    const ji = renderSemanticRoute('/principios/ji/') ?? '';
    const fu = renderSemanticRoute('/principios/fu/') ?? '';

    expect(tai).toContain('class="content-page content-page--principle content-page--tai"');
    expect(tai).toContain('data-principle="tai"');
    expect(ji).toContain('class="content-page content-page--principle content-page--ji"');
    expect(ji).toContain('data-principle="ji"');
    expect(fu).toContain('class="content-page content-page--principle content-page--fu"');
    expect(fu).toContain('data-principle="fu"');
  });
  it('leaves the homepage to the Dojo Gate document', () => { expect(renderSemanticRoute('/')).toBeNull(); });
});

describe('Experience Graph contextual navigation', () => {
  it('renders Parent, Previous and Next for the editorial curriculum journey', () => { const graduation = renderSemanticRoute('/graduacao/') ?? ''; expect(graduation).toContain('aria-label="Jornada TAIJIFU"'); expect(graduation).toContain('href="/pt-br/metodo/" data-context-relation="parent"'); expect(graduation).toContain('href="/pt-br/metodo/" data-context-relation="previous"'); expect(graduation).toContain('href="/pt-br/referencias/" data-context-relation="next"'); });
  it('keeps TAI, JI and FU inside Fundamentos and inside the triad sequence', () => { const tai = renderSemanticRoute('/principios/tai/') ?? ''; const ji = renderSemanticRoute('/principios/ji/') ?? ''; const fu = renderSemanticRoute('/principios/fu/') ?? ''; expect(tai).toContain('href="/pt-br/fundamentos/" data-context-relation="parent"'); expect(tai).toContain('href="/pt-br/principios/ji/" data-context-relation="next"'); expect(ji).toContain('href="/pt-br/principios/tai/" data-context-relation="previous"'); expect(ji).toContain('href="/pt-br/principios/fu/" data-context-relation="next"'); expect(fu).toContain('href="/pt-br/principios/ji/" data-context-relation="previous"'); expect(fu).not.toContain('data-context-relation="next"'); });
});

  it('keeps the TAI JI FU principle links semantically equivalent while exposing route location', () => { const page = renderSemanticRoute('/fundamentos/') ?? ''; expect(page).toContain('class="principle-links__item principle-links__item--tai"'); expect(page).toContain('class="principle-links__item principle-links__item--ji"'); expect(page).toContain('class="principle-links__item principle-links__item--fu"'); expect(page).not.toContain('aria-current="page"'); });
describe('fundamentos principle links', () => { it('exposes the three canonical principle paths from Fundamentos', () => { const page = renderSemanticRoute('/fundamentos/') ?? ''; expect(page).toContain('aria-label="Princípios TAIJIFU"'); expect(page).toContain('href="/pt-br/principios/tai/"'); expect(page).toContain('href="/pt-br/principios/ji/"'); expect(page).toContain('href="/pt-br/principios/fu/"'); }); });
