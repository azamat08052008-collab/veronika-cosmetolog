const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const chev = '<svg class="ic"><use href="#i-chev"/></svg>';
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Услуги
const tabsEl = document.getElementById('tabs');
const cardsEl = document.getElementById('cards');

tabsEl.innerHTML = [{ id: 'all', title: 'Все' }, ...GROUPS].map((g, i) =>
  `<button class="tab" role="tab" type="button" data-group="${g.id}" aria-selected="${i === 0}">${g.title}</button>`
).join('');

cardsEl.innerHTML = SERVICES.map((s, i) => {
  const items = (s.items || []).map((it) => Array.isArray(it)
    ? `<li><span>${esc(it[0])}</span><span>${esc(it[1])}</span></li>`
    : `<li><span>${esc(it)}</span></li>`).join('');
  const details = items ? `
    <details>
      <summary>${esc(s.stepsTitle || 'Подробнее')}${chev}</summary>
      <ul class="steps">${items}</ul>
    </details>` : '';
  return `
    <article class="card reveal tilt" data-group="${s.group}" style="--i:${i % 6}">
      <div class="card-head">
        <h3 class="card-name">${esc(s.name)}</h3>
        <div class="card-price">${s.oldPrice ? `<s>${esc(s.oldPrice)}</s>` : ''}${esc(s.price)}</div>
      </div>
      <div class="card-meta"><svg class="ic"><use href="#i-clock"/></svg>${esc(s.duration)}</div>
      ${s.note ? `<p class="card-note">${esc(s.note)}</p>` : ''}
      ${details}
      <div class="card-cta"><button class="btn" type="button" data-book="${esc(s.name)}">Записаться</button></div>
    </article>`;
}).join('');

tabsEl.addEventListener('click', (e) => {
  const tab = e.target.closest('.tab');
  if (!tab) return;
  tabsEl.querySelectorAll('.tab').forEach((t) => t.setAttribute('aria-selected', t === tab));
  const g = tab.dataset.group;
  cardsEl.querySelectorAll('.card').forEach((c) => { c.hidden = g !== 'all' && c.dataset.group !== g; });
});

// Лента процедур
const MARQUEE = ['Чистка лица', 'Биоревитализация', 'Контурная пластика губ', 'Ботулинотерапия', 'Morpheus 8', 'Пилинги', 'Коктейль «Монако»', 'Микронидлинг', 'Коллагеновое омолаживание', 'Фотоомоложение LUMECCA'];
document.getElementById('marquee').innerHTML = [...MARQUEE, ...MARQUEE].map((t) => `<span>${esc(t)}</span>`).join('');

// Работы: лента с перетаскиванием
const rail = document.getElementById('works-rail');
rail.innerHTML = Array.from({ length: 15 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0');
  return `<button type="button" data-src="img/works/${n}.jpg"><img src="img/works/${n}.jpg" alt="Работа ${i + 1}: фото до и после" loading="lazy" width="900" height="900" draggable="false"></button>`;
}).join('');

let drag = null;
rail.addEventListener('pointerdown', (e) => {
  drag = { x: e.clientX, left: rail.scrollLeft, moved: false };
  rail.setPointerCapture(e.pointerId);
});
rail.addEventListener('pointermove', (e) => {
  if (!drag) return;
  const dx = e.clientX - drag.x;
  if (Math.abs(dx) > 6) { drag.moved = true; rail.classList.add('dragging'); }
  if (drag.moved) rail.scrollLeft = drag.left - dx;
});
const endDrag = () => { if (!drag) return; setTimeout(() => rail.classList.remove('dragging'), 50); drag = null; };
rail.addEventListener('pointerup', endDrag);
rail.addEventListener('pointercancel', endDrag);
document.querySelectorAll('[data-rail]').forEach((b) => b.addEventListener('click', () => {
  rail.scrollBy({ left: Number(b.dataset.rail) * rail.clientWidth * 0.8, behavior: reduceMotion ? 'auto' : 'smooth' });
}));

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
rail.addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b || rail.classList.contains('dragging')) return;
  lightboxImg.src = b.dataset.src;
  lightboxImg.alt = b.querySelector('img').alt;
  lightbox.showModal();
});
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.close(); });

