import { describe, expect, it } from 'vitest';
import { resolveDashboard } from './dashboard-policy';

describe('resolveDashboard', () => {
  it('returns a focused personal front surface', () => {
    const result = resolveDashboard({ tuid: 'tuid_1', context: 'personal', surface: 'front' });
    expect(result.modules.map((module) => module.id)).toEqual(['practice', 'progress']);
  });

  it('returns teaching operations for teacher surface', () => {
    const result = resolveDashboard({ tuid: 'tuid_1', context: 'teacher', surface: 'teacher' });
    expect(result.modules.map((module) => module.id)).toEqual(['students', 'curriculum', 'sessions']);
  });

  it('returns dojo operations for dojo surface', () => {
    const result = resolveDashboard({ tuid: 'tuid_1', context: 'dojo', surface: 'dojo' });
    expect(result.modules.map((module) => module.id)).toEqual(['members', 'classes', 'operations']);
  });

  it('keeps admin modules exclusive to admin surface', () => {
    const admin = resolveDashboard({ tuid: 'tuid_1', context: 'research', surface: 'admin' });
    const front = resolveDashboard({ tuid: 'tuid_1', context: 'research', surface: 'front' });
    expect(admin.modules.map((module) => module.id)).toEqual(['platform', 'governance', 'observability']);
    expect(front.modules.some((module) => module.id === 'platform')).toBe(false);
  });

  it('intersects surface modules with granted capabilities', () => {
    const result = resolveDashboard(
      { tuid: 'tuid_1', context: 'teacher', surface: 'teacher' },
      new Set(['students.manage', 'sessions.manage']),
    );
    expect(result.modules.map((module) => module.id)).toEqual(['students', 'sessions']);
  });

  it('returns no privileged modules when no capabilities are granted', () => {
    const result = resolveDashboard(
      { tuid: 'tuid_1', context: 'dojo', surface: 'dojo' },
      new Set(),
    );
    expect(result.modules).toEqual([]);
  });
});
