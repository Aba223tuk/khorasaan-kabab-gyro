/* Khorasaan Kabab & Gyro — site interactions */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById('header');
  const onScroll = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 20);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile hamburger nav ---------- */
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');
  const navClose = document.getElementById('navClose');
  const navOverlay = document.getElementById('navOverlay');
  const navLinks = mainNav ? mainNav.querySelectorAll('.nav-link, .nav-cta') : [];

  const openMenu = () => {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    mainNav.classList.add('open');
    navOverlay.classList.add('visible');
    navOverlay.setAttribute('aria-hidden', 'false');
    header.classList.add('nav-open');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('open');
    navOverlay.classList.remove('visible');
    navOverlay.setAttribute('aria-hidden', 'true');
    header.classList.remove('nav-open');
    document.body.style.overflow = '';
  };

  if (hamburger && mainNav && navOverlay) {
    hamburger.addEventListener('click', () => {
      const isOpen = mainNav.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });

    if (navClose) navClose.addEventListener('click', closeMenu);
    navOverlay.addEventListener('click', closeMenu);

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('open')) closeMenu();
    });

    // Close whenever a nav link (or the Call to Order button) is tapped
    navLinks.forEach((link) => link.addEventListener('click', closeMenu));

    // Reset state if the viewport grows back past the mobile breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && mainNav.classList.contains('open')) closeMenu();
    });
  }

  /* ---------- Active nav link on scroll (scroll-spy) ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinkByHash = {};
  document.querySelectorAll('.nav-link').forEach((link) => {
    navLinkByHash[link.getAttribute('href')] = link;
  });

  if (sections.length && 'IntersectionObserver' in window) {
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = navLinkByHash['#' + entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          document.querySelectorAll('.nav-link.active').forEach((l) => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sections.forEach((section) => spyObserver.observe(section));
  }

  /* ---------- Reveal-on-scroll animations ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* ---------- Menu category accordion ---------- */
  const categoryToggles = document.querySelectorAll('.category-toggle');
  categoryToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const content = document.getElementById(toggle.getAttribute('aria-controls'));
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      if (content) content.classList.toggle('collapsed', expanded);
    });
  });

  const expandAllBtn = document.getElementById('expandAll');
  const collapseAllBtn = document.getElementById('collapseAll');

  if (expandAllBtn) {
    expandAllBtn.addEventListener('click', () => {
      categoryToggles.forEach((toggle) => {
        toggle.setAttribute('aria-expanded', 'true');
        const content = document.getElementById(toggle.getAttribute('aria-controls'));
        if (content) content.classList.remove('collapsed');
      });
    });
  }

  if (collapseAllBtn) {
    collapseAllBtn.addEventListener('click', () => {
      categoryToggles.forEach((toggle) => {
        toggle.setAttribute('aria-expanded', 'false');
        const content = document.getElementById(toggle.getAttribute('aria-controls'));
        if (content) content.classList.add('collapsed');
      });
    });
  }

  /* ---------- Menu category filtering ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuCategories = document.querySelectorAll('.menu-category');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;

      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      menuCategories.forEach((cat) => {
        const show = category === 'all' || cat.dataset.category === category;
        cat.classList.toggle('hidden', !show);

        // Auto-expand any category that filtering reveals
        if (show) {
          const toggle = cat.querySelector('.category-toggle');
          const content = cat.querySelector('.category-content');
          if (toggle && content) {
            toggle.setAttribute('aria-expanded', 'true');
            content.classList.remove('collapsed');
          }
        }
      });
    });
  });

});