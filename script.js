// Khorasaan Kabab & Gyro &#8212; interactions and animations

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('mainNav');
  const navOverlay = document.getElementById('navOverlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const revealElements = document.querySelectorAll('.reveal');
  const yearSpan = document.getElementById('year');

  // Set current year in footer
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- Header background on scroll ---
  function handleScroll() {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- Mobile navigation ---
  let scrollY = 0;

  function lockScroll() {
    scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';
  }

  function unlockScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.overflow = '';
    const savedY = scrollY;
    scrollY = -1;
    if (savedY >= 0) {
      window.scrollTo(0, savedY);
    }
  }

  function toggleNav() {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    header.classList.toggle('nav-open', isOpen);
    if (navOverlay) navOverlay.classList.toggle('visible', isOpen);
    if (isOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }


  function closeNav(skipScrollRestore = false) {
    nav.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    header.classList.remove('nav-open');
    if (navOverlay) navOverlay.classList.remove('visible');
    if (skipScrollRestore) {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      scrollY = -1;
    } else {
      unlockScroll();
    }
  }

  hamburger.addEventListener('click', toggleNav);

  const navClose = document.getElementById('navClose');
  if (navClose) {
    navClose.addEventListener('click', closeNav);
  }


  // Close mobile nav when tapping the overlay or outside the panel
  if (navOverlay) {
    navOverlay.addEventListener('click', closeNav);
  }

  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') &&
        !nav.contains(e.target) &&
        !hamburger.contains(e.target) &&
        !(navOverlay && navOverlay.contains(e.target))) {
      closeNav();
    }
  });

  // Close mobile nav with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeNav();
      hamburger.focus();
    }
  });


  // --- Smooth scroll + close mobile nav on anchor click ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const wasOpen = nav.classList.contains('open');

      if (wasOpen) {
        closeNav(true);
      }

      const doScroll = () => {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      };

      if (wasOpen) {
        // Wait for menu close transition + scroll-lock restore, then scroll
        setTimeout(doScroll, 400);
      } else {
        requestAnimationFrame(doScroll);
      }
    });
  });

  // --- Active nav link highlighting ---
  const sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    const scrollPos = window.scrollY + header.offsetHeight + 80;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  // --- Menu accordion + category filtering ---
  const menuCategories = document.querySelectorAll('.menu-category');
  const categoryToggles = document.querySelectorAll('.category-toggle');
  const expandAllBtn = document.getElementById('expandAll');
  const collapseAllBtn = document.getElementById('collapseAll');

  function setCategoryOpen(category, isOpen) {
    const toggle = category.querySelector('.category-toggle');
    const content = category.querySelector('.category-content');
    if (!toggle || !content) return;
    toggle.setAttribute('aria-expanded', String(isOpen));
    content.classList.toggle('collapsed', !isOpen);
  }

  categoryToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const category = toggle.closest('.menu-category');
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      setCategoryOpen(category, !isOpen);
    });
  });

  if (expandAllBtn) {
    expandAllBtn.addEventListener('click', () => {
      menuCategories.forEach(cat => setCategoryOpen(cat, true));
    });
  }

  if (collapseAllBtn) {
    collapseAllBtn.addEventListener('click', () => {
      menuCategories.forEach(cat => setCategoryOpen(cat, false));
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;

      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      menuCategories.forEach(cat => {
        const catKey = cat.dataset.category;
        const matches = category === 'all' || catKey === category;
        cat.classList.toggle('hidden', !matches);
        if (matches) {
          setCategoryOpen(cat, true);
        }
      });
    });
  });

  // --- Scroll reveal animations ---
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // --- Reduced motion respect ---
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealElements.forEach(el => el.classList.add('visible'));
    document.querySelectorAll('.reveal-up').forEach(el => {
      el.style.animation = 'none';
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }
});
