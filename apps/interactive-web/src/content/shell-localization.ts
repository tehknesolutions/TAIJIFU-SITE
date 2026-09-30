import type { SupportedLocale } from './locale.js';
import { shellMessagesFor, type ShellMessages } from './localized-shell.js';

export type ShellLocalizationBinding = Readonly<{
  selector: string;
  messageId: keyof ShellMessages;
  attribute?: 'aria-label';
}>;

export const shellLocalizationBindings: readonly ShellLocalizationBinding[] = Object.freeze([
  Object.freeze({ selector: '.skip-link', messageId: 'skipLink' }),
  Object.freeze({ selector: '.site-brand', messageId: 'brandHome', attribute: 'aria-label' }),
  Object.freeze({ selector: '#primary-navigation', messageId: 'primaryNavigation', attribute: 'aria-label' }),
  Object.freeze({ selector: '.site-header__dojo-link', messageId: 'enterDojo' }),
  Object.freeze({ selector: '.primary-cta', messageId: 'enterDojo' }),
  Object.freeze({ selector: '.dojo-gate__scroll-cue', messageId: 'continueLabel' }),
  Object.freeze({ selector: '.interactive-navigation__header .content-entry__type', messageId: 'interactiveNavigation' }),
  Object.freeze({ selector: '#interactive-title', messageId: 'exploreTaijifu' }),
  Object.freeze({ selector: '.interactive-navigation__header > p:last-child', messageId: 'graphInstructions' }),
  Object.freeze({ selector: '#taijifu-experience', messageId: 'interactiveCanvas', attribute: 'aria-label' }),
  Object.freeze({ selector: '#interactive-node-links', messageId: 'graphDestinations', attribute: 'aria-label' }),
]);

export function applyShellLocalization(root: ParentNode, locale: SupportedLocale): void {
  const messages = shellMessagesFor(locale);
  for (const binding of shellLocalizationBindings) {
    const element = root.querySelector<HTMLElement>(binding.selector);
    if (!element) continue;
    const value = messages[binding.messageId];
    if (binding.attribute) element.setAttribute(binding.attribute, value);
    else element.textContent = value;
  }
}
