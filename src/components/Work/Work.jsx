import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Code2, Cpu, Brain, Search } from 'lucide-react';
import { SectionLabel } from '../Shared/Shared';

const projects = [
  {
    num: "01",
    title: "Healthcare AI Assistant",
    desc: "Offline AI system designed for accessibility on low-end devices in resource-constrained environments.",
    tech: ["Python", "ML", "Data Optimization"],
    insight: "Real-world AI is limited more by hardware constraints than algorithm sophistication.",
    status: "Completed",
    icon: <Cpu size={20} />
  },
  {
    num: "02",
    title: "RL Exploration Framework",
    desc: "A personal deep-dive into reward shaping and policy optimization for sparse-reward environments.",
    tech: ["PyTorch", "Gymnasium", "Reinforcement Learning"],
    insight: "Curiosity-driven exploration consistently outperforms random in low-data regimes.",
    status: "In Progress",
    icon: <Brain size={20} />
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
        padding: '2.5rem', 
        position: 'relative', 
        overflow: 'hidden',
        transition: 'var(--transition-smooth)',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        borderColor: isHovered ? 'var(--accent-primary)' : 'var(--glass-border)',
        boxShadow: isHovered ? '0 20px 60px -15px rgba(0, 242, 255, 0.15)' : 'none'
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
              background: 'radial-gradient(circle at center, rgba(0, 242, 255, 0.05), transparent 70%)',
              pointerEvents: 'none'
            }}
          />
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', position: 'relative' }}>
        <motion.div 
          animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
          style={{ 
            width: 48, 
            height: 48, 
            borderRadius: 12, 
            background: 'rgba(0, 242, 255, 0.1)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'var(--accent-primary)'
          }}>
          {project.icon}
        </motion.div>
        <span style={{ 
          fontFamily: 'var(--font-mono)', 
          fontSize: '0.65rem', 
          color: 'var(--text-muted)',
          letterSpacing: '0.15em'
        }}>{project.num}</span>
      </div>

      <h3 style={{ 
        fontFamily: 'var(--font-serif)', 
        fontSize: '1.85rem', 
        fontWeight: 400, 
        marginBottom: '0.6rem',
        color: 'var(--text-main)',
        position: 'relative'
      }}>{project.title}</h3>
      
      <p style={{ 
        fontSize: '0.7rem', 
        textTransform: 'uppercase', 
        letterSpacing: '0.15em', 
        color: 'var(--accent-primary)', 
        marginBottom: '1.5rem',
        opacity: 0.9,
        fontWeight: 500
      }}>{project.status}</p>

      <p style={{ 
        fontSize: '0.95rem', 
        color: 'var(--text-dim)', 
        lineHeight: 1.7, 
        marginBottom: '2.5rem',
        fontWeight: 300
      }}>{project.desc}</p>

      <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
        {project.tech.map(t => (
          <span key={t} style={{ 
            fontSize: '0.65rem', 
            fontFamily: 'var(--font-mono)', 
            padding: '0.35rem 0.9rem', 
            background: 'rgba(255,255,255,0.04)', 
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 8,
            color: 'var(--text-dim)'
          }}>{t}</span>
        ))}
      </div>

      <div style={{ paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.05)", position: 'relative' }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent-primary)", display: "block", marginBottom: "0.5rem", opacity: 0.7 }}>Key Insight</span>
        <p style={{ fontSize: "0.9rem", color: "rgba(0, 242, 255, 0.6)", lineHeight: 1.6, fontStyle: "italic" }}>"{project.insight}"</p>
      </div>
    </motion.div>
  );
}

export function Work() {
  return (
    <section id="work" style={{ padding: '12rem 2.5rem', position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ maxWidth: 760, marginBottom: '6rem' }}>
          <SectionLabel>Selected Work</SectionLabel>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: 'clamp(2.8rem, 6vw, 4rem)', 
              fontWeight: 400, 
              lineHeight: 1.05, 
              letterSpacing: '-0.02em', 
              marginBottom: '1.8rem' 
            }}
          >Engineering Intelligence</motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ color: 'var(--text-dim)', fontSize: '1.2rem', fontWeight: 300, lineHeight: 1.6 }}
          >
            A curated selection of technical experiments in reinforcement learning and infrastructure for low-resource AI.
          </motion.p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
          gap: '2.5rem' 
        }}>
          {projects.map((p, i) => <ProjectCard key={p.num} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
