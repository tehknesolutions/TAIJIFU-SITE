import { describe, expect, it } from 'vitest';
import { canonSnapshot } from './canon-snapshot.js';
import { renderCanonBases } from './canon-bases-render.js';

describe('Canon bases renderer', () => {
  it('projects every authoritative Base exactly once', () => {
    const html = renderCanonBases();
    expect(canonSnapshot.bases).toHaveLength(4);
    for (const base of canonSnapshot.bases) {
      expect(html.match(new RegExp(`data-base-id="${base.id}"`, 'g'))).toHaveLength(1);
      expect(html).toContain(base.name);
      expect(html).toContain(base.function);
    }
  });

  it('states the Canon relationship boundary explicitly', () => {
    expect(renderCanonBases()).toContain('não define uma relação Base → Faixa');
  });
});
