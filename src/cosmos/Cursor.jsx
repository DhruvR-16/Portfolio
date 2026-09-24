import { useEffect, useRef } from 'react';

const INTERACTIVE = 'a, button, [role="button"], .rail, .rail-thumb, .rail-mark';

// A tiny black hole: a dark core with a bright rim, circled by a tilted ring that
// spins like the disk in the hero. The core sits exactly on the pointer; the ring
// trails it slightly, opens up over links and tightens on press. Mouse and
// trackpad only; the native cursor comes back if this never runs.
export function Cursor() {
  const root = useRef(null);
  const core = useRef(null);
  const disk = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const html = document.documentElement;
    const el = root.current;
    html.classList.add('has-cursor');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const p = { x: -100, y: -100, dx: -100, dy: -100, seen: false };
    let last = performance.now();
    let raf = 0;

    const move = (e) => {
      p.x = e.clientX;
      p.y = e.clientY;
      if (!p.seen) { p.seen = true; p.dx = p.x; p.dy = p.y; el.classList.add('on'); }
      const t = e.target instanceof Element ? e.target.closest(INTERACTIVE) : null;
      el.classList.toggle('hover', Boolean(t));
    };
    const down = () => el.classList.add('down');
    const up = () => el.classList.remove('down');
    const leave = () => { el.classList.remove('on'); p.seen = false; };

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(64, now - last);
      last = now;
      const k = reduce ? 1 : 1 - Math.pow(1 - 0.3, dt / 16.667);
      p.dx += (p.x - p.dx) * k;
      p.dy += (p.y - p.dy) * k;
      core.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      disk.current.style.transform = `translate3d(${p.dx}px, ${p.dy}px, 0)`;
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    html.addEventListener('mouseleave', leave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      html.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      html.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <div className="cursor" ref={root} aria-hidden="true">
      <div className="cursor-disk" ref={disk}><i /></div>
      <div className="cursor-core" ref={core} />
    </div>
  );
}
