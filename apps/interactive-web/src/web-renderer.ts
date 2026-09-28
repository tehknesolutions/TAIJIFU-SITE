import type { RenderFrame } from './renderer-adapter.js';

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

  return `<nav data-product-kind="${escapeHtml(frame.productKind)}">${links}</nav>`;
}