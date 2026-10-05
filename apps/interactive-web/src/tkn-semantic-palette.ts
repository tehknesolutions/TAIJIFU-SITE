export type TknSemanticNode = 'tai' | 'ji' | 'fu' | 'unknown';

export type SemanticColorToken = Readonly<{
  color: number;
  rank: 'peer' | 'default';
}>;

const TOKENS: Readonly<Record<TknSemanticNode, SemanticColorToken>> = Object.freeze({
  tai: Object.freeze({ color: 0xb43a32, rank: 'peer' }),
  ji: Object.freeze({ color: 0x4b82d8, rank: 'peer' }),
  fu: Object.freeze({ color: 0xd2ad55, rank: 'peer' }),
  unknown: Object.freeze({ color: 0xe9e0cf, rank: 'default' }),
});

export function semanticColorToken(nodeId: string): SemanticColorToken {
  if (nodeId === 'tai' || nodeId === 'ji' || nodeId === 'fu') return TOKENS[nodeId];
  return TOKENS.unknown;
}
