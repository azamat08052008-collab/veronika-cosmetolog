const ITEMS = ['Чистка лица', 'Биоревитализация', 'Контурная пластика губ', 'Ботулинотерапия', 'Morpheus 8', 'Пилинги', 'Коктейль «Монако»', 'Микронидлинг', 'Коллагеновое омолаживание', 'Фотоомоложение LUMECCA'];

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...ITEMS, ...ITEMS].map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  );
}
