import { useEffect, useRef } from 'react';
import { Icon } from './Icons.jsx';
import { PHONE, TG, WA } from '../lib.js';

function useDialog(open, onClose) {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  const onClick = (e) => { if (e.target === ref.current) onClose(); };
  return { ref, onClick, onClose };
}

export function BookDialog({ service, open, onClose }) {
  const d = useDialog(open, onClose);
  const text = encodeURIComponent(service ? `Здравствуйте! Хочу записаться: ${service}` : 'Здравствуйте! Хочу записаться на приём');
  return (
    <dialog ref={d.ref} className="book" onClick={d.onClick} onClose={onClose}>
      <form method="dialog" className="book-inner">
        <button className="book-close" type="submit" aria-label="Закрыть"><Icon name="x" /></button>
        <h3>Записаться</h3>
        <p className="book-service">{service ? `Услуга: ${service}` : 'Напишите, и Вероника подберёт время'}</p>
        <a className="btn btn-dark btn-lg" href={`${TG}?text=${text}`} target="_blank" rel="noopener"><Icon name="tg" />Написать в Telegram</a>
        <a className="btn btn-dark btn-lg" href={`${WA}?text=${text}`} target="_blank" rel="noopener"><Icon name="wa" />Написать в WhatsApp</a>
        <a className="btn btn-ghost btn-lg" href={`tel:${PHONE}`}><Icon name="phone" />Позвонить</a>
      </form>
    </dialog>
  );
}

export function Lightbox({ image, onClose }) {
  const d = useDialog(Boolean(image), onClose);
  return (
    <dialog ref={d.ref} className="lightbox" onClick={d.onClick} onClose={onClose}>
      <form method="dialog">
        <button className="book-close" type="submit" aria-label="Закрыть"><Icon name="x" /></button>
        {image && <img src={image.src} alt={image.alt} />}
      </form>
    </dialog>
  );
}
