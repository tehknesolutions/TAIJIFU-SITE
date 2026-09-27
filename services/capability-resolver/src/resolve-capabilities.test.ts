import { describe, expect, it } from 'vitest';
import { resolveCapabilities } from './resolve-capabilities';

describe('resolveCapabilities', () => {
  it('grants personal practice capabilities to an active identity', () => {
    const capabilities = resolveCapabilities({
      tuid: 'tuid_1',
      context: 'personal',
      relationships: [{ kind: 'identity', status: 'active' }],
    });
    expect([...capabilities]).toEqual(['practice.read', 'progress.read']);
  });

  it('derives teacher capabilities only from an active teacher relationship', () => {
    const capabilities = resolveCapabilities({
      tuid: 'tuid_1',
      context: 'teacher',
      relationships: [{ kind: 'teacher', status: 'active' }],
    });
    expect([...capabilities]).toEqual(['students.manage', 'curriculum.manage', 'sessions.manage']);
  });

  it('derives dojo capabilities only from an active dojo relationship', () => {
    const capabilities = resolveCapabilities({
      tuid: 'tuid_1',
      context: 'dojo',
      relationships: [{ kind: 'dojo-operator', status: 'active' }],
    });
    expect([...capabilities]).toEqual(['members.manage', 'classes.manage', 'dojo.operations']);
  });

  it('does not grant privileged capabilities from inactive relationships', () => {
    const capabilities = resolveCapabilities({
      tuid: 'tuid_1',
      context: 'teacher',
      relationships: [{ kind: 'teacher', status: 'suspended' }],
    });
    expect([...capabilities]).toEqual([]);
  });

  it('does not infer admin authority from research context', () => {
    const capabilities = resolveCapabilities({
      tuid: 'tuid_1',
      context: 'research',
      relationships: [{ kind: 'researcher', status: 'active' }],
    });
    expect(capabilities.has('platform.admin')).toBe(false);
    expect(capabilities.has('governance.admin')).toBe(false);
  });
});
