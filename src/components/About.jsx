import { useEffect, useRef } from 'react';
import { asset, useReveal, reduceMotion } from '../lib.js';

const STATS = [[4.8, 'рейтинг на Яндекс Картах'], [30, 'отзывов клиентов'], [33, 'процедуры в прайсе']];
const PHOTOS = [
  ['img/cabinet/1.jpg', 'Вероника у рабочей стойки в кабинете', 'Кабинет на Копылова, 3'],
  ['img/cabinet/2.jpg', 'Уходовая косметика GiGi на полке кабинета', 'Уход GiGi для чисток и пилингов'],
  ['img/cabinet/3.jpg', 'Препараты Stylage на полке кабинета', 'Препараты для контурной пластики'],
];

function Count({ end }) {
  const ref = useRef(null);
  const frac = end % 1 ? 1 : 0;
  const fmt = (v) => v.toFixed(frac).replace('.', ',');
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      if (reduceMotion()) { el.textContent = fmt(end); return; }
      const t0 = performance.now();
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / 1400), e = 1 - Math.pow(1 - k, 3);
        el.textContent = fmt(end * e);
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [end]);
  return <b ref={ref}>0</b>;
}

function Photo({ src, alt, cap, i }) {
  const ref = useReveal(i);
  return <figure ref={ref} className="about-photo reveal"><img src={asset(src)} alt={alt} width="1280" height="850" loading="lazy" /><figcaption>{cap}</figcaption></figure>;
}

export default function About({ onBook }) {
  const lead = useReveal();
  return (
    <section className="about" id="about" data-theme="dark">
      <div className="about-sticky">
        <h2>Обо мне</h2>
        <div className="stats">
          {STATS.map(([n, t]) => <div key={t}><Count end={n} /><span>{t}</span></div>)}
        </div>
        <button className="btn btn-light btn-lg" type="button" onClick={() => onBook()}>Записаться</button>
      </div>
      <div className="about-flow">
        {/* TODO: текст от заказчика. Ниже заглушка, факты нужно подтвердить */}
        <p ref={lead} className="about-lead reveal">Веду приём в кабинете на Копылова, 3. Не назначаю процедуры, которые вам не нужны: сначала консультация, затем понятный план и сроки.</p>
        <p className="todo">Здесь будут образование, стаж и сертификаты.</p>
        {PHOTOS.map(([src, alt, cap], i) => <Photo key={src} src={src} alt={alt} cap={cap} i={i + 1} />)}
      </div>
    </section>
  );
}
