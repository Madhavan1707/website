gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─── NAV SCROLL ────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ─── HERO ENTRANCE ─────────────────────────────────────── */
if (prefersReducedMotion) {
  gsap.set('.hero-pre, .hn-line, .hero-roles, .hero-tagline, .hero-actions, .hero-stats, .hero-photo-wrap, .scroll-cue', { opacity: 1, y: 0, x: 0, scale: 1, clearProps: 'transform' });
} else {
  const heroTl = gsap.timeline({ delay: 0.2 });
  heroTl
    .from('.hero-pre', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' })
    .from('.hn-line', {
      opacity: 0, y: '100%', duration: 0.8, stagger: 0.12, ease: 'power4.out'
    }, '-=0.2')
    .from('.hero-roles', { opacity: 0, y: 15, duration: 0.6, ease: 'power3.out' }, '-=0.3')
    .from('.hero-tagline', { opacity: 0, y: 15, duration: 0.6, ease: 'power3.out' }, '-=0.4')
    .from('.hero-actions', { opacity: 0, y: 15, duration: 0.5, ease: 'power3.out' }, '-=0.3')
    .from('.hero-stats', { opacity: 0, y: 10, duration: 0.5, ease: 'power3.out' }, '-=0.3')
    .from('.hero-photo-wrap', { opacity: 0, scale: 0.9, duration: 0.8, ease: 'power3.out' }, 0.4)
    .from('.scroll-cue', { opacity: 0, duration: 0.5 }, '-=0.2');
}

/* ─── STAT COUNTER ──────────────────────────────────────── */
function animateCounter(el) {
  const target   = parseFloat(el.dataset.target);
  const suffix   = el.dataset.suffix || '';
  const isFloat  = !Number.isInteger(target);
  const duration = 1.8;
  const start    = performance.now();

  function step(now) {
    const elapsed = Math.min((now - start) / (duration * 1000), 1);
    const eased   = 1 - Math.pow(1 - elapsed, 3);
    const current = target * eased;
    el.textContent = isFloat ? current.toFixed(1) + suffix : Math.round(current) + suffix;
    if (elapsed < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

ScrollTrigger.create({
  trigger: '.hero-stats',
  start: 'top 80%',
  once: true,
  onEnter: () => {
    document.querySelectorAll('.hs-num[data-target]').forEach(animateCounter);
  }
});

/* ─── HERO PARALLAX ─────────────────────────────────────── */
const heroContent = document.getElementById('heroContent');
const heroBg      = document.getElementById('heroBg');
const heroPhoto   = document.getElementById('heroPhoto');

document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth  - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;

  gsap.to(heroBg.querySelectorAll('.hb-shape'), {
    x: i => x * (8 + i * 4),
    y: i => y * (6 + i * 3),
    duration: 1.2,
    ease: 'power1.out',
    stagger: 0.04
  });
  gsap.to(heroContent, {
    rotateY: x * 2,
    rotateX: -y * 1.5,
    duration: 1,
    ease: 'power1.out',
    transformPerspective: 900
  });
  gsap.to(heroPhoto, {
    x: -x * 12,
    y: -y * 8,
    duration: 1.2,
    ease: 'power1.out'
  });
}, { passive: true });

/* ─── SCROLL REVEAL HELPER ──────────────────────────────── */
function reveal(selector, vars = {}) {
  gsap.utils.toArray(selector).forEach((el, i) => {
    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1, clearProps: 'transform' });
      return;
    }
    gsap.to(el, {
      opacity: 1,
      x: 0, y: 0,
      scale: 1,
      duration: 0.85,
      ease: 'power3.out',
      delay: vars.stagger ? i * vars.stagger : 0,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
      ...vars
    });
  });
}

reveal('.reveal-up',   { stagger: 0 });
reveal('.reveal-left', { stagger: 0 });
reveal('.reveal-right',{ stagger: 0 });
reveal('.reveal-tl',   { stagger: 0.12 });
reveal('.reveal-card', { stagger: 0.1 });

/* ─── SECTION BG ACCENT ─────────────────────────────────── */
gsap.utils.toArray('.section').forEach(section => {
  gsap.fromTo(section, {
    '--glow-opacity': 0
  }, {
    '--glow-opacity': 1,
    scrollTrigger: {
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      scrub: true
    }
  });
});

/* ─── TIMELINE DEPTH ─────────────────────────────────────── */
gsap.utils.toArray('.tl-card').forEach((card, i) => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, { z: 15, rotateX: -1, duration: 0.3, ease: 'power2.out', transformPerspective: 800 });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { z: 0, rotateX: 0, duration: 0.5, ease: 'power2.out' });
  });
});

/* ─── PROJECT CARD 3D FLIP ───────────────────────────────── */
document.querySelectorAll('.proj-card').forEach(card => {
  const inner = card.querySelector('.pc-inner');

  card.addEventListener('mouseenter', () => {
    gsap.to(inner, { rotateY: 180, duration: 0.65, ease: 'power2.inOut' });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(inner, { rotateY: 0, rotateX: 0, duration: 0.65, ease: 'power2.inOut' });
  });
});

/* ─── SKILL CHIP WAVE ────────────────────────────────────── */
document.querySelectorAll('.sg-chips').forEach(container => {
  const chips = container.querySelectorAll('span');
  gsap.from(chips, {
    opacity: 0,
    scale: 0.85,
    y: 10,
    stagger: 0.04,
    duration: 0.4,
    ease: 'back.out(1.5)',
    scrollTrigger: {
      trigger: container,
      start: 'top 85%',
      once: true
    }
  });
});

