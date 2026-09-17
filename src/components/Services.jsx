import { useState } from 'react';
import { GROUPS, SERVICES } from '../data.js';
import { Icon } from './Icons.jsx';
import { useReveal } from '../lib.js';

function Card({ s, index, hidden, onBook }) {
  const ref = useReveal(index % 6);
  const items = s.items || [];
  return (
    <article ref={ref} className="card tilt reveal" data-group={s.group} hidden={hidden}>
      <div className="card-head">
        <h3 className="card-name">{s.name}</h3>
        <div className="card-price">{s.oldPrice && <s>{s.oldPrice}</s>}{s.price}</div>
      </div>
      <div className="card-meta"><Icon name="clock" />{s.duration}</div>
      {s.note && <p className="card-note">{s.note}</p>}
      {items.length > 0 && (
        <details>
          <summary>{s.stepsTitle || 'Подробнее'}<Icon name="chev" /></summary>
          <ul className="steps">
            {items.map((it, i) => Array.isArray(it)
              ? <li key={i}><span>{it[0]}</span><span>{it[1]}</span></li>
              : <li key={i}><span>{it}</span></li>)}
          </ul>
        </details>
      )}
      <div className="card-cta"><button className="btn" type="button" onClick={() => onBook(s.name)}>Записаться</button></div>
    </article>
  );
}

export default function Services({ onBook }) {
  const [group, setGroup] = useState('all');
  const head = useReveal();
  const tabs = [{ id: 'all', title: 'Все' }, ...GROUPS];
  return (
    <section className="services" id="services">
      <div ref={head} className="section-head reveal">
        <h2>Услуги и цены</h2>
        <p>Цена указана за одну процедуру. Курсы и препараты подбираются на консультации.</p>
      </div>
      <div className="tabs" role="tablist" aria-label="Группы услуг">
        {tabs.map((g) => (
          <button key={g.id} className="tab" role="tab" type="button" data-group={g.id} aria-selected={group === g.id} onClick={() => setGroup(g.id)}>{g.title}</button>
        ))}
      </div>
      <div className="cards">
        {SERVICES.map((s, i) => <Card key={s.name} s={s} index={i} hidden={group !== 'all' && s.group !== group} onBook={onBook} />)}
      </div>
    </section>
  );
}
