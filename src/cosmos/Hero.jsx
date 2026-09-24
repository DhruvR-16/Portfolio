import { useEffect, useRef } from 'react';
import { cosmos, distForFall } from './store';
import { Magnetic } from './ui';
import { GITHUB } from './data';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;

// Scroll choreography for the hero, f = 0 → 1:
//   0.00–0.20  the copy lifts and dissolves
//   0.05–0.72  the camera rises from a shallow, tilted view to look down on the disk
//   0.00–1.00  and falls towards the hole, until the shadow fills the frame
export function Hero() {
  const wrap = useRef(null);
  const name = useRef(null);
  const copy = useRef([]);
  const hudR = useRef(null);
  const hudT = useRef(null);
  const hudI = useRef(null);
  const bar = useRef(null);

  useEffect(() => {
    let start = 26;
    let rest = [0.3, 0.07];
    const layout = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const portrait = W / H < 0.9;
      start = portrait ? 34 : 26;
      rest = portrait ? [0, 0.17] : [Math.max(0.12, (W * 0.7 - W / 2) / H), 0.07];
    };

    let raf = 0;
    const update = () => {
      raf = 0;
      const H = window.innerHeight;
      const r = wrap.current.getBoundingClientRect();
      const f = clamp(-r.top / Math.max(1, r.height - H), 0, 1);
      const settle = 1 - smooth(0, 0.5, f);
      cosmos.fall = f;
      cosmos.dist = distForFall(f, start);
      cosmos.incl = lerp(0.2, 1.05, smooth(0.05, 0.72, f));
      cosmos.fov = lerp(1.75, 1.3, smooth(0.3, 1, f));
      cosmos.bh = [rest[0] * settle, rest[1] * settle];

      hudR.current.textContent = cosmos.dist.toFixed(2);
      hudT.current.textContent = (1 / Math.sqrt(1 - 1 / cosmos.dist)).toFixed(2);
      hudI.current.textContent = String(Math.round((cosmos.incl * 180) / Math.PI));
      bar.current.style.transform = `scaleX(${f})`;

      const out = smooth(0, 0.14, f);
      copy.current.forEach((el, i) => {
        if (!el) return;
        const k = smooth(0.01 * i, 0.12 + 0.02 * i, f);
        el.style.opacity = String(1 - k);
        el.style.transform = `translateY(${-k * 36}px)`;
      });
      const n = smooth(0.02, 0.2, f);
      name.current.style.opacity = String(1 - n);
      name.current.style.letterSpacing = n > 0.001 ? `calc(var(--track) + ${(n * 0.5).toFixed(3)}em)` : '';
      name.current.style.filter = n > 0.01 ? `blur(${(n * 10).toFixed(1)}px)` : '';
      name.current.style.transform = `translateY(${-out * 24}px)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const onResize = () => { layout(); update(); };

    layout();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section ref={wrap} className="hero" id="top" data-scene="0">
      <div className="hero-stick">
        <div className="hero-copy">
          <p className="hero-kicker" ref={(el) => { copy.current[0] = el; }}>
            <span className="dot" aria-hidden="true" /> Machine learning × Astrophysics
          </p>
          <h1 className="hero-name" ref={name}>Dhruv Ramani</h1>
          <p className="hero-tag" ref={(el) => { copy.current[1] = el; }}>
            Third-year CS &amp; AI student building machine-learning systems for messy data: starlight from
            NASA telescopes, bodies in motion, and the inner workings of language models.
          </p>
          <div className="hero-cta" ref={(el) => { copy.current[2] = el; }}>
            <Magnetic><a className="pill solid" href="#worlds">Explore my worlds</a></Magnetic>
            <Magnetic><a className="pill" href={GITHUB} target="_blank" rel="noreferrer">GitHub ↗</a></Magnetic>
          </div>
        </div>

        <div className="hud" aria-hidden="true">
          <div className="hud-row"><span>Distance to horizon</span><b><span ref={hudR}>26.00</span> rₛ</b></div>
          <div className="hud-row"><span>Your clock runs slow by</span><b>×<span ref={hudT}>1.02</span></b></div>
          <div className="hud-row"><span>Viewing angle</span><b><span ref={hudI}>11</span>°</b></div>
          <div className="hud-bar"><i ref={bar} /></div>
        </div>
        <a className="hero-cue" href="#about" ref={(el) => { copy.current[3] = el; }}>
          <i aria-hidden="true" />
          <span>Scroll to fall in</span>
        </a>
      </div>
    </section>
  );
}
