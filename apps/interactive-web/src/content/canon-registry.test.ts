import { describe, expect, it } from 'vitest';
import {
  canonRegistry,
  canonToExperienceNodes,
  getCanonCoverage,
} from './canon-registry.js';

describe('TAIJIFU canon registry', () => {
  it('keeps confirmed canonical identities and URLs unique', () => {
    const confirmed = canonRegistry.filter((item) => item.status === 'confirmed');
    const ids = confirmed.map((item) => item.id);
    const urls = confirmed.flatMap((item) =>
      item.canonicalUrl ? [item.canonicalUrl] : [],
    );

    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(urls).size).toBe(urls.length);
    expect(canonRegistry).toContainEqual(
      expect.objectContaining({
        id: 'tai',
        title: 'TAI',
        canonicalUrl: '/principios/tai/',
        status: 'confirmed',
      }),
    );
    expect(canonRegistry).toContainEqual(
      expect.objectContaining({ id: 'ji', canonicalUrl: '/principios/ji/', status: 'confirmed' }),
    );
    expect(canonRegistry).toContainEqual(
      expect.objectContaining({ id: 'fu', canonicalUrl: '/principios/fu/', status: 'confirmed' }),
    );
  });

  it('projects the canonical hierarchy into interactive nodes', () => {
    const nodes = canonToExperienceNodes();
    const parentOf = (id: string) => nodes.find((node) => node.id === id)?.parentId;

    expect(nodes[0]).toEqual(
      expect.objectContaining({ id: 'home', label: 'TAIJIFU', canonicalUrl: '/' }),
    );
    expect(parentOf('manifesto')).toBe('home');
    expect(parentOf('fundamentos')).toBe('home');
    expect(parentOf('tai')).toBe('fundamentos');
    expect(parentOf('ji')).toBe('fundamentos');
    expect(parentOf('fu')).toBe('fundamentos');
    expect(parentOf('influencias')).toBe('home');
    expect(parentOf('metodo')).toBe('influencias');
    expect(parentOf('graduacao')).toBe('metodo');
    expect(parentOf('referencias')).toBe('graduacao');
    expect(parentOf('historia')).toBe('referencias');
    expect(parentOf('treino-personalizado')).toBe('home');
  });

  it('keeps only unresolved semantic concepts out of the interactive graph', () => {
    const ids = canonToExperienceNodes().map((node) => node.id);
    expect(ids).toContain('ji');
    expect(ids).toContain('fu');
    expect(ids).not.toContain('integration');
  });

  it('reports route reconciliation separately from recovered official bodies', () => {
    const coverage = getCanonCoverage();

    expect(coverage.totalItems).toBe(canonRegistry.length);
    expect(coverage.reconciledRoutes).toBe(12);
    expect(coverage.recoveredOfficialBodies).toBe(11);
    expect(coverage.pendingOfficialBodies).toEqual(['referencias']);
    expect(coverage.unreconciledItems).toEqual(['integration']);
  });
});
