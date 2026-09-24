import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cosmos } from './store';
import { worlds, papers, circumplex, EMAIL, GITHUB, LINKEDIN } from './data';
import { CountUp, GlowCard, Magnetic, Reveal, Scramble, ScrollLit } from './ui';
import { useCopy } from './useCopy';

const rise = {
  initial: { opacity: 0, y: 40, filter: 'blur(10px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-10% 0px' },
};
const ease = [0.16, 1, 0.3, 1];
const two = (i) => String(i + 1).padStart(2, '0');

export function Nav() {
  const links = [['About', '#about'], ['Worlds', '#worlds'], ['Research', '#research'], ['Contact', '#contact']];
  return (
    <header className="nav">
      <a href="#top" className="nav-mark">
        <span className="mark" aria-hidden="true" />
        <span className="nav-name">Dhruv Ramani</span>
      </a>
      <nav aria-label="Sections">
        {links.map(([label, href]) => <a key={href} href={href}><Scramble text={label} /></a>)}
      </nav>
    </header>
  );
}

const FIELDS = [
  ['Machine learning', 'Models that stay honest when the data shifts under them, with calibration and failure analysis built in.'],
  ['Language models', 'How the framing of a prompt changes how long a reasoning model thinks, and what that costs to serve.'],
  ['Computer vision', 'Real-time pose and motion understanding that runs on the device, with nothing sent to a server.'],
  ['Astrophysics', 'Transit searches in NASA photometry, from raw flux to a vetted planet candidate.'],
];

export function About() {
  return (
    <section className="about" id="about" data-scene="1">
      <p className="label">Beyond the horizon</p>
      <ScrollLit
        className="about-lead"
        text="I'm Dhruv. I build *machine-learning* systems for messy, physical data, and I'm happiest when that data comes from *deep space.*"
      />
      <div className="fields">
        {FIELDS.map(([title, body], i) => (
          <motion.div key={title} {...rise} transition={{ duration: 0.9, ease, delay: i * 0.08 }}>
            <GlowCard>
              <span className="field-i">{two(i)}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </GlowCard>
          </motion.div>
        ))}
      </div>
      <p className="offworld">Away from the screen: reading about astrophysics and taking photographs.</p>
    </section>
  );
}

function World({ w, i, active }) {
  return (
    <article className={`world ${i % 2 ? 'flip' : ''}`} data-world={i}>
      <div className="world-num" aria-hidden="true">{two(i)}</div>
      <div className="world-copy">
        <motion.p className="world-kind" {...rise} transition={{ duration: 0.8, ease }}>
          <span>World {two(i)}</span> {w.kind} · {w.years}
        </motion.p>
        <Reveal as="h3" className="world-name" text={w.name} />
        {(w.badge || w.credit) && (
          <motion.p className="chips" {...rise} transition={{ duration: 0.8, ease, delay: 0.06 }}>
            {w.badge && <span className="chip hot">{w.badge}</span>}
            {w.credit && <span className="chip">{w.credit}</span>}
          </motion.p>
        )}
        <motion.p className="world-tag" {...rise} transition={{ duration: 0.9, ease, delay: 0.1 }}>{w.tagline}</motion.p>
        <motion.div className="world-story" {...rise} transition={{ duration: 0.9, ease, delay: 0.18 }}>
          <p><b>{w.labels[0]}</b>{w.problem}</p>
          <p><b>{w.labels[1]}</b>{w.fix}</p>
        </motion.div>
        <motion.dl className="world-stats" {...rise} transition={{ duration: 0.9, ease, delay: 0.26 }}>
          {w.stats.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd><CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} /></dd>
            </div>
          ))}
        </motion.dl>
        <motion.ul className="world-stack" {...rise} transition={{ duration: 0.9, ease, delay: 0.32 }}>
          {w.stack.map((t) => <li key={t}>{t}</li>)}
        </motion.ul>
        <motion.div className="world-links" {...rise} transition={{ duration: 0.9, ease, delay: 0.38 }}>
          {w.links.map((l, j) => (
            <Magnetic key={l.href}>
              {l.internal
                ? <a className="pill" href={l.href}>{l.label} ↓</a>
                : <a className={j === 0 ? 'pill solid' : 'pill'} href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>}
            </Magnetic>
          ))}
        </motion.div>
      </div>
      <figure className="world-planet">
        <div className="planet-slot" data-planet-slot={active ? '' : undefined} aria-hidden="true" />
        <figcaption><b>{w.planetName}</b>{w.planetNote}</figcaption>
      </figure>
    </article>
  );
}

