import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { navigate } from './router';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>+*';

// Splits "*word*" markers into emphasised words.
function tokens(text) {
  return text.split(' ').map((raw) => {
    const em = raw.startsWith('*');
    const end = raw.endsWith('*') || raw.endsWith('*.') || raw.endsWith('*,');
    return { word: raw.replace(/\*/g, ''), em: em || (end && raw.includes('*')) };
  });
}
const plain = (text) => text.replace(/\*/g, '');

export function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 16, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 240, damping: 16, mass: 0.5 });
  const move = (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };
  return (
    <motion.span ref={ref} className="magnetic" style={{ x: sx, y: sy }} onPointerMove={move} onPointerLeave={reset}>
      {children}
    </motion.span>
  );
}

export function Scramble({ text }) {
  const [out, setOut] = useState(text);
  const raf = useRef(0);
  const run = () => {
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / 420);
      const shown = Math.floor(p * text.length);
      setOut(text.split('').map((ch, i) => (i < shown || ch === ' ' ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join(''));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };
  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  return (
    <span className="scramble" onPointerEnter={run}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}

// Words rise out of a mask when scrolled into view.
export function Reveal({ text, as = 'h2', className = '', delay = 0 }) {
  const Tag = motion[as];
  return (
    <Tag className={`reveal ${className}`} initial="hide" whileInView="show" viewport={{ once: true, margin: '-12% 0px' }}>
      <span className="sr-only">{plain(text)}</span>
      {tokens(text).map((t, i) => (
        <span className="rw" aria-hidden="true" key={i}>
          <motion.span
            className={t.em ? 'rw-in em' : 'rw-in'}
            variants={{ hide: { y: '115%', rotate: 4 }, show: { y: '0%', rotate: 0 } }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.055 }}
          >
            {t.word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

function LitWord({ progress, range, em, children }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return <motion.span aria-hidden="true" className={em ? 'lw em' : 'lw'} style={{ opacity }}>{children} </motion.span>;
}

// Each word lights up as the paragraph scrolls through the viewport.
export function ScrollLit({ text, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = tokens(text);
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{plain(text)}</span>
      {words.map((t, i) => (
        <LitWord key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} em={t.em}>{t.word}</LitWord>
      ))}
    </p>
  );
}

export function CountUp({ value, decimals = 0, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (!inView) return undefined;
    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      const p = reduce ? 1 : Math.min(1, (now - start) / 1500);
      setShown(value * (1 - Math.pow(1 - p, 4)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);
  const text = shown.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return <span ref={ref} className="count">{text}{suffix}</span>;
}

// A link to another page of the site. Same-page "#id" links, and clicks that
// open a new tab or window, are left to the browser.
export function Link({ to, ...rest }) {
  const go = (e) => {
    if (to.startsWith('#') || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  return <a href={to} onClick={go} {...rest} />;
}

// Card whose border glow follows the cursor.
export function GlowCard({ children, className = '' }) {
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return <div className={`glow-card ${className}`} onPointerMove={move}>{children}</div>;
}
