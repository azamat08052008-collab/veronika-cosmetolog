import { useEffect, useState } from 'react';
import { IconSprite } from './components/Icons.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import Services from './components/Services.jsx';
import Works from './components/Works.jsx';
import About from './components/About.jsx';
import Proof from './components/Proof.jsx';
import Footer from './components/Footer.jsx';
import { BookDialog, Lightbox } from './components/Dialogs.jsx';
import { reduceMotion } from './lib.js';

// Наклон карточек за курсором и смена шапки над тёмными блоками
function useGlobalEffects() {
  useEffect(() => {
    if (matchMedia('(hover: hover)').matches && !reduceMotion()) {
      const move = (e) => {
        const el = e.target.closest('.tilt');
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${(-y * 9).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg) translateY(-3px)`;
        el.style.setProperty('--mx', `${((x + 0.5) * 100).toFixed(1)}%`);
        el.style.setProperty('--my', `${((y + 0.5) * 100).toFixed(1)}%`);
      };
      const out = (e) => { const el = e.target.closest('.tilt'); if (el && !el.contains(e.relatedTarget)) el.style.transform = ''; };
      document.addEventListener('pointermove', move);
      document.addEventListener('pointerout', out);
      return () => { document.removeEventListener('pointermove', move); document.removeEventListener('pointerout', out); };
    }
  }, []);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => document.body.classList.toggle('in-dark', en.isIntersecting));
    }, { rootMargin: '-72px 0px -100% 0px' });
    document.querySelectorAll('[data-theme="dark"], .foot').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function App() {
  const [book, setBook] = useState(null);       // null — закрыто, '' — без услуги, строка — услуга
  const [image, setImage] = useState(null);
  useGlobalEffects();
  const onBook = (service = '') => setBook(service);

  return (
    <>
      <IconSprite />
      <Header onBook={onBook} />
      <main id="top">
        <Hero onBook={onBook} />
        <Marquee />
        <Services onBook={onBook} />
        <Works onOpen={(src, alt) => setImage({ src, alt })} />
        <About onBook={onBook} />
        <Proof />
      </main>
      <Footer />
      <button className="fab btn btn-dark" type="button" onClick={() => onBook()}>Записаться</button>
      <BookDialog service={book} open={book !== null} onClose={() => setBook(null)} />
      <Lightbox image={image} onClose={() => setImage(null)} />
    </>
  );
}
