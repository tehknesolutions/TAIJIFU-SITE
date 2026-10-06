import { describe, expect, it } from 'vitest';
import { canonSnapshot } from './canon-snapshot.js';
import { renderDojoEntryMap } from './dojo-entry-map.js';

describe('Dojo curriculum entry map', () => {
  it('renders every navigable Canon Belt and enters through its first Path and Nucleus', () => {
    const html = renderDojoEntryMap('pt-BR');
    const navigableBelts = canonSnapshot.belts.filter(({ pathIds }) => pathIds.length > 0);

    expect(html).toContain('Mapa do Dojo');
    expect(html).toContain('128 Núcleos');

    for (const belt of navigableBelts) {
      const firstPath = canonSnapshot.paths.find(({ beltId, code }) => beltId === belt.id && code === belt.pathIds[0])!;
      expect(html).toContain(belt.name);
      expect(html).toContain(firstPath.code);
      expect(html).toContain(firstPath.nucleusIds[0]);
    }
  });

  it('keeps Faixa Preta visible as synthesis without inventing a curriculum destination', () => {
    const html = renderDojoEntryMap('pt-BR');
    const black = canonSnapshot.belts.find(({ id }) => id === 'BELT-BLACK')!;
    expect(black.pathIds).toHaveLength(0);
    expect(html).toContain(black.name);
    expect(html).toContain('Síntese');
  });

  it('uses localized nucleus destinations without translating unapproved Canon labels', () => {
    expect(renderDojoEntryMap('en')).toContain('/en/dojo/nuclei/');
    expect(renderDojoEntryMap('es')).toContain('/es/dojo/nucleos/');
  });
});
