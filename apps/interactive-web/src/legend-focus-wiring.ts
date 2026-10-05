export function wireLegendFocus(
  root: HTMLElement | null,
  focusNode: (nodeId: string | null) => void,
): void {
  if (!root) return;
  for (const link of root.querySelectorAll<HTMLAnchorElement>('[data-node-id]')) {
    const nodeId = link.dataset.nodeId ?? null;
    const focus = () => focusNode(nodeId);
    const blur = () => focusNode(null);
    link.addEventListener('pointerenter', focus);
    link.addEventListener('pointerleave', blur);
    link.addEventListener('focus', focus);
    link.addEventListener('blur', blur);
  }
}
