import { Icon } from './Icons.jsx';
import { PHONE, TG, WA, reduceMotion } from '../lib.js';

const NAME = [...'Вероника'];

export default function Footer() {
  const onMove = (e) => {
    if (reduceMotion()) return;
    [...e.currentTarget.children].forEach((l) => {
      const r = l.getBoundingClientRect();
      const d = Math.abs(e.clientX - (r.left + r.width / 2)) / r.width;
      const k = Math.max(0, 1 - d / 2.2);
      l.style.transform = `translateY(${(-18 * k).toFixed(1)}px)`;
      l.style.color = k > 0.35 ? '#f6efe6' : '';
    });
  };
  const onLeave = (e) => [...e.currentTarget.children].forEach((l) => { l.style.transform = ''; l.style.color = ''; });

  return (
    <footer className="foot" id="contacts">
      <div className="foot-name" aria-hidden="true" onPointerMove={onMove} onPointerLeave={onLeave}>
        {NAME.map((ch, i) => <span key={i}>{ch}</span>)}
      </div>
      <div className="foot-grid">
        <address className="foot-contacts">
          <p><Icon name="pin" /><span>Казань, ул. Копылова, 3<br /><small>Метро Авиастроительная, 2 минуты пешком</small></span></p>
          {/* TODO: график по дням недели от заказчика */}
          <p><Icon name="clock" /><span>До 18:00<br /><small>По предварительной записи</small></span></p>
          <p><Icon name="phone" /><a href={`tel:${PHONE}`}>+7 917 909-76-04</a></p>
          <div className="foot-cta">
            <a className="btn btn-light btn-lg" href={TG} target="_blank" rel="noopener"><Icon name="tg" />Telegram</a>
            <a className="btn btn-light btn-lg" href={WA} target="_blank" rel="noopener"><Icon name="wa" />WhatsApp</a>
          </div>
        </address>
        <div className="foot-map">
          <iframe src="https://yandex.ru/map-widget/v1/?ll=49.083608%2C55.851994&z=16&pt=49.083608%2C55.851994%2Cpm2dbm" title="Карта: ул. Копылова, 3" loading="lazy" allowFullScreen></iframe>
        </div>
      </div>
      <div className="foot-legal">
        <span>Косметолог Вероника / Казань</span>
        {/* TODO: реквизиты ИП, лицензия, ссылка на политику обработки данных */}
        <span className="todo">Реквизиты и правовая информация будут здесь</span>
      </div>
    </footer>
  );
}
