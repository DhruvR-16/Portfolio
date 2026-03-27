import { motion } from 'framer-motion';
import { SectionLabel } from '../Shared/Shared';

const photos = [
  { id: 1, label: "Milky Way · Ladakh", emoji: "🌌", color: "linear-gradient(135deg, #0a0a1e, #1a1040)", span: 1 },
  { id: 2, label: "Blue Hour · Campus", emoji: "🌃", color: "linear-gradient(135deg, #0a1628, #1e3a5f)", span: 2 },
  { id: 3, label: "Mars Opposition", emoji: "🔴", color: "linear-gradient(135deg, #150a0a, #3d1515)", span: 2 },
  { id: 4, label: "Forest Mist · Dawn", emoji: "🌿", color: "linear-gradient(135deg, #0a1208, #1a3020)", span: 1 },
];

export function Photography() {
  return (
    <section id="photography" style={{ padding: '10rem 2.5rem', position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <SectionLabel>Photography</SectionLabel>
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
        >Observing the Universe</motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ color: 'var(--text-dim)', fontSize: '1.1rem', fontWeight: 300, marginBottom: '4rem', lineHeight: 1.6 }}
        >
          Capturing the stillness of the night sky—a reminder of the vast scale we build within.
        </motion.p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '1.5rem' 
        }}>
          {photos.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02 }}
              className="glass"
              style={{ 
                aspectRatio: p.span === 2 ? '16/10' : '1/1', 
                background: p.color,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                gridColumn: `span ${p.span}`
              }}
            >
              <motion.span 
                initial={{ y: 0 }}
                whileHover={{ y: -5 }}
                style={{ fontSize: '3rem', marginBottom: '0.8rem', position: 'relative', zIndex: 2 }}
              >{p.emoji}</motion.span>
              <span style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.65rem', 
                letterSpacing: '0.15em', 
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.7)',
                position: 'relative',
                zIndex: 2
              }}>{p.label}</span>
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)', transition: 'background 0.3s ease' }} className="photo-overlay" />
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        .glass:hover .photo-overlay { background: rgba(0,0,0,0.05); }
      `}</style>
    </section>
  );
}
