// /mobile.js
(function () {
  const header = document.querySelector('.nav');
  if (!header) return;

  const toggle = header.querySelector('.nav-toggle');
  const links = header.querySelector('.links');

  function openMenu() {
    header.classList.add('open');
    document.body.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    header.classList.remove('open');
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    header.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Close when clicking outside the drawer
  document.addEventListener('click', (e) => {
    if (!header.classList.contains('open')) return;
    const inside = header.contains(e.target) && (links.contains(e.target) || toggle.contains(e.target));
    if (!inside) closeMenu();
  });

  // Close with ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Close when choosing a link
  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
})();