export function Worlds() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const pick = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestD = Infinity;
      ref.current.querySelectorAll('[data-world]').forEach((el) => {
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestD) { bestD = d; best = Number(el.dataset.world); }
      });
      setActive((prev) => (prev === best ? prev : best));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(pick); };
    pick();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); };
  }, []);

  useEffect(() => { cosmos.planet = worlds[active].planet; }, [active]);

  return (
    <section className="worlds" id="worlds" data-scene="2" ref={ref}>
      <div className="worlds-head">
        <p className="label">Selected work</p>
        <Reveal as="h2" className="big" text="Worlds I've *built*" />
        <p className="worlds-sub">Every project gets its own planet. Scroll to travel between them.</p>
      </div>
      {worlds.map((w, i) => <World key={w.id} w={w} i={i} active={i === active} />)}
    </section>
  );
}

// SpiralState's 13 conditions on the valence × arousal circumplex.
function Circumplex() {
  const S = 360;
  const C = S / 2;
  const R = 128;
  const x = (v) => C + v * R;
  const y = (a) => C - a * R;
  return (
    <figure className="circ">
      <svg viewBox={`0 0 ${S} ${S}`} role="img" aria-label="The 13 SpiralState conditions on the valence and arousal circumplex: eight confirmatory emotions, two per quadrant, two exploratory negative high-arousal states, and two neutral controls at the centre.">
        <circle cx={C} cy={C} r={R} className="circ-ring" />
        <circle cx={C} cy={C} r={R / 2} className="circ-ring faint" />
        <line x1={C - R - 16} y1={C} x2={C + R + 16} y2={C} className="circ-axis" />
        <line x1={C} y1={C + R + 16} x2={C} y2={C - R - 16} className="circ-axis" />
        <text x={C + R + 16} y={C - 8} className="circ-ax" textAnchor="end">valence →</text>
        <text x={C + 8} y={C - R - 8} className="circ-ax">arousal ↑</text>
        <text x={14} y={22} className="circ-q">unpleasant · activated</text>
        <text x={S - 14} y={22} className="circ-q" textAnchor="end">pleasant · activated</text>
        <text x={14} y={S - 12} className="circ-q">unpleasant · calm</text>
        <text x={S - 14} y={S - 12} className="circ-q" textAnchor="end">pleasant · calm</text>
        {circumplex.map((c, i) => {
          const cls = c.role === 'control' ? 'pt ctl' : c.v < 0 ? 'pt neg' : 'pt pos';
          return (
            <motion.g
              key={c.id}
              initial={{ opacity: 0, scale: 0.2 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.06 }}
              style={{ transformBox: 'fill-box', originX: 0.5, originY: 0.5 }}
            >
              {c.role === 'control'
                ? <rect x={x(c.v) - 4.5} y={y(c.a) - 4.5} width="9" height="9" className={cls} />
                : <circle cx={x(c.v)} cy={y(c.a)} r="5.5" className={c.role === 'exploratory' ? `${cls} hollow` : cls} />}
              <text x={x(c.v) + c.lx} y={y(c.a) + c.ly} textAnchor={c.anchor} className="circ-l">{c.id}</text>
            </motion.g>
          );
        })}
      </svg>
      <figcaption>
        <span><i className="k neg" /> confirmatory, two per quadrant</span>
        <span><i className="k hollow" /> exploratory</span>
        <span><i className="k ctl" /> controls</span>
        <span>Confidence sits off this grid, on a separate epistemic axis.</span>
      </figcaption>
    </figure>
  );
}

