import {
  canonCurriculumEntities,
  getCanonChildren,
  type CanonCurriculumEntity,
} from './canon-snapshot.js';

export type CanonExperienceNode = Readonly<{
  id: string;
  label: string;
  kind: CanonCurriculumEntity['kind'];
  parentId?: string;
  hasChildren: boolean;
}>;

function toExperienceNode(entity: CanonCurriculumEntity): CanonExperienceNode {
  return Object.freeze({
    id: entity.id,
    label: entity.label,
    kind: entity.kind,
    parentId: entity.parentId,
    hasChildren: getCanonChildren(entity.id).length > 0,
  });
}

export function projectCanonExperienceContext(
  parentId?: string,
): readonly CanonExperienceNode[] {
  const entities = parentId
    ? getCanonChildren(parentId)
    : canonCurriculumEntities.filter((entity) => entity.parentId === undefined);

  return Object.freeze(entities.map(toExperienceNode));
}
