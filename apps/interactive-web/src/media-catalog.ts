export type MediaPromptFamily =
  | 'dojo-environment'
  | 'martial-landscape'
  | 'material-application'
  | 'editorial-background';

export type MediaPromptDefinition = Readonly<{
  id: `P0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`;
  name: string;
  family: MediaPromptFamily;
  references: readonly string[];
  layer: 'presentation';
  generatedBrandIdentityAllowed: false;
}>;

export const mediaPromptCatalog: readonly MediaPromptDefinition[] = Object.freeze([
  prompt('P01', 'Dojo Gate / Home hero', 'dojo-environment', ['R01', 'R02']),
  prompt('P02', 'Dojo interior atmospheric plate', 'dojo-environment', ['R02']),
  prompt('P03', 'Martial landscape / discipline', 'martial-landscape', ['R04', 'R05', 'R07', 'R08']),
  prompt('P04', 'Water / adaptation', 'martial-landscape', []),
  prompt('P05', 'Textile / embroidery specimen', 'material-application', ['R03', 'R05', 'R07', 'R08']),
  prompt('P06', 'Seal / paper specimen', 'material-application', []),
  prompt('P07', 'App icon material study', 'material-application', []),
  prompt('P08', 'Brand Book background plate', 'editorial-background', []),
]);

function prompt(
  id: MediaPromptDefinition['id'],
  name: string,
  family: MediaPromptFamily,
  references: readonly string[],
): MediaPromptDefinition {
  return Object.freeze({
    id,
    name,
    family,
    references: Object.freeze([...references]),
    layer: 'presentation' as const,
    generatedBrandIdentityAllowed: false as const,
  });
}
