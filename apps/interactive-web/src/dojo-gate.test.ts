import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('./styles.css', import.meta.url), 'utf8');

describe('R01/R02 Dojo Gate north star', () => {
  it('keeps the ceremonial header semantic and keyboard-native', () => {
    expect(html).toContain('<header class="site-header site-header--ceremonial">');
    expect(html).toContain('aria-label="Navegação principal"');
    expect(html).toContain('class="site-header__dojo-link" href="#taijifu-entry"');
    expect(html).toContain('/brand/omega1-master.svg');
    expect(css).toContain(':focus-visible');
  });

  it('preserves the canonical hero hierarchy as accessible HTML', () => {
    expect(html).toContain('data-visual-reference="R01 R02"');
    expect(html).toContain('<h1 id="dojo-title">TAIJIFU</h1>');
    expect(html).toContain('Arte Marcial de se Adaptar');
    expect(html).toContain('Firme na essência. Livre na forma.');
    expect(html).toContain('Mudar sem deixar de ser.');
    expect(html).toContain('>TAI</h2>');
    expect(html).toContain('>JI</h2>');
    expect(html).toContain('>FU</h2>');
    expect(html).toContain('class="primary-cta" href="#taijifu-entry">Entrar no Dojo</a>');
  });
});

describe('Dojo Gate resilience', () => {
  it('declares environmental media optional and supplies a deterministic fallback layer', () => {
    expect(html).toContain('class="dojo-gate__media" aria-hidden="true" data-media-state="fallback"');
    expect(html).toContain('data-media-optional="true"');
    expect(css).toContain('.dojo-gate__media');
    expect(css).toContain('linear-gradient');
  });

  it('keeps provenance and a scroll cue inside the primary threshold', () => {
    expect(html).toContain('class="dojo-gate__provenance"');
    expect(html).toContain('Criado por Miguel Da Vinci e Thales Walisson');
    expect(html).toContain('class="dojo-gate__scroll-cue" href="#taijifu-entry"');
  });

  it('defines compact and reduced-motion presentation gates', () => {
    expect(css).toContain('@media (max-width: 48rem)');
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
    expect(css).toContain('.dojo-triad');
    expect(css).toContain('grid-template-columns: 1fr');
  });
});

describe('North Star design-system authority', () => {
  it('consumes semantic design tokens rather than owning a second token vocabulary', () => {
    expect(css).toContain("@import '@taijifu/design-tokens/tokens.css';");
    expect(css).toContain('var(--tj-color-');
    expect(css).toContain('var(--tj-space-');
  });
});

describe('Dojo Gate focus contrast', () => {
  it('uses the paper token for focus rings on the dark threshold', () => {
    expect(css).toContain('.dojo-gate :focus-visible');
    expect(css).toContain('outline-color: var(--tj-color-paper)');
  });
});

describe('Web v1 canonical dojo entry', () => {
  it('exposes TAI, JI and FU as equal canonical entry paths', () => {
    expect(html).toContain('<nav class="dojo-entry__paths" aria-label="Conteúdo canônico disponível">');
    expect(html).toContain('href="/principios/tai/"');
    expect(html).toContain('href="/principios/ji/"');
    expect(html).toContain('href="/principios/fu/"');
    expect(html).toContain('class="dojo-entry__path dojo-entry__path--tai"');
    expect(html).toContain('class="dojo-entry__path dojo-entry__path--ji"');
    expect(html).toContain('class="dojo-entry__path dojo-entry__path--fu"');
  });

  it('keeps the triad visually three-column at the north-star layer', () => {
    expect(css).toContain('.dojo-triad {\n  grid-template-columns: repeat(3, minmax(0, 1fr));');
    expect(css).toContain('.dojo-entry__paths');
    expect(css).toContain('.dojo-entry__path--tai');
    expect(css).toContain('.dojo-entry__path--ji');
    expect(css).toContain('.dojo-entry__path--fu');
  });
});
