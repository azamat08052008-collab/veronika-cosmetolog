// Общие куски для трёх MVP: услуги, работы, отзывы, запись
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function renderServices(el, mode) {
  el.innerHTML = GROUPS.map((g) => {
    const items = SERVICES.filter((s) => s.group === g.id);
    return `<div class="sg" data-group="${g.id}"><h3>${esc(g.title)}</h3>${items.map((s) => mode === 'rows'
      ? `<div class="srow"><span>${esc(s.name)}<small>${esc(s.duration)}</small></span><b>${esc(s.price)}</b><button class="btn sm" type="button" data-book="${esc(s.name)}">Записаться</button></div>`
      : `<article class="scard"><h4>${esc(s.name)}</h4><div class="sp">${esc(s.price)}</div><small>${esc(s.duration)}</small><button class="btn sm" type="button" data-book="${esc(s.name)}">Записаться</button></article>`).join('')}</div>`;
  }).join('');
}

function renderWorks(el, n) {
  el.innerHTML = Array.from({ length: n }, (_, i) => {
    const k = String(i + 1).padStart(2, '0');
    return `<figure><img src="../img/works/${k}.jpg" alt="Работа ${i + 1}" loading="lazy"></figure>`;
  }).join('');
}

function renderReviews(el, n) {
  el.innerHTML = REVIEWS.slice(0, n).map((r) => `<blockquote><p>«${esc(r.text)}»</p><cite>${esc(r.name)} / Яндекс Карты, ${esc(r.date)}</cite></blockquote>`).join('');
}

document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-book]');
  if (!b) return;
  const t = encodeURIComponent(b.dataset.book ? `Здравствуйте! Хочу записаться: ${b.dataset.book}` : 'Здравствуйте! Хочу записаться на приём');
  window.open(`https://wa.me/79179097604?text=${t}`, '_blank', 'noopener');
});

// Появление при скролле
const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { rootMargin: '10000px 0px -8% 0px' });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
