import { canonSnapshot } from './canon-snapshot.js';

export type CanonCurriculumItem = Readonly<{
  id: string;
  title: string;
  summary: string;
  details: readonly string[];
}>;

export type CanonCurriculumGroup = Readonly<{
  id: string;
  title: string;
  summary?: string;
  items: readonly CanonCurriculumItem[];
}>;

export type CanonCurriculumOverviewItem = Readonly<{
  id: string;
  order: number;
  title: string;
  function: string;
  pathCount: number;
  nucleusCount: number;
}>;

const nucleusById = new Map(
  canonSnapshot.nuclei.map((nucleus) => [nucleus.id, nucleus]),
);

function groups(includeNuclei: boolean): readonly CanonCurriculumGroup[] {
  return Object.freeze(
    canonSnapshot.belts.map((belt) =>
      Object.freeze({
        id: belt.id,
        title: `${belt.name} · ${belt.function}`,
        summary:
          belt.id === 'BELT-BLACK'
            ? 'Síntese do percurso canônico; esta release não adiciona novos Caminhos à Faixa Preta.'
            : undefined,
        items: Object.freeze(
          canonSnapshot.paths
            .filter((path) => path.beltId === belt.id)
            .map((path) =>
              Object.freeze({
                id: path.id,
                title: `${path.code} · ${path.name}`,
                summary: path.function,
                details: Object.freeze(
                  includeNuclei
                    ? path.nucleusIds.map((id) => {
                        const nucleus = nucleusById.get(id);
                        if (!nucleus) throw new Error(`Missing Canon nucleus ${id}`);
                        return nucleus.name;
                      })
                    : [],
                ),
              }),
            ),
        ),
      }),
    ),
  );
}

export const canonGraduationGroups = groups(false);
export const canonMethodGroups = groups(true);

export const canonCurriculumOverview: readonly CanonCurriculumOverviewItem[] = Object.freeze(
  canonSnapshot.belts.map((belt) => {
    const paths = canonSnapshot.paths.filter((path) => path.beltId === belt.id);
    return Object.freeze({
      id: belt.id,
      order: belt.order,
      title: belt.name,
      function: belt.function,
      pathCount: paths.length,
      nucleusCount: paths.reduce((total, path) => total + path.nucleusIds.length, 0),
    });
  }),
);
