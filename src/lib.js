import { useEffect, useRef } from 'react';

export const asset = (p) => import.meta.env.BASE_URL + p;
export const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
export const PHONE = '+79179097604';
export const TG = 'https://t.me/Veronika_cosmetolog';
export const WA = 'https://wa.me/79179097604';

// Появление при скролле: элемент получает .in, когда входит в экран (или уже выше него)
export function useReveal(delayIndex = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--i', delayIndex);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { el.classList.add('in'); io.disconnect(); } });
    }, { rootMargin: '10000px 0px -10% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [delayIndex]);
  return ref;
}
