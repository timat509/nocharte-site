// Mobile header toggler
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.nav');
  if (!header) return;

  const btn   = header.querySelector('.nav-toggle');
  const panel = header.querySelector('.links');
  if (!btn || !panel) return;

  const setOpen = (open) => {
    header.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('menu-open', open);
  };

  btn.addEventListener('click', () => setOpen(!header.classList.contains('open')));
  panel.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false); // close after navigating
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });

  // If resized back to desktop, make sure menu is closed
  const mq = window.matchMedia('(min-width: 821px)');
  const onChange = (e) => { if (e.matches) setOpen(false); };
  mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange);
});
