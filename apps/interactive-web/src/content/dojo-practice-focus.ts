export function toggleDojoPracticeFocus(root: HTMLElement, button: HTMLButtonElement): void {
  const entering = root.dataset.practiceFocus !== 'true';
  if (entering) root.dataset.practiceFocus = 'true';
  else delete root.dataset.practiceFocus;
  button.setAttribute('aria-pressed', entering ? 'true' : 'false');
  const enterLabel = button.dataset.practiceEnterLabel || button.textContent || 'PRATICAR ESTE NÚCLEO';
  const exitLabel = button.dataset.practiceExitLabel || 'SAIR DO MODO PRÁTICA';
  button.textContent = entering ? exitLabel : enterLabel;
  if (entering) root.querySelector<HTMLElement>('.dojo-practice')?.focus({ preventScroll: true });
}

export function wireDojoPracticeFocus(scope: ParentNode): void {
  const root = scope.querySelector<HTMLElement>('.dojo-nucleus-page');
  const button = scope.querySelector<HTMLButtonElement>('[data-dojo-practice-focus]');
  if (!root || !button) return;

  button.addEventListener('click', () => toggleDojoPracticeFocus(root, button));
  scope.addEventListener('keydown', (event) => {
    if (!(event instanceof KeyboardEvent) || event.key !== 'Escape' || root.dataset.practiceFocus !== 'true') return;
    toggleDojoPracticeFocus(root, button);
    button.focus({ preventScroll: true });
  });
}
