export type TknConnectionRole = 'canonical';

export type ConnectionVisualToken = Readonly<{
  color: number;
  opacity: number;
  transparent: boolean;
  width: number;
}>;

const TOKENS: Readonly<Record<TknConnectionRole, ConnectionVisualToken>> = Object.freeze({
  canonical: Object.freeze({ color: 0x6f6b62, opacity: 0.38, transparent: true, width: 1 }),
});

export function connectionVisualToken(role: TknConnectionRole): ConnectionVisualToken {
  return TOKENS[role];
}