// Отзывы
document.getElementById('reviews-track').innerHTML = REVIEWS.map((r) => `
  <article class="review reveal">
    <blockquote>«${esc(r.text)}»</blockquote>
    <cite><b>${esc(r.name)}</b>Яндекс Карты / ${esc(r.date)}</cite>
  </article>`).join('');

// Вопросы
document.getElementById('faq-list').innerHTML = FAQ.map((f) => `
  <details class="faq-item">
    <summary>${esc(f.q)}${chev}</summary>
    <p>${esc(f.a)}</p>
  </details>`).join('');

// Запись
const book = document.getElementById('book');
const bookService = document.getElementById('book-service');
const bookWa = document.getElementById('book-wa');
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-book]');
  if (!btn) return;
  const service = btn.dataset.book;
  bookService.textContent = service ? `Услуга: ${service}` : 'Напишите, и Вероника подберёт время';
  const text = service ? `Здравствуйте! Хочу записаться: ${service}` : 'Здравствуйте! Хочу записаться на приём';
  bookWa.href = `https://wa.me/79179097604?text=${encodeURIComponent(text)}`;
  book.showModal();
});
book.addEventListener('click', (e) => { if (e.target === book) book.close(); });

// Футер: буквы имени реагируют на курсор
const footName = document.getElementById('foot-name');
footName.innerHTML = [...footName.textContent].map((ch) => `<span>${ch}</span>`).join('');
const letters = [...footName.children];
if (!reduceMotion) {
  footName.addEventListener('pointermove', (e) => {
    letters.forEach((l) => {
      const r = l.getBoundingClientRect();
      const d = Math.abs(e.clientX - (r.left + r.width / 2)) / r.width;
      const k = Math.max(0, 1 - d / 2.2);
      l.style.transform = `translateY(${(-18 * k).toFixed(1)}px)`;
      l.style.color = k > .35 ? '#f6efe6' : '';
    });
  });
  footName.addEventListener('pointerleave', () => letters.forEach((l) => { l.style.transform = ''; l.style.color = ''; }));
}

// 3D-наклон карточек за курсором
if (matchMedia('(hover: hover)').matches && !reduceMotion) {
  document.addEventListener('pointermove', (e) => {
    const el = e.target.closest('.tilt');
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-y * 9).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg) translateY(-3px)`;
    el.style.setProperty('--mx', `${((x + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${((y + 0.5) * 100).toFixed(1)}%`);
  });
  document.addEventListener('pointerout', (e) => {
    const el = e.target.closest('.tilt');
    if (el && !el.contains(e.relatedTarget)) el.style.transform = '';
  });
}

// Смена темы шапки над тёмными блоками
const darkIo = new IntersectionObserver((entries) => {
  entries.forEach((en) => document.body.classList.toggle('in-dark', en.isIntersecting));
}, { rootMargin: '-72px 0px -100% 0px' });
document.querySelectorAll('[data-theme="dark"], .foot').forEach((el) => darkIo.observe(el));

// Появление при скролле
document.querySelectorAll('.section-head, .about-flow > *').forEach((el) => el.classList.add('reveal'));
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
}, { rootMargin: '10000px 0px -10% 0px' });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Считающиеся цифры
const countIo = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    countIo.unobserve(en.target);
    const el = en.target, end = parseFloat(el.dataset.count), frac = end % 1 ? 1 : 0;
    if (reduceMotion) { el.textContent = end.toFixed(frac).replace('.', ','); return; }
    const t0 = performance.now();
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / 1400), e = 1 - Math.pow(1 - k, 3);
      el.textContent = (end * e).toFixed(frac).replace('.', ',');
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}, { threshold: 0.6 });
document.querySelectorAll('[data-count]').forEach((el) => countIo.observe(el));
