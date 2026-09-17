import { REVIEWS, FAQ } from '../data.js';
import { Icon } from './Icons.jsx';
import { useReveal } from '../lib.js';

function Review({ r }) {
  const ref = useReveal();
  return (
    <article ref={ref} className="review reveal">
      <blockquote>«{r.text}»</blockquote>
      <cite><b>{r.name}</b>Яндекс Карты / {r.date}</cite>
    </article>
  );
}

export default function Proof() {
  const head = useReveal();
  const faqHead = useReveal();
  return (
    <section className="proof" id="reviews">
      <div ref={head} className="section-head reveal">
        <h2>Отзывы</h2>
        <p>30 отзывов на Яндекс Картах, рейтинг 4,8.</p>
      </div>
      <div className="reviews-track">
        {REVIEWS.map((r) => <Review key={r.name} r={r} />)}
      </div>
      <a className="link-out" href="https://yandex.ru/maps/org/94350685210/reviews/" target="_blank" rel="noopener">Все отзывы на Яндекс Картах<Icon name="out" /></a>
      <div ref={faqHead} className="section-head faq-head reveal" id="faq">
        <h2>Вопросы</h2>
        <p>Подготовка, противопоказания и уход после процедур.</p>
      </div>
      <div className="faq-list">
        {FAQ.map((f) => (
          <details key={f.q} className="faq-item">
            <summary>{f.q}<Icon name="chev" /></summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
