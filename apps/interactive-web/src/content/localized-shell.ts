import type { SupportedLocale } from './locale.js';

export type ShellMessages = Readonly<{
  brandName: 'TAIJIFU'; skipLink: string; brandHome: string; primaryNavigation: string;
  enterDojo: string; continueLabel: string; interactiveNavigation: string; exploreTaijifu: string;
  graphInstructions: string; graphDestinations: string; interactiveCanvas: string; javascriptRequired: string;
}>;

const shell: Readonly<Record<SupportedLocale, ShellMessages>> = Object.freeze({
  'pt-BR': Object.freeze({
    brandName: 'TAIJIFU', skipLink: 'Pular para o conteúdo', brandHome: 'TAIJIFU — início', primaryNavigation: 'Navegação principal',
    enterDojo: 'ENTRAR NO DOJO', continueLabel: 'Continuar', interactiveNavigation: 'Navegação interativa', exploreTaijifu: 'Explore o TAIJIFU',
    graphInstructions: 'Passe pelo grafo para reconhecer um destino. Clique para abrir sua URL canônica.', graphDestinations: 'Destinos do grafo TAIJIFU',
    interactiveCanvas: 'Experiência interativa TAIJIFU', javascriptRequired: 'A experiência interativa requer JavaScript. O conteúdo semântico permanece disponível.',
  }),
  en: Object.freeze({
    brandName: 'TAIJIFU', skipLink: 'Skip to content', brandHome: 'TAIJIFU — home', primaryNavigation: 'Primary navigation',
    enterDojo: 'ENTER THE DOJO', continueLabel: 'Continue', interactiveNavigation: 'Interactive navigation', exploreTaijifu: 'Explore TAIJIFU',
    graphInstructions: 'Move through the graph to identify a destination. Select it to open its canonical URL.', graphDestinations: 'TAIJIFU graph destinations',
    interactiveCanvas: 'TAIJIFU interactive experience', javascriptRequired: 'The interactive experience requires JavaScript. Semantic content remains available.',
  }),
  es: Object.freeze({
    brandName: 'TAIJIFU', skipLink: 'Saltar al contenido', brandHome: 'TAIJIFU — inicio', primaryNavigation: 'Navegación principal',
    enterDojo: 'ENTRAR AL DOJO', continueLabel: 'Continuar', interactiveNavigation: 'Navegación interactiva', exploreTaijifu: 'Explora TAIJIFU',
    graphInstructions: 'Recorre el grafo para reconocer un destino. Selecciónalo para abrir su URL canónica.', graphDestinations: 'Destinos del grafo TAIJIFU',
    interactiveCanvas: 'Experiencia interactiva TAIJIFU', javascriptRequired: 'La experiencia interactiva requiere JavaScript. El contenido semántico permanece disponible.',
  }),
});

export function shellMessagesFor(locale: SupportedLocale): ShellMessages { return shell[locale]; }
