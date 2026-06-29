/* ================================================================
   DEBBIE'S SUITES & APARTMENTS — Shared JavaScript
   ================================================================ */

/* ── Page Loader ── */
(function () {
  const loader = document.getElementById('page-loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 600);
  });
  // Fallback if load event already fired
  if (document.readyState === 'complete') {
    setTimeout(() => loader.classList.add('hidden'), 600);
  }
})();

/* ── Navigation ── */
(function () {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('nav-mobile-menu');
  if (!navbar) return;

  // Scroll effect
  const onScroll = () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // Active link highlight
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile-menu a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ── Scroll Reveal ── */
(function () {
  const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(t => observer.observe(t));
})();

/* ── Animated Counters ── */
(function () {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 2000;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString() + (el.dataset.suffix || '');
    }, step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

/* ── Parallax Hero ── */
(function () {
  const heroParallax = document.getElementById('hero-parallax');
  if (!heroParallax) return;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroParallax.style.transform = `translateY(${scrolled * 0.4}px)`;
  }, { passive: true });
})();

/* ── Gallery Filter & Lightbox ── */
(function () {
  // Filter buttons
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.style.opacity = show ? '1' : '0';
        item.style.transform = show ? 'scale(1)' : 'scale(0.95)';
        item.style.display = show ? 'block' : 'none';
      });
    });
  });

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentIndex = 0;
  let visibleItems = [];

  const openLightbox = (index) => {
    visibleItems = Array.from(galleryItems).filter(i => i.style.display !== 'none');
    currentIndex = index;
    lightboxImg.src = visibleItems[currentIndex].querySelector('img').src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };
  const navigate = (dir) => {
    currentIndex = (currentIndex + dir + visibleItems.length) % visibleItems.length;
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = visibleItems[currentIndex].querySelector('img').src;
      lightboxImg.style.opacity = '1';
    }, 180);
  };

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(idx));
  });
  closeBtn && closeBtn.addEventListener('click', closeLightbox);
  prevBtn  && prevBtn.addEventListener('click', () => navigate(-1));
  nextBtn  && nextBtn.addEventListener('click', () => navigate(1));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });
})();

/* ── FAQ Accordion ── */
(function () {
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();

/* ── Back to Top ── */
(function () {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ── Booking Form ── */
(function () {
  const form = document.getElementById('booking-form');
  const modal = document.getElementById('booking-modal');
  const modalClose = document.getElementById('booking-modal-close');
  if (!form || !modal) return;

  // Set min date for check-in/out to today
  const today = new Date().toISOString().split('T')[0];
  const checkin  = form.querySelector('[name="checkin"]');
  const checkout = form.querySelector('[name="checkout"]');
  if (checkin)  checkin.min  = today;
  if (checkout) checkout.min = today;
  if (checkin) {
    checkin.addEventListener('change', () => {
      if (checkout) checkout.min = checkin.value;
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // In production this would submit to Formspree
    // For now just show confirmation
    modal.classList.add('open');
    form.reset();
  });

  modalClose && modalClose.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });
})();

/* ── Cookie Banner ── */
(function () {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;
  if (!localStorage.getItem('cookies_accepted')) {
    setTimeout(() => banner.classList.add('show'), 1500);
  }
  const acceptBtn = document.getElementById('cookie-accept');
  acceptBtn && acceptBtn.addEventListener('click', () => {
    localStorage.setItem('cookies_accepted', '1');
    banner.classList.remove('show');
  });
})();

/* ── Smooth hero text entrance ── */
(function () {
  const heroElements = document.querySelectorAll('.hero-animate');
  heroElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.9s ease ${i * 0.18 + 0.3}s, transform 0.9s ease ${i * 0.18 + 0.3}s`;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100);
  });
})();

/* ── Testimonials Slider (simple auto-rotate) ── */
(function () {
  const track = document.getElementById('testimonials-track');
  if (!track) return;
  const cards = track.querySelectorAll('.testimonial-slide');
  if (cards.length < 2) return;
  let current = 0;

  const showCard = (idx) => {
    cards.forEach((c, i) => {
      c.style.display = i === idx ? 'block' : 'none';
    });
  };
  showCard(0);

  setInterval(() => {
    current = (current + 1) % cards.length;
    showCard(current);
  }, 5000);
})();
    
