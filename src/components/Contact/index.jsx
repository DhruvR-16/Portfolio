import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { SectionLabel } from '../Shared';

export function Contact() {
  const links = [
    { label: "Email", value: "dhruv@example.com", href: "mailto:dhruv@example.com", icon: <Mail size={18} /> },
    { label: "GitHub", value: "github.com/DhruvR-16", href: "https://github.com/DhruvR-16", icon: <Github size={18} /> },
    { label: "LinkedIn", value: "linkedin.com/in/dhruv", href: "#", icon: <Linkedin size={18} /> },
  ];

  return (
    <section id="contact" style={{ padding: '10rem 2.5rem', position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <SectionLabel>Contact</SectionLabel>
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <h2 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(3rem, 7vw, 4.5rem)', 
            fontWeight: 400, 
            color: 'var(--text-main)', 
            lineHeight: 0.9, 
            letterSpacing: '-0.03em', 
            marginBottom: '2rem' 
          }}>
            Building the <br />
            <em className="gradient-text" style={{ fontStyle: 'italic' }}>tomorrow.</em>
          </h2>
          <p style={{ 
            fontSize: '1.1rem', 
            color: 'var(--text-dim)', 
            maxWidth: 480, 
            lineHeight: 1.6, 
            marginBottom: '4.5rem',
            fontWeight: 300
          }}>
            Always looking for ambitious projects and meaningful collaborations in AI and intelligent systems.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {links.map((l, i) => (
            <motion.a 
              key={l.label} 
              href={l.href} 
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '1.8rem 0', 
                borderBottom: '1px solid rgba(255,255,255,0.05)', 
                textDecoration: 'none',
                color: 'inherit'
              }}
              whileHover={{ x: 10 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                <div style={{ color: 'var(--accent-primary)', opacity: 0.8 }}>{l.icon}</div>
                <div>
                  <span style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '0.6rem', 
                    letterSpacing: '0.15em', 
                    textTransform: 'uppercase', 
                    color: 'var(--accent-primary)', 
                    display: 'block', 
                    marginBottom: '0.2rem',
                    opacity: 0.6
                  }}>{l.label}</span>
                  <span style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: 400 }}>{l.value}</span>
                </div>
              </div>
              <ArrowUpRight size={20} style={{ color: 'var(--accent-primary)', opacity: 0.5 }} />
            </motion.a>
          ))}
        </div>

        <footer style={{ marginTop: '10rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2.5rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Dhruv Ramani © 2025</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Built with curiosity</span>
        </footer>
      </div>
    </section>
  );
}
