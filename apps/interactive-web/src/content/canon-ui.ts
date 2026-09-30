import { canonSnapshot } from './canon-snapshot.js';

export type PrincipleTriadItem = Readonly<{
  id: 'tai' | 'ji' | 'fu';
  label: 'TAI' | 'JI' | 'FU';
  meaning: string;
}>;

export const PrincipleTriad: readonly PrincipleTriadItem[] = Object.freeze([
  Object.freeze({ id: 'tai', label: 'TAI', meaning: 'Essência · Permanência · Axis' }),
  Object.freeze({ id: 'ji', label: 'JI', meaning: 'Discernimento · Adaptação · Nexus' }),
  Object.freeze({ id: 'fu', label: 'FU', meaning: 'Manifestação · Fluxo · Flow' }),
]);

export const FourBases = Object.freeze(
  canonSnapshot.bases.map((base) =>
    Object.freeze({
      id: base.id,
      label: base.name,
      element: base.element,
      animal: base.animal,
      function: base.function,
      colorLabel: base.color,
    }),
  ),
);

const pathsByBelt = new Map<string, typeof canonSnapshot.paths[number][]>();
for (const path of canonSnapshot.paths) {
  const paths = pathsByBelt.get(path.beltId) ?? [];
  paths.push(path);
  pathsByBelt.set(path.beltId, paths);
}

const nucleiById = new Map(canonSnapshot.nuclei.map((nucleus) => [nucleus.id, nucleus]));

export const CanonHierarchy = Object.freeze(
  canonSnapshot.belts.map((belt) =>
    Object.freeze({
      id: belt.id,
      order: belt.order,
      label: belt.name,
      function: belt.function,
      status: belt.status,
      paths: Object.freeze(
        (pathsByBelt.get(belt.id) ?? []).map((path) =>
          Object.freeze({
            id: path.id,
            code: path.code,
            order: path.order,
            label: path.name,
            function: path.function,
            status: path.status,
            nuclei: Object.freeze(
              path.nucleusIds.map((id) => {
                const nucleus = nucleiById.get(id);
                if (!nucleus) throw new Error(`Missing Canon nucleus ${id}`);
                return Object.freeze({ id: nucleus.id, order: nucleus.order, label: nucleus.name });
              }),
            ),
          }),
        ),
      ),
    }),
  ),
);

export const GraduationTrack = Object.freeze(
  canonSnapshot.belts.map((belt) =>
    Object.freeze({
      id: belt.id,
      order: belt.order,
      label: belt.name,
      function: belt.function,
      status: belt.status,
      isSynthesis: belt.id === 'BELT-BLACK',
    }),
  ),
);
