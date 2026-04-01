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
      minHeight: '105vh', 
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
            B.Tech CS & AI Student · 2nd Year
          </span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          style={{ 
            fontFamily: "var(--font-serif)", 
            fontSize: "clamp(3rem, 8vw, 5.5rem)", 
            fontWeight: 400, 
            color: "var(--text-main)", 
            lineHeight: 1.1, 
            letterSpacing: "-0.02em",
            marginBottom: "2rem" 
          }}
        >
          <span style={{ fontSize: '0.75em' }}>Hi, I'm</span> <br />
          Dhruv <em className="gradient-text" style={{ fontStyle: 'italic', paddingRight: '0.15em' }}>Ramani</em>
        </motion.h1>

        <motion.div variants={itemVariants}>
          <p style={{ 
            fontSize: "clamp(1rem, 1.8vw, 1.20rem)", 
            color: "var(--text-dim)", 
            maxWidth: 650, 
            lineHeight: 1.6, 
            marginBottom: "4.5rem", 
            fontWeight: 300 
          }}>
            I enjoy building things and figuring out how they work. I work with Machine Learning and am currently exploring Reinforcement Learning through hands-on projects. Curious about astrophysics, and into photography in my free time.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
          {["Machine Learning","Reinforcement Learning", "Photography", "Always Curious and Learning"].map(tag => (
            <motion.span 
              key={tag} 
              whileHover={{ 
                scale: 1.05, 
                borderColor: 'var(--accent-primary)',
                background: 'rgba(165, 180, 252, 0.08)' 
              }}
              style={{ 
                fontSize:"0.7rem", 
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
