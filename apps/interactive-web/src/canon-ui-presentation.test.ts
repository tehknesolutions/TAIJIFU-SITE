import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { renderCanonUI } from './content/canon-ui-render.js';

const css = readFileSync(new URL('./styles.css', import.meta.url), 'utf8');
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
    expect(css).toContain('.canon-curriculum');
    expect(css).toContain('.canon-ui');
    expect(css).toContain('.canon-belt > summary');
    expect(css).toContain('.canon-path > summary');
    expect(css).toContain('.canon-ui summary:focus-visible');
    expect(css).toContain('var(--tj-color-');
    expect(css).toContain('var(--tj-space-');
  });

  it('adapts dense curriculum structures for compact screens', () => {
    expect(css).toContain('@media (max-width: 48rem)');
    expect(css).toContain('.canon-principles ul');
    expect(css).toContain('.canon-bases > ul');
    expect(css).toContain('.canon-graduation ol');
  });
});
