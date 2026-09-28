export * from './brand.js';

function escapeHtml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll("'", '&#39;');
}

export const Container = (html: string) => `<div class="tj-container">${html}</div>`;
export const Stack = (html: string) => `<div class="tj-stack">${html}</div>`;
export const Cluster = (html: string) => `<div class="tj-cluster">${html}</div>`;
export const Grid = (html: string) => `<div class="tj-grid">${html}</div>`;
export const Rule = () => '<hr class="tj-rule">';
export const Surface = (html: string) => `<section class="tj-surface">${html}</section>`;
export const FocusRing = (html: string) => `<span class="tj-focus-ring">${html}</span>`;

export const Eyebrow = (text: string) => `<p class="tj-eyebrow">${escapeHtml(text)}</p>`;
export const Display = (text: string) => `<h1 class="tj-display">${escapeHtml(text)}</h1>`;
export const Heading = (text: string, level: 2 | 3 | 4 | 5 | 6 = 2) => `<h${level} class="tj-heading">${escapeHtml(text)}</h${level}>`;
export const Body = (text: string) => `<p class="tj-body">${escapeHtml(text)}</p>`;
export const Meta = (text: string) => `<small class="tj-meta">${escapeHtml(text)}</small>`;

export const Button = (label: string, type: 'button' | 'submit' = 'button') => `<button class="tj-button" type="${type}">${escapeHtml(label)}</button>`;
export const IconButton = (label: string, icon: string) => `<button class="tj-icon-button" type="button" aria-label="${escapeHtml(label)}"><span aria-hidden="true">${escapeHtml(icon)}</span></button>`;
export const TextLink = (href: string, label: string) => `<a class="tj-text-link" href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
export const MediaFrame = (src: string, alt: string) => `<figure class="tj-media-frame"><img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}"></figure>`;