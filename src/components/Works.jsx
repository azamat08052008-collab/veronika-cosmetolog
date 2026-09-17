import { useRef } from 'react';
import { Icon } from './Icons.jsx';
import { asset, useReveal, reduceMotion } from '../lib.js';

const WORKS = Array.from({ length: 15 }, (_, i) => String(i + 1).padStart(2, '0'));

export default function Works({ onOpen }) {
  const head = useReveal();
  const rail = useRef(null);
  const drag = useRef(null);

  const onDown = (e) => { drag.current = { x: e.clientX, left: rail.current.scrollLeft, moved: false }; rail.current.setPointerCapture(e.pointerId); };
  const onMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 6) { d.moved = true; rail.current.classList.add('dragging'); }
    if (d.moved) rail.current.scrollLeft = d.left - dx;
  };
  const onUp = () => { if (!drag.current) return; setTimeout(() => rail.current?.classList.remove('dragging'), 50); drag.current = null; };
  const scroll = (dir) => rail.current.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: reduceMotion() ? 'auto' : 'smooth' });
  const open = (n) => { if (!rail.current.classList.contains('dragging')) onOpen(asset(`img/works/${n}.jpg`), `Работа ${Number(n)}: фото до и после`); };

  return (
    <section className="works" id="works">
      <div ref={head} className="section-head works-head reveal">
        <div>
          <h2>Работы</h2>
          <p>Губы, ботулинотерапия, чистки и уход. Фото до и после из кабинета, тяните ленту.</p>
        </div>
        <div className="rail-nav">
          <button className="rail-btn" type="button" aria-label="Назад" onClick={() => scroll(-1)}><Icon name="left" /></button>
          <button className="rail-btn" type="button" aria-label="Вперёд" onClick={() => scroll(1)}><Icon name="right" /></button>
        </div>
      </div>
      <div ref={rail} className="rail" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
        {WORKS.map((n) => (
          <button key={n} type="button" onClick={() => open(n)}>
            <img src={asset(`img/works/${n}.jpg`)} alt={`Работа ${Number(n)}: фото до и после`} loading="lazy" width="900" height="900" draggable="false" />
          </button>
        ))}
      </div>
    </section>
  );
}
