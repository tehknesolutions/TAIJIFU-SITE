(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');
  if (!toggle || !nav) return;

  const mobile = window.matchMedia('(max-width: 48rem)');
  const sync = () => {
    if (mobile.matches) {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      nav.hidden = !expanded;
    } else {
      nav.hidden = false;
      toggle.setAttribute('aria-expanded', 'false');
    }
  };

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.hidden = expanded;
  });
  mobile.addEventListener?.('change', sync);
  sync();
})();
