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
    <section id="tech" style={{ padding: '10rem 2.5rem', position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <SectionLabel>Arsenal</SectionLabel>
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
          Tools of the trade
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ color: 'var(--text-dim)', fontSize: '1.1rem', fontWeight: 300, marginBottom: '4rem', lineHeight: 1.6, maxWidth: 600 }}
        >
          The frameworks and systems I use to build intelligence and translate research into reality.
        </motion.p>

        <div style={{ display: 'grid', gap: '4rem' }}>
          {techCategories.map((group, groupIdx) => (
            <div key={group.category}>
              <motion.h3 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
                style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '0.8rem', 
                  letterSpacing: '0.2em', 
                  textTransform: 'uppercase', 
                  color: 'var(--accent-secondary)', 
                  marginBottom: '1.5rem',
                  opacity: 0.8
                }}
              >
                {group.category}
              </motion.h3>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', 
                gap: '0.8rem' 
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
                      padding: '0.8rem 1rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.8rem',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: 12,
                      cursor: 'default',
                      transition: 'background 0.3s ease, border-color 0.3s ease'
                    }}
                  >
                    <img src={`https://cdn.simpleicons.org/${skill.iconSlug}/ffffff`} alt={skill.name} style={{ width: 18, height: 18, opacity: 0.9 }} />
                    <span style={{ color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 400 }}>{skill.name}</span>
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