declare const capabilityBrand: unique symbol;

export type Capability = string & { readonly [capabilityBrand]: 'Capability' };

export function capability(value: string): Capability {
  const normalized = value.trim();
  if (!normalized) throw new Error('Capability cannot be empty');
  return normalized as Capability;
}
