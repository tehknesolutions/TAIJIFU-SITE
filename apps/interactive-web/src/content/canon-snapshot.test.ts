import { describe, expect, it } from 'vitest';
import * as canonModule from './canon-snapshot.js';

function snapshotCollection(name: string): readonly unknown[] {
  const value = Reflect.get(canonModule.canonSnapshot, name);
  expect(Array.isArray(value)).toBe(true);
  return value as readonly unknown[];
}

describe('TAIJIFU-CANON-1.0 snapshot adapter', () => {
  it('loads the released Canon identity and exact curriculum counts', () => {
    expect(canonModule.canonSnapshot.release).toEqual(
      expect.objectContaining({
        id: 'TAIJIFU-CANON-1.0',
        version: '1.0',
        status: 'current',
        releasedAt: '2026-08-04',
      }),
    );

    expect(canonModule.canonSnapshot.bases).toHaveLength(4);
    expect(snapshotCollection('belts')).toHaveLength(10);
    expect(snapshotCollection('paths')).toHaveLength(32);
    expect(snapshotCollection('nuclei')).toHaveLength(128);
  });

  it('derives 174 unique curriculum entities with no orphan relations', () => {
    const entities = Reflect.get(canonModule, 'canonCurriculumEntities') as
      | readonly Readonly<{ id: string; parentId?: string }>[]
      | undefined;
    const getChildren = Reflect.get(canonModule, 'getCanonChildren') as
      | ((parentId: string) => readonly Readonly<{ id: string }>[]) 
      | undefined;

    expect(entities).toBeDefined();
    expect(getChildren).toBeTypeOf('function');
    expect(entities).toHaveLength(174);
    expect(new Set(entities?.map((entity) => entity.id)).size).toBe(174);

    const ids = new Set(entities?.map((entity) => entity.id));
    for (const entity of entities ?? []) {
      if (entity.parentId) expect(ids.has(entity.parentId)).toBe(true);
    }

    const belts = snapshotCollection('belts') as readonly Readonly<{
      id: string;
      pathIds: readonly string[];
    }>[];
    const paths = snapshotCollection('paths') as readonly Readonly<{
      id: string;
      code: string;
      beltId: string;
      nucleusIds: readonly string[];
    }>[];

    for (const belt of belts) {
      const children = getChildren?.(belt.id) ?? [];
      expect(children).toHaveLength(belt.pathIds.length);
    }

    for (const path of paths) {
      expect(path.nucleusIds).toHaveLength(4);
      expect(getChildren?.(path.id)).toHaveLength(4);
    }

    expect(getChildren?.('BELT-BLACK')).toEqual([]);
  });
});
