import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Web v1 visual design-system contract', () => {
  it('uses the shared TAIJIFU token layer without legacy visual aliases', () => {
    const styles = fs.readFileSync(path.join(process.cwd(), 'src/styles.css'), 'utf8');

    expect(styles).toContain("@import '@taijifu/design-tokens/tokens.css';");
    expect(styles).not.toContain('--color-paper:');
    expect(styles).not.toContain('--color-charcoal:');
    expect(styles).not.toContain('--color-ink:');
    expect(styles).not.toContain('--color-muted:');
    expect(styles).not.toContain('--color-tai:');
    expect(styles).not.toContain('--color-ji:');
    expect(styles).not.toContain('--color-fu:');
    expect(styles).not.toContain('--color-integration:');
    expect(styles).not.toContain('--space-page-gutter:');
    expect(styles).not.toContain('--space-1:');
    expect(styles).not.toContain('--space-2:');
    expect(styles).not.toContain('--space-3:');
    expect(styles).not.toContain('--space-4:');
    expect(styles).not.toContain('--space-6:');
    expect(styles).not.toContain('--motion-fast:');
    expect(styles).not.toContain('--motion-standard:');
    expect(styles.match(/--tj-color-(paper|ink|metal|tai|ji|fu|integration)\\s*:/g) ?? []).toHaveLength(0);
  });

  it('defines the Dojo Gate surface once', () => {
    const styles = fs.readFileSync(path.join(process.cwd(), 'src/styles.css'), 'utf8');
    const dojoGateDefinitions = styles.match(/(^|\n)\.dojo-gate\s*\{/g) ?? [];

    expect(dojoGateDefinitions).toHaveLength(1);
    expect(styles).toContain('grid-template-columns: repeat(3, minmax(0, 1fr));');
    expect(styles).toContain('font-family: var(--tj-font-display);');
  });
});
