declare const tuidBrand: unique symbol;

export type Tuid = string & { readonly [tuidBrand]: 'Tuid' };

export class InvalidTuidError extends Error {
  constructor(value: string) {
    super(`Invalid TUID: ${value}`);
    this.name = 'InvalidTuidError';
  }
}

export function parseTuid(value: string): Tuid {
  const normalized = value.trim();
  if (!/^tuid_[A-Za-z0-9][A-Za-z0-9_-]*$/.test(normalized)) {
    throw new InvalidTuidError(value);
  }
  return normalized as Tuid;
}
