export type DojoHotspotRole = 'axis' | 'nexus' | 'flow' | 'content';

export function dojoHotspotRole(nodeId: string): DojoHotspotRole {
  if (nodeId === 'tai') return 'axis';
  if (nodeId === 'ji') return 'nexus';
  if (nodeId === 'fu') return 'flow';
  return 'content';
}
