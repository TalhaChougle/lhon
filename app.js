/* ============================================================
   LEO HANDS OF NURTURE — app.js v4
   ============================================================ */

(function () {
  'use strict';

  /* ─── Reduced motion ─── */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── Utilities ─── */
  function throttle(fn, wait) {
    let last = 0;
    return function (...args) {
      const now = Date.now();
      if (now - last >= wait) { last = now; fn.apply(this, args); }
    };
  }

  function debounce(fn, wait) {
    let timer;
    return function (...args) { clearTimeout(timer); timer = setTimeout(() => fn.apply(this, args), wait); };
  }

  const $  = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => [...(ctx || document).querySelectorAll(sel)];

  /* ─── Smooth scroll (accounts for fixed nav height) ─── */
  function smoothScrollTo(el) {
    if (!el) return;
    const nav = $('#site-header');
    const offset = nav ? nav.offsetHeight + 16 : 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }

  /* ============================================================
     MOBILE MENU — defined at outer scope so all code can call it
     ============================================================ */
  const hamburger       = $('#nav-hamburger');
  const mobileMenu      = $('#mobile-menu');
  const mobileOverlay   = $('#mobile-menu-overlay');
  const mobileMenuClose = $('#mobile-menu-close');
  let   menuOpen        = false;

  function openMobileMenu() {
    if (!mobileMenu || !mobileOverlay || menuOpen) return;
    menuOpen = true;
    mobileOverlay.removeAttribute('hidden');
    /* Double rAF gives browser time to paint before CSS transition kicks in */
    requestAnimationFrame(() => requestAnimationFrame(() => mobileMenu.classList.add('open')));
    if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    const firstLink = mobileMenu.querySelector('.mobile-nav-link');
    if (firstLink) setTimeout(() => firstLink.focus(), 60);
  }

  function closeMobileMenu() {
    if (!mobileMenu || !mobileOverlay || !menuOpen) return;
    menuOpen = false;
    mobileMenu.classList.remove('open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    setTimeout(() => mobileOverlay.setAttribute('hidden', ''), 420);
  }

  if (hamburger)       hamburger.addEventListener('click', openMobileMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
  if (mobileOverlay)   mobileOverlay.addEventListener('click', closeMobileMenu);
  if (mobileMenu) {
    mobileMenu.addEventListener('keydown', e => {
      if (e.key === 'Escape') { closeMobileMenu(); if (hamburger) hamburger.focus(); }
    });
  }

  /* ============================================================
     INTRO SCREEN
     ============================================================ */
  (function initIntro() {
    const intro  = $('#intro-screen');
    const skipBtn = $('#intro-skip');
    if (!intro) return;

    function dismiss() {
      intro.classList.add('fade-out');
      document.body.style.overflow = '';
      setTimeout(revealHeroLines, 200);
      setTimeout(() => intro.classList.add('done'), 750);
    }

    const delay = prefersReducedMotion ? 0 : 1900;
    const autoTimer = setTimeout(dismiss, delay);
    if (skipBtn) skipBtn.addEventListener('click', () => { clearTimeout(autoTimer); dismiss(); });

    document.body.style.overflow = 'hidden';
  })();

  /* ============================================================
     HERO HEADLINE REVEAL
     ============================================================ */
  function revealHeroLines() {
    $$('.hero-line').forEach((line, i) => {
      if (prefersReducedMotion) { line.classList.add('revealed'); return; }
      setTimeout(() => line.classList.add('revealed'), i * 90);
    });
  }

  if (prefersReducedMotion) revealHeroLines();

  /* ============================================================
     NAVIGATION — sticky header + active link + anchor scrolling
     ============================================================ */
  (function initNav() {
    const siteHeader = $('#site-header');
    if (!siteHeader) return;

    /* Sticky background */
    const onScroll = throttle(() => {
      siteHeader.classList.toggle('scrolled', window.scrollY > 60);
    }, 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* Delegate ALL anchor clicks for smooth scroll */
    document.addEventListener('click', e => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      closeMobileMenu();
      smoothScrollTo(target);
    });

    /* Active nav state via IntersectionObserver */
    const sections  = $$('section[id]');
    const navLinks  = $$('.nav-links a');
    if (!sections.length || !navLinks.length) return;

    const linkMap = {};
    navLinks.forEach(l => { const h = l.getAttribute('href'); if (h) linkMap[h] = l; });

    function setActive(id) {
      const scrolled = siteHeader.classList.contains('scrolled');
      navLinks.forEach(l => { l.classList.remove('nav-active'); l.style.color = ''; });
      const active = linkMap[`#${id}`];
      if (active) {
        active.classList.add('nav-active');
        active.style.color = scrolled ? 'var(--campaign-blue)' : 'var(--white)';
      }
    }

    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-10% 0px -70% 0px', threshold: 0 });

    sections.forEach(s => sectionObserver.observe(s));
  })();

  /* ============================================================
     HERO CURSOR PARALLAX
     ============================================================ */
  (function initHeroParallax() {
    if (prefersReducedMotion) return;
    const hero = $('.section-hero');
    if (!hero) return;
    const els = $$('[data-parallax]', hero);
    const sparks = $$('.sparkle', hero);
    if (!els.length) return;

    let mx = 0, my = 0, raf = null;
    function apply() {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      const dx = mx - cx, dy = my - cy;
      els.forEach(el => {
        const s = parseFloat(el.dataset.parallax) || 0.05;
        el.style.transform = `translate(${dx * s}px, ${dy * s}px)`;
      });
      sparks.forEach((sp, i) => {
        const s = 0.015 + i * 0.006;
        sp.style.transform = `translate(${dx * s}px, ${dy * s}px)`;
      });
      raf = null;
    }
    document.addEventListener('mousemove', e => {
      if (window.innerWidth <= 768) return;
      mx = e.clientX; my = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    }, { passive: true });
  })();

  /* ============================================================
     SCROLL PARALLAX — hero background shapes
     ============================================================ */
  (function initScrollParallax() {
    if (prefersReducedMotion) return;
    const shapes = $$('.hero-shape');
    if (!shapes.length) return;
    window.addEventListener('scroll', throttle(() => {
      const sy = window.scrollY;
      shapes.forEach((s, i) => { s.style.transform = `translateY(${sy * (i + 1) * 0.07}px)`; });
    }, 16), { passive: true });
  })();

  /* ============================================================
     INITIATIVES — desktop tab panels
     ============================================================ */
  (function initInitiatives() {
    const tabs   = $$('.init-tab');
    const panels = $$('.init-panel');
    if (!tabs.length || !panels.length) return;

    function activate(tab) {
      const targetId = tab.getAttribute('aria-controls');

      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      panels.forEach(panel => {
        if (panel.id === targetId) {
          /* Show: set display first, then fade in */
          panel.removeAttribute('hidden');
          panel.style.display = 'grid';
          panel.style.opacity = '0';
          panel.classList.add('active');
          requestAnimationFrame(() => requestAnimationFrame(() => { panel.style.opacity = '1'; }));
        } else {
          panel.classList.remove('active');
          panel.style.opacity = '0';
          setTimeout(() => {
            if (!panel.classList.contains('active')) {
              panel.setAttribute('hidden', '');
              panel.style.display = '';
              panel.style.opacity = '';
            }
          }, 380);
        }
      });
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', e => {
        const list = tabs;
        const idx  = list.indexOf(tab);
        let next   = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault(); next = list[(idx + 1) % list.length];
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault(); next = list[(idx - 1 + list.length) % list.length];
        }
        if (next) { next.focus(); activate(next); }
      });
    });
  })();

  /* ============================================================
     ACCORDION — mobile initiatives
     ============================================================ */
  (function initAccordion() {
    const headers = $$('.acc-header');
    if (!headers.length) return;

    headers.forEach(header => {
      header.addEventListener('click', () => {
        const expanded = header.getAttribute('aria-expanded') === 'true';
        const bodyEl   = document.getElementById(header.getAttribute('aria-controls'));

        if (expanded) {
          header.setAttribute('aria-expanded', 'false');
          if (bodyEl) bodyEl.setAttribute('hidden', '');
        } else {
          /* Collapse all others */
          headers.forEach(h => {
            if (h === header) return;
            h.setAttribute('aria-expanded', 'false');
            const b = document.getElementById(h.getAttribute('aria-controls'));
            if (b) b.setAttribute('hidden', '');
          });
          header.setAttribute('aria-expanded', 'true');
          if (bodyEl) bodyEl.removeAttribute('hidden');
        }
      });
    });
  })();

  /* ============================================================
     ACTIVITY FILTER
     ============================================================ */
  (function initFilter() {
    const filterBtns = $$('.filter-btn');
    const cards      = $$('.today-card');
    if (!filterBtns.length || !cards.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        filterBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        cards.forEach(card => {
          const match = filter === 'all' || card.dataset.category === filter;
          if (match) {
            card.style.display = '';
            /* Remove fade class after display is restored */
            requestAnimationFrame(() => requestAnimationFrame(() => card.classList.remove('fade-out')));
          } else {
            card.classList.add('fade-out');
            setTimeout(() => {
              if (card.classList.contains('fade-out')) card.style.display = 'none';
            }, 320);
          }
        });
      });
    });
  })();

  /* ============================================================
     GALLERY + LIGHTBOX
     ============================================================ */
  (function initGallery() {
    const items     = $$('.gallery-item');
    const lightbox  = $('#lightbox');
    const lbOverlay = $('#lightbox-overlay');
    const lbImg     = $('#lightbox-img');
    const lbCap     = $('#lightbox-caption');
    const lbCat     = $('#lightbox-cat');
    const lbDate    = $('#lightbox-date');
    const lbClose   = $('#lightbox-close');
    const lbPrev    = $('#lightbox-prev');
    const lbNext    = $('#lightbox-next');

    if (!lightbox || !items.length) return;

    let current = 0;
    let touchX  = 0;

    lbImg.style.transition = 'opacity 0.18s ease';

    function getData(item) {
      const img = item.querySelector('img');
      return {
        src:     img ? img.src : '',
        alt:     img ? img.alt : '',
        caption: item.dataset.caption || (img ? img.alt : ''),
        cat:     item.dataset.cat  || '',
        date:    item.dataset.date || '',
      };
    }

    function openLightbox(idx) {
      current = idx;
      const d = getData(items[idx]);
      lbImg.src = d.src; lbImg.alt = d.alt;
      lbCap.textContent  = d.caption;
      lbCat.textContent  = d.cat;
      lbDate.textContent = d.date;
      lightbox.removeAttribute('hidden');
      lbOverlay.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
      lbClose.focus();
    }

    function closeLightbox() {
      lightbox.setAttribute('hidden', '');
      lbOverlay.setAttribute('hidden', '');
      document.body.style.overflow = '';
      const item = items[current];
      if (item) item.focus();
    }

    function navigate(dir) {
      current = (current + dir + items.length) % items.length;
      const d = getData(items[current]);
      lbImg.style.opacity = '0';
      setTimeout(() => {
        lbImg.src = d.src; lbImg.alt = d.alt;
        lbCap.textContent  = d.caption;
        lbCat.textContent  = d.cat;
        lbDate.textContent = d.date;
        lbImg.style.opacity = '1';
      }, 180);
    }

    items.forEach((item, idx) => {
      item.addEventListener('click',   () => openLightbox(idx));
      item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(idx); }
      });
    });

    lbClose   && lbClose.addEventListener('click', closeLightbox);
    lbOverlay && lbOverlay.addEventListener('click', closeLightbox);
    lbPrev    && lbPrev.addEventListener('click', () => navigate(-1));
    lbNext    && lbNext.addEventListener('click', () => navigate(1));

    document.addEventListener('keydown', e => {
      if (lightbox.hasAttribute('hidden')) return;
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowLeft')  navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });

    /* Touch swipe */
    lightbox.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend',   e => {
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 48) navigate(dx < 0 ? 1 : -1);
    }, { passive: true });
  })();

  /* ============================================================
     IMPACT COUNTERS
     ============================================================ */
  (function initCounters() {
    const els = $$('[data-target]');
    if (!els.length) return;

    function animateCount(el, target) {
      if (prefersReducedMotion) { el.textContent = target.toLocaleString(); return; }
      const duration = 1800;
      const start    = performance.now();
      function step(now) {
        const p = Math.min((now - start) / duration, 1);
        const e = 1 - Math.pow(1 - p, 3); /* ease-out cubic */
        el.textContent = Math.round(e * target).toLocaleString();
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString();
      }
      requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.dataset.counted === 'false') {
          entry.target.dataset.counted = 'true';
          animateCount(entry.target, parseInt(entry.target.dataset.target, 10));
        }
      });
    }, { threshold: 0.2 });

    els.forEach(el => observer.observe(el));
  })();

  /* ============================================================
     SCROLL REVEAL
     ============================================================ */
  (function initReveal() {
    if (prefersReducedMotion) {
      $$('.reveal, .reveal-left, .reveal-right').forEach(el => el.classList.add('in-view'));
      return;
    }

    const targets = [
      { sel: '.about-grid > *',          cls: 'reveal' },
      { sel: '.wwd-card',                cls: 'reveal' },
      { sel: '.impact-stats-grid > *',   cls: 'reveal' },
      { sel: '.today-card',              cls: 'reveal' },
      { sel: '.story-card',              cls: 'reveal' },
      { sel: '.team-card',               cls: 'reveal' },
      { sel: '.team-face',               cls: 'reveal' },
      { sel: '.collab-text-col',         cls: 'reveal-left' },
      { sel: '.collab-form-col',         cls: 'reveal-right' },
      { sel: '.network-inner',           cls: 'reveal' },
      { sel: '.impact-hero-stat',        cls: 'reveal' },
      { sel: '.story-grid > *',          cls: 'reveal' },
    ];

    targets.forEach(({ sel, cls }) => {
      $$(sel).forEach((el, i) => {
        if (el.classList.contains('reveal') ||
            el.classList.contains('reveal-left') ||
            el.classList.contains('reveal-right')) return;
        el.classList.add(cls);
        el.style.transitionDelay = `${Math.min(i * 0.07, 0.42)}s`;
      });
    });

    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    $$('.reveal, .reveal-left, .reveal-right').forEach(el => revealObs.observe(el));
  })();

  /* ============================================================
     STORY MODALS
     ============================================================ */
  (function initStoryModals() {
    const storyBtns = $$('button.story-read-more[data-story]');
    if (!storyBtns.length) return;

    let lastFocused = null;

    function openModal(storyId) {
      const overlay = $(`#story-modal-${storyId}`);
      if (!overlay) return;
      lastFocused = document.activeElement;

      /* Remove hidden attribute FIRST so element gets display:flex */
      overlay.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';

      /* Now trigger opacity transition */
      requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('open')));

      const closeBtn = overlay.querySelector('.story-modal-close');
      if (closeBtn) setTimeout(() => closeBtn.focus(), 60);
    }

    function closeModal(overlay) {
      if (!overlay) return;
      overlay.classList.remove('open');
      setTimeout(() => {
        overlay.setAttribute('hidden', '');
        document.body.style.overflow = '';
        if (lastFocused) lastFocused.focus();
      }, 360);
    }

    storyBtns.forEach(btn => {
      btn.addEventListener('click', () => openModal(btn.dataset.story));
    });

    $$('.story-modal-overlay').forEach(overlay => {
      const closeBtn = overlay.querySelector('.story-modal-close');
      if (closeBtn) closeBtn.addEventListener('click', () => closeModal(overlay));
      overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(overlay); });
      overlay.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(overlay); });
    });

    $$('.story-modal-cta a').forEach(link => {
      link.addEventListener('click', () => {
        const open = $('.story-modal-overlay.open');
        if (open) closeModal(open);
      });
    });
  })();

  /* ============================================================
     CONTACT FORM — validation + success/error state
     ============================================================ */
  (function initForm() {
    const form       = $('#collab-form');
    const successMsg = $('#form-success');
    const submitBtn  = $('#form-submit-btn');
    if (!form) return;

    const fields = [
      { id: 'field-name',    errId: 'error-name',    test: v => v.trim().length > 0,                msg: 'Please enter your name.' },
      { id: 'field-email',   errId: 'error-email',   test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: 'Please enter a valid email address.' },
      { id: 'field-message', errId: 'error-message', test: v => v.trim().length > 0,                msg: 'Please enter a message.' },
    ];

    /* Live-clear errors as user types */
    fields.forEach(({ id, errId }) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', () => {
        el.classList.remove('error');
        const errEl = document.getElementById(errId);
        if (errEl) { errEl.textContent = ''; errEl.classList.remove('visible'); }
      });
    });

    function showErr(id, errId, msg) {
      const f = document.getElementById(id);
      const e = document.getElementById(errId);
      if (f) f.classList.add('error');
      if (e) { e.textContent = msg; e.classList.add('visible'); }
    }

    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      fields.forEach(({ id, errId, test, msg }) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (!test(el.value)) {
          showErr(id, errId, msg);
          valid = false;
        }
      });

      if (!valid) {
        const first = form.querySelector('.form-input.error');
        if (first) first.focus();
        return;
      }

      if (submitBtn) { submitBtn.textContent = 'SENDING…'; submitBtn.disabled = true; }

      /* Simulated send — replace with real fetch('/api/contact', ...) when backend is ready */
      setTimeout(() => {
        if (submitBtn) submitBtn.style.display = 'none';
        if (successMsg) {
          successMsg.removeAttribute('hidden');
          successMsg.focus();
        }
        form.reset();
      }, 1100);
    });
  })();

  /* ============================================================
     MOBILE — hide floating hero photos on very small screens
     ============================================================ */
  (function fixMobileHero() {
    const fix = () => {
      const hide = window.innerWidth <= 480;
      $$('.float-photo').forEach(fp => { fp.style.display = hide ? 'none' : ''; });
    };
    fix();
    window.addEventListener('resize', debounce(fix, 200));
  })();

  /* ============================================================
     LAZY LOADING FALLBACK
     ============================================================ */
  if (!('loading' in HTMLImageElement.prototype)) {
    $$('img[loading="lazy"]').forEach(img => img.removeAttribute('loading'));
  }

  /* ============================================================
     MARQUEE — CSS-driven; JS handles reduced-motion only
     ============================================================ */
  (function handleMarquee() {
    if (!prefersReducedMotion) return;
    $$('.marquee-track').forEach(t => { t.style.animation = 'none'; t.style.transform = 'none'; });
    $$('.marquee-content[aria-hidden="true"]').forEach(el => { el.style.display = 'none'; });
    $$('.marquee-content').forEach(el => { el.style.flexWrap = 'wrap'; });
  })();

  /* ============================================================
     CONSOLE BRANDING
     ============================================================ */
  console.log('%cLEO HANDS OF NURTURE', 'font-family:Georgia,serif;font-size:18px;font-weight:bold;color:#1565c0;');
  console.log('%cYouth-Led · Volunteer-Driven · Real Change · Makassar, Indonesia', 'font-family:monospace;color:#00b4d8;');

})();
