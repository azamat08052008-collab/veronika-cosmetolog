import { Icon } from './Icons.jsx';
import { PHONE } from '../lib.js';

const LINKS = [['#services', 'Услуги'], ['#works', 'Работы'], ['#about', 'Обо мне'], ['#reviews', 'Отзывы'], ['#contacts', 'Контакты']];

export default function Header({ onBook }) {
  return (
    <header className="top">
      <a className="brand" href="#top">Косметолог <em>Вероника</em></a>
      <nav className="nav" aria-label="Разделы">
        {LINKS.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <div className="top-actions">
        <a className="phone" href={`tel:${PHONE}`}><Icon name="phone" /><span>+7 917 909-76-04</span></a>
        <button className="btn btn-dark" type="button" onClick={() => onBook()}>Записаться</button>
      </div>
    </header>
  );
}
