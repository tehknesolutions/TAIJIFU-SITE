import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  Body, Button, Cluster, Container, Display, Eyebrow, FocusRing, Grid, Heading,
  IconButton, MediaFrame, Meta, Rule, Stack, Surface, TextLink,
} from './index.js';

const css = readFileSync(resolve(import.meta.dirname, 'primitives.css'), 'utf8');

describe('TAIJIFU editorial primitives', () => {
  it('characterizes all approved layout and text primitives', () => {
    expect(Container('<p>conteúdo</p>')).toBe('<div class="tj-container"><p>conteúdo</p></div>');
    expect(Stack('<p>stack</p>')).toBe('<div class="tj-stack"><p>stack</p></div>');
    expect(Cluster('<p>cluster</p>')).toBe('<div class="tj-cluster"><p>cluster</p></div>');
    expect(Grid('<p>grid</p>')).toBe('<div class="tj-grid"><p>grid</p></div>');
    expect(Rule()).toBe('<hr class="tj-rule">');
    expect(Surface('<p>surface</p>')).toBe('<section class="tj-surface"><p>surface</p></section>');
    expect(FocusRing('<button>focus</button>')).toBe('<span class="tj-focus-ring"><button>focus</button></span>');
    expect(Display('TAIJIFU')).toBe('<h1 class="tj-display">TAIJIFU</h1>');
    expect(Heading('Dojo', 2)).toBe('<h2 class="tj-heading">Dojo</h2>');
    expect(Heading('Núcleo', 6)).toBe('<h6 class="tj-heading">Núcleo</h6>');
    expect(Body('Arte & vida')).toBe('<p class="tj-body">Arte &amp; vida</p>');
    expect(Eyebrow('Capítulo')).toBe('<p class="tj-eyebrow">Capítulo</p>');
    expect(Meta('Desde 2026')).toBe('<small class="tj-meta">Desde 2026</small>');
  });

  it('preserves interaction semantics and escapes untrusted values', () => {
    expect(Button('Entrar <agora>')).toBe('<button class="tj-button" type="button">Entrar &lt;agora&gt;</button>');
    expect(Button('Salvar', 'submit')).toContain('type="submit"');
    expect(IconButton('Buscar "agora"', '<⌕>')).toBe('<button class="tj-icon-button" type="button" aria-label="Buscar &quot;agora&quot;"><span aria-hidden="true">&lt;⌕&gt;</span></button>');
    expect(TextLink('/metodo/?a=1&b=2', 'Conheça <o método>')).toBe('<a class="tj-text-link" href="/metodo/?a=1&amp;b=2">Conheça &lt;o método&gt;</a>');
  });

  it('escapes media attributes while preserving decorative empty alt text', () => {
    expect(MediaFrame('/hero.webp?a=1&b=2', '')).toContain('src="/hero.webp?a=1&amp;b=2" alt=""');
    expect(MediaFrame('/omega.webp', 'Símbolo <Ω1>')).toContain('alt="Símbolo &lt;Ω1&gt;"');
  });

  it('rejects missing accessible names for icon-only buttons', () => {
    expect(() => IconButton('', '⌕')).toThrow(TypeError);
    expect(() => IconButton('   ', '⌕')).toThrow(TypeError);
  });

  it('consumes semantic tokens and preserves keyboard focus visibility', () => {
    expect(css).toContain("@import '@taijifu/design-tokens/tokens.css';");
    expect(css).toMatch(/var\(--tj-[^)]+\)/);
    expect(css).toContain(':focus-visible');
  });

  it('removes non-essential primitive motion for reduced-motion users', () => {
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
    expect(css).toContain('transition: none;');
    expect(css).toContain('animation: none;');
  });

  it('keeps primitive CSS free from application-domain authority', () => {
    expect(css).not.toMatch(/canon|site-ia|curriculum|experience[-_ ]graph/i);
  });
});
