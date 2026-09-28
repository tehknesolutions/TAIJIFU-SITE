import basesJson from '../../../../canon/TAIJIFU-CANON-1.0/bases.json?raw';
import beltsJson from '../../../../canon/TAIJIFU-CANON-1.0/belts.json?raw';
import nucleiJson from '../../../../canon/TAIJIFU-CANON-1.0/nuclei.json?raw';
import pathsJson from '../../../../canon/TAIJIFU-CANON-1.0/paths.json?raw';
import releaseJson from '../../../../canon/TAIJIFU-CANON-1.0/release.json?raw';

export type CanonRelease = Readonly<{
  id: string;
  version: string;
  status: string;
  releasedAt: string;
  signature: string;
  sourceDocument: string;
}>;

export type CanonBase = Readonly<{
  id: string;
  name: string;
  color: string;
  element: string;
  animal: string;
  function: string;
}>;

export type CanonBelt = Readonly<{
  id: string;
  order: number;
  name: string;
  function: string;
  pathIds: readonly string[];
  status: string;
}>;

export type CanonPath = Readonly<{
  id: string;
  code: string;
  order: number;
  name: string;
  beltId: string;
  function: string;
  nucleusIds: readonly string[];
  status: string;
}>;

export type CanonNucleus = Readonly<{
  id: string;
  order: number;
  name: string;
}>;

export type CanonCurriculumEntity = Readonly<{
  id: string;
  label: string;
  kind: 'base' | 'belt' | 'path' | 'nucleus';
  parentId?: string;
  order: number;
}>;

function parseJson<T>(raw: string, label: string): T {
  try {
    return JSON.parse(raw) as T;
  } catch (error) {
    throw new Error(`Invalid ${label} Canon snapshot JSON`, { cause: error });
  }
}

function nucleusId(index: number): string {
  return `NUC-N${String(index + 1).padStart(3, '0')}`;
}

const release = Object.freeze(parseJson<CanonRelease>(releaseJson, 'release'));
const bases = Object.freeze(
  parseJson<CanonBase[]>(basesJson, 'bases').map((base) => Object.freeze(base)),
);
const belts = Object.freeze(
  parseJson<CanonBelt[]>(beltsJson, 'belts').map((belt) =>
    Object.freeze({ ...belt, pathIds: Object.freeze([...belt.pathIds]) }),
  ),
);
const paths = Object.freeze(
  parseJson<CanonPath[]>(pathsJson, 'paths').map((path) =>
    Object.freeze({ ...path, nucleusIds: Object.freeze([...path.nucleusIds]) }),
  ),
);
const nuclei = Object.freeze(
  parseJson<string[]>(nucleiJson, 'nuclei').map((name, index) =>
    Object.freeze({ id: nucleusId(index), order: index + 1, name }),
  ),
);

function assertSnapshotIntegrity(): void {
  if (release.id !== 'TAIJIFU-CANON-1.0') {
    throw new Error(`Unexpected Canon release: ${release.id}`);
  }
  if (bases.length !== 4 || belts.length !== 10 || paths.length !== 32 || nuclei.length !== 128) {
    throw new Error('TAIJIFU-CANON-1.0 snapshot count invariant failed');
  }

  const beltIds = new Set(belts.map((belt) => belt.id));
  const pathByCode = new Map(paths.map((path) => [path.code, path]));
  const nucleusIds = new Set(nuclei.map((nucleus) => nucleus.id));

  for (const belt of belts) {
    for (const pathCode of belt.pathIds) {
      const path = pathByCode.get(pathCode);
      if (!path || path.beltId !== belt.id) {
        throw new Error(`Orphan or mismatched Canon path ${pathCode} for ${belt.id}`);
      }
    }
  }

  for (const path of paths) {
    if (!beltIds.has(path.beltId)) {
      throw new Error(`Orphan Canon belt reference ${path.beltId} from ${path.id}`);
    }
    if (path.nucleusIds.length !== 4) {
      throw new Error(`Canon path ${path.id} must reference exactly four nuclei`);
    }
    for (const id of path.nucleusIds) {
      if (!nucleusIds.has(id)) {
        throw new Error(`Orphan Canon nucleus reference ${id} from ${path.id}`);
      }
    }
  }

  const black = belts.find((belt) => belt.id === 'BELT-BLACK');
  if (!black || black.pathIds.length !== 0) {
    throw new Error('Faixa Preta must remain the synthesis state without additional paths');
  }
}

assertSnapshotIntegrity();

export const canonSnapshot = Object.freeze({
  release,
  bases,
  belts,
  paths,
  nuclei,
});

const baseEntities: readonly CanonCurriculumEntity[] = bases.map((base, index) =>
  Object.freeze({
    id: base.id,
    label: base.name,
    kind: 'base' as const,
    order: index + 1,
  }),
);
const beltEntities: readonly CanonCurriculumEntity[] = belts.map((belt) =>
  Object.freeze({
    id: belt.id,
    label: belt.name,
    kind: 'belt' as const,
    order: belt.order,
  }),
);
const pathEntities: readonly CanonCurriculumEntity[] = paths.map((path) =>
  Object.freeze({
    id: path.id,
    label: `${path.code} · ${path.name}`,
    kind: 'path' as const,
    parentId: path.beltId,
    order: path.order,
  }),
);
const nucleusToPath = new Map<string, CanonPath>();
for (const path of paths) {
  for (const id of path.nucleusIds) nucleusToPath.set(id, path);
}
const nucleusEntities: readonly CanonCurriculumEntity[] = nuclei.map((nucleus) => {
  const parent = nucleusToPath.get(nucleus.id);
  if (!parent) throw new Error(`Orphan Canon nucleus ${nucleus.id}`);
  return Object.freeze({
    id: nucleus.id,
    label: nucleus.name,
    kind: 'nucleus' as const,
    parentId: parent.id,
    order: nucleus.order,
  });
});

export const canonCurriculumEntities: readonly CanonCurriculumEntity[] = Object.freeze([
  ...baseEntities,
  ...beltEntities,
  ...pathEntities,
  ...nucleusEntities,
]);

const entityById = new Map(canonCurriculumEntities.map((entity) => [entity.id, entity]));
const childrenByParent = new Map<string, CanonCurriculumEntity[]>();
for (const entity of canonCurriculumEntities) {
  if (!entity.parentId) continue;
  const children = childrenByParent.get(entity.parentId) ?? [];
  children.push(entity);
  childrenByParent.set(entity.parentId, children);
}

export function getCanonEntity(id: string): CanonCurriculumEntity | null {
  return entityById.get(id) ?? null;
}

export function getCanonChildren(parentId: string): readonly CanonCurriculumEntity[] {
  return Object.freeze([...(childrenByParent.get(parentId) ?? [])]);
}
