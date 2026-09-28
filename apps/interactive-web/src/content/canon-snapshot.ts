import basesJson from '../../../../canon/TAIJIFU-CANON-1.0/bases.json?raw';
import releaseJson from '../../../../canon/TAIJIFU-CANON-1.0/release.json?raw';

export type CanonRelease = Readonly<{
  id: string;
  version: string;
  status: string;
  releasedAt: string;
  signature: string;
  sourceDocument: string;
}>;

export type CanonBase = Readonly<{
  id: string;
  name: string;
  color: string;
  element: string;
  animal: string;
  function: string;
}>;

function parseJson<T>(raw: string, label: string): T {
  try {
    return JSON.parse(raw) as T;
  } catch (error) {
    throw new Error(`Invalid ${label} Canon snapshot JSON`, { cause: error });
  }
}

const release = Object.freeze(parseJson<CanonRelease>(releaseJson, 'release'));
const bases = Object.freeze(
  parseJson<CanonBase[]>(basesJson, 'bases').map((base) => Object.freeze(base)),
);

export const canonSnapshot = Object.freeze({
  release,
  bases,
});
