import type { SupportedLocale } from './locale.js';

export const uiMessageIds = Object.freeze([
  'brandName', 'primaryNavigation', 'journeyNavigation', 'principlesNavigation',
  'explorePrinciple', 'languageSelector', 'internationalEntryTitle', 'internationalEntryLead',
] as const);

export type UiMessageId = (typeof uiMessageIds)[number];
export type UiMessages = Readonly<Record<UiMessageId, string>>;

const dictionaries: Readonly<Record<SupportedLocale, UiMessages>> = Object.freeze({
  'pt-BR': Object.freeze({
    brandName: 'TAIJIFU', primaryNavigation: 'Navegação TAIJIFU', journeyNavigation: 'Jornada TAIJIFU',
    principlesNavigation: 'Princípios TAIJIFU', explorePrinciple: 'Explorar princípio', languageSelector: 'Idioma',
    internationalEntryTitle: 'Escolha seu idioma', internationalEntryLead: 'Entre no TAIJIFU no seu idioma.',
  }),
  en: Object.freeze({
    brandName: 'TAIJIFU', primaryNavigation: 'TAIJIFU navigation', journeyNavigation: 'TAIJIFU journey',
    principlesNavigation: 'TAIJIFU principles', explorePrinciple: 'Explore principle', languageSelector: 'Language',
    internationalEntryTitle: 'Choose your language', internationalEntryLead: 'Enter TAIJIFU in your language.',
  }),
  es: Object.freeze({
    brandName: 'TAIJIFU', primaryNavigation: 'Navegación TAIJIFU', journeyNavigation: 'Recorrido TAIJIFU',
    principlesNavigation: 'Principios TAIJIFU', explorePrinciple: 'Explorar principio', languageSelector: 'Idioma',
    internationalEntryTitle: 'Elige tu idioma', internationalEntryLead: 'Entra en TAIJIFU en tu idioma.',
  }),
});

export function messagesFor(locale: SupportedLocale): UiMessages { return dictionaries[locale]; }
