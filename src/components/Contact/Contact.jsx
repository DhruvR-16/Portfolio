import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { SectionLabel } from '../Shared/Shared';

function SimpleLink({ children, href }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial="rest"
      whileHover="hover"
      animate="rest"
      style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1.8rem 0', 
        borderBottom: '1px solid rgba(166, 156, 132, 0.1)', 
        textDecoration: 'none'
      }}
    >
      {children}
    </motion.a>
  );
}

export function Contact() {
  const links = [
    { label: "Email", value: "dhruvramani006@gmail.com", href: "mailto:dhruvramani006@gmail.com", icon: <Mail size={18} /> },
    { label: "GitHub", value: "github.com/DhruvR-16", href: "https://github.com/DhruvR-16", icon: <Github size={18} /> },
    { label: "LinkedIn", value: "linkedin.com/in/dhruv-ramani1/", href: "https://www.linkedin.com/in/dhruv-ramani1/", icon: <Linkedin size={18} /> },
  ];

  return (
    <section id="contact" style={{ 
      padding: '10rem 2.5rem', 
      position: 'relative', 
      zIndex: 2, 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center' 
    }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <SectionLabel>Contact</SectionLabel>
        <div style={{ marginBottom: '5rem' }}>
          <h2 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', 
            fontWeight: 400, 
            color: 'var(--text-main)', 
            lineHeight: 0.9, 
            letterSpacing: '-0.03em', 
            marginBottom: '2.5rem' 
          }}>
            Let's think <br />
            <em className="gradient-text" style={{ fontStyle: 'italic', opacity: 0.9 }}>together.</em>
          </h2>
          <p style={{ 
            fontSize: '1.1rem', 
            color: 'var(--text-dim)', 
            maxWidth: 500, 
            lineHeight: 1.6, 
            fontWeight: 300
          }}>
            Open to ambitious research, AI collaboration, and architectural challenges. Let's start a conversation.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {links.map((l) => (
            <SimpleLink key={l.label} href={l.href}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <motion.div 
                  variants={{ rest: { color: 'rgba(255, 255, 255, 0.4)' }, hover: { color: '#ffffff' } }} 
                  transition={{ duration: 0.3 }}
                >
                  {l.icon}
                </motion.div>
                <div>
                  <span style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '0.55rem', 
                    letterSpacing: '0.25em', 
                    textTransform: 'uppercase', 
                    color: 'var(--accent-primary)', 
                    display: 'block', 
                    marginBottom: '0.3rem',
                    opacity: 0.7
                  }}>{l.label}</span>
                  <motion.span 
                    variants={{ rest: { color: 'rgba(255, 255, 255, 0.6)' }, hover: { color: '#ffffff' } }}
                    transition={{ duration: 0.3 }}
                    style={{ fontSize: '1.1rem', fontWeight: 400 }}
                  >
                    {l.value}
                  </motion.span>
                </div>
              </div>
              <motion.div 
                variants={{ rest: { opacity: 0.3, x: 0, color: 'rgba(255, 255, 255, 0.4)' }, hover: { opacity: 1, x: 5, color: '#ffffff' } }}
                transition={{ duration: 0.3 }}
              >
                <ArrowUpRight size={20} />
              </motion.div>
            </SimpleLink>
          ))}
        </div>

        <footer style={{ marginTop: '10rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(166, 156, 132, 0.1)', paddingTop: '3rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--accent-secondary)', textTransform: 'uppercase', opacity: 0.6 }}>Dhruv Ramani © 2025</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--accent-secondary)', textTransform: 'uppercase', opacity: 0.6 }}>Think Boldly</span>
        </footer>
      </div>
    </section>
  );
}
