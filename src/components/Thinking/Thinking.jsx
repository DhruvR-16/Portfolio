import { motion } from 'framer-motion';
import { SectionLabel } from '../Shared/Shared';

const topics = [
  { topic: "Reinforcement Learning", sub: "Exploring sparse rewards, curiosity-driven exploration, and multi-agent systems." },
  { topic: "Decision Systems", sub: "Intelligence designed to run on the edge, independent of large data centers." },
  { topic: "Human-AI Synergy", sub: "Developing collaborative systems that augment human intuition and creativity." },
  { topic: "Information Theory", sub: "Understanding the fundamental limits of communication and data processing." },
];

export function Thinking() {
  return (
    <section id="thinking" style={{ padding: '10rem 2.5rem', position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <SectionLabel>Thinking</SectionLabel>
        <h2 style={{ 
          fontFamily: 'var(--font-serif)', 
          fontSize: 'clamp(2.8rem, 6vw, 4rem)', 
          fontWeight: 400, 
          color: 'var(--text-main)', 
          lineHeight: 1.05, 
          letterSpacing: '-0.02em', 
          marginBottom: '3.5rem' 
        }}>Curiosity Lab</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {topics.map((item, i) => (
            <motion.div
              key={item.topic}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1 }}
              style={{ 
                padding: '2.5rem 0', 
                borderBottom: '1px solid rgba(166, 156, 132, 0.1)', 
                display: 'flex', 
                gap: '3rem', 
                alignItems: 'flex-start',
                cursor: 'default',
              }}
            >
              <span style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.65rem', 
                color: 'var(--accent-primary)', 
                letterSpacing: '0.2em', 
                minWidth: 32, 
                paddingTop: '0.4rem',
                opacity: 0.4
              }}>0{i + 1}</span>
              <div>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 400, 
                  color: 'var(--text-main)', 
                  marginBottom: '0.6rem', 
                  lineHeight: 1.2,
                }}>{item.topic}</h3>
                <p style={{ 
                  fontSize: '0.95rem', 
                  color: 'var(--text-dim)', 
                  lineHeight: 1.6,
                  fontWeight: 300,
                  maxWidth: '540px'
                }}>{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
