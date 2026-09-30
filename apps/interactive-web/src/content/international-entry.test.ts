import { describe, expect, it } from 'vitest';
import { renderInternationalEntry, renderLanguageSelector } from './international-entry.js';

describe('TAIJIFU international entry UI', () => {
  it('renders explicit entry points for all three locales', () => {
    const html = renderInternationalEntry();
    expect(html).toContain('href="/pt-br/manifesto/"');
    expect(html).toContain('href="/en/manifesto/"');
    expect(html).toContain('href="/es/manifesto/"');
    expect(html).toContain('Português (Brasil)');
    expect(html).toContain('English');
    expect(html).toContain('Español');
  });

  it('renders a route-equivalent accessible language selector', () => {
    const html = renderLanguageSelector('fundamentos', 'en');
    expect(html).toContain('aria-label="Language"');
    expect(html).toContain('aria-current="true"');
    expect(html).toContain('href="/pt-br/fundamentos/"');
    expect(html).toContain('href="/en/foundations/"');
    expect(html).toContain('href="/es/fundamentos/"');
  });
});
