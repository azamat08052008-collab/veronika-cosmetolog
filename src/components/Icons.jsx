export const Icon = ({ name, className = 'ic' }) => (
  <svg className={className}><use href={`#i-${name}`} /></svg>
);

export function IconSprite() {
  return (
    <svg style={{ display: 'none' }} aria-hidden="true">
      <symbol id="i-phone" viewBox="0 0 24 24"><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /></symbol>
      <symbol id="i-pin" viewBox="0 0 24 24"><path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" /></symbol>
      <symbol id="i-clock" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 7v5l3 3" /></symbol>
      <symbol id="i-tg" viewBox="0 0 24 24"><path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" /></symbol>
      <symbol id="i-wa" viewBox="0 0 24 24"><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></symbol>
      <symbol id="i-chev" viewBox="0 0 24 24"><path d="M6 9l6 6l6 -6" /></symbol>
      <symbol id="i-x" viewBox="0 0 24 24"><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></symbol>
      <symbol id="i-star" viewBox="0 0 24 24"><path fill="currentColor" stroke="none" d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" /></symbol>
      <symbol id="i-out" viewBox="0 0 24 24"><path d="M17 7l-10 10" /><path d="M8 7l9 0l0 9" /></symbol>
      <symbol id="i-left" viewBox="0 0 24 24"><path d="M15 6l-6 6l6 6" /></symbol>
      <symbol id="i-right" viewBox="0 0 24 24"><path d="M9 6l6 6l-6 6" /></symbol>
    </svg>
  );
}
