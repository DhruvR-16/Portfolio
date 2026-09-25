import { useEffect, useRef } from 'react';
import { cosmos, distForFall } from './store';
import { Magnetic } from './ui';
import { GITHUB } from './data';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;
const INCL = 0.2; // viewing angle and field of view before any scroll
const FOV = 1.75;

// Scroll choreography for the hero, f = 0 → 1:
//   0.00–0.20  the copy lifts and fades
//   0.10–0.35  the shade that keeps the copy readable clears
//   0.05–0.72  the camera rises from a shallow, tilted view to look down on the disk
//   0.00–1.00  and falls towards the hole, until the shadow fills the frame
//   0.88–1.00  the readout fades before the next section arrives
// Scrolling only sets a target; f eases towards it every frame, so the jumps of a
// mouse wheel become one continuous fall.
export function Hero() {
  const wrap = useRef(null);
  const name = useRef(null);
  const copy = useRef([]);
  const hud = useRef(null);
  const hudR = useRef(null);
  const hudT = useRef(null);
  const hudI = useRef(null);
  const bar = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let start = 26;
    let rest = [0.3, 0.07];
    let f = -1;
    let dirty = true;
    const layout = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const portrait = W / H < 0.9;
      start = portrait ? 34 : 26;
      rest = portrait ? [0, 0.17] : [Math.max(0.12, (W * 0.7 - W / 2) / H), 0.07];
      cosmos.rest = { dist: start, incl: INCL, fov: FOV, bh: rest };
      dirty = true;
    };
    const setText = (el, text) => { if (el.textContent !== text) el.textContent = text; };

    const apply = () => {
      const settle = 1 - smooth(0, 0.5, f);
      cosmos.fall = f;
      cosmos.dist = distForFall(f, start);
      cosmos.incl = lerp(INCL, 1.05, smooth(0.05, 0.72, f));
      cosmos.fov = lerp(FOV, 1.3, smooth(0.3, 1, f));
      cosmos.bh = [rest[0] * settle, rest[1] * settle];

      setText(hudR.current, cosmos.dist.toFixed(2));
      setText(hudT.current, (1 / Math.sqrt(1 - 1 / cosmos.dist)).toFixed(2));
      setText(hudI.current, String(Math.round((cosmos.incl * 180) / Math.PI)));
      bar.current.style.transform = `scaleX(${f.toFixed(4)})`;
      hud.current.style.opacity = String(1 - smooth(0.88, 1, f));
      wrap.current.style.setProperty('--shade', String(1 - smooth(0.1, 0.35, f)));

      const out = smooth(0, 0.14, f);
      copy.current.forEach((el, i) => {
        if (!el) return;
        const k = smooth(0.01 * i, 0.12 + 0.02 * i, f);
        el.style.opacity = String(1 - k);
        el.style.transform = `translateY(${(-k * 36).toFixed(2)}px)`;
      });
      const n = smooth(0.02, 0.2, f);
      name.current.style.opacity = String(1 - n);
      name.current.style.transform = `translateY(${(-out * 24).toFixed(2)}px) scale(${(1 + n * 0.06).toFixed(4)})`;
    };

    let last = performance.now();
    let raf = 0;
    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(64, now - last);
      last = now;
      const r = wrap.current.getBoundingClientRect();
      const target = clamp(-r.top / Math.max(1, r.height - window.innerHeight), 0, 1);
      const snap = f < 0 || reduce || Math.abs(target - f) < 0.0005;
      const next = snap ? target : f + (target - f) * (1 - Math.pow(1 - 0.14, dt / 16.667));
      if (next === f && !dirty) return;
      f = next;
      dirty = false;
      apply();
    };

    layout();
    raf = requestAnimationFrame(tick);
    window.addEventListener('resize', layout);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', layout);
    };
  }, []);

  return (
    <section ref={wrap} className="hero" id="top" data-scene="0">
      <div className="hero-stick">
        <div className="hero-copy">
          <p className="hero-kicker" ref={(el) => { copy.current[0] = el; }}>
            <span className="dot" aria-hidden="true" /> Computer vision × RL × LLMs
          </p>
          <h1 className="hero-name" ref={name}>Dhruv Ramani</h1>
          <p className="hero-tag" ref={(el) => { copy.current[1] = el; }}>
            Third-year CS &amp; AI student who builds across machine learning, from computer vision and
            reinforcement learning to language-model research. I go looking for problems I haven&apos;t solved before.
          </p>
          <div className="hero-cta" ref={(el) => { copy.current[2] = el; }}>
            <Magnetic><a className="pill solid" href="#worlds">Explore my worlds</a></Magnetic>
            <Magnetic><a className="pill" href={GITHUB} target="_blank" rel="noreferrer">GitHub ↗</a></Magnetic>
          </div>
        </div>

        <div className="hud" ref={hud} aria-hidden="true">
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
