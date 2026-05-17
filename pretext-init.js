import { prepare, layout } from './pretext.js';

async function initPretext() {
  await document.fonts.ready;

  const targets = [
    ...document.querySelectorAll('.hero-tagline'),
    ...document.querySelectorAll('.about-text p'),
    ...document.querySelectorAll('.tl-list li'),
    ...document.querySelectorAll('.int-card p'),
    ...document.querySelectorAll('.contact-sub'),
  ];

  const prepared = new Map();

  for (const el of targets) {
    const text = el.textContent.trim();
    if (!text) continue;
    const font = getComputedStyle(el).font;
    prepared.set(el, prepare(text, font));
  }

  function relayout() {
    for (const [el, handle] of prepared) {
      const cs = getComputedStyle(el);
      const lh = parseFloat(cs.lineHeight);
      const width = el.clientWidth;
      if (!width || !lh || isNaN(lh)) continue;
      const { height } = layout(handle, width, lh);
      el.style.height = `${Math.ceil(height)}px`;
    }
  }

  new ResizeObserver(relayout).observe(document.body);
  relayout();

  // Re-prepare and re-layout on contenteditable edits
  for (const [el, ] of prepared) {
    if (!el.isContentEditable) continue;
    new MutationObserver(() => {
      const text = el.textContent.trim();
      const font = getComputedStyle(el).font;
      prepared.set(el, prepare(text, font));
      relayout();
    }).observe(el, { characterData: true, subtree: true, childList: true });
  }
}

initPretext();
