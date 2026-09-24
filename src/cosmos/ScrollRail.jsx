import { useEffect, useRef } from 'react';

const SECTIONS = [
  ['top', 'Horizon'],
  ['about', 'About'],
  ['worlds', 'Worlds'],
  ['research', 'Research'],
  ['contact', 'Contact'],
];
const THUMB = 46;

// Replaces the native scrollbar on mouse and trackpad devices (see cosmos.css).
// Wheel, keyboard and touch scrolling are untouched; this only draws and drags.
export function ScrollRail() {
  const rail = useRef(null);
  const thumb = useRef(null);
  const label = useRef(null);
  const marks = useRef([]);

  useEffect(() => {
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let tops = [];
    let travel = 0;
    let maxScroll = 1;
    let hideTimer = 0;
    let raf = 0;

    const layout = () => {
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      travel = Math.max(1, rail.current.clientHeight - THUMB);
      tops = SECTIONS.map(([id]) => {
        const el = document.getElementById(id);
        return el ? el.getBoundingClientRect().top + window.scrollY : 0;
      });
      tops.forEach((top, i) => {
        const el = marks.current[i];
        if (el) el.style.top = `${Math.min(1, top / maxScroll) * travel + THUMB / 2}px`;
      });
    };

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      thumb.current.style.transform = `translateY(${Math.min(1, y / maxScroll) * travel}px)`;
      let i = 0;
      tops.forEach((top, k) => { if (y + window.innerHeight * 0.4 >= top) i = k; });
      if (label.current.textContent !== SECTIONS[i][1]) label.current.textContent = SECTIONS[i][1];
      marks.current.forEach((el, k) => el && el.classList.toggle('on', k === i));
      rail.current.classList.add('moving');
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => rail.current && rail.current.classList.remove('moving'), 900);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    // Drag the thumb; click the track or a marker to jump.
    let drag = null;
    const down = (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      drag = { y: e.clientY, from: window.scrollY };
      thumb.current.setPointerCapture(e.pointerId);
      rail.current.classList.add('dragging');
    };
    const move = (e) => {
      if (!drag) return;
      window.scrollTo(0, drag.from + ((e.clientY - drag.y) / travel) * maxScroll);
    };
    const up = () => { drag = null; rail.current.classList.remove('dragging'); };
    const track = (e) => {
      if (e.target !== rail.current) return;
      const r = rail.current.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (e.clientY - r.top - THUMB / 2) / travel));
      window.scrollTo({ top: p * maxScroll, behavior: smooth ? 'smooth' : 'auto' });
    };

    const t = thumb.current;
    const rl = rail.current;
    t.addEventListener('pointerdown', down);
    t.addEventListener('pointermove', move);
    t.addEventListener('pointerup', up);
    t.addEventListener('pointercancel', up);
    rl.addEventListener('click', track);
    const ro = new ResizeObserver(() => { layout(); update(); });
    ro.observe(document.body);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', layout);
    layout();
    update();
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hideTimer);
      ro.disconnect();
      t.removeEventListener('pointerdown', down);
      t.removeEventListener('pointermove', move);
      t.removeEventListener('pointerup', up);
      t.removeEventListener('pointercancel', up);
      rl.removeEventListener('click', track);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', layout);
    };
  }, []);

  const jump = (id) => {
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
  };

  return (
    <div className="rail" ref={rail} aria-hidden="true">
      {SECTIONS.map(([id, name], i) => (
        <span key={id} className="rail-mark" ref={(el) => { marks.current[i] = el; }} onClick={() => jump(id)}>
          <em>{name}</em>
        </span>
      ))}
      <span className="rail-thumb" ref={thumb}>
        <em ref={label}>Horizon</em>
      </span>
    </div>
  );
}
