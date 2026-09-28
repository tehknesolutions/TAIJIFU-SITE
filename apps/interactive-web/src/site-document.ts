import type { RenderFrame } from './renderer-adapter.js';
import { renderFrameToHtml } from './web-renderer.js';

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll("'", '&#39;');
}

export function renderExperienceDocument(
  frame: RenderFrame,
  options: { title: string; lang?: string },
): string {
  const lang = options.lang ?? 'pt-BR';
  return `<!doctype html><html lang="${escapeHtml(lang)}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(options.title)}</title></head><body>${renderFrameToHtml(frame)}</body></html>`;
}