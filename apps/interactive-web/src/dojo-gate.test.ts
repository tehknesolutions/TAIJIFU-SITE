import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const baseCss = readFileSync(new URL('./styles.css', import.meta.url), 'utf8');
const presentationCss = readFileSync(new URL('./r01-presentation.css', import.meta.url), 'utf8');
const css = `${baseCss}\n${presentationCss}`;

describe('R01 Dojo Gate semantic contract', () => {
  it('keeps the ceremonial header semantic and exposes the full threshold action', () => {
    expect(html).toContain('<header class="site-header site-header--ceremonial">');
    expect(html).toContain('aria-label="Navegação principal"');
    expect(html).toContain('class="site-header__dojo-link" href="#taijifu-entry">Entrar no Dojo</a>');
    expect(html).toContain('/brand/omega1-master.svg');
    expect(css).toContain(':focus-visible');
  });

  it('preserves the approved central identity and maxims as accessible HTML', () => {
    expect(html).toContain('data-visual-reference="R01"');
    expect(html).toContain('<h1 id="dojo-title">TAIJIFU</h1>');
    expect(html).toContain('ARTE MARCIAL DE SE ADAPTAR');
    expect(html).toContain('Firme na essência. Livre na forma.');
    expect(html).toContain('Mudar sem deixar de ser.');
    expect(html).toContain('class="dojo-gate__identity"');
  });

  it('makes TAI JI FU equal real links while preserving complete canonical labels', () => {
    expect(html).toContain('class="dojo-axis dojo-axis--tai" href="/principios/tai/"');
    expect(html).toContain('class="dojo-axis dojo-axis--ji" href="/principios/ji/"');
    expect(html).toContain('class="dojo-axis dojo-axis--fu" href="/principios/fu/"');
    expect(html).toContain('Essência · Permanência · Axis');
    expect(html).toContain('Discernimento · Adaptação · Nexus');
    expect(html).toContain('Manifestação · Fluxo · Flow');
    expect(html).toContain('O que deve permanecer?');
    expect(html).toContain('O que precisa mudar?');
    expect(html).toContain('Que forma deve existir agora?');
  });

  it('keeps the primary CTA, provenance and continuation cue inside the threshold', () => {
    expect(html).toContain('class="primary-cta" href="#taijifu-entry">ENTRAR NO DOJO</a>');
    expect(html).toContain('class="dojo-gate__provenance"');
    expect(html).toContain('Criado por Miguel Da Vinci e Thales Walisson');
    expect(html).toContain('class="dojo-gate__scroll-cue" href="#taijifu-entry"');
  });
});

describe('Dojo Gate resilience', () => {
  it('declares environmental media optional and supplies a presentation-layer fallback', () => {
    expect(html).toContain('class="dojo-gate__media" aria-hidden="true" data-media-state="fallback"');
    expect(html).toContain('data-media-optional="true"');
    expect(html).toContain('href="/src/r01-presentation.css"');
    expect(css).toContain('.dojo-gate__media');
  });

  it('keeps the environment independent from remote runtime media', () => {
    expect(presentationCss).toContain('--tj-presentation-environment-mode: fallback;');
    expect(presentationCss).toContain('.dojo-gate__media[data-media-state="fallback"]');
    expect(presentationCss).not.toMatch(/url\(\s*["']?https?:\/\//i);
    expect(presentationCss).not.toMatch(/@import\s+url\(\s*["']?https?:\/\//i);
  });

  it('keeps all meaningful R01 copy outside the decorative media node', () => {
    const mediaNode = html.match(/<div class="dojo-gate__media"[^>]*>([\s\S]*?)<\/div>/)?.[1] ?? '';
    expect(mediaNode.trim()).toBe('');
    expect(mediaNode).not.toContain('TAIJIFU');
    expect(mediaNode).not.toContain('TAI');
    expect(mediaNode).not.toContain('JI');
    expect(mediaNode).not.toContain('FU');
  });

  it('defines compact and reduced-motion presentation gates', () => {
    expect(css).toContain('@media (max-width: 48rem)');
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
    expect(css).toContain('.dojo-triad');
    expect(css).toContain('grid-template-columns: 1fr');
  });
});

describe('North Star design-system authority', () => {
  it('consumes semantic design tokens rather than owning a second canonical token vocabulary', () => {
    expect(baseCss).toContain("@import '@taijifu/design-tokens/tokens.css';");
    expect(css).toContain('var(--tj-color-');
    expect(css).toContain('var(--tj-space-');
  });

  it('scopes non-authoritative dojo atmosphere to presentation variables', () => {
    expect(presentationCss).toContain('--tj-presentation-dojo-depth-near:');
    expect(presentationCss).toContain('--tj-presentation-dojo-depth-mid:');
    expect(presentationCss).toContain('--tj-presentation-dojo-depth-far:');
    expect(presentationCss).toContain('--tj-presentation-threshold-warm:');
    expect(presentationCss).toContain('var(--tj-presentation-dojo-depth-near)');
    expect(presentationCss).toContain('var(--tj-presentation-threshold-warm)');
    expect(presentationCss).not.toContain('--tj-calibration-tai:');
    expect(presentationCss).not.toContain('--tj-calibration-ji:');
    expect(presentationCss).not.toContain('--tj-calibration-fu:');
    expect(presentationCss).not.toContain('--tj-calibration-integration:');
  });

  it('keeps the R01 desktop triad equal and presentation free of prohibited primitives', () => {
    expect(presentationCss).toContain('.dojo-triad { grid-template-columns: repeat(3, minmax(0, 1fr));');
    expect(presentationCss.toLowerCase()).not.toContain('glassmorphism');
    expect(presentationCss.toLowerCase()).not.toContain('neon');
    expect(presentationCss.toLowerCase()).not.toContain('drop-shadow(');
    expect(presentationCss.toLowerCase()).not.toContain('backdrop-filter');
  });
});

describe('Dojo Gate focus contrast', () => {
  it('uses the paper token for focus rings on the dark threshold', () => {
    expect(css).toContain('.dojo-gate :focus-visible');
    expect(css).toContain('outline-color: var(--tj-color-paper)');
  });
});

describe('Web v1 canonical dojo entry', () => {
  it('keeps the existing post-threshold canonical entry paths', () => {
    expect(html).toContain('<nav class="dojo-entry__paths" aria-label="Conteúdo canônico disponível">');
    expect(html).toContain('class="dojo-entry__path dojo-entry__path--tai"');
    expect(html).toContain('class="dojo-entry__path dojo-entry__path--ji"');
    expect(html).toContain('class="dojo-entry__path dojo-entry__path--fu"');
  });

  it('keeps the triad visually three-column at the north-star layer', () => {
    expect(presentationCss).toContain('.dojo-triad { grid-template-columns: repeat(3, minmax(0, 1fr));');
    expect(css).toContain('.dojo-entry__paths');
  });
});
