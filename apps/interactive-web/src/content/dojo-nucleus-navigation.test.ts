import { describe, expect, it } from 'vitest';
import { getDojoNucleusNavigation } from './dojo-nucleus-navigation.js';

describe('Dojo nucleus sequence navigation', () => {
  it('provides the Canon hierarchy and adjacent nuclei', () => {
    const nav = getDojoNucleusNavigation('NUC-N001', 'pt-BR');
    expect(nav?.belt.name).toBeTruthy();
    expect(nav?.path.code).toBeTruthy();
    expect(nav?.previous).toBeNull();
    expect(nav?.next?.id).toBe('NUC-N002');
  });

  it('keeps the final nucleus bounded', () => {
    const nav = getDojoNucleusNavigation('NUC-N128', 'pt-BR');
    expect(nav?.previous?.id).toBe('NUC-N127');
    expect(nav?.next).toBeNull();
  });

  it('uses localized URLs for adjacent nuclei', () => {
    expect(getDojoNucleusNavigation('NUC-N001', 'en')?.next?.url).toMatch(/^\/en\/dojo\/nuclei\//);
    expect(getDojoNucleusNavigation('NUC-N001', 'es')?.next?.url).toMatch(/^\/es\/dojo\/nucleos\//);
  });
});


describe('path boundaries', () => {
  it('does not cross from one Canon path into another', () => {
    const boundary = ['NUC-N004', 'NUC-N005'].map((id) => getDojoNucleusNavigation(id, 'pt-BR'));
    expect(boundary[0]?.next?.id).not.toBe('NUC-N005');
    expect(boundary[1]?.previous?.id).not.toBe('NUC-N004');
  });
});
