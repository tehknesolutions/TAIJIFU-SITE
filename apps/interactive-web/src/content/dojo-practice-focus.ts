export function toggleDojoPracticeFocus(root: HTMLElement, button: HTMLButtonElement): void {
  const entering = root.dataset.practiceFocus !== 'true';
  if (entering) root.dataset.practiceFocus = 'true';
  else delete root.dataset.practiceFocus;
  button.setAttribute('aria-pressed', entering ? 'true' : 'false');
  button.textContent = entering ? 'Sair do modo prática' : 'Entrar no modo prática';
  if (entering) root.querySelector<HTMLElement>('.dojo-practice')?.focus({ preventScroll: true });
}

export function wireDojoPracticeFocus(scope: ParentNode): void {
  const root = scope.querySelector<HTMLElement>('.dojo-nucleus-page');
  const button = scope.querySelector<HTMLButtonElement>('[data-dojo-practice-focus]');
  if (!root || !button) return;
  button.addEventListener('click', () => toggleDojoPracticeFocus(root, button));
}
