import { describe, expect, it } from 'vitest';
import { dojoHotspotRole } from './dojo-hotspots.js';

describe('dojo hotspots', () => {
  it('assigns canonical roles to the TAI JI FU triad', () => {
    expect(dojoHotspotRole('tai')).toBe('axis');
    expect(dojoHotspotRole('ji')).toBe('nexus');
    expect(dojoHotspotRole('fu')).toBe('flow');
  });

  it('keeps unknown nodes as canonical content', () => {
    expect(dojoHotspotRole('unknown')).toBe('content');
  });
});
