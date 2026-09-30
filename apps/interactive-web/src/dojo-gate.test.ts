import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const baseCss = readFileSync(new URL('./styles.css', import.meta.url), 'utf8');
const presentationCss = readFileSync(new URL('./r01-presentation.css', import.meta.url), 'utf8');
const main = readFileSync(new URL('./main.ts', import.meta.url), 'utf8');
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

describe('R01 official desktop composition calibration', () => {
  it('keeps the central mark dominant without swallowing the title lockup', () => {
    expect(presentationCss).toContain('width: clamp(13rem, 21vw, 19rem);');
    expect(presentationCss).toContain('font-size: clamp(3.7rem, 6.2vw, 6rem);');
  });

  it('keeps the side maxims as tall edge banners rather than central cards', () => {
    expect(presentationCss).toContain('inset: 16% 1.75% auto;');
    expect(presentationCss).toContain('grid-template-columns: minmax(8rem, 10.5rem) minmax(8rem, 10.5rem);');
    expect(presentationCss).toContain('min-height: 23rem;');
    expect(presentationCss).toContain('background: color-mix(in srgb, var(--tj-color-ink) 88%, transparent);');
  });

  it('keeps the triad compact and the CTA subordinate to the identity', () => {
    expect(presentationCss).toContain('width: min(32rem, 62%);');
    expect(presentationCss).toContain('min-height: 3.6rem;');
    expect(presentationCss).toContain('width: min(40rem, 100%);');
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
});

describe('R01 mobile and motion contract', () => {
  it('preserves the approved mobile hierarchy without desktop cropping', () => {
    expect(presentationCss).toContain('@media (max-width: 48rem)');
    expect(presentationCss).toContain('.dojo-gate__inner');
    expect(presentationCss).toContain('.dojo-gate__maxims');
    expect(presentationCss).toContain('.dojo-triad { grid-template-columns: 1fr; }');
    expect(presentationCss).toContain('.primary-cta');
    expect(presentationCss).toContain('.dojo-gate__footer');
    expect(presentationCss).toContain('min-height: auto;');
  });

  it('keeps touch targets usable in the compact threshold', () => {
    expect(presentationCss).toContain('min-height: 44px;');
    expect(presentationCss).toContain('.dojo-axis');
    expect(presentationCss).toContain('.site-header__dojo-link');
  });

  it('removes non-essential motion when reduced motion is requested', () => {
    expect(presentationCss).toContain('@media (prefers-reduced-motion: reduce)');
    expect(presentationCss).toContain('scroll-behavior: auto;');
    expect(presentationCss).toContain('animation: none;');
    expect(presentationCss).toContain('transition: none;');
  });
});

describe('R01 Experience Graph handoff', () => {
  it('targets the real interactive experience from the ceremonial CTA', () => {
    expect(html).toContain('id="interactive-experience"');
    expect(html).toContain('class="primary-cta" href="#interactive-experience">ENTRAR NO DOJO</a>');
    expect(html).toContain('class="dojo-gate__scroll-cue" href="#interactive-experience"');
  });

  it('focuses the canonical TAIJIFU graph node after the threshold handoff', () => {
    expect(main).toContain("querySelectorAll<HTMLAnchorElement>('[href=\"#interactive-experience\"]')");
    expect(main).toContain("runtime.focusNode('taijifu')");
    expect(main).toContain("document.querySelector<HTMLElement>('#interactive-experience')");
  });

  it('keeps canonical route links independent from the handoff', () => {
    expect(html).toContain('href="/principios/tai/"');
    expect(html).toContain('href="/principios/ji/"');
    expect(html).toContain('href="/principios/fu/"');
  });
});

describe('North Star design-system authority', () => {
  it('consumes semantic design tokens rather than owning a second canonical token vocabulary', () => {
    expect(baseCss).toContain("@import '@taijifu/design-tokens/tokens.css';");
    expect(css).toContain('var(--tj-color-');
    expect(css).toContain('var(--tj-space-');
  });

  it('scopes non-authoritative dojo atmosphere to presentation variables', () => {
    expect(presentationCss).not.toContain('--tj-calibration-tai:');
    expect(presentationCss).not.toContain('--tj-calibration-ji:');
    expect(presentationCss).not.toContain('--tj-calibration-fu:');
    expect(presentationCss).not.toContain('--tj-calibration-integration:');
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
});
