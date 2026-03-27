import { motion } from 'framer-motion';
import { SectionLabel } from '../Shared';

const topics = [
  { topic: "Reinforcement Learning", sub: "Especially sparse rewards, curiosity-driven exploration, and multi-agent systems." },
  { topic: "AI for Low-Resource Environments", sub: "Intelligence that works without a data center behind it." },
  { topic: "Human-AI Synergy", sub: "Collaborative systems that augment human creativity rather than replacing it." },
  { topic: "Cosmic Scale", sub: "The intersection of astrophysics and information theory." },
];

export function Thinking() {
  return (
    <section id="thinking" style={{ padding: '8rem 2.5rem', position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <SectionLabel>Thinking</SectionLabel>
        <h2 style={{ 
          fontFamily: 'var(--font-serif)', 
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
          fontWeight: 400, 
          color: 'var(--text-main)', 
          lineHeight: 1.1, 
          letterSpacing: '-0.02em', 
          marginBottom: '3rem' 
        }}>Curiosities</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {topics.map((item, i) => (
            <motion.div
              key={item.topic}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                padding: '2rem 0', 
                borderBottom: '1px solid rgba(255,255,255,0.05)', 
                display: 'flex', 
                gap: '2.5rem', 
                alignItems: 'flex-start',
                cursor: 'default'
              }}
              whileHover={{ x: 10 }}
            >
              <span style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.65rem', 
                color: 'var(--accent-primary)', 
                letterSpacing: '0.1em', 
                minWidth: 24, 
                paddingTop: '0.35rem',
                opacity: 0.6
              }}>0{i + 1}</span>
              <div>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 400, 
                  color: 'var(--text-main)', 
                  marginBottom: '0.5rem', 
                  lineHeight: 1.3 
                }}>{item.topic}</h3>
                <p style={{ 
                  fontSize: '0.95rem', 
                  color: 'var(--text-dim)', 
                  lineHeight: 1.6,
                  fontWeight: 300
                }}>{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
