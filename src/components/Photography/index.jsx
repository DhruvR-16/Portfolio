import { motion } from 'framer-motion';
import { SectionLabel } from '../Shared';

const photos = [
  { id: 1, label: "Milky Way · Ladakh", emoji: "🌌", color: "linear-gradient(135deg, #0a0a1e, #1a1040)" },
  { id: 2, label: "Blue Hour · Campus", emoji: "🌃", color: "linear-gradient(135deg, #0a1628, #1e3a5f)" },
  { id: 3, label: "Mars Opposition", emoji: "🔴", color: "linear-gradient(135deg, #150a0a, #3d1515)" },
  { id: 4, label: "Forest Mist · Dawn", emoji: "🌿", color: "linear-gradient(135deg, #0a1208, #1a3020)" },
];

export function Photography() {
  return (
    <section id="photography" style={{ padding: '8rem 2.5rem', position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <SectionLabel>Photography</SectionLabel>
        <h2 style={{ 
          fontFamily: 'var(--font-serif)', 
          fontSize: 'clamp(2rem, 5vw, 2.8rem)', 
          fontWeight: 400, 
          color: 'var(--text-main)', 
          lineHeight: 1.1, 
          letterSpacing: '-0.02em', 
          marginBottom: '1rem' 
        }}>Observing the Universe</h2>
        <p style={{ color: 'var(--text-dim)', fontSize: '1rem', fontWeight: 300, marginBottom: '3.5rem' }}>
          When I'm not building AI, I'm often behind a lens, capturing the quiet details of the night sky.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          {photos.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass"
              style={{ 
                aspectRatio: '16/9', 
                background: p.color,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <span style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{p.emoji}</span>
              <span style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.6rem', 
                letterSpacing: '0.1em', 
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.6)'
              }}>{p.label}</span>
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
