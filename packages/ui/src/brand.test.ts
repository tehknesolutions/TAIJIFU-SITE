import { describe, expect, it } from 'vitest';
import {
  HnkSignature, Omega1AccentMark, Omega1Mark, Omega1MicroMark, Omega1ReverseMark,
  TaijifuLockupHorizontal, TaijifuLockupVertical,
} from './brand.js';

describe('TAIJIFU canonical brand components', () => {
  it('selects the dedicated MICRO master below 32px and standard master at 32px+', () => {
    expect(Omega1Mark({ size: 16 })).toContain('data-variant="micro"');
    expect(Omega1Mark({ size: 24 })).toContain('data-variant="micro"');
    expect(Omega1Mark({ size: 32 })).toContain('Official Master');
    expect(Omega1Mark({ size: 48 })).toContain('Official Master');
    expect(Omega1MicroMark({ size: 24 })).toContain('data-variant="micro"');
  });

  it('keeps accent and reverse presentation semantic', () => {
    const accent = Omega1AccentMark({ size: 48 });
    for (const token of ['tai', 'ji', 'fu', 'integration']) expect(accent).toContain(`var(--tj-color-${token})`);
    expect(accent).not.toMatch(/#[0-9a-f]{3,8}\b|\brgb\(|\bhsl\(/i);
    expect(Omega1ReverseMark({ size: 32 })).toContain('tj-brand-reverse');
  });

  it('renders meaningful and decorative accessibility states explicitly', () => {
    expect(Omega1Mark({ label: 'TAIJIFU Ω1' })).toContain('role="img" aria-label="TAIJIFU Ω1"');
    const decorative = Omega1Mark({ decorative: true });
    expect(decorative).toContain('aria-hidden="true"');
    expect(decorative).not.toContain('role="img"');
  });

  it('exposes lockups, exact HNK order and clear-space classes', () => {
    expect(TaijifuLockupHorizontal()).toContain('data-source="taijifu-wordmark"');
    expect(TaijifuLockupVertical()).toContain('data-source="omega1-master"');
    const signature = HnkSignature();
    expect([...signature.matchAll(/data-glyph="([A-Z0-9]+)"/g)].map((match) => match[1])).toEqual([
      'G22', 'G01', 'G03', 'G36', 'G03', 'G25', 'G05',
    ]);
    expect(Omega1Mark({ clearSpace: 'normal' })).toContain('tj-brand-clear-normal');
    expect(Omega1Mark({ clearSpace: 'compact' })).toContain('tj-brand-clear-compact');
  });
});
