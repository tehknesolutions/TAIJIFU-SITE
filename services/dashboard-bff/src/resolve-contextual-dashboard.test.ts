import { describe, expect, it } from 'vitest';
import { resolveContextualDashboard } from './resolve-contextual-dashboard';

describe('resolveContextualDashboard', () => {
  it('derives teacher modules from identity relationships without manual capabilities', () => {
    const result = resolveContextualDashboard({
      request: { tuid: 'tuid_1', context: 'teacher', surface: 'teacher' },
      relationships: [{ kind: 'teacher', status: 'active' }],
    });

    expect(result.modules.map((module) => module.id)).toEqual(['students', 'curriculum', 'sessions']);
  });

  it('removes privileged modules when the relationship is suspended', () => {
    const result = resolveContextualDashboard({
      request: { tuid: 'tuid_1', context: 'dojo', surface: 'dojo' },
      relationships: [{ kind: 'dojo-operator', status: 'suspended' }],
    });

    expect(result.modules).toEqual([]);
  });

  it('does not elevate research context into admin authority', () => {
    const result = resolveContextualDashboard({
      request: { tuid: 'tuid_1', context: 'research', surface: 'admin' },
      relationships: [{ kind: 'researcher', status: 'active' }],
    });

    expect(result.modules).toEqual([]);
  });
});
