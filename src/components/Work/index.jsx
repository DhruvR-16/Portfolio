import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code2, Cpu, Brain, Search } from 'lucide-react';
import { SectionLabel } from '../Shared';

const projects = [
  {
    id: "01",
    title: "Mavis",
    category: "AI & Computer Vision",
    desc: "An AI-powered fitness coaching system using MediaPipe and LSTM for real-time pose estimation and strict form coaching.",
    tech: ["Python", "TensorFlow", "MediaPipe", "React"],
    icon: <Cpu size={20} />,
    link: "#",
    github: "https://github.com/DhruvR-16/Mavis"
  },
  {
    id: "02",
    title: "AutoPatch",
    category: "LLM Automation",
    desc: "LLM-driven automated code patching tool using Gemini 2.0 Flash to autonomously identify, analyze, and fix bugs in codebases.",
    tech: ["Node.js", "Gemini API", "AST Parsing"],
    icon: <Brain size={20} />,
    link: "#",
    github: "https://github.com/DhruvR-16/AutoPatch"
  },
  {
    id: "03",
    title: "SwasthyaAI",
    category: "HealthTech AI",
    desc: "Personal Health Management agent with a decentralized Health Vault and automated medical report parsing for insights.",
    tech: ["Python", "Streamlit", "Blockchain", "NLP"],
    icon: <Code2 size={20} />,
    link: "#",
    github: "https://github.com/DhruvR-16/SwasthyaAI"
  },
  {
    id: "04",
    title: "Research-Summarizer",
    category: "NLP & Research",
    desc: "AI-driven system for research topic analysis and summarization, extracting key insights from scholarly articles.",
    tech: ["Python", "Transformers", "NLP", "Streamlit"],
    icon: <Search size={20} />,
    link: "#",
    github: "https://github.com/DhruvR-16/Research-Summarizer"
  }
];

function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass"
      style={{ 
        padding: '2.5rem', 
        position: 'relative', 
        overflow: 'hidden',
        transition: 'var(--transition-smooth)',
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
        borderColor: isHovered ? 'var(--accent-primary)' : 'var(--glass-border)',
        boxShadow: isHovered ? '0 10px 40px -10px rgba(139, 124, 246, 0.2)' : 'none'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div style={{ 
          width: 44, 
          height: 44, 
          borderRadius: 12, 
          background: 'rgba(139, 124, 246, 0.1)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'var(--accent-primary)'
        }}>
          {project.icon}
        </div>
        <span style={{ 
          fontFamily: 'var(--font-mono)', 
          fontSize: '0.65rem', 
          color: 'var(--text-muted)',
          letterSpacing: '0.1em'
        }}>{project.id}</span>
      </div>

      <h3 style={{ 
        fontFamily: 'var(--font-serif)', 
        fontSize: '1.75rem', 
        fontWeight: 400, 
        marginBottom: '0.5rem',
        color: 'var(--text-main)'
      }}>{project.title}</h3>
      
      <p style={{ 
        fontSize: '0.75rem', 
        textTransform: 'uppercase', 
        letterSpacing: '0.1em', 
        color: 'var(--accent-primary)', 
        marginBottom: '1.2rem',
        opacity: 0.8
      }}>{project.category}</p>

      <p style={{ 
        fontSize: '0.95rem', 
        color: 'var(--text-dim)', 
        lineHeight: 1.6, 
        marginBottom: '2rem',
        fontWeight: 300
      }}>{project.desc}</p>

      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        {project.tech.map(t => (
          <span key={t} style={{ 
            fontSize: '0.65rem', 
            fontFamily: 'var(--font-mono)', 
            padding: '0.3rem 0.8rem', 
            background: 'rgba(255,255,255,0.03)', 
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: 6,
            color: 'var(--text-dim)'
          }}>{t}</span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: isHovered ? 'var(--accent-primary)' : 'var(--text-dim)' }}>
          <Github size={16} /> Source
        </a>
        <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: isHovered ? 'var(--accent-primary)' : 'var(--text-dim)' }}>
          <ExternalLink size={16} /> Demo
        </a>
      </div>
    </motion.div>
  );
}

export function Work() {
  return (
    <section id="work" style={{ padding: '10rem 2.5rem', position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ maxWidth: 760, marginBottom: '5rem' }}>
          <SectionLabel>Selected Work</SectionLabel>
          <h2 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
            fontWeight: 400, 
            lineHeight: 1.1, 
            letterSpacing: '-0.02em', 
            marginBottom: '1.5rem' 
          }}>Things I've Built</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', fontWeight: 300 }}>
            A collection of experiments in AI, automation, and intelligent systems.
          </p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
          gap: '2rem' 
        }}>
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
