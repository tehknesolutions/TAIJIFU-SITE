import { describe, expect, it } from 'vitest';
import { InvalidTuidError, parseTuid } from './tuid';

describe('parseTuid', () => {
  it('accepts a canonical TUID', () => {
    expect(parseTuid('tuid_01HZXABC123')).toBe('tuid_01HZXABC123');
  });

  it.each(['', '   ', '01HZXABC123', 'tuid_', 'tuid_ bad'])('rejects invalid value %j', (value) => {
    expect(() => parseTuid(value)).toThrow(InvalidTuidError);
  });
});
