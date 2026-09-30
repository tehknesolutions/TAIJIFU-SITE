import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { renderCanonUI } from './content/canon-ui-render.js';

const baseCss = readFileSync(new URL('./styles.css', import.meta.url), 'utf8');
const canonCss = readFileSync(new URL('./canon-ui.css', import.meta.url), 'utf8');
const css = `${baseCss}\n${canonCss}`;
const html = renderCanonUI();

describe('Canon UI accessible presentation', () => {
  it('renders one canonical release with explicit textual hierarchy', () => {
    expect(html).toContain('data-canon-release="TAIJIFU-CANON-1.0"');
    expect(html).toContain('TAI · JI · FU');
    expect(html).toContain('4 Bases');
    expect(html).toContain('Graduação');
    expect(html).toContain('10 Faixas · 32 Caminhos · 128 Núcleos');
  });

  it('uses native keyboard-operable disclosure for belts and paths', () => {
    expect(html.match(/class="canon-belt"/g)).toHaveLength(10);
    expect(html.match(/class="canon-path"/g)).toHaveLength(32);
    expect(html.match(/<summary>/g)).toHaveLength(42);
  });

  it('keeps base meaning textual rather than color-only', () => {
    expect(html.match(/<dt>Cor<\/dt>/g)).toHaveLength(4);
    expect(html.match(/<dt>Elemento<\/dt>/g)).toHaveLength(4);
    expect(html.match(/<dt>Animal<\/dt>/g)).toHaveLength(4);
    expect(html.match(/<dt>Função<\/dt>/g)).toHaveLength(4);
  });

  it('styles the curriculum with semantic tokens and visible disclosure focus', () => {
    expect(canonCss).toContain('.canon-curriculum');
    expect(canonCss).toContain('.canon-ui');
    expect(canonCss).toContain('.canon-belt > summary');
    expect(canonCss).toContain('.canon-path > summary');
    expect(canonCss).toContain('.canon-ui summary:focus-visible');
    expect(css).toContain('var(--tj-color-');
    expect(css).toContain('var(--tj-space-');
  });

  it('adapts dense curriculum structures for compact screens', () => {
    expect(canonCss).toContain('@media (max-width: 48rem)');
    expect(canonCss).toContain('.canon-principles ul');
    expect(canonCss).toContain('.canon-bases > ul');
    expect(canonCss).toContain('.canon-graduation ol');
  });
});
