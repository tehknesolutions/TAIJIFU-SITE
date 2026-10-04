import { describe, expect, it } from 'vitest';
import {
  selectCanonicalPhilosophyClaims,
  validatePhilosophyFoundation,
  type PhilosophyFoundation,
} from './canon-philosophy-validation';

const emptyFoundation = (): PhilosophyFoundation => ({
  sources: [],
  claims: [],
  terminology: [],
  provenance: [],
  registry: [],
});

describe('validatePhilosophyFoundation', () => {
  it('accepts an empty but governed foundation', () => {
    expect(validatePhilosophyFoundation(emptyFoundation())).toEqual({ valid: true, errors: [] });
  });

  it('rejects duplicate stable IDs', () => {
    const foundation = emptyFoundation();
    foundation.sources = [
      { sourceId: 'PHIL-SRC-001', sourceClass: 'PROJECT_RECORD', locator: 'a' },
      { sourceId: 'PHIL-SRC-001', sourceClass: 'PROJECT_RECORD', locator: 'b' },
    ];
    expect(validatePhilosophyFoundation(foundation).valid).toBe(false);
  });

  it('rejects claims that reference an unknown source', () => {
    const foundation = emptyFoundation();
    foundation.claims = [{
      claimId: 'PHIL-CLAIM-001',
      domain: 'manifesto',
      statement: 'candidate',
      state: 'CANDIDATE',
      sourceIds: ['PHIL-SRC-MISSING'],
      conflictState: 'NONE',
    }];
    expect(validatePhilosophyFoundation(foundation).errors).toContain(
      'claim PHIL-CLAIM-001 references unknown source PHIL-SRC-MISSING',
    );
  });

  it('rejects invalid domain and governance state at runtime', () => {
    const foundation = emptyFoundation() as unknown as { claims: Array<Record<string, unknown>> } & PhilosophyFoundation;
    foundation.claims = [{
      claimId: 'PHIL-CLAIM-001', domain: 'unknown', statement: 'x', state: 'PUBLISHED', sourceIds: [], conflictState: 'NONE',
    }] as never;
    const result = validatePhilosophyFoundation(foundation);
    expect(result.valid).toBe(false);
    expect(result.errors.some((error) => error.includes('invalid domain'))).toBe(true);
    expect(result.errors.some((error) => error.includes('invalid governance state'))).toBe(true);
  });

  it('rejects an alias owned by competing preferred terms', () => {
    const foundation = emptyFoundation();
    foundation.terminology = [
      { termId: 'TERM-001', preferredTerm: 'A', aliases: ['shared'], deprecatedForms: [] },
      { termId: 'TERM-002', preferredTerm: 'B', aliases: ['shared'], deprecatedForms: [] },
    ];
    expect(validatePhilosophyFoundation(foundation).errors).toContain(
      'terminology alias shared resolves to multiple preferred terms',
    );
  });
});

describe('selectCanonicalPhilosophyClaims', () => {
  it('projects only sourced, conflict-free CANON claims in registry order', () => {
    const foundation = emptyFoundation();
    foundation.sources = [{ sourceId: 'PHIL-SRC-001', sourceClass: 'CREATOR_RULING', locator: 'creator-ruling:1' }];
    foundation.claims = [
      { claimId: 'CANDIDATE', domain: 'value', statement: 'candidate', state: 'CANDIDATE', sourceIds: ['PHIL-SRC-001'], conflictState: 'NONE' },
      { claimId: 'CANON-2', domain: 'principle', statement: 'second', state: 'CANON', sourceIds: ['PHIL-SRC-001'], conflictState: 'NONE' },
      { claimId: 'LEGACY', domain: 'method', statement: 'legacy', state: 'LEGACY', sourceIds: ['PHIL-SRC-001'], conflictState: 'NONE' },
      { claimId: 'CANON-1', domain: 'manifesto', statement: 'first', state: 'CANON', sourceIds: ['PHIL-SRC-001'], conflictState: 'NONE' },
      { claimId: 'CONFLICT', domain: 'value', statement: 'conflict', state: 'CONFLICT', sourceIds: ['PHIL-SRC-001'], conflictState: 'UNRESOLVED' },
      { claimId: 'GAP', domain: 'terminology', statement: 'gap', state: 'GAP', sourceIds: [], conflictState: 'NONE' },
    ];
    foundation.registry = ['CANON-1', 'CANON-2'];
    expect(selectCanonicalPhilosophyClaims(foundation).map(({ claimId }) => claimId)).toEqual(['CANON-1', 'CANON-2']);
  });
});
