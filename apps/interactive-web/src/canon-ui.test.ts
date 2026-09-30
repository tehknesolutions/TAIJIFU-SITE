import { describe, expect, it } from 'vitest';
import { canonSnapshot } from './content/canon-snapshot';
import {
  buildCanonHierarchy,
  buildFourBases,
  buildGraduationTrack,
  buildPrincipleTriad,
} from './canon-ui';

describe('Canon UI projections', () => {
  it('projects the principle triad with semantic labels independent from color', () => {
    const triad = buildPrincipleTriad(canonSnapshot);

    expect(triad).toHaveLength(3);
    expect(triad.map((item) => item.name)).toEqual(['Tai', 'Ji', 'Fu']);
    expect(triad.every((item) => item.function.length > 0)).toBe(true);
    expect(triad.every((item) => item.label.includes(item.name))).toBe(true);
  });

  it('projects all four Bases from the authoritative snapshot', () => {
    const bases = buildFourBases(canonSnapshot);

    expect(bases).toHaveLength(4);
    expect(bases.map((base) => base.id)).toEqual(canonSnapshot.bases.map((base) => base.id));
    expect(bases.every((base) => base.label.includes(base.name))).toBe(true);
    expect(bases.every((base) => base.element.length > 0 && base.animal.length > 0)).toBe(true);
  });

  it('projects the complete Faixa → Caminho → Núcleo disclosure hierarchy', () => {
    const hierarchy = buildCanonHierarchy(canonSnapshot);

    expect(hierarchy).toHaveLength(10);
    expect(hierarchy.flatMap((belt) => belt.paths)).toHaveLength(32);
    expect(hierarchy.flatMap((belt) => belt.paths).flatMap((path) => path.nuclei)).toHaveLength(128);
    expect(
      hierarchy.flatMap((belt) => belt.paths).every((path) => path.nuclei.length === 4),
    ).toBe(true);
    expect(hierarchy.every((belt) => belt.disclosureLabel.includes(belt.name))).toBe(true);
    expect(
      hierarchy.flatMap((belt) => belt.paths).every((path) => path.disclosureLabel.includes(path.code)),
    ).toBe(true);
  });

  it('keeps graduation ordered and preserves Black Belt as synthesis', () => {
    const graduation = buildGraduationTrack(canonSnapshot);

    expect(graduation).toHaveLength(10);
    expect(graduation.map((belt) => belt.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(graduation.at(-1)?.id).toBe('BELT-BLACK');
    expect(graduation.at(-1)?.pathCount).toBe(0);
    expect(graduation.every((belt) => belt.label.includes(belt.name))).toBe(true);
  });

  it('does not manufacture routes in the Canon projection layer', () => {
    const serialized = JSON.stringify({
      triad: buildPrincipleTriad(canonSnapshot),
      bases: buildFourBases(canonSnapshot),
      hierarchy: buildCanonHierarchy(canonSnapshot),
      graduation: buildGraduationTrack(canonSnapshot),
    });

    expect(serialized).not.toContain('href');
    expect(serialized).not.toContain('route');
    expect(serialized).not.toContain('url');
  });
});
