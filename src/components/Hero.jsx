import { Icon } from './Icons.jsx';
import { asset } from '../lib.js';

const META = [['30 мин', 'консультация'], ['33', 'процедуры в прайсе'], ['2 мин', 'от метро']];

export default function Hero({ onBook }) {
  return (
    <section className="hero">
      <div className="hero-text">
        <a className="rating" href="https://yandex.ru/maps/org/94350685210/reviews/" target="_blank" rel="noopener">
          <Icon name="star" />4,8 на Яндекс Картах / 34 оценки
        </a>
        <h1>Косметология <em>без лишних</em> назначений</h1>
        <p>Уход, инъекции и аппаратные процедуры в кабинете у метро Авиастроительная. Сначала консультация, потом план.</p>
        <div className="hero-cta">
          <button className="btn btn-dark btn-lg" type="button" onClick={() => onBook()}>Записаться</button>
          <a className="btn btn-ghost btn-lg" href="#services">Смотреть цены</a>
        </div>
        <div className="hero-meta">
          {META.map(([b, t]) => <div key={t}><b>{b}</b>{t}</div>)}
        </div>
      </div>
      <div className="hero-collage">
        <figure className="hc-shelf"><img src={asset('img/cabinet/gigi-shelf.jpg')} alt="Уход GiGi на полке кабинета" width="1280" height="850" /></figure>
        <figure className="hc-portrait"><img src={asset('img/about.jpg')} alt="Косметолог Вероника" width="850" height="1280" fetchPriority="high" /></figure>
        <figure className="hc-room"><img src={asset('img/cabinet/hero-wide.jpg')} alt="Вероника в своём кабинете" width="1280" height="850" /></figure>
        <p className="hc-cap"><b>Копылова, 3</b>кабинет у метро Авиастроительная</p>
      </div>
    </section>
  );
}
