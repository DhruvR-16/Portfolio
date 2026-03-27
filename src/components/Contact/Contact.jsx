import { useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { SectionLabel } from '../Shared/Shared';

function MagneticLink({ children, href }) {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    mouseX.set(clientX - centerX);
    mouseY.set(clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.8rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'inherit' }}
    >
      {children}
    </motion.a>
  );
}

export function Contact() {
  const links = [
    { label: "Email", value: "dhruv@example.com", href: "mailto:dhruv@example.com", icon: <Mail size={18} /> },
    { label: "GitHub", value: "github.com/DhruvR-16", href: "https://github.com/DhruvR-16", icon: <Github size={18} /> },
    { label: "LinkedIn", value: "linkedin.com/in/dhruv", href: "#", icon: <Linkedin size={18} /> },
  ];

  return (
    <section id="contact" style={{ padding: '12rem 2.5rem', position: 'relative', zIndex: 2 }}>
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
            fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', 
            fontWeight: 400, 
            color: 'var(--text-main)', 
            lineHeight: 0.85, 
            letterSpacing: '-0.04em', 
            marginBottom: '2.5rem' 
          }}>
            Building the <br />
            <em className="gradient-text" style={{ fontStyle: 'italic', opacity: 0.9 }}>tomorrow.</em>
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'var(--text-dim)', 
            maxWidth: 520, 
            lineHeight: 1.6, 
            marginBottom: '5rem',
            fontWeight: 300
          }}>
            Open to ambitious research, AI collaboration, and architectural challenges. Let's start a conversation.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {links.map((l, i) => (
            <MagneticLink key={l.label} href={l.href}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ color: 'var(--accent-primary)', opacity: 0.9 }}>{l.icon}</div>
                <div>
                  <span style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '0.6rem', 
                    letterSpacing: '0.2em', 
                    textTransform: 'uppercase', 
                    color: 'var(--accent-primary)', 
                    display: 'block', 
                    marginBottom: '0.3rem',
                    opacity: 0.6
                  }}>{l.label}</span>
                  <span style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: 400 }}>{l.value}</span>
                </div>
              </div>
              <motion.div 
                whileHover={{ rotate: 45, scale: 1.2 }}
                style={{ color: 'var(--accent-primary)', opacity: 0.4 }}
              >
                <ArrowUpRight size={24} />
              </motion.div>
            </MagneticLink>
          ))}
        </div>

        <footer style={{ marginTop: '12rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '3rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Dhruv Ramani © 2025</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Think Boldly</span>
        </footer>
      </div>
    </section>
  );
}