function Paper({ p }) {
  const [copied, copy] = useCopy();
  return (
    <motion.article className="paper" {...rise} transition={{ duration: 1, ease }}>
      <div className="paper-main">
        {p.status && (
          <p className="paper-meta">
            <span className="chip">{p.status}</span>
            {p.date && <span>{p.date}</span>}
          </p>
        )}
        <h3 className="paper-title">{p.title}</h3>
        <p className="paper-auth">
          {p.authors}
          {p.affiliation && <span>{p.affiliation}</span>}
        </p>
        {p.finding && <blockquote className="paper-quote">“{p.finding}”</blockquote>}
        <p className="paper-sum">{p.summary}</p>
        {p.hypotheses && (
          <div className="paper-hyp">
            <p className="mini">Pre-registered hypotheses</p>
            <ol>
              {p.hypotheses.map(([k, v]) => <li key={k}><b>{k}</b><span>{v}</span></li>)}
            </ol>
          </div>
        )}
        <div className="paper-actions">
          {p.links.map((l, i) => (
            <Magnetic key={l.href}>
              <a className={i === 0 ? 'pill solid' : 'pill'} href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>
            </Magnetic>
          ))}
          <button className="pill" type="button" onClick={() => copy(p.id, p.bibtex)}>
            {copied === p.id ? 'BibTeX copied' : 'Copy BibTeX'}
          </button>
        </div>
        {p.doi && <p className="paper-doi">DOI {p.doi}</p>}
      </div>
      <div className="paper-side">
        {p.hypotheses ? <Circumplex /> : (
          <dl className="paper-stats">
            {p.stats.map((s) => (
              <div key={s.l}>
                <dt>{s.l}</dt>
                <dd><CountUp value={s.v} decimals={s.d} /></dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </motion.article>
  );
}

export function Research() {
  return (
    <section className="research" id="research" data-scene="1">
      <p className="label">Research</p>
      <Reveal as="h2" className="big" text="Papers & *preprints*" />
      <div className="papers">
        {papers.map((p) => <Paper key={p.id} p={p} />)}
      </div>
    </section>
  );
}

export function Contact() {
  const [copied, copy] = useCopy();
  return (
    <section className="contact" id="contact" data-scene="3">
      <div className="pulsar-slot" data-pulsar-slot aria-hidden="true" />
      <div className="contact-inner">
        <p className="label">Contact</p>
        <Reveal as="h2" className="contact-title" text="Send a *signal.*" />
        <motion.p className="contact-sub" {...rise} transition={{ duration: 0.9, ease }}>
          Open to research, ML engineering work and collaborations. Email reaches me fastest.
        </motion.p>
        <motion.div {...rise} transition={{ duration: 0.9, ease, delay: 0.1 }}>
          <Magnetic strength={0.18}>
            <button className="signal" type="button" onClick={() => copy('mail', EMAIL)}>
              <span className="signal-rings" aria-hidden="true"><i /><i /><i /></span>
              <span className="signal-text">{EMAIL}</span>
              <span className="signal-hint">{copied === 'mail' ? 'Copied to clipboard' : 'Click to copy'}</span>
            </button>
          </Magnetic>
        </motion.div>
        <ul className="contact-links">
          <li><a href={GITHUB} target="_blank" rel="noreferrer"><Scramble text="GitHub" /> ↗</a></li>
          <li><a href={LINKEDIN} target="_blank" rel="noreferrer"><Scramble text="LinkedIn" /> ↗</a></li>
          <li><a href={`mailto:${EMAIL}`}><Scramble text="Open mail app" /> ↗</a></li>
        </ul>
      </div>
      <footer className="foot">
        <span>© 2026 Dhruv Ramani</span>
        <span>Every photon on this page is rendered live on your GPU</span>
        <a href="#top">Back to the horizon ↑</a>
      </footer>
    </section>
  );
}
