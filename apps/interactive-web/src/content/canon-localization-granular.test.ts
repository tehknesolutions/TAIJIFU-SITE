import { describe, expect, it } from 'vitest';
import { canonCurriculumEntities } from './canon-snapshot.js';
import { canonLocalizationFor, localizeCanonEntity } from './canon-localization.js';

describe('TAIJIFU granular Canon localization', () => {
  it('creates exactly one localization record per stable Canon entity and locale', () => {
    for (const locale of ['pt-BR', 'en', 'es'] as const) {
      const records = canonLocalizationFor(locale);
      expect(records.length).toBe(canonCurriculumEntities.length);
      expect(new Set(records.map((record) => record.entityId)).size).toBe(canonCurriculumEntities.length);
      expect(records.every((record) => canonCurriculumEntities.some((entity) => entity.id === record.entityId))).toBe(true);
    }
  });

  it('resolves every entity independently instead of using a global locale fallback', () => {
    for (const entity of canonCurriculumEntities) {
      expect(localizeCanonEntity(entity.id, 'pt-BR')).toMatchObject({
        kind: 'localized', entityId: entity.id, locale: 'pt-BR',
      });
      expect(localizeCanonEntity(entity.id, 'en')).toMatchObject({
        kind: 'pending', entityId: entity.id, locale: 'en',
      });
      expect(localizeCanonEntity(entity.id, 'es')).toMatchObject({
        kind: 'pending', entityId: entity.id, locale: 'es',
      });
    }
  });
});
