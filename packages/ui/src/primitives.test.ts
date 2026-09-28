import { describe, expect, it } from 'vitest';
import { Body, Button, Container, Display, Eyebrow, Heading, IconButton, MediaFrame, Meta, TextLink } from './index.js';

describe('TAIJIFU editorial primitives', () => {
  it('renders semantic text roles without route or curriculum knowledge', () => {
    expect(Display('TAIJIFU')).toBe('<h1 class="tj-display">TAIJIFU</h1>');
    expect(Heading('Dojo', 2)).toBe('<h2 class="tj-heading">Dojo</h2>');
    expect(Body('Arte & vida')).toBe('<p class="tj-body">Arte &amp; vida</p>');
    expect(Eyebrow('Capítulo')).toBe('<p class="tj-eyebrow">Capítulo</p>');
    expect(Meta('Desde 2026')).toBe('<small class="tj-meta">Desde 2026</small>');
  });

  it('renders accessible interactive controls and escapes content', () => {
    expect(Button('Entrar <agora>')).toBe('<button class="tj-button" type="button">Entrar &lt;agora&gt;</button>');
    expect(IconButton('Buscar', '⌕')).toContain('aria-label="Buscar"');
    expect(TextLink('/metodo/', 'Conheça o método')).toBe('<a class="tj-text-link" href="/metodo/">Conheça o método</a>');
  });

  it('keeps layout and media primitives content-driven', () => {
    expect(Container('<p>conteúdo</p>')).toBe('<div class="tj-container"><p>conteúdo</p></div>');
    expect(MediaFrame('/hero.webp', '')).toContain('alt=""');
    expect(MediaFrame('/omega.webp', 'Símbolo Ω1')).toContain('alt="Símbolo Ω1"');
  });
});