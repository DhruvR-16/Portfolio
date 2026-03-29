import { motion } from 'framer-motion';
import { SectionLabel } from '../Shared/Shared';

const techCategories = [
  {
    category: "Languages",
    skills: [
      { name: "Python", icon: "🐍" },
      { name: "C++", icon: "⚡" },
      { name: "JavaScript / TypeScript", icon: "🌐" },
      { name: "SQL", icon: "🗄️" }
    ]
  },
  {
    category: "AI & ML",
    skills: [
      { name: "PyTorch", icon: "🔥" },
      { name: "TensorFlow", icon: "🧠" },
      { name: "Scikit-Learn", icon: "📊" },
      { name: "CUDA", icon: "⚙️" },
      { name: "OpenCV", icon: "👁️" }
    ]
  },
  {
    category: "Systems & Web",
    skills: [
      { name: "React", icon: "⚛️" },
      { name: "Node.js", icon: "🟢" },
      { name: "Docker", icon: "🐋" },
      { name: "Git", icon: "📦" }
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
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                gap: '1rem' 
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
                      padding: '1.2rem 1.5rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '1rem',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: 16,
                      cursor: 'default',
                      transition: 'background 0.3s ease, border-color 0.3s ease'
                    }}
                  >
                    <span style={{ fontSize: '1.4rem' }}>{skill.icon}</span>
                    <span style={{ color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: 400 }}>{skill.name}</span>
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