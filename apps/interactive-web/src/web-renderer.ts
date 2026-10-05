import type { RenderFrame } from './renderer-adapter.js';
import { getPresentationMediaUrl } from './media-registry.js';

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll("'", '&#39;');
}

export function renderFrameToHtml(frame: RenderFrame): string {
  const links = frame.nodes
    .map(
      (node) =>
        `<a data-node-id="${escapeHtml(node.id)}" href="${escapeHtml(node.canonicalUrl)}">${escapeHtml(node.label)}</a>`,
    )
    .join('');

  const media = frame.presentationMediaId
    ? `<img data-presentation-media-id="${escapeHtml(frame.presentationMediaId)}" src="${escapeHtml(getPresentationMediaUrl(frame.presentationMediaId))}" alt="" loading="lazy">`
    : '';

  return `<nav data-product-kind="${escapeHtml(frame.productKind)}">${media}${links}</nav>`;
}