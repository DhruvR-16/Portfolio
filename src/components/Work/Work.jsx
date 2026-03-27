import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Brain } from 'lucide-react';
import { SectionLabel } from '../Shared/Shared';

const projects = [
  {
    num: "01",
    title: "Healthcare AI Assistant",
    desc: "Offline AI system designed for accessibility on low-end devices in resource-constrained environments.",
    tech: ["Python", "ML", "Data Optimization"],
    insight: "Real-world AI is limited more by hardware constraints than algorithm sophistication.",
    status: "Completed",
    icon: <Cpu size={21} />
  },
  {
    num: "02",
    title: "RL Exploration Framework",
    desc: "A personal deep-dive into reward shaping and policy optimization for sparse-reward environments.",
    tech: ["PyTorch", "Gymnasium", "Reinforcement Learning"],
    insight: "Curiosity-driven exploration consistently outperforms random in low-data regimes.",
    status: "In Progress",
    icon: <Brain size={21} />
  },
];

function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass"
      style={{ 
        padding: '3rem', 
        position: 'relative', 
        overflow: 'hidden',
        transition: 'var(--transition-smooth)',
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
        borderColor: isHovered ? 'rgba(165, 180, 252, 0.3)' : 'var(--glass-border)',
        boxShadow: isHovered ? '0 30px 60px -15px rgba(165, 180, 252, 0.15)' : 'none'
      }}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              position: 'absolute', 
              inset: 0, 
              background: 'linear-gradient(135deg, rgba(165, 180, 252, 0.05), rgba(253, 164, 175, 0.05))',
              pointerEvents: 'none'
            }}
          />
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem', position: 'relative' }}>
        <motion.div 
          animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
          style={{ 
            width: 52, 
            height: 52, 
            borderRadius: 14, 
            background: 'rgba(255, 255, 255, 0.04)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'var(--accent-primary)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
          {project.icon}
        </motion.div>
        <span style={{ 
          fontFamily: 'var(--font-mono)', 
          fontSize: '0.65rem', 
          color: 'var(--text-muted)',
          letterSpacing: '0.2em'
        }}>{project.num}</span>
      </div>

      <h3 style={{ 
        fontFamily: 'var(--font-serif)', 
        fontSize: '2rem', 
        fontWeight: 400, 
        marginBottom: '0.8rem',
        color: 'var(--text-main)',
        position: 'relative',
        letterSpacing: '-0.02em'
      }}>{project.title}</h3>
      
      <p style={{ 
        fontSize: '0.7rem', 
        textTransform: 'uppercase', 
        letterSpacing: '0.2em', 
        color: 'var(--accent-primary)', 
        marginBottom: '1.8rem',
        opacity: 0.8,
        fontWeight: 600
      }}>{project.status}</p>

      <p style={{ 
        fontSize: '1.05rem', 
        color: 'var(--text-dim)', 
        lineHeight: 1.65, 
        marginBottom: '3.5rem',
        fontWeight: 300
      }}>{project.desc}</p>

      <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
        {project.tech.map(t => (
          <span key={t} style={{ 
            fontSize: '0.65rem', 
            fontFamily: 'var(--font-mono)', 
            padding: '0.45rem 1rem', 
            background: 'rgba(255, 255, 255, 0.03)', 
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: 100,
            color: 'var(--text-dim)',
          }}>{t}</span>
        ))}
      </div>

      <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--accent-secondary)", display: "block", marginBottom: "0.6rem", opacity: 0.7 }}>Key Insight</span>
        <p style={{ fontSize: "1rem", color: "var(--accent-secondary)", lineHeight: 1.5, fontStyle: "italic", fontWeight: 300, opacity: 0.8 }}>"{project.insight}"</p>
      </div>
    </motion.div>
  );
}

export function Work() {
  return (
    <section id="work" style={{ padding: '14rem 2.5rem', position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ maxWidth: 760, marginBottom: '7rem' }}>
          <SectionLabel>Selected Work</SectionLabel>
          <h2 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(3.2rem, 7vw, 4.8rem)', 
            fontWeight: 400, 
            lineHeight: 1.0, 
            letterSpacing: '-0.04em', 
            marginBottom: '2rem',
            color: 'var(--text-main)'
          }}>Engineering Systems</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.25rem', fontWeight: 300, lineHeight: 1.6, maxWidth: '600px' }}>
            A focused exploration of intelligent systems and reinforcement learning architectures.
          </p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(460px, 1fr))', 
          gap: '3.5rem' 
        }}>
          {projects.map((p, i) => <ProjectCard key={p.num} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
