import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('./web-v1-consolidation.css', import.meta.url), 'utf8');

describe('Web V1 consolidation', () => {
  it('keeps one primary TAI JI FU narrative before canon', () => {
    expect(html).toContain('id="taijifu-core"');
    expect(html).not.toContain('id="taijifu-entry"');
    expect(html.indexOf('id="taijifu-core"')).toBeLessThan(html.indexOf('id="canon-curriculum"'));
  });

  it('creates an intentional bridge from canon into the interactive experience', () => {
    expect(html).toContain('class="experience-bridge"');
    expect(html.indexOf('class="experience-bridge"')).toBeLessThan(html.indexOf('id="interactive-experience"'));
  });

  it('styles unavailable spatial mode as a deliberate fallback', () => {
    expect(css).toContain('[data-surface-state="unavailable"]');
    expect(css).toContain('.experience-bridge');
  });
});
