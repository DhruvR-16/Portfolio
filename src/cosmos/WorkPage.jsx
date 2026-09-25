import { motion } from 'framer-motion';
import { worlds, papers, EMAIL } from './data';
import { CountUp, Link, Magnetic } from './ui';
import { Paper } from './Sections';
import { ease, rise, two } from './motion';

// The hero copy arrives while the planet is still flying in from its card.
const enter = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease, delay },
});

// One project's page, at /work/:id. Ends with a door to the next world.
export function WorkPage({ w }) {
  const i = worlds.indexOf(w);
  const next = worlds[(i + 1) % worlds.length];
  const paper = papers.find((p) => p.id === w.paper);
  return (
    <div className="work" data-scene="2">
      <section className="work-hero" id="overview">
        <div className="work-copy">
          <motion.div {...enter(0.15)}>
            <Link to="/#worlds" className="work-back">← All worlds</Link>
          </motion.div>
          <motion.p className="world-kind" {...enter(0.25)}><span>World {two(i)}</span> {w.kind} · {w.years}</motion.p>
          <motion.h1 className="work-name" {...enter(0.32)}>{w.name}</motion.h1>
          {w.credit && <motion.p className="chips" {...enter(0.38)}><span className="chip">{w.credit}</span></motion.p>}
          <motion.p className="work-tag" {...enter(0.44)}>{w.tagline}</motion.p>
          <motion.ul className="world-stack" {...enter(0.5)}>
            {w.stack.map((t) => <li key={t}>{t}</li>)}
          </motion.ul>
          <motion.div className="world-links" {...enter(0.56)}>
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
          <div className="planet-slot" data-planet={w.id} aria-hidden="true" />
          <motion.figcaption {...enter(0.9)}><b>{w.planetName}</b>{w.planetNote}</motion.figcaption>
        </figure>
      </section>

      <section className="work-sec">
        <motion.dl className="world-stats" {...rise} transition={{ duration: 0.9, ease }}>
          {w.stats.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd><CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} /></dd>
            </div>
          ))}
        </motion.dl>
        <motion.div className="world-story" {...rise} transition={{ duration: 0.9, ease, delay: 0.1 }}>
          <p><b>{w.labels[0]}</b>{w.problem}</p>
          <p><b>{w.labels[1]}</b>{w.fix}</p>
        </motion.div>
      </section>

      <section className="work-sec" id="how">
        <p className="label">How it works</p>
        <ol className="steps">
          {w.steps.map(([title, text], k) => (
            <motion.li key={title} {...rise} transition={{ duration: 0.9, ease, delay: k * 0.08 }}>
              <b>{two(k)}</b>
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      {w.outcome && (
        <section className="work-sec">
          <motion.div className="outcome" {...rise} transition={{ duration: 0.9, ease }}>
            <p className="label">{w.outcome.label}</p>
            <p className="outcome-text">{w.outcome.text}</p>
          </motion.div>
        </section>
      )}

      {paper && (
        <section className="work-sec" id="paper">
          <p className="label">The paper</p>
          <Paper p={paper} />
        </section>
      )}

      <section className="work-sec" id="next">
        <Link to={`/work/${next.id}`} className="work-next">
          <div className="planet-slot" data-planet={next.id} aria-hidden="true" />
          <div className="work-next-copy">
            <p className="label">Next world · {next.planetName}</p>
            <h2>{next.name}</h2>
            <p>{next.blurb}</p>
          </div>
          <span className="work-next-go" aria-hidden="true">→</span>
        </Link>
      </section>

      <div className="work-sec work-end">
        <footer className="foot">
          <span>© 2026 Dhruv Ramani</span>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <Link to="/#worlds">All worlds ↑</Link>
        </footer>
      </div>
    </div>
  );
}

export function LostPage() {
  return (
    <section className="lost" data-scene="1">
      <p className="label">404</p>
      <h1 className="big">Lost in <span className="em">space.</span></h1>
      <p className="lost-sub">Nothing orbits at this address.</p>
      <Link to="/" className="pill solid">Back to the horizon</Link>
    </section>
  );
}
