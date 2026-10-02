import { describe, expect, it } from 'vitest';
import { primaryNavigationDefinitions, primaryNavigationIds, primaryNavigationProjection } from './primary-navigation.js';

describe('primary navigation canon', () => {
  it('keeps identity, editorial label and localized slug together', () => {
    expect(primaryNavigationIds).toEqual(primaryNavigationDefinitions.map((entry) => entry.id));
    expect(primaryNavigationProjection('manifesto', 'pt-BR')).toEqual({ label: 'Manifesto', slug: 'manifesto' });
    expect(primaryNavigationProjection('fundamentos', 'en')).toEqual({ label: 'Foundations', slug: 'foundations' });
    expect(primaryNavigationProjection('historia', 'es')).toEqual({ label: 'Historia', slug: 'historia' });
  });
});
