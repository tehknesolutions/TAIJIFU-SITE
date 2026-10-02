import { describe, expect, it } from 'vitest';
import { buildLocalizedExperienceNodes } from './content/canon-registry.js';

describe('interactive locale propagation contract', () => {
  it('builds the interactive graph from the active locale instead of an implicit default', () => {
    const ptBr = buildLocalizedExperienceNodes('pt-BR');
    const en = buildLocalizedExperienceNodes('en');

    expect(ptBr.find((node) => node.id === 'manifesto')?.label).toBe('Manifesto');
    expect(en.map((node) => node.id)).not.toContain('manifesto');
  });
});
