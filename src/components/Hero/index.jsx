import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '0 2.5rem', position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: 760, margin: '0 auto', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span style={{ 
            fontFamily: "var(--font-mono)", 
            fontSize: "0.68rem", 
            letterSpacing: "0.2em", 
            textTransform: "uppercase", 
            color: "var(--accent-primary)", 
            display: "block", 
            marginBottom: "2rem",
            opacity: 0.8
          }}>
            B.Tech AI & ML Student · 2nd Year
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 style={{ 
            fontFamily: "var(--font-serif)", 
            fontSize: "clamp(3.5rem, 8vw, 6.5rem)", 
            lineHeight: 0.9, 
            letterSpacing: "-0.03em", 
            color: "var(--text-main)", 
            marginBottom: "1.8rem", 
            fontWeight: 400 
          }}>
            Dhruv<br />
            <em style={{ fontStyle: "italic", opacity: 0.8 }} className="gradient-text">Ramani</em>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={{ 
            fontSize: "clamp(1.1rem, 2vw, 1.25rem)", 
            color: "var(--text-dim)", 
            maxWidth: 520, 
            lineHeight: 1.6, 
            marginBottom: "3.5rem", 
            fontWeight: 300 
          }}>
            Architecting intelligent systems through Computer Vision, NLP, and Reinforcement Learning. I build tools that bridge the gap between complex research and accessible reality.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
        >
          {["Computer Vision", "NLP", "Reinforcement Learning", "AI Automation"].map(tag => (
            <span key={tag} style={{ 
              fontSize: "0.7rem", 
              letterSpacing: "0.1em", 
              textTransform: "uppercase", 
              color: "var(--accent-primary)", 
              background: "rgba(139, 124, 246, 0.05)",
              border: "1px solid rgba(139, 124, 246, 0.15)", 
              borderRadius: 100, 
              padding: "0.4rem 1rem", 
              fontFamily: "var(--font-mono)" 
            }}>{tag}</span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{ marginTop: "6rem" }}
        >
          <div style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            gap: "0.8rem", 
            color: "var(--text-muted)", 
            fontSize: "0.7rem", 
            letterSpacing: "0.15em", 
            textTransform: "uppercase" 
          }}>
            <span style={{ 
              display: "inline-block", 
              animation: "bounce 2s ease-in-out infinite" 
            }}>↓</span>
            Scroll to explore
          </div>
        </motion.div>
      </div>
    </section>
  );
}
