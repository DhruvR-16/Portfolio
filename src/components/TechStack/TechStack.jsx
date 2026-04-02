import { motion } from 'framer-motion';
import { SectionLabel } from '../Shared/Shared';

const techCategories = [
  {
    category: "Languages",
    skills: [
      { name: "Python", iconSlug: "python" },
      { name: "JS / TS", iconSlug: "javascript" },
    ]
  },
  {
    category: "AI & ML",
    skills: [
      { name: "PyTorch", iconSlug: "pytorch" },
      { name: "TensorFlow", iconSlug: "tensorflow" },
      { name: "Scikit-Learn", iconSlug: "scikitlearn" },
      { name: "OpenCV", iconSlug: "opencv" }
    ]
  },
  {
    category: "Systems & Web",
    skills: [
      { name: "React", iconSlug: "react" },
      { name: "Node.js", iconSlug: "nodedotjs" },
      { name: "Git", iconSlug: "git" }
    ]
  }
];

export function TechStack() {
  return (
    <section id="tech" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      padding: '2rem 2.5rem', 
      position: 'relative', 
      zIndex: 2 
    }}>
      <div style={{ maxWidth: 900, width: '100%', margin: '0 auto' }}>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
            fontWeight: 400, 
            color: 'var(--text-main)', 
            lineHeight: 1.1, 
            letterSpacing: '-0.02em', 
            marginBottom: '1.5rem' 
          }}
        >
          <em className="gradient-text" style={{ fontStyle: 'italic' }}>TechStack</em>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ color: 'var(--text-dim)', fontSize: '1.1rem', fontWeight: 300, marginBottom: '4rem', lineHeight: 1.6, maxWidth: 600 }}
        >
          The frameworks and languages I use.
        </motion.p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr', 
          gap: '3.5rem',
          width: '100%'
        }}>
          {techCategories.map((group, groupIdx) => (
            <div key={group.category}>
              <motion.h3 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
                style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '0.7rem', 
                  letterSpacing: '0.2em', 
                  textTransform: 'uppercase', 
                  color: 'var(--accent-secondary)', 
                  marginBottom: '1.8rem',
                  opacity: 0.6
                }}
              >
                {group.category}
              </motion.h3>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', 
                gap: '0.7rem' 
              }}>
                {group.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (groupIdx * 0.1) + (i * 0.05) }}
                    whileHover={{ y: -3, background: 'rgba(255, 255, 255, 0.08)' }}
                    className="glass"
                    style={{ 
                      padding: '0.7rem 0.9rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.6rem',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: 10,
                      cursor: 'default',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <img src={`https://cdn.simpleicons.org/${skill.iconSlug}/ffffff`} alt={skill.name} style={{ width: 16, height: 16, opacity: 0.8 }} />
                    <span style={{ color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: 300 }}>{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}