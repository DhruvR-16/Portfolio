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
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  }
};

export function Hero() {
  return (
    <section id="hero" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      padding: '4rem 2.5rem', 
      position: 'relative', 
      zIndex: 2,
      overflow: 'visible' // Ensure no clipping
    }}>
      <motion.div 
        style={{ maxWidth: 850, margin: '0 auto', width: '100%' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <span style={{ 
            fontFamily: "var(--font-mono)", 
            fontSize: "0.7rem", 
            letterSpacing: "0.25em", 
            textTransform: "uppercase", 
            color: "var(--accent-primary)", 
            display: "block", 
            marginBottom: "2.5rem",
            opacity: 0.9
          }}>
            B.Tech AI & ML Student · 2nd Year
          </span>
        </motion.div>

        <motion.div variants={itemVariants} style={{ paddingRight: '3.5rem' }}>
          <h1 style={{ 
            fontFamily: "var(--font-serif)", 
            fontSize: "clamp(3rem, 7vw, 5.5rem)", 
            lineHeight: 1.2, 
            letterSpacing: "0.03em", 
            color: "var(--text-main)", 
            marginBottom: "2.5rem", 
            fontWeight: 400,
            whiteSpace: 'nowrap',
          }}>
            Dhruv<br />
            <em style={{ fontStyle: "italic", opacity: 0.95, paddingRight: '1.2rem' }} className="gradient-text">Ramani</em>
          </h1>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p style={{ 
            fontSize: "clamp(1rem, 1.8vw, 1.25rem)", 
            color: "var(--text-dim)", 
            maxWidth: 580, 
            lineHeight: 1.6, 
            marginBottom: "4.5rem", 
            fontWeight: 300 
          }}>
            I explore intelligence — reinforcement learning, deep learning, and ideas that might actually matter.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
          {["Machine Learning","Reinforcement Learning",].map(tag => (
            <motion.span 
              key={tag} 
              whileHover={{ 
                scale: 1.05, 
                borderColor: 'var(--accent-primary)',
                background: 'rgba(165, 180, 252, 0.08)' 
              }}
              style={{ 
                fontSize: "0.7rem", 
                letterSpacing: "0.15em", 
                textTransform: "uppercase", 
                color: "var(--accent-primary)", 
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)", 
                borderRadius: 12, 
                padding: "0.6rem 1.2rem", 
                fontFamily: "var(--font-mono)",
                cursor: 'default',
                transition: 'var(--transition-smooth)'
              }}
            >{tag}</motion.span>
          ))}
        </motion.div>

        <motion.div
           variants={itemVariants}
           style={{ marginTop: '8rem' }}
           animate={{ y: [0, 10, 0] }}
           transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <div style={{ color: 'var(--accent-secondary)', opacity: 0.5, fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>↓ Scroll</div>
        </motion.div>
      </motion.div>
    </section>
  );
}
