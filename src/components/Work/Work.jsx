import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Brain } from 'lucide-react';
import { SectionLabel } from '../Shared/Shared';

const projects = [
  {
    num: "01",
    title: "Mavis: AI Fitness Coach",
    desc: "A real-time poise estimation and strict form coaching system that ensures perfect execution through geometric inference.",
    tech: ["Python", "MediaPipe", "TensorFlow", "React"],
    insight: "Dynamic calibration is the bridge between raw landmarks and meaningful human movement analysis.",
    status: "In Progress",
    icon: <Cpu size={21} />
  },
  {
    num: "02",
    title: "Exoplanet Detection Pipeline",
    desc: "An end-to-end ML application for detecting exoplanet transit signatures from raw TESS lightcurve data using Lightkurve and XGBoost.",
    tech: ["Python", "Streamlit", "XGBoost", "Lightkurve", "Random Forest"],
    insight: "Astronomical noise reduction is as much about understanding the instrument as it is about the signal.",
    status: "In Progress",
    icon: <Brain size={21} />
  },
];

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{ 
        padding: "1.8rem 2rem", 
        borderRadius: 20, 
        background: hovered ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.03)", 
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: `1px solid ${hovered ? 'rgba(165,180,252,0.2)' : 'rgba(255, 255, 255, 0.06)'}`,
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)", 
        transform: hovered ? "translateY(-5px)" : "translateY(0)", 
        cursor: "default", 
        position: "relative",
        overflow: "hidden",
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{ position: 'relative', zIndex: 2, flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
          <div style={{ 
            width: 42, 
            height: 42, 
            borderRadius: 12, 
            background: 'rgba(165,180,252,0.08)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: hovered ? 'var(--accent-primary)' : 'rgba(165,180,252,0.6)',
            border: `1px solid ${hovered ? 'rgba(165,180,252,0.3)' : 'rgba(165,180,252,0.1)'}`,
            transition: 'all 0.4s ease',
            boxShadow: hovered ? '0 0 15px rgba(165,180,252,0.2)' : 'none'
          }}>
            {project.icon}
          </div>
          <span style={{ 
            fontFamily: "var(--font-mono)", 
            fontSize: "0.55rem", 
            letterSpacing: "0.15em", 
            textTransform: "uppercase", 
            padding: "0.3rem 0.6rem", 
            borderRadius: 6, 
            background: "rgba(255,255,255,0.04)",
            border: `1px solid rgba(255,255,255,0.08)`, 
            color: "rgba(255,255,255,0.4)" 
          }}>
            {project.status}
          </span>
        </div>

        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.35rem", fontWeight: 400, color: "var(--text-main)", lineHeight: 1.2, marginBottom: "0.8rem" }}>
          {project.title}
        </h3>

        <p style={{ fontSize: "0.9rem", color: "var(--text-dim)", lineHeight: 1.6, marginBottom: "1.8rem", fontWeight: 300 }}>
          {project.desc}
        </p>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          {project.tech.map(t => (
            <span key={t} style={{ 
              fontFamily: "var(--font-mono)", 
              fontSize: "0.6rem", 
              color: "rgba(255,255,255,0.35)", 
              padding: "0.2rem 0.5rem", 
              background: "rgba(255,255,255,0.02)", 
              border: "1px solid rgba(255,255,255,0.04)",
              borderRadius: 4 
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div style={{ 
        paddingTop: "1.2rem", 
        borderTop: "1px solid rgba(255,255,255,0.05)",
        marginTop: "auto"
      }}>
        <p style={{ fontSize: "0.8rem", color: "rgba(165,180,252,0.5)", lineHeight: 1.5, fontStyle: "italic", fontWeight: 300 }}>
          <span style={{ color: 'var(--accent-primary)', opacity: 0.8, marginRight: '0.4rem' }}>◆</span>
          {project.insight}
        </p>
      </div>

      {/* Subtle Stellar Halo Effect */}
      <motion.div 
        animate={{ 
          opacity: hovered ? 0.08 : 0,
          scale: hovered ? 1.2 : 0.8
        }}
        style={{ 
          position: 'absolute', 
          top: '-10%', 
          right: '-10%', 
          width: '60%', 
          height: '60%', 
          background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none'
        }} 
      />
    </motion.div>
  );
}

export function Work() {
  return (
    <section id="work" style={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center", 
      padding: "2rem 2.5rem", 
      position: "relative", 
      zIndex: 2 
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        </motion.div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ maxWidth: 500 }}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.1 }}
              style={{ fontFamily: 'var(--font-serif)', fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 400, color: "var(--text-main)", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1rem" }}
            >
            <em className="gradient-text" style={{ fontStyle: 'italic' }}>Projects</em>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.2 }}
              style={{ fontSize: "1rem", color: "var(--text-dim)", lineHeight: 1.6, fontWeight: 300 }}
            >
              A few projects I’ve been working on...
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            [ Constellation Grid 1.0 ]
          </motion.div>
        </div>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", 
          gap: "1.5rem" 
        }}>
          {projects.map((p) => <ProjectCard key={p.num} project={p} />)}
        </div>
      </div>
    </section>
  );
}
