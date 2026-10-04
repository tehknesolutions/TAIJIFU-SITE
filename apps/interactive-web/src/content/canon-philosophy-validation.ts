export type PhilosophyDomain = 'manifesto' | 'principle' | 'method' | 'value' | 'terminology';
export type PhilosophyGovernanceState = 'CANON' | 'CANDIDATE' | 'LEGACY' | 'CONFLICT' | 'GAP';
export type PhilosophySourceClass = 'CREATOR_RULING' | 'OFFICIAL_CURRENT' | 'LEGACY_TAIJIFU' | 'LEGACY_PRODUCT' | 'PROJECT_RECORD' | 'EXTERNAL_REFERENCE';
export type PhilosophyConflictState = 'NONE' | 'UNRESOLVED' | 'RESOLVED';

export interface PhilosophySource {
  sourceId: string;
  sourceClass: PhilosophySourceClass;
  locator: string;
}

export interface PhilosophyClaim {
  claimId: string;
  domain: PhilosophyDomain;
  statement: string;
  state: PhilosophyGovernanceState;
  sourceIds: string[];
  conflictState: PhilosophyConflictState;
}

export interface PhilosophyTerminology {
  termId: string;
  preferredTerm: string;
  aliases: string[];
  deprecatedForms: string[];
}

export interface PhilosophyProvenance {
  claimId: string;
  sourceIds: string[];
  sourceLocators?: string[];
  classification?: PhilosophySourceClass;
  conflictState: PhilosophyConflictState;
}

export interface PhilosophyFoundation {
  sources: PhilosophySource[];
  claims: PhilosophyClaim[];
  terminology: PhilosophyTerminology[];
  provenance: PhilosophyProvenance[];
  registry: string[];
}

export interface PhilosophyValidationResult {
  valid: boolean;
  errors: string[];
}

const DOMAINS = new Set<PhilosophyDomain>(['manifesto', 'principle', 'method', 'value', 'terminology']);
const STATES = new Set<PhilosophyGovernanceState>(['CANON', 'CANDIDATE', 'LEGACY', 'CONFLICT', 'GAP']);
const SOURCE_CLASSES = new Set<PhilosophySourceClass>(['CREATOR_RULING', 'OFFICIAL_CURRENT', 'LEGACY_TAIJIFU', 'LEGACY_PRODUCT', 'PROJECT_RECORD', 'EXTERNAL_REFERENCE']);
const CONFLICT_STATES = new Set<PhilosophyConflictState>(['NONE', 'UNRESOLVED', 'RESOLVED']);

function duplicateIds(ids: string[]): string[] {
  const seen = new Set<string>();
  const duplicates: string[] = [];
  for (const id of ids) {
    if (seen.has(id) && !duplicates.includes(id)) duplicates.push(id);
    seen.add(id);
  }
  return duplicates;
}

export function validatePhilosophyFoundation(input: PhilosophyFoundation): PhilosophyValidationResult {
  const errors: string[] = [];
  const sourceIds = input.sources.map((source) => source.sourceId);
  const claimIds = input.claims.map((claim) => claim.claimId);
  const termIds = input.terminology.map((term) => term.termId);

  for (const id of duplicateIds(sourceIds)) errors.push(`duplicate source ID ${id}`);
  for (const id of duplicateIds(claimIds)) errors.push(`duplicate claim ID ${id}`);
  for (const id of duplicateIds(termIds)) errors.push(`duplicate terminology ID ${id}`);

  const sourceSet = new Set(sourceIds);
  const claimSet = new Set(claimIds);

  for (const source of input.sources) {
    if (!SOURCE_CLASSES.has(source.sourceClass)) errors.push(`source ${source.sourceId} has invalid source class ${source.sourceClass}`);
  }

  for (const claim of input.claims) {
    if (!DOMAINS.has(claim.domain)) errors.push(`claim ${claim.claimId} has invalid domain ${claim.domain}`);
    if (!STATES.has(claim.state)) errors.push(`claim ${claim.claimId} has invalid governance state ${claim.state}`);
    if (!CONFLICT_STATES.has(claim.conflictState)) errors.push(`claim ${claim.claimId} has invalid conflict state ${claim.conflictState}`);
    for (const sourceId of claim.sourceIds) {
      if (!sourceSet.has(sourceId)) errors.push(`claim ${claim.claimId} references unknown source ${sourceId}`);
    }
  }

  const aliasOwners = new Map<string, Set<string>>();
  for (const term of input.terminology) {
    for (const alias of term.aliases) {
      const owners = aliasOwners.get(alias) ?? new Set<string>();
      owners.add(term.preferredTerm);
      aliasOwners.set(alias, owners);
    }
  }
  for (const [alias, owners] of aliasOwners) {
    if (owners.size > 1) errors.push(`terminology alias ${alias} resolves to multiple preferred terms`);
  }

  for (const provenance of input.provenance) {
    if (!claimSet.has(provenance.claimId)) errors.push(`provenance references unknown claim ${provenance.claimId}`);
    for (const sourceId of provenance.sourceIds) {
      if (!sourceSet.has(sourceId)) errors.push(`provenance for ${provenance.claimId} references unknown source ${sourceId}`);
    }
    if (!CONFLICT_STATES.has(provenance.conflictState)) errors.push(`provenance for ${provenance.claimId} has invalid conflict state ${provenance.conflictState}`);
  }

  for (const claimId of input.registry) {
    const claim = input.claims.find((item) => item.claimId === claimId);
    if (!claim) errors.push(`registry references unknown claim ${claimId}`);
    else if (claim.state !== 'CANON' || claim.conflictState === 'UNRESOLVED' || claim.sourceIds.some((sourceId) => !sourceSet.has(sourceId))) {
      errors.push(`registry claim ${claimId} is not eligible for Canon projection`);
    }
  }

  return { valid: errors.length === 0, errors };
}

export function selectCanonicalPhilosophyClaims(foundation: PhilosophyFoundation): PhilosophyClaim[] {
  const result = validatePhilosophyFoundation(foundation);
  if (!result.valid) throw new Error(result.errors.join('; '));
  return foundation.registry
    .map((claimId) => foundation.claims.find((claim) => claim.claimId === claimId))
    .filter((claim): claim is PhilosophyClaim => Boolean(claim) && claim.state === 'CANON' && claim.conflictState !== 'UNRESOLVED' && claim.sourceIds.length > 0);
}
