(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('open');
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

  document.querySelector('#year').textContent = new Date().getFullYear();
  const backTop = document.querySelector('.back-top');
  const updateBackTop = () => backTop.classList.toggle('visible', window.scrollY > 500);
  window.addEventListener('scroll', updateBackTop, { passive: true });
  updateBackTop();

  const revealTargets = document.querySelectorAll('.project, .portfolio-card, .process-grid article, .why-list article, .signature-grid article, .service-row, .statement h2, .section-heading');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(element => { element.classList.add('reveal'); observer.observe(element); });
  }

  // A restrained pointer parallax keeps the hero collage tactile without moving on touch devices.
  const art = document.querySelector('.hero-art');
  if (art && window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    art.addEventListener('pointermove', event => {
      const box = art.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - .5;
      const y = (event.clientY - box.top) / box.height - .5;
      art.style.setProperty('--px', `${x * 7}px`);
      art.style.setProperty('--py', `${y * 7}px`);
    });
    art.addEventListener('pointerleave', () => { art.style.setProperty('--px', '0px'); art.style.setProperty('--py', '0px'); });
  }
})();


