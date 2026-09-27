import type { PlatformContext } from '@taijifu/domain';

export type RelationshipKind = 'identity' | 'teacher' | 'dojo-operator' | 'researcher' | 'platform-admin';
export type RelationshipStatus = 'active' | 'suspended' | 'revoked';

export type CapabilityRelationship = Readonly<{
  kind: RelationshipKind;
  status: RelationshipStatus;
}>;

export type CapabilityResolutionInput = Readonly<{
  tuid: string;
  context: PlatformContext;
  relationships: readonly CapabilityRelationship[];
}>;

const grants: Readonly<Partial<Record<PlatformContext, Partial<Record<RelationshipKind, readonly string[]>>>>> = Object.freeze({
  personal: Object.freeze({
    identity: Object.freeze(['practice.read', 'progress.read']),
  }),
  teacher: Object.freeze({
    teacher: Object.freeze(['students.manage', 'curriculum.manage', 'sessions.manage']),
  }),
  dojo: Object.freeze({
    'dojo-operator': Object.freeze(['members.manage', 'classes.manage', 'dojo.operations']),
  }),
  research: Object.freeze({
    researcher: Object.freeze(['research.read']),
  }),
});

export function resolveCapabilities(input: CapabilityResolutionInput): ReadonlySet<string> {
  const capabilities = new Set<string>();
  const contextGrants = grants[input.context] ?? {};

  for (const relationship of input.relationships) {
    if (relationship.status !== 'active') continue;
    for (const capability of contextGrants[relationship.kind] ?? []) {
      capabilities.add(capability);
    }
  }

  return capabilities;
}
