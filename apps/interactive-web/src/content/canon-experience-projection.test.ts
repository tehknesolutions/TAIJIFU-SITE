import { describe, expect, it } from 'vitest';

async function loadProjection() {
  const modulePath = './canon-experience-projection.js';
  return import(modulePath).catch(() => null);
}

describe('Canon hierarchical experience projection', () => {
  it('keeps the root context bounded to Bases and Faixas', async () => {
    const module = await loadProjection();
    expect(module).not.toBeNull();

    const nodes = module?.projectCanonExperienceContext();
    expect(nodes).toHaveLength(14);
    expect(nodes?.filter((node) => node.kind === 'base')).toHaveLength(4);
    expect(nodes?.filter((node) => node.kind === 'belt')).toHaveLength(10);
    expect(nodes?.some((node) => node.kind === 'path')).toBe(false);
    expect(nodes?.every((node) => node.canonicalUrl === undefined)).toBe(true);
  });

  it('projects only the selected belt Caminhos', async () => {
    const module = await loadProjection();
    const nodes = module?.projectCanonExperienceContext('BELT-WHITE');

    expect(nodes).toHaveLength(3);
    expect(nodes?.map((node) => node.id)).toEqual([
      'PATH-C01',
      'PATH-C02',
      'PATH-C03',
    ]);
    expect(nodes?.every((node) => node.parentId === 'BELT-WHITE')).toBe(true);
  });

  it('projects exactly four Núcleos for a selected Caminho', async () => {
    const module = await loadProjection();
    const nodes = module?.projectCanonExperienceContext('PATH-C01');

    expect(nodes).toHaveLength(4);
    expect(nodes?.map((node) => node.id)).toEqual([
      'NUC-N001',
      'NUC-N002',
      'NUC-N003',
      'NUC-N004',
    ]);
    expect(nodes?.every((node) => node.kind === 'nucleus')).toBe(true);
  });
});
