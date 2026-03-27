import { motion } from 'framer-motion';
import { SectionLabel } from '../Shared/Shared';

const topics = [
  { topic: "Reinforcement Learning", sub: "Exploring sparse rewards, curiosity-driven exploration, and multi-agent systems." },
  { topic: "AI for Low-Resource Environments", sub: "Intelligence designed to run on the edge, independent of large data centers." },
  { topic: "Human-AI Synergy", sub: "Developing collaborative systems that augment human intuition and creativity." },
  { topic: "Information Theory", sub: "Understanding the fundamental limits of communication and data processing." },
];

export function Thinking() {
  return (
    <section id="thinking" style={{ padding: '10rem 2.5rem', position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <SectionLabel>Thinking</SectionLabel>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(2.8rem, 6vw, 4rem)', 
            fontWeight: 400, 
            color: 'var(--text-main)', 
            lineHeight: 1.05, 
            letterSpacing: '-0.02em', 
            marginBottom: '3.5rem' 
          }}
        >Curiosity Lab</motion.h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {topics.map((item, i) => (
            <motion.div
              key={item.topic}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                padding: '2.5rem 0', 
                borderBottom: '1px solid rgba(255,255,255,0.05)', 
                display: 'flex', 
                gap: '3rem', 
                alignItems: 'flex-start',
                cursor: 'default',
                position: 'relative'
              }}
              whileHover={{ x: 15 }}
            >
              <span style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.7rem', 
                color: 'var(--accent-primary)', 
                letterSpacing: '0.15em', 
                minWidth: 32, 
                paddingTop: '0.4rem',
                opacity: 0.5
              }}>0{i + 1}</span>
              <div>
                <motion.h3 
                  whileHover={{ color: 'var(--text-main)' }}
                  style={{ 
                    fontSize: '1.35rem', 
                    fontWeight: 400, 
                    color: 'rgba(240, 238, 248, 0.9)', 
                    marginBottom: '0.6rem', 
                    lineHeight: 1.2,
                    transition: 'color 0.3s ease'
                  }}
                >{item.topic}</motion.h3>
                <p style={{ 
                  fontSize: '1rem', 
                  color: 'var(--text-dim)', 
                  lineHeight: 1.7,
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