/* ─── INTEREST CARD FLOAT ────────────────────────────────── */
document.querySelectorAll('.int-card').forEach((card, i) => {
  const delay = (i % 4) * 0.4;
  gsap.to(card, {
    y: -6,
    duration: 2 + i * 0.1,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    delay
  });
});

/* ─── HAMBURGER (MOBILE NAV) ─────────────────────────────── */
const hamburger = document.querySelector('.nav-hamburger');
const navLinks   = document.querySelector('.nav-links');
const closeMenu  = () => { navLinks.style.cssText = ''; };
hamburger?.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  navLinks.style.cssText = open
    ? ''
    : 'display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:rgba(7,7,26,0.97);border-bottom:1px solid rgba(0,212,255,0.12);padding:1rem 2rem;gap:0.5rem;backdrop-filter:blur(20px)';
});
navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

/* ─── ACTIVE NAV LINK ────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.nav-links a');

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      active?.classList.add('active');
      const hash = entry.target.id === 'hero' ? location.pathname : '#' + entry.target.id;
      history.replaceState(null, '', hash);
    }
  });
}, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

sections.forEach(s => io.observe(s));

/* ─── NAV ACTIVE STYLE ───────────────────────────────────── */
const style = document.createElement('style');
style.textContent = '.nav-links a.active { color: #fff; background: rgba(0,212,255,0.08); }';
document.head.appendChild(style);

/* ─── CERTIFICATIONS CAROUSEL (3D COVERFLOW) ─────────────── */
(function () {
  const carousel = document.querySelector('.certs-carousel');
  if (!carousel) return;

  const stage = carousel.querySelector('.certs-stage');
  const cards = Array.from(stage.querySelectorAll('.cert-card'));
  const dots  = Array.from(carousel.querySelectorAll('.certs-dot'));
  const total = cards.length;

  let current = 0;
  let paused  = false;
  let tid     = null;

  /* ── normalise offset to [-floor(n/2), floor(n/2)] ─────── */
  function relOff(i) {
    let off = (i - current + total) % total;
    if (off > Math.floor(total / 2)) off -= total;
    return off;
  }

  /* ── compute per-card geometry ──────────────────────────── */
  function layout() {
    const sw = stage.offsetWidth;
    const cw = cards[0].offsetWidth;   // CSS sets width (52% / 72% / 84%)
    const cx = (sw - cw) / 2;         // left edge of a centred card
    const shift = cw * 0.68;          // how far side cards are nudged

    cards.forEach((card, i) => {
      const off = relOff(i);
      let tx, ry, sc, op, zi;

      if (off === 0) {
        tx = cx;          ry =   0; sc = 1;    op = 1;   zi = 3;
      } else if (off === -1) {
        tx = cx - shift;  ry =  38; sc = 0.88; op = 0.6; zi = 2;
      } else if (off === 1) {
        tx = cx + shift;  ry = -38; sc = 0.88; op = 0.6; zi = 2;
      } else if (off > 1) {
        tx = sw + cw;     ry = -90; sc = 0.6;  op = 0;   zi = 1;
      } else {
        tx = -cw * 1.5;   ry =  90; sc = 0.6;  op = 0;   zi = 1;
      }

      card.style.transform = `translateX(${tx}px) perspective(1100px) rotateY(${ry}deg) scale(${sc})`;
      card.style.opacity   = op;
      card.style.zIndex    = zi;
    });

    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  /* ── enable / disable CSS transitions per-card ──────────── */
  function setAnim(on) {
    const t = on ? 'transform 0.72s cubic-bezier(0.16,1,0.3,1), opacity 0.72s ease' : 'none';
    cards.forEach(c => { c.style.transition = t; });
  }

  /* ── fit stage height to active card ────────────────────── */
  function fitHeight() {
    requestAnimationFrame(() => {
      const h = cards[current].offsetHeight;
      if (h > 50) stage.style.height = h + 'px';
    });
  }

  /* ── auto-advance ───────────────────────────────────────── */
  function schedule() { clearTimeout(tid); tid = setTimeout(advance, 3000); }

  function advance() {
    current = (current + 1) % total;
    setAnim(true);
    layout();
    if (!paused) schedule();
  }

  /* ── dot clicks ─────────────────────────────────────────── */
  dots.forEach((d, i) => {
    d.addEventListener('click', () => {
      clearTimeout(tid);
      current = i;
      setAnim(true);
      layout();
      if (!paused) schedule();
    });
  });

  /* ── hover pause ────────────────────────────────────────── */
  carousel.addEventListener('mouseenter', () => { paused = true;  clearTimeout(tid); });
  carousel.addEventListener('mouseleave', () => { paused = false; schedule(); });

  /* ── touch swipe ─────────────────────────────────────────── */
  let touchStartX = 0;
  stage.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    paused = true;
    clearTimeout(tid);
  }, { passive: true });
  stage.addEventListener('touchend', e => {
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      current = delta > 0
        ? (current + 1) % total
        : (current - 1 + total) % total;
      setAnim(true);
      layout();
      fitHeight();
    }
    paused = false;
    schedule();
  }, { passive: true });

  /* ── resize ─────────────────────────────────────────────── */
  window.addEventListener('resize', () => { setAnim(false); layout(); fitHeight(); });

  /* ── init ───────────────────────────────────────────────── */
  setAnim(false);
  layout();
  fitHeight();
  schedule();
}());
