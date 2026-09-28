import { describe, expect, it } from 'vitest';
import {
  getOfficialPageContent,
  officialPageContent,
} from './official-page-content.js';

describe('official page content', () => {
  it('recovers current official content without filling unsupported routes', () => {
    expect(getOfficialPageContent('manifesto')?.lead).toBe(
      'TAIJIFU = Arte Marcial de se Adaptar.',
    );
    expect(getOfficialPageContent('fundamentos')).not.toBeNull();
    expect(getOfficialPageContent('influencias')?.lead).toContain('4 Bases');
    expect(getOfficialPageContent('metodo')).not.toBeNull();
    expect(getOfficialPageContent('graduacao')).not.toBeNull();
    expect(getOfficialPageContent('historia')).not.toBeNull();
    expect(getOfficialPageContent('treino-personalizado')).not.toBeNull();

    expect(getOfficialPageContent('referencias')).toBeNull();
  });

  it('projects recovered Canon base names instead of a missing-snapshot notice', () => {
    const influences = getOfficialPageContent('influencias');
    const baseList = influences?.blocks.find(
      (block) => block.kind === 'list' && block.title === 'Bases canônicas',
    );

    expect(baseList).toEqual(
      expect.objectContaining({
        kind: 'list',
        items: [
          expect.stringContaining('Tai'),
          expect.stringContaining('Ji'),
          expect.stringContaining('Fu'),
          expect.stringContaining('Integração/Sobrevivência'),
        ],
      }),
    );
    expect(influences?.blocks).not.toContainEqual(
      expect.objectContaining({
        kind: 'notice',
        text: expect.stringContaining('ainda não recuperado'),
      }),
    );
  });

  it('keeps the current TAI/JI/FU semantic questions intact', () => {
    const fundamentals = officialPageContent.fundamentos;
    const axes = fundamentals.blocks.find((block) => block.kind === 'axes');

    expect(axes).toEqual(
      expect.objectContaining({
        kind: 'axes',
        items: [
          expect.objectContaining({ title: 'TAI', question: 'O que deve permanecer?' }),
          expect.objectContaining({ title: 'JI', question: 'O que precisa mudar?' }),
          expect.objectContaining({ title: 'FU', question: 'Que forma deve existir agora?' }),
        ],
      }),
    );
  });
});
