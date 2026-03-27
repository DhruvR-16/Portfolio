import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  }
};

export function Hero() {
  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '0 2.5rem', position: 'relative', zIndex: 2 }}>
      <motion.div 
        style={{ maxWidth: 760, margin: '0 auto', width: '100%' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <span style={{ 
            fontFamily: "var(--font-mono)", 
            fontSize: "0.7rem", 
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

        <motion.div variants={itemVariants}>
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

        <motion.div variants={itemVariants}>
          <p style={{ 
            fontSize: "clamp(1.1rem, 2vw, 1.25rem)", 
            color: "var(--text-dim)", 
            maxWidth: 520, 
            lineHeight: 1.6, 
            marginBottom: "3.5rem", 
            fontWeight: 300 
          }}>
            I explore intelligence — reinforcement learning, decision systems, and ideas that might actually matter. Also: the night sky through a lens.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {["Reinforcement Learning", "Decision Systems", "Astrophotography"].map(tag => (
            <motion.span 
              key={tag} 
              whileHover={{ scale: 1.05, borderColor: 'var(--accent-primary)' }}
              style={{ 
                fontSize: "0.7rem", 
                letterSpacing: "0.1em", 
                textTransform: "uppercase", 
                color: "var(--accent-primary)", 
                background: "rgba(0, 242, 255, 0.05)",
                border: "1px solid rgba(0, 242, 255, 0.15)", 
                borderRadius: 100, 
                padding: "0.4rem 1rem", 
                fontFamily: "var(--font-mono)",
                cursor: 'default'
              }}
            >{tag}</motion.span>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
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
            <motion.span 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              style={{ display: "inline-block" }}
            >↓</motion.span>
            Scroll to explore
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
