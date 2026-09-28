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
