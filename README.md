# TAIJIFU — Arte Marcial de se Adaptar

Este é o repositório oficial e único Source of Truth do TAIJIFU.

## Canon vigente

O Canon oficial vigente é `TAIJIFU-CANON-1.0`, materializado diretamente neste repositório em:

`canon/TAIJIFU-CANON-1.0/`

Arquivos canônicos:
- `release.json`
- `bases.json`
- `belts.json`
- `paths.json`
- `nuclei.json`

Baseline canônico:
- 4 Bases
- 10 Faixas
- 32 Caminhos
- 128 Núcleos

Aplicações, páginas, experiências interativas e renderers são projeções/consumidores desse Canon e não devem redefini-lo silenciosamente.

## Estrutura do monorepo

- `canon/` — releases canônicos oficiais do TAIJIFU.
- `apps/interactive-web/` — experiência Web interativa e suas projeções de conteúdo.
- `packages/domain/` — domínio independente de renderer.
- `packages/application/` — casos de uso/aplicação.
- `packages/contracts/` — contratos compartilhados.
- `packages/design-tokens/` — identidade visual em tokens.
- `packages/ui/` — componentes e primitivas de UI.
- `docs/` — governança, arqueologia, decisões, proveniência e documentação do projeto.

## Regra de autoridade

1. O conteúdo em `canon/` é a autoridade curricular/semântica versionada.
2. Código de aplicação pode validar, indexar e projetar o Canon, mas não inventar conteúdo ausente.
3. Hierarquia editorial, navegação e layout Three.js não são automaticamente relações canônicas.
4. Legado recuperado deve preservar proveniência e ser reconciliado antes de promoção ao Canon.
5. Conteúdo sem fonte suficiente permanece explicitamente não resolvido.

## Desenvolvimento

O projeto segue o modelo GitHub + GPT como fluxo primário de desenvolvimento e documentação. Mudanças relevantes devem permanecer rastreáveis por commits, issues, PRs, testes e documentação no próprio repositório.
