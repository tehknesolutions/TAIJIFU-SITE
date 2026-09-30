import type { canonSnapshot as CanonSnapshot } from './content/canon-snapshot.js';

type Snapshot = typeof CanonSnapshot;

export function buildPrincipleTriad(_snapshot: Snapshot) {
  return Object.freeze([
    Object.freeze({ name: 'Tai', function: 'Essência · Permanência · Axis', label: 'Tai · Essência · Permanência · Axis' }),
    Object.freeze({ name: 'Ji', function: 'Discernimento · Adaptação · Nexus', label: 'Ji · Discernimento · Adaptação · Nexus' }),
    Object.freeze({ name: 'Fu', function: 'Manifestação · Fluxo · Flow', label: 'Fu · Manifestação · Fluxo · Flow' }),
  ]);
}

export function buildFourBases(snapshot: Snapshot) {
  return Object.freeze(snapshot.bases.map((base) => Object.freeze({
    ...base,
    label: `${base.name} · ${base.element} · ${base.animal}`,
  })));
}

export function buildCanonHierarchy(snapshot: Snapshot) {
  const pathByCode = new Map(snapshot.paths.map((path) => [path.code, path]));
  const nucleusById = new Map(snapshot.nuclei.map((nucleus) => [nucleus.id, nucleus]));

  return Object.freeze(snapshot.belts.map((belt) => Object.freeze({
    ...belt,
    disclosureLabel: `${belt.order}. ${belt.name}`,
    paths: Object.freeze(belt.pathIds.map((pathCode) => {
      const path = pathByCode.get(pathCode);
      if (!path) throw new Error(`Missing Canon path ${pathCode}`);
      return Object.freeze({
        ...path,
        disclosureLabel: `${path.code} · ${path.name}`,
        nuclei: Object.freeze(path.nucleusIds.map((id) => {
          const nucleus = nucleusById.get(id);
          if (!nucleus) throw new Error(`Missing Canon nucleus ${id}`);
          return nucleus;
        })),
      });
    })),
  })));
}

export function buildGraduationTrack(snapshot: Snapshot) {
  return Object.freeze(snapshot.belts.map((belt) => Object.freeze({
    ...belt,
    pathCount: belt.pathIds.length,
    label: `${belt.order}. ${belt.name} · ${belt.function}`,
  })));
}
