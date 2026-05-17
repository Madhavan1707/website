gsap.registerPlugin(ScrollTrigger);

/* ─── NAV SCROLL ────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ─── HERO ENTRANCE ─────────────────────────────────────── */
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
hamburger?.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  navLinks.style.cssText = open
    ? ''
    : 'display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:rgba(7,7,26,0.97);border-bottom:1px solid rgba(0,212,255,0.12);padding:1rem 2rem;gap:0.5rem;backdrop-filter:blur(20px)';
});

/* ─── ACTIVE NAV LINK ────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.nav-links a');

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      active?.classList.add('active');
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => io.observe(s));

/* ─── NAV ACTIVE STYLE ───────────────────────────────────── */
const style = document.createElement('style');
style.textContent = '.nav-links a.active { color: #fff; background: rgba(0,212,255,0.08); }';
document.head.appendChild(style);
