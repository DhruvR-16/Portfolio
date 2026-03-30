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

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)}
      style={{ 
        padding: "2.2rem 2.4rem", 
        border: `1px solid ${hovered ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.15)"}`, 
        borderRadius: 16, 
        background: hovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)", 
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)", 
        transform: hovered ? "translateY(-4px)" : "translateY(0)", 
        cursor: "default", 
        position: "relative" 
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.4rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "rgba(139,124,246,0.45)", letterSpacing: "0.1em" }}>{project.num}</span>
          <span style={{ 
            fontFamily: "var(--font-mono)", 
            fontSize: "0.6rem", 
            letterSpacing: "0.12em", 
            textTransform: "uppercase", 
            padding: "0.2rem 0.7rem", 
            borderRadius: 100, 
            border: `1px solid ${project.status === "Completed" ? "rgba(100,220,140,0.25)" : "rgba(139,124,246,0.25)"}`, 
            color: project.status === "Completed" ? "rgba(100,220,140,0.7)" : "rgba(139,124,246,0.6)" 
          }}>
            {project.status}
          </span>
        </div>
        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.3rem, 3vw, 1.65rem)", fontWeight: 400, color: "rgba(240,238,248,0.95)", lineHeight: 1.2, marginBottom: "0.85rem" }}>
          {project.title}
        </h3>
        <p style={{ fontSize: "0.9rem", color: "rgba(122,120,138,0.85)", lineHeight: 1.7, marginBottom: "1.5rem", fontWeight: 300 }}>
          {project.desc}
        </p>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.8rem" }}>
          {project.tech.map(t => (
            <span key={t} style={{ 
              fontFamily: "var(--font-mono)", 
              fontSize: "0.62rem", 
              letterSpacing: "0.08em", 
              color: "rgba(122,120,138,0.6)", 
              padding: "0.2rem 0.6rem", 
              background: "rgba(255,255,255,0.04)", 
              borderRadius: 6 
            }}>
              {t}
            </span>
          ))}
        </div>
        <div style={{ paddingTop: "1.4rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(139,124,246,0.5)", display: "block", marginBottom: "0.45rem" }}>
            Key Insight
          </span>
          <p style={{ fontSize: "0.85rem", color: "rgba(200,195,255,0.55)", lineHeight: 1.65, fontStyle: "italic" }}>
            "{project.insight}"
          </p>
        </div>
    </div>
  );
}

export function Work() {
  return (
    <section id="work" style={{ padding: "8rem 2.5rem", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <SectionLabel>Selected Work</SectionLabel>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ delay: 0.1 }}
          style={{ fontFamily: 'var(--font-serif)', fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 400, color: "rgba(240,238,248,0.95)", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "0.8rem" }}
        >
          Things I've built
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ delay: 0.2 }}
          style={{ fontSize: "0.9rem", color: "rgba(122,120,138,0.7)", marginBottom: "3.5rem", lineHeight: 1.7 }}
        >
          Not the flashiest projects — but each one taught me something real.
        </motion.p>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
          {projects.map((p) => <ProjectCard key={p.num} project={p} />)}
        </div>
      </div>
    </section>
  );
}
