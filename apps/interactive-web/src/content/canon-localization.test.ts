import { describe, expect, it } from 'vitest';
import { canonCurriculumEntities } from './canon-snapshot.js';
import { canonLocalizationFor, isReleaseReadyTranslation, localizeCanonEntity } from './canon-localization.js';

describe('TAIJIFU Canon localization governance', () => {
  it('preserves Canon identity and structure in the authoritative pt-BR projection', () => {
    const records = canonLocalizationFor('pt-BR');
    expect(records.map((record) => record.entityId)).toEqual(canonCurriculumEntities.map((entity) => entity.id));
    expect(records.every((record) => record.locale === 'pt-BR' && record.status === 'approved')).toBe(true);
  });

  it('keeps unreviewed English and Spanish Canon content explicitly pending', () => {
    expect(canonLocalizationFor('en').every((record) => record.status === 'pending' && record.text === null)).toBe(true);
    expect(canonLocalizationFor('es').every((record) => record.status === 'pending' && record.text === null)).toBe(true);
  });

  it('only treats reviewed or approved translations as release-ready', () => {
    expect(isReleaseReadyTranslation('pending')).toBe(false);
    expect(isReleaseReadyTranslation('translated')).toBe(false);
    expect(isReleaseReadyTranslation('reviewed')).toBe(true);
    expect(isReleaseReadyTranslation('approved')).toBe(true);
  });

  it('returns an explicit unavailable projection instead of mixed-language fallback', () => {
    const source = canonCurriculumEntities[0];
    expect(localizeCanonEntity(source.id, 'en')).toEqual({ kind: 'pending', entityId: source.id, locale: 'en' });
    expect(localizeCanonEntity(source.id, 'pt-BR')).toMatchObject({ kind: 'localized', entityId: source.id, locale: 'pt-BR', text: source.label });
  });
});
