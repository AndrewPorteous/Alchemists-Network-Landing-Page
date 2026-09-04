(() => {
  const cfg = window.ALCHEMISTS_CONFIG || {};
  const links = cfg.whatsapp || {};

  document.querySelectorAll('[data-whatsapp]').forEach((el) => {
    const key = el.dataset.whatsapp;
    if (links[key]) el.href = links[key];
  });

  document.querySelectorAll('[data-scroll]').forEach((el) => {
    el.addEventListener('click', (event) => {
      const selector = el.dataset.scroll;
      const target = document.querySelector(selector);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.site-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    }));
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
