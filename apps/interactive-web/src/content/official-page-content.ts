import { canonSnapshot } from './canon-snapshot.js';

export type AxisContent = Readonly<{
  id: 'tai' | 'ji' | 'fu';
  title: string;
  meaning: string;
  question: string;
}>;

export type ContentBlock =
  | Readonly<{ kind: 'paragraph'; text: string }>
  | Readonly<{ kind: 'quote'; text: string }>
  | Readonly<{ kind: 'axes'; items: readonly AxisContent[] }>
  | Readonly<{ kind: 'stats'; items: readonly Readonly<{ value: string; label: string }>[] }>
  | Readonly<{ kind: 'list'; title?: string; items: readonly string[] }>
  | Readonly<{ kind: 'notice'; text: string }>;

export type OfficialPageContent = Readonly<{
  routeId: string;
  eyebrow: string;
  lead: string;
  blocks: readonly ContentBlock[];
  sourceAuthority: string;
}>;

const triad: readonly AxisContent[] = Object.freeze([
  Object.freeze({ id: 'tai', title: 'TAI', meaning: 'Essência / Permanência — Axis', question: 'O que deve permanecer?' }),
  Object.freeze({ id: 'ji', title: 'JI', meaning: 'Discernimento / Adaptação — Nexus', question: 'O que precisa mudar?' }),
  Object.freeze({ id: 'fu', title: 'FU', meaning: 'Manifestação / Fluxo — Flow', question: 'Que forma deve existir agora?' }),
]);

const canonicalBaseItems = Object.freeze(
  canonSnapshot.bases.map((base) => `${base.name} — ${base.function} · ${base.element} · ${base.animal} · ${base.color}`),
);

export const officialPageContent: Readonly<Record<string, OfficialPageContent>> = Object.freeze({
  manifesto: Object.freeze({
    routeId: 'manifesto', eyebrow: 'TAIJIFU', lead: 'TAIJIFU = Arte Marcial de se Adaptar.',
    blocks: Object.freeze([
      Object.freeze({ kind: 'quote', text: 'Firme na essência. Livre na forma.' }),
      Object.freeze({ kind: 'quote', text: 'Mudar sem deixar de ser.' }),
      Object.freeze({ kind: 'paragraph', text: 'HNK nasce do AMOR e torna-se ferramenta/manifestação do AMOR; TAIJIFU trabalha o tornar-se e a adaptação sem abandono da essência.' }),
      Object.freeze({ kind: 'paragraph', text: 'Os glifos da identidade são HNK, não japoneses.' }),
    ]),
    sourceAuthority: 'Issue #7 — CANON Visual V1',
  }),
  fundamentos: Object.freeze({
    routeId: 'fundamentos', eyebrow: 'Fundamentos', lead: 'Tríade semântica aprovada do TAIJIFU.',
    blocks: Object.freeze([
      Object.freeze({ kind: 'axes', items: triad }),
      Object.freeze({ kind: 'paragraph', text: 'Integração: Axis · Nexus · Flow em relação.' }),
    ]),
    sourceAuthority: 'Issue #7 + TAIJIFU WordPress Architecture V1',
  }),
  influencias: Object.freeze({
    routeId: 'influencias', eyebrow: canonSnapshot.release.id, lead: `O Canon versionado registra ${canonSnapshot.bases.length} Bases.`,
    blocks: Object.freeze([
      Object.freeze({ kind: 'stats', items: Object.freeze([Object.freeze({ value: String(canonSnapshot.bases.length), label: 'Bases' })]) }),
      Object.freeze({ kind: 'list', title: 'Bases canônicas', items: canonicalBaseItems }),
    ]),
    sourceAuthority: 'TAIJIFU-CANON-1.0 snapshot',
  }),
  tai: Object.freeze({
    routeId: 'tai', eyebrow: 'Princípio', lead: 'TAI — Essência / Permanência — Axis',
    blocks: Object.freeze([
      Object.freeze({ kind: 'quote', text: 'O que deve permanecer?' }),
      Object.freeze({ kind: 'paragraph', text: 'TAI representa essência, permanência e Axis dentro da tríade semântica aprovada.' }),
    ]), sourceAuthority: 'Issue #7 — CANON Visual V1',
  }),
  ji: Object.freeze({
    routeId: 'ji', eyebrow: 'Princípio', lead: 'JI — Discernimento / Adaptação — Nexus',
    blocks: Object.freeze([
      Object.freeze({ kind: 'quote', text: 'O que precisa mudar?' }),
      Object.freeze({ kind: 'paragraph', text: 'JI representa discernimento, adaptação e Nexus dentro da tríade semântica aprovada.' }),
    ]), sourceAuthority: 'Issue #7 — CANON Visual V1',
  }),
  fu: Object.freeze({
    routeId: 'fu', eyebrow: 'Princípio', lead: 'FU — Manifestação / Fluxo — Flow',
    blocks: Object.freeze([
      Object.freeze({ kind: 'quote', text: 'Que forma deve existir agora?' }),
      Object.freeze({ kind: 'paragraph', text: 'FU representa manifestação, fluxo e Flow dentro da tríade semântica aprovada.' }),
    ]), sourceAuthority: 'Issue #7 — CANON Visual V1',
  }),
  metodo: Object.freeze({
    routeId: 'metodo', eyebrow: canonSnapshot.release.id, lead: 'O conteúdo público oficial é subordinado ao Canon versionado.',
    blocks: Object.freeze([
      Object.freeze({ kind: 'stats', items: Object.freeze([
        Object.freeze({ value: '4', label: 'Bases' }), Object.freeze({ value: '10', label: 'Faixas' }),
        Object.freeze({ value: '32', label: 'Caminhos' }), Object.freeze({ value: '128', label: 'Núcleos' }),
      ]) }),
      Object.freeze({ kind: 'paragraph', text: 'O snapshot validado possui exatamente 4 Núcleos por Caminho.' }),
    ]), sourceAuthority: 'TAIJIFU-CANON-1.0 snapshot',
  }),
  graduacao: Object.freeze({
    routeId: 'graduacao', eyebrow: canonSnapshot.release.id, lead: 'O sistema canônico registra 10 Faixas.',
    blocks: Object.freeze([Object.freeze({ kind: 'stats', items: Object.freeze([
      Object.freeze({ value: '10', label: 'Faixas' }), Object.freeze({ value: '32', label: 'Caminhos' }), Object.freeze({ value: '128', label: 'Núcleos' }),
    ]) })]), sourceAuthority: 'TAIJIFU-CANON-1.0 snapshot',
  }),
  historia: Object.freeze({
    routeId: 'historia', eyebrow: 'Genealogia', lead: 'Criado por Miguel Da Vinci e Thales Walisson — Desde 2026.',
    blocks: Object.freeze([
      Object.freeze({ kind: 'paragraph', text: 'HNK nasce do AMOR e torna-se ferramenta/manifestação do AMOR; TAIJIFU trabalha o tornar-se e a adaptação sem abandono da essência.' }),
      Object.freeze({ kind: 'paragraph', text: 'HNK/HENUVOKODAN pode aparecer como genealogia/assinatura secundária sem competir com TAIJIFU.' }),
    ]), sourceAuthority: 'Issue #7 — CANON Visual V1',
  }),
});

export function getOfficialPageContent(routeId: string): OfficialPageContent | null {
  return officialPageContent[routeId] ?? null;
}
